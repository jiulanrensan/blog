## 字符串的引用方式
在 C 程序中，字符串是存放在字符数组中的。想引用一个字符串，可以使用下面两种方式

1. 用字符数组存放一个字符串，可以通过数组名和下标引用字符串中一个字符，也可以通过数组名和格式声明 “%s” 输出该字符
```
#include<stdio.h>
int main(){
    char string[]="I love Shiyanlou!";

    printf("%s\n",string);
    printf("%c\n",string[9]);

    return 0;
}
```
2. 用字符指针变量指向一个字符串常量，通过字符指针变量引用字符串常量
```
#include<stdio.h>
int main(){
    char * string="I love Shiyanlou!";

    printf("%s\n",string);

    return 0;
}
```
对字符指针变量 string 初始化，实际上是把字符串第一个元素的地址赋给指针变量 string，使 string 指向字符串的第一个字符

语句 printf("%s\n",string);中 %s 是输出字符串时所用的格式，在输出项中给出字符指针变量名 string，则系统会输出 string 所指向的字符串第一个字符，然后自动使 string 加 1，使之指向下一个字符，再输出该字符...如此直到遇到字符串结束标志 '\0'，因此再输出是能确定输出的字符到何时结束


### 将字符串 a 复制为字符串 b，然后输出字符串 b
下面两种方法都是一样的
```
#include<stdio.h>
int main(){
    char a[] = "I am a programmer",b[20];
    int i;

    for(i=0;*(a+i)!='\0';i++)
           *(b+i) = *(a+i);
    *(b+i) = '\0';

    printf("string a is:%s\n",a);
    printf("string b is:");
    for(i=0;b[i]!='\0';i++)
          printf("%c",b[i]);
    printf("\n");

    return 0;
}
```
```
#include<stdio.h>
int main(){
    char a[] = "I am a programmer",b[20],*p1,*p2;

    p1 = a,p2 = b;
    for(;*p1!='\0';p1++,p2++)
           *p2 = *p1;
    *p2 = '\0';

    printf("string a is:%s\n",a);
    printf("string b is:%s\n",b);

    return 0;
}
```


### 字符指针作函数参数
用字符数组名作为函数参数
```
#include<stdio.h>
int main(){
    void copy_string(char from[],char to[]);
    char a[] = "I am a teacher";
    char b[] = "You are a programmer";

    printf("string a=%s\nstring b=%s\n",a,b);
    printf("copy string a to string b:\n");
    copy_string(a,b);
    printf("\nstring a=%s\nstring b=%s\n",a,b);

    return 0;
}

void copy_string(char from[],char to[]){
    int i = 0;

    while(from[i]!='\0'){
        to[i] = from[i];
        i++;
    }
    to[i] = '\0';
}
```

用字符型指针变量作实参
```
#include<stdio.h>
int main(){
    void copy_string(char from[],char to[]);
    char a[] = "I am a teacher";
    char b[] = "You are a programmer";
    char *from = a,*to = b;

    printf("string a=%s\nstring b=%s\n",a,b);
    printf("copy string a to string b:\n");
    copy_string(from,to);
    printf("\n string a=%s\n string b=%s\n",a,b);

    return 0;
}

void copy_string(char from[],char to[]){
    int i = 0;

    while(from[i]!='\0')
    {
        to[i] = from[i];
        i++;
    }
    to[i] = '\0';
}
```


用字符指针变量作形参和实参
```
#include<stdio.h>
int main(){
    void copy_string(char *from,char *to);
    char *a = "I am a teacher";
    char b[] = "You are a programmer";
    char *p = b;

    printf("string a=%s\nstring b=%s\n",a,b);
    printf("copy string a to string b:\n");
    copy_string(a,p);
    printf("\n string a=%s\n string b=%s\n",a,b);

    return 0;
}

void copy_string(char *from,char *to){
    for(;*from!='\0';from++,to++)
           *to = *from;
    *to = '\0';
}
```

### 使用字符指针变量和字符数组的比较
1. 字符数组由若干元素组成，每个元素中放一个字符，而字符指针变量中存放的是地址（字符串第 1 个字符的地址），绝不是将字符串放到字符指针变量中

2. 赋值方式。可以对字符指针变量赋值，但不能对数组名赋值

3. 存储单元的内容。编译时为字符数组分配若干存储单元，以存放各元素的值，而对字符指针变量，只分配一个存储单元