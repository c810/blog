---
title: static 静态导包
publish: false
---



格式为：`import static`

这两个关键字连用可以指定导入某个类中的指定静态资源，并且不需要使用类名调用类中静态成员，可以直接使用类中静态成员变量和成员方法

```java
//将Math中的所有静态资源导入，这时候可以直接使用里面的静态方法，而不用通过类名进行调用
//如果只想导入单一某个静态方法，只需要将*换成对应的方法名即可
import static java.lang.Math.*;//换成import static java.lang.Math.max;具有一样的效果
public class Demo {
  public static void main(String[] args) {
    int max = max(1,2);
    System.out.println(max);
  }
}
```
