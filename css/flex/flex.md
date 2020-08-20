## flex布局
记录flex 布局属性，以及`flex-grow`,`flex-shrink`的计算公式

### 设置在容器上的属性
```
// 第一个为默认属性
```
```
// 决定主轴的方向: 水平左向右 | 水平右向左 | 垂直上向下 | 垂直下向上
flex-direction: row | row-reverse | column | column-reverse;
```
```
// 是否换行：不换行 | 换行，第一行在上方 | 换行，第一行在下方
flex-wrap: nowrap | wrap | wrap-reverse;
```
```
// flex-direction属性和flex-wrap属性的简写形式: row nowrap
flex-flow: <flex-direction> || <flex-wrap>;
```
```
// 主轴上的对齐方式: 左对齐 | 右对齐 | 居中 | 首尾对齐!项目之间间隔相等 | 首尾有间距，每个项目之间两侧的间隔相等 | 每个元素之间的间隔相等（兼容性）
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
```
```
// 这里假设交叉轴为竖直方向
// 交叉轴的对齐方向: 未设置高度或auto，高度延伸整个项目 | 顶部对齐 | 底部对齐 | 居中 | 项目第一行文字基线对齐
align-items: stretch | flex-start | flex-end | center | baseline;
```
```
// 这里假设交叉轴为竖直方向
// 定义多根轴线对齐方式，若只有一根轴线，属性不起作用
// 交叉轴的对齐方向: 同上 | | 顶部对齐 | 底部对齐 | 居中 | 顶底对齐！项目之间间隔相等 | 首尾有间距，每个项目之间两侧的间隔相等 
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
```

### 设置在项目上的属性
```
// 排列顺序,数值越小，排列越靠前，默认为0
order: <integer>;
```
```
// 允许单个项目有与其他项目不一样的对齐方式,可覆盖align-items属性
// auto为默认值，表示继承父元素的align-items
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```
```
// 定义项目的放大比例,即如果存在剩余空间，也不放大
flex-grow: <number>; /* default 0 */
```
```
// 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
flex-shrink: <number>; /* default 1 */
```
```
// 在分配多余空间之前，项目占据的主轴空间，默认值为auto，即项目的本来大小，所以可以设为跟width,height一样的值
flex-basis: auto | <length>;
```
```
// flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto，后两个属性可选
// 两个快捷值: auto (1 1 auto) 和 none (0 0 auto)
flex: <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> 
```

### 如何计算`flex-grow`和`flex-shrink`
#### `flex-grow`
定义： `flex-grow`的值是个权重值，即容器有剩余空间的时候，会将剩余的空间按照`flex-grow`的权重来分配给各个项目


### `flex-shrink`


> [实时flex布局](https://demos.scotch.io/visual-guide-to-css3-flexbox-flexbox-playground/demos/)

> [Flex 布局教程](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)