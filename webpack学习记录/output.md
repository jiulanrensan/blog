## hash,chunkhash,contenthash
[这个答案讲得很详细](https://stackoverflow.com/questions/35176489/what-is-the-purpose-of-webpack-hash-and-chunkhash)

Another explanation one by one from the documentation of output.filename:

* [hash] is a "unique hash generated for every build"
每次构建都有一个hash,所有文件都公用这个hash
* [chunkhash] is "based on each chunks' content"
每个模块(模块可能包含js,css文件)都有共同的hash
* [contenthash] is "generated for extracted(提取的) content"
hash只与文件内容有关，即每个文件的hash都不同


## filename,chunkFilename
[filename 和 chunkFilename 的区别是什么？](https://www.cnblogs.com/skychx/p/webpack-filename-chunkFilename.html)

一句话：
* filename 指列在 entry 中，打包后输出的文件的名称
* chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称

### filename
```
{
  entry: {
    index: "../src/index.js"
  },
  output: {
    filename: "[name].min.js", // index.min.js
  }
}
```
### chunkFilename
一般指的是懒加载的代码，比如懒加载路由，就要把路由所属模块单独打包，这些包名就是chunkFilename
```
// 默认配置
{
    entry: {
        index: "../src/index.js"
    },
    output: {
        filename: "[name].min.js", // index.min.js
    }
}
```
chunkFilename没有指定，所以就将`filename`的`[name]`替换成当前chunk文件对应的id号(假设为1)，所以就是`1.min.js`

```
{
    entry: {
        index: "../src/index.js"
    },
    output: {
        filename: "[name].min.js",  // index.min.js
        chunkFilename: 'bundle.js', // bundle.js
    }
}
```