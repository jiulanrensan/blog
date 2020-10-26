## 运算符号与类型转换

### 运算符
```
+-*/%
```
> x/y 中，两个实数相除的结果是双精度实数，两个整数相除的结果为整数。如 5/3 的结果为 1，舍去小数部分

> % 运算符要求参加运算的对象为整数，结果也是整数。如 7%3，结果为 1，除了%以外的运算符的操作数都可以是任何算数类型

```
# include<stdio.h>
int main(){
    int a=22;
    int b=3;
    printf("%d\n",a/b);
    return 0;
}
```
```
// 编译执行后
7
```

```
#include<stdio.h>

int main(){
    // float
    float a = 22.5; 
    int b = 3;
    printf("%d\n",a%b);
    return 0;
}
```
编译出现 error 表示编译未成功，因为% 运算符要求参加运算的对象为整数


### 自增自减运算符
++i，--i（在使用 i 之前，先使 i 加（减）1）；i++，i--（在使用 i 之后，使 i 的值加（减）1）

```
# include<stdio.h>
int main(){
    int a = 5;
    printf("%d\n",a++);
    printf("%d\n",++a);
    return 0;
}
```
```
// output 
5
7
```

### 不同数据间的混合运算
如果一个运算符的两侧数据类型不同，则先进行类型的转换，使两者具有同一种类型，然后进行运算

优先级从左往右变高
```
char -> short -> int ->  unsigned int -> long -> float -> double -> long double 
```
1. 如果 int 类型的数据和 float 或 double 型数据进行运算时，先把 int 型和 float 型数据转换为 double 型数据，然后进行运算，结果为 double 型
2. 字符 (char) 型数据和整型数据进行运算，就是把字符的 ASCII 代码与整型运算。如 4+'B'，由于字符 'B' 的 ASCII 代码是 66，相当于 66+4=70。字符型数据可以直接和整型数据进行运算。如果字符型数据和浮点型数据运算，则将字符的 ASCII 码先转化为 double 型，然后再进行运算

```
# include<stdio.h>
int main(){
  int i = 3;
  float f = 4.3;
  double d = 7.5;
  double sum;
  sum = 10 + 'a' + i*f - d/3;
  // lf 表示double类型
  printf("%lf\n",sum);
    return 0;
}
// 10 + 'a' 的运算，'a' 的值是整数 97，运算结果为 107。 
// i*f 的运算。先将 i 与 f 都转换为 double 型，两者运算 12.9，double 型。 
// 整数 107 与 i * f 的值相加，结果为 119.9，double 型。 
// d/3 的运算，现将 3 转换 double 类型，d/3 的结果为 2.5，double 型。 
// 将 119.9 与 2.5 相减，117.4，double 型
```

### 强制类型转换
```
(double)a            //将 a 转换成为 double 型
(int)(x + y)           //将 x+y 的值转换成为 int 类型
```

### 数据的输入和输出
```
%d 以带符号的十进制输入输出整数
%u 以无符号...

%o 以无符号的八进制输入输出整数
%x 以无符号的十六进制输入输出整数

%c 以字符形式输入输出单个字符
%s 输出输出字符串

%f 以小数点形式输入输出单双精度的实数
%e 以标准指数形式输入输出单双精度的实数


%md 以 m 为指定的最小字段宽度输出，右对齐
%ld 输出长整型数据
%mld 输出指定宽度的长整型数据
```
```
#include<stdio.h>
int main(){
    int a = 12,b = -3456;
    long int c = 123456;
    printf("%5d\n",a);
    printf("%d\n",b);
    printf("%ld\n",c);
    printf("%6ld\n",c);
  return 0;
}
```
```
// output
   12
-3456
123456
123456
```

```
#include<stdio.h>
#include<math.h>               //程序中要调用求平方根函数 sqrt

int main(){
    double a,b,c,disc,x1,x2,p,q;
    scanf("%lf%lf%lf",&a,&b,&c);
    disc = b * b - 4 * a * c;
    p = -b / (2.0 * a);
    q = sqrt(disc) / (2.0 * a);
    x1 = p + q,x2 = p - q;
    printf("x1=%7.2f\nx2=%7.2f\n",x1,x2);
    return 0;
}
```
```
// 编译时需要注意，在 Linux 系统下，C 源文件若调用了 math 库里的函数，
// 则编译时要加上 -lm （是字母 l ，不是数字 1），表示链接到 math 库

gcc -o 5-5 5-5.c -lm

```
在 printf 函数中，不是简单地用 "%f" 格式声明，而是在格式符 "f" 的前面加了 “7.2”。表示的意思是在输出 x1，x2 时，指定数据占 7 列，其中小数占 2 列

#### putchar
一般形式：putchar(c); 功能：输出变量 c 所代表的一个字符； 说明：c 为字符型变量或整型变量
```
#include <stdio.h>
void main(){
    char a,b,c;
    a = 'O';b = 'K';c = '\n';
    putchar(a);
    putchar(b);
    putchar(c);
}

// output 
OK
```

#### getchar
要求用户从终端（键盘）输入单个字符,返回值为从输入设备上得到的字符
```
#include <stdio.h>
int main(){
    char c;
    printf("Input an uppercase letter:\n");
    c = getchar();
    putchar(c + 32);
    return 0;
}
```