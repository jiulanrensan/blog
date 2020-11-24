// 1. 最简单的情况
// JSON.parse(JSON.stringify(A))


// 2. 遍历对象属性，区分原始类型和引用类型，如果子属性还是object类型，则递归
function deepClone2(target) {
  if (typeof target === 'object') {
    const newT = {}
    for (const key in target) {
      newT[key] = deepClone2(target[key])
    }
    return newT
  } else {
    return target
  }
}

// 3. object类型包含数组，需要考虑数组的情况，即newT的赋值
function deepClone3(target) {
  if (typeof target === 'object') {
    const newT = Array.isArray(target) ? [] : {}
    for (const key in target) {
      newT[key] = deepClone3(target[key])
    }
    return newT
  } else {
    return target
  }
}

// 4. 循环引用
// 如果存在对自身的引用，递归会导致栈溢出
// 所以需要另外设置一个存储空间进行存放访问过的对象
// 这里使用一个数组存储
function deepClone4(target, visited = []) {
  if (typeof target === 'object') {
    let newT = Array.isArray(target) ? [] : {}
    // 查找已缓存的对象中是否存在
    for (let i = 0; i < visited.length; i++) {
      if (visited[i] === target) return visited[i]
    }
    visited.push(target)
    for (const key in target) {
      newT[key] = deepClone4(target[key], visited)
    }
    return newT
  } else {
    return target
  }
}

// 5. 使用weakMap存放已遍历对象
// 参考：https://juejin.im/post/6844903929705136141
// 如果我们使用Map的话，那么对象间是存在强引用关系的，虽然我们手动将obj，进行释放，然是target依然对obj存在强引用关系，所以这部分内存依然无法被释放
// 如果是WeakMap的话，target和obj存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉
function deepClone5(target, visited = new WeakMap()) {
  if (typeof target === 'object') {
    let newT = Array.isArray(target) ? [] : {}
    // 查找已缓存的对象中是否存在
    if (visited.has(target)) return visited.get(target)
    visited.set(target, newT)
    for (const key in target) {
      newT[key] = deepClone5(target[key], visited)
    }
    return newT
  } else {
    return target
  }
}

// 6. 按类型区分

// 先定义一个判断类型函数
// 筛选出object类型和function 类型
// function类型后面再细分
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

// 再定义一个区分类型的函数
function getType(target) {
  return Object.prototype.toString.call(target)
}

// 添加一个遍历函数
function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

// 定义以下类型，并区分为可继续遍历类型/不可继续遍历类型

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

const deepTag = ['mapTag', 'setTag', 'arrayTag', 'objectTag']

// 获取构造函数，并new一个实例
function getInit(target) {
  const constructor = target.constructor
  return new constructor()
}

// 增加功能：区分类型，对可遍历的数据类型进行处理
function deepClone6(target, visited = new WeakMap()) {
  // 如果不是Object,function,直接复制
  if (!isObject(target)) {
    return target
  }

  const type = getType(target)
  // 四种构造类型
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
  }

  // 防止循环引用
  if (visited.get(target)) return visited.get(target)

  visited.set(target, cloneTarget)

  // clone set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepClone6(value, visited))
    })
    return cloneTarget
  }

  // clone map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone6(value, visited))
    })
    return cloneTarget
  }

  // clone 对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) key = value
    cloneTarget[key] = deepClone6(target[key], visited)
  })

  return cloneTarget
}


// 增加对不可遍历的数据类型进行处理
// Bool、Number、String、String、Date、Error这些直接使用构造函数new即可
// new Boolean('true')/new Number(1)...

// 定义一个不可遍历数据类型的复制方法
function cloneOtherType (target, type) {
  const constructor = target.constructor
  switch (type) {
    case boolTag:
    case dateTag:
    case errorTag:
    case numberTag:
    case stringTag:
      return new constructor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    default: 
      return null
  }
}

// 正则
// var reg = new RegExp('^[a-b]');
// reg.source
// output '^[a-b]'
function cloneReg(target){
  const reFlags = /\w*$/
  // 疑问?  reFlags.exec(target)？？
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}

// clone Symbol
function cloneSymbol (target) {
  // 疑问？ Object()之后 typeof 判断是个object类型
  return Object(Symbol.prototype.valueOf.call(target))
}


function deepClone7(target, visited = new WeakMap()) {
  // 如果不是Object,function,直接复制
  if (!isObject(target)) {
    return target
  }

  const type = getType(target)
  // 四种构造类型
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
    // 防止循环引用
    if (visited.get(target)) return visited.get(target)

    visited.set(target, cloneTarget)

    // clone set
    if (type === setTag) {
      target.forEach(value => {
        cloneTarget.add(deepClone7(value, visited))
      })
      return cloneTarget
    }

    // clone map
    if (type === mapTag) {
      target.forEach((value, key) => {
        cloneTarget.set(key, deepClone7(value, visited))
      })
      return cloneTarget
    }

    // clone 对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if (keys) key = value
      cloneTarget[key] = deepClone7(target[key], visited)
    })

  } else {
    cloneTarget = cloneOtherType(target, type)
  }

  return cloneTarget
}

// clone 函数

// 区分箭头函数和普通函数
// 1. 箭头函数没有prototype,直接使用eval和函数字符串生成箭头函数即可
// 2. 普通函数有prototype，用正则提取函数体和函数参数，然后使用Function构造函数构建 
// new Function ([arg1[, arg2[, ...argN]],] functionBody) 
//  参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
function cloneFunc (target) {
  // 疑问:正则的捕获组？
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const params = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (params) {
        const paramsArr = param[0].split(',')
        return new Function(...paramsArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}
function deepClone8(target, visited = new WeakMap()) {
  const isFunc = typeof target === 'function'
  // 如果不是Object,function,直接复制
  if (!isObject(target)) {
    return target
  }

  if (isFunc) {
    return cloneFunc(target)
  }

  const type = getType(target)
  // 四种构造类型
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
    // 防止循环引用
    if (visited.get(target)) return visited.get(target)

    visited.set(target, cloneTarget)

    // clone set
    if (type === setTag) {
      target.forEach(value => {
        cloneTarget.add(deepClone8(value, visited))
      })
      return cloneTarget
    }

    // clone map
    if (type === mapTag) {
      target.forEach((value, key) => {
        cloneTarget.set(key, deepClone8(value, visited))
      })
      return cloneTarget
    }

    // clone 对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if (keys) key = value
      cloneTarget[key] = deepClone8(target[key], visited)
    })

  } else {
    cloneTarget = cloneOtherType(target, type)
  }

  return cloneTarget
}



// test
// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: 'ConardLi',
//   field4: {
//       child: 'child',
//       child2: {
//           child2: 'child2'
//       }
//   },
//   field5: [2, 4, 8]
// };
const target = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
    child: 'child',
    child2: {
      child2: 'child2'
    }
  },
  field5: [2, 4, 8]
};
target.field6 = target

const newTarget = deepClone5(target)
// newTarget.field4.child = undefined
// newTarget.field5 = []

console.log(newTarget);
