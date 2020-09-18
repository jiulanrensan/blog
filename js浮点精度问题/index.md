## js浮点精度问题

### 精度问题由来
[JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)

### 小数四舍五入
```
function round(number, precision) {
    return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
    //same as:
    //return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
}

round(1.005, 2);    //1.01
```
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

### 精确加法
正确的做法是把小数转成整数后再运算
[参考](https://github.com/nefe/number-precision/blob/master/src/index.ts)

### 参考文章
> [JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)
> [Math.round()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)