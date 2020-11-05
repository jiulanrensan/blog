## 打开和关闭文件
对文件读写之前应该“打开”该文件，使用结束之后“关闭”文件。实际上，所谓的打开文件是指为文件建立相应的信息区（用来存放有关文件的信息）和文件缓冲区（用来暂时存放输入输出的数据）

### `fopen()` 打开数据文件
```
fopen("a1","r");
```
表示要打开名字为“ a1 ”的文件，使用文件的方式为“读入”（r 代表 read，即读入）。fopen 函数的返回值是指向 a1 文件的指针（即 a1 文件信息区的起始地址）

通常将 fopen 函数的返回值赋给一个指向文件的指针变量
```
FILE *fp;
fp = fopen("a1","r");
```

### `fclose()` 函数关闭数据文件
在使用完一个文件后应该关闭它，以防止它被误用。“关闭”就是撤销文件信息区和文件缓冲区，使文件指针变量不再指向该文件

```
fclose(fp);
```

### 顺序读写文件
文件打开之后，就可以对它进行读写了。在顺序写时，先写入的数据存放在文件中前面的位置，后写入的数据存放在文件中后面的位置。在顺序读时，读数据的顺序和数据在文件中的物理顺序是一致的。顺序读写需要用库函数实现

|--|--|--|--|
|函数名|调用形式|功能|返回值|
fgetc | fgetc(fp) | 从 fp 指向的文件读入一个字符 | 成功，带回所读的字符；失败则返回文件结束标志 EOF（即 -1）
fputc | fputc(ch, fp) | 把字符 ch 写到文件指针变量 fp 所指向的文件中 | 输出成功，返回值就是输出的字符；输出失败，则返回 EOF（即 -1）

### 从键盘输入一些字符，逐个把它们送到磁盘上去，直到用户输入一个“ # ”为止
```
#include<stdio.h>
#include<stdlib.h>   // stdlib 头文件即 standard library 标准库头文件
int main(){
    FILE * fp;
    char ch,filename[10];
    printf("Please enter the file name:");

    scanf("%s",filename);
    // 如果文件不存在，fopen 会建立该文件
    if((fp=fopen(filename,"w"))==NULL){    // 打开输出文件并使 fp 指向此文件
        printf("Unable to open this file\n");     // 如果打开出错，就输出“打不开”的信息
        exit(0);     // 终止程序
    }

    ch=getchar();     // 用来接收最后输入的回车符
    printf("Please enter a string  in the disk（Ends with a #）：");
    ch=getchar();     // 接收从键盘输入的第一个字符
    while(ch!='#'){     // 当输入 # 时结束循环
        fputc(ch,fp);
        putchar(ch);
        ch=getchar();
    }

    fclose(fp);
    putchar(10); // 换行
    return 0;
}
```