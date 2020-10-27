### 关系运算符
```
< 
<=
> 
>=
==  等于
!=  不等于
&&  逻辑与 
||  逻辑或
!   非
```
```
if (a>b) {
  max = a
} else {
  max = b
}

// 等同于
max = a > b ? a : b
```

### switch
```
#include<stdio.h>
int main(){
    char grade;
    scanf("%c",&grade);
    printf("you score:");
    switch(grade){
      case 'a':printf("85~100\n");break;
        case 'b':printf("70~84\n");break;
         case 'c':printf("60~69\n");break;
         case 'd':printf("<60\n");break;
        default:printf("error!\n");
    }

   return 0;
}
```

### 循环
1. while
```
#include<stdio.h>

int main(){
    int i = 1,sum = 0;
    while(i<=100)
    {
        sum = sum + i;
        i++;
    }
    printf("sum=%d\n",sum);

return 0;
}
```
2. for
break 用来跳出循环
continue 用来跳出当前循环
```
#include<stdio.h>

int main(){
    int i,sum = 0;
    for(i=1;i<=100;i++)
        sum = sum + i;
    printf("sum=%d\n",sum);

    return 0;
}
```