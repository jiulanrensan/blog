// 1. 最简单的情况
// JSON.parse(JSON.stringify(A))


// 2. 遍历对象属性，区分原始类型和引用类型，如果子属性还是object类型，则递归
function deepClone2 (target) {
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
function deepClone3 (target) {
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
function deepClone4 (target, visited = []) {
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
function deepClone5 (target, visited = new WeakMap()) {
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
