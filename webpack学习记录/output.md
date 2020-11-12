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

## path,publicPath
[参考](https://juejin.im/post/6844903601060446221)
### path
对应一条绝对路径，输出在这条路径下
```
output: {
	path: path.resolve(__dirname, '../dist'),
}

```
### publicPath
为项目中的所有资源指定一个基础路径,这里说的所有资源的基础路径是指项目中引用css，js，img等资源时候的一个基础路径,这个基础路径要配合具体资源中指定的路径使用，所以其实打包后资源的访问路径可以用如下公式表示
```
静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
// 例如
output.publicPath = '/dist/'

// image
options: {
 	name: 'img/[name].[ext]?[hash]'
}
// 最终图片的访问路径为
output.publicPath + 'img/[name].[ext]?[hash]' = '/dist/img/[name].[ext]?[hash]'

// js output.filename
output: {
	filename: '[name].js'
}
// 最终js的访问路径为
output.publicPath + '[name].js' = '/dist/[name].js'

// extract-text-webpack-plugin css
new ExtractTextPlugin({
	filename: 'style.[chunkhash].css'
})
// 最终css的访问路径为
output.publicPath + 'style.[chunkhash].css' = '/dist/style.[chunkhash].css'
```

如果部署到cdn上，则需要相关设置相关cdn的url，[参考官网](https://webpack.js.org/configuration/output/#outputpublicpath)