# devServer
在开发阶段，webpack其实是启动了一个Node服务，浏览器需要资源就向webpack服务器请求，而此时的服务器设置就在devServer

## publicPath
webpack-dev-server打包的内容是放在内存中的，这些打包后的资源对外的的根目录就是publicPath，换句话说，这里我们设置的是打包后资源存放的位置
```
// 假设devServer的publicPath为
const publicPath = '/dist/'
// 则启动devServer后index.html的位置为
const htmlPath = `${pablicPath}index.html`
// 包的位置
cosnt mainJsPath = `${pablicPath}main.js`

// 可以直接通过http://lcoalhost:8080/dist/main.js
```
通过访问 `http://localhost:8080/webpack-dev-server` 可以得到devServer启动后的资源访问路径

## contentBase
决定了 webpackDevServer 启动时服务器资源的根目录，默认是项目的根目录

contentBase 不会影响 path 和 publicPath，它唯一的作用就是指定服务器的根目录来引用静态文件

可以这么理解 contentBase 与 publicPath 的关系：contentBase 是服务于引用静态文件的路径，而 publicPath 是服务于打包出来的文件访问的路径，两者是不互相影响的

To disable `contentBase` set it to `false`

## hot,watchOptions,watch
?

## overlay
是否在浏览器展示满屏的报错和警告
```
devServer: {
  overlay: true
}

overlay: {
  warnings: true,
  errors: true
}
```
## inline
??
https://segmentfault.com/a/1190000006670084

## proxy
代理主要为了解决跨域问题，工作原理就是原本浏览器请求的api改由webpack服务器去请求

```
devServer: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
```
`/api/users` 的请求会将请求代理到 `http://localhost:3000/api/users`

如果不希望传递/api，则需要重写路径
```
devServer: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {'^/api' : ''}
    }
  }
}
```
### secure
默认情况下，不接受在 HTTPS 上运行且证书无效的后端服务器，若需要，则
```
seucre: false
// 表示不进行安全检查
```
### changeOrigin
设置为true，表示跨域
（原理是？）

### bypass
若不想代理所有请求，用bypass做过滤

[参考这篇文章](https://juejin.im/post/6850418120436383758)