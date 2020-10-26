## 基本的输入输出函数
### 1. 
```
// new file 2nd.c
#include<stdio.h>
int main(){
  int a,b,c;
  printf("Please enter a value:");
  scanf("%d",&a);
  printf("\n");
  printf("Please enter b value:");
  scanf("%d",&b);
  c = a + b;
  printf("%d\n",c);
  return 0;
}
```
```
// 编译运行
gcc -o 2nd 2nd.c
.2nd 
```
会提示输入a和b，最后输出a+b的值


### 2. 格式输出函数`printf()`
`printf("%d,%d", a,b)`

* 格式声明：格式声明由 % 和格式字符组成，%d 代表输出整数，%f 代表输出实数，它的作用是将输出的数据转换为指定的格式然后输出。格式声明总是由 % 字符开始

* 普通字符：普通字符即在需要输出时原样输出的字符。例如`printf("Please enter a value：");`就原样输出

### 3. 格式输入函数`scanf()`
```
scanf("a=%d,b=%d",&a,&b);
// & 不能省掉
```



在格式字符串中除了有格式声明的 %d 以外，其它普通字符在赋值时需要原样输入（如“ a= ”，“ b= ”和“,”），假如给 a 和 b 分别赋值 5 和 6，将输入 a=5,b=6