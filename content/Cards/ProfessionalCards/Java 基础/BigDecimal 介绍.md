---
title: BigDecimal 介绍
publish: false
---



`BigDecimal` 可以实现对浮点数的运算，不会造成精度丢失。

通常情况下，大部分需要浮点数精确运算结果的业务场景（比如涉及到钱的场景）都是通过 `BigDecimal` 来做的。

《阿里巴巴 Java 开发手册》中提到：**浮点数之间的等值判断，基本数据类型不能用 == 来比较，包装数据类型不能用 equals 来判断。**

![|825](https://oss.javaguide.cn/javaguide/image-20211213101646884.png)

具体原因我们在上面已经详细介绍了，这里就不多提了。

想要解决浮点数运算精度丢失这个问题，可以直接使用 `BigDecimal` 来定义浮点数的值，然后再进行浮点数的运算操作即可。

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("1.00");
BigDecimal c = new BigDecimal("0.8");

BigDecimal x = a.subtract(c);
BigDecimal y = b.subtract(c);

System.out.println(x); /* 0.2 */
System.out.println(y); /* 0.20 */
// 比较内容，不是比较值
System.out.println(Objects.equals(x, y)); /* false */
// 比较值相等用相等 compareTo，相等返回 0
System.out.println(0 == x.compareTo(y)); /* true */
```
