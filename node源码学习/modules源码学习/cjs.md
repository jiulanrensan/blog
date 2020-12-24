# Node实现commonjs规范
目录`lib/internal/modules`, node源码tags: v12.19.0

## `require`分析
1. 找到入口
`require('../this')`引入文件报错时控制台有错误堆栈，如下
```
internal/modules/cjs/loader.js:834
  throw err;
  ^

Error: Cannot find module '../remove'
Require stack:
- D:\个人project\exercise\this.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:831:15)
    at Function.Module._load (internal/modules/cjs/loader.js:687:27)
    at Module.require (internal/modules/cjs/loader.js:903:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (D:\个人project\exercise\this.js:1:16)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
    at Module.load (internal/modules/cjs/loader.js:879:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ 'D:\\个人project\\exercise\\this.js' ]
}
```
从堆栈可以看到，当我们`require`时调用的方法，也就是源码的入口

2. `internal/modules/run_main.js/run_main.js`
```js
// 可以看到对cjs和esm进行了判断
// 这里执行else
function executeUserEntryPoint(main = process.argv[1]) {
  const resolvedMain = resolveMainPath(main);
  const useESMLoader = shouldUseESMLoader(resolvedMain);
  if (useESMLoader) {
    runMainESM(resolvedMain || main);
  } else {
    // Module._load is the monkey-patchable CJS module loader.
    // main为入口文件: node xx
    Module._load(main, null, true);
  }
}
```
3. `internal/modules/cjs/loader.js`
调用了`Module._load`方法，先看下Module,定义了一个构造函数
```js
function Module(id = '', parent) {
  this.id = id; // '.'或文件的绝对路径的字符串形式，表示唯一的标志
  this.path = path.dirname(id);
  this.exports = {};  // 当前模块暴露的内容
  this.parent = parent; // 调用当前文件的module实例
  updateChildren(parent, this, false);  // ?
  this.filename = null; // 文件的绝对路径
  this.loaded = false;  // 是否加载完成
  this.children = [];   // 调用的文件
}
```
再看`_load`方法，有一段注释(翻译)：

1. 如果一个module在缓存(Module._cache)中已经存在：则返回缓存中这个module的exports属性
2. 如果这个module是native(原生？)，则调用`NativeModule.prototype.compileForPublicLoader()`
3. 否则，为当前文件创建一个新的module，然后存入缓存中。然后在return exports之前加载文件内容

```js
// Module._load(main, null, true);
Module._load = function(request, parent, isMain) {
  if (parent) {
    // skip...
  }
  // 解析唯一路径
  const filename = Module._resolveFilename(request, parent, isMain);
  
  // 第一种情况
  const cachedModule = Module._cache[filename];
  // 判断缓存中是否已经有这个module
  if (cachedModule !== undefined) {
    updateChildren(parent, cachedModule, true);
    // 直接return
    return cachedModule.exports;
  }

  // 第二种情况
  // native module
  const mod = loadNativeModule(filename, request);
  if (mod && mod.canBeRequiredByUsers) return mod.exports;

  // 第三种情况
  // Don't call updateChildren(), Module constructor already does.
  const module = new Module(filename, parent);

  if (isMain) {
    process.mainModule = module;
    module.id = '.';
  }

  // 将new 出来的module存入缓存
  Module._cache[filename] = module;
  if (parent !== undefined) {
    // ?
    relativeResolveCache[relResolveCacheIdentifier] = filename;
  }

  let threw = true;
  try {
    // 这句注释不是很明白
    // Intercept exceptions that occur during the first tick and rekey them
    // on error instance rather than module instance (which will immediately be
    // garbage collected).
    // 拦截发生在第一次tick(?)的异常，然后重新给他们定义一个key值在error实例上，而不是module实例
    // 这样会立即被垃圾回收
    if (enableSourceMaps) {
      // skip...
    } else {
      // 调用定义在Module原型链上的load方法
      module.load(filename);
    }
    threw = false;
  } finally {
    // 如果调用load方法报错，直接跳到fianlly
    // 删除缓存中对应的值
    if (threw) {
      delete Module._cache[filename];
      if (parent !== undefined) {
        delete relativeResolveCache[relResolveCacheIdentifier];
        const children = parent && parent.children;
        if (ArrayIsArray(children)) {
          const index = children.indexOf(module);
          if (index !== -1) {
            children.splice(index, 1);
          }
        }
      }
    }
  }

  return module.exports;
}
```

然后找Moudle构造函数上的load方法，只留下commonjs相关代码
```js
// module.load(filename);
// 传参为文件名，通过文件后缀决定如何解析文件内容
Module.prototype.load = function(filename) {
  this.filename = filename;

  const extension = findLongestRegisteredExtension(filename);
  // Module._extensions存放了对应的解析方法
  Module._extensions[extension](this, filename);
  // 解析完成之后标记为true
  this.loaded = true;
};

// 这个方法就是提取后缀名的
// 可能存在多个'.'
function findLongestRegisteredExtension(filename) {
  // http://nodejs.cn/api/path/path_basename_path_ext.html
  // 返回 add.js
  const name = path.basename(filename);
  let currentExtension;
  let index;
  let startIndex = 0;
  while ((index = name.indexOf('.', startIndex)) !== -1) {
    startIndex = index + 1;
    if (index === 0) continue; // Skip dotfiles like .gitignore
    currentExtension = name.slice(index);
    if (Module._extensions[currentExtension]) return currentExtension;
  }
  return '.js';
}

// 解析js的方法
Module._extensions['.js'] = function(module, filename) {
  if (filename.endsWith('.js')) {
    // skip...
    // Function require shouldn't be used in ES modules.
    // skip...
  }
  // 直接调用fs.readFileSync的同步api读取
  const content = fs.readFileSync(filename, 'utf8');
  module._compile(content, filename);
};
```
```js
// 读取完成之后，调用module._compile(content, filename);
// 注释翻译
// Run the file contents in the correct scope or sandbox. Expose
// the correct helper variables (require, module, exports) to
// the file.
// 在正确的作用域或者沙箱中运行代码，暴露正确的关键变量给文件：require,module,exports
Module.prototype._compile = function(content, filename) {
  // ...
  // wrapSafe没看懂
  const compiledWrapper = wrapSafe(filename, content, this);
  const dirname = path.dirname(filename);
  // 这里定义了requie方法
  const require = makeRequireFunction(this, redirects);
  // ...
  const exports = this.exports;
  const thisValue = exports;
  const module = this;
  // 执行js内容
  result = compiledWrapper.call(thisValue, exports, require, module, filename, dirname);
  // ...
  return result
}
```
把读取的内容放入一个闭包里，然后调用vm.runInThisContext执行
```js
// ...
let wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};
// script的内容与wrapper的内容组成一个闭包
const wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];
// ...
```

```js
// wrapSafe
// _compile中调用
// const compiledWrapper = wrapSafe(filename, content, this);
function wrapSafe(filename, content, cjsModuleInstance) {
  if (patched) {
    // 生成的闭包
    const wrapper = Module.wrap(content);
    return vm.runInThisContext(wrapper, {
      filename,
      lineOffset: 0,
      displayErrors: true,
      importModuleDynamically: async (specifier) => {
        const loader = asyncESM.ESMLoader;
        return loader.import(specifier, normalizeReferrerURL(filename));
      },
    });
  }
}

```

3. `lib/internal/modules/cjs/helpers`
分析`makeRequireFunction`方法前，先来分析Module原型上的require方法
```js
// 根据提供的文件路径加载模块，返回模块的exports属性
Module.prototype.require = function(id) {
  // skip...
  // 每调用一次require，requireDepth递增
  requireDepth++;
  try {
    return Module._load(id, this, /* isMain */ false);
  } finally {
    // 加载完成之后递减
    requireDepth--;
  }
};
```
```js
// makeRequireFunction(this, redirects); this指向Module
function makeRequireFunction(mod, redirects) {
  // mod.constructor指向构造函数Module
  const Module = mod.constructor;
  // ...
  // 调用原型上的require方法
  require = function require(path) {
    return mod.require(path);
  };
  // ...
  require.resolve = resolve;
  resolve.paths = paths;
  require.main = process.mainModule;
  require.extensions = Module._extensions;
  require.cache = Module._cache;
  return require;
}
```


## 参考文章
[node模块源码分析](https://zhuanlan.zhihu.com/p/38382637?utm_source=wechat_session&utm_medium=social&utm_oi=682211543370960896)

[node模块源码分析](https://segmentfault.com/a/1190000015139548)