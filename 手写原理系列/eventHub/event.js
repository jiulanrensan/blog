class EventHub{
  constructor () {
    // eventName: []
    this.cache = {}
  }
  on (eventName, fn) {
    // 
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }
  // 触发cache里eventName的每一个函数
  emit (eventName) {
    const args = Array.prototype.slice.call(arguments, 1)
    this.cache[eventName].forEach(fn => fn(...args))
  }
  off (eventName, fn) {
    const idx = this.cache[eventName].indexOf(fn)
    if (idx < 0) return
    this.cache[eventName].splice(idx, 1)
  }
}

const hub = new EventHub()
hub.on('first', function firstOn(params) {
  console.log('excuting');
  console.log(params);
})
hub.on('first', function secondOn(params) {
  console.log(params);
})
console.log(hub.cache);
hub.emit('first', 123)