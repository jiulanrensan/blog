## 移动端适配

### em
em作为font-size的单位时，其代表父元素的字体大小

em作为其他属性单位时，代表自身元素字体大小

> em就是为字体和行高而生的，有些时候子元素字体就应该相对于父元素，元素行高就应该相对于字体大小

两个例子如下

### rem
rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其出初始字体大小
```
/* 作用于根元素，相对于原始大小（16px），所以html的font-size为32px*/
html {font-size: 2rem}

/* 作用于非根元素，相对于根元素字体大小，所以为64px */
p {font-size: 2rem}
```





> [Rem布局的原理解析](https://yanhaijing.com/css/2017/09/29/principle-of-rem-layout/)

> [rem布局](https://segmentfault.com/a/1190000012225828?utm_source=tag-newest)

> [移动端web适配](https://segmentfault.com/a/1190000008767416)

> [px2rem,px2vw原理](https://segmentfault.com/a/1190000015619303)