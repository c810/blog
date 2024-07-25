---
title: BigDecimal 等值比较问题
publish: false
---



《阿里巴巴 Java 开发手册》中提到：

![](https://oss.javaguide.cn/github/javaguide/java/basis/image-20220714161315993.png)

`BigDecimal` 使用 `equals()` 方法进行等值比较出现问题的代码示例：

```java
BigDecimal a = new BigDecimal("1");
BigDecimal b = new BigDecimal("1.0");
System.out.println(a.equals(b));//false
```

这是因为 `equals()` 方法不仅仅会比较值的大小（value）还会比较精度（scale），而 `compareTo()` 方法比较的时候会忽略精度。

1.0 的 scale 是 1，1 的 scale 是 0，因此 `a.equals(b)` 的结果是 false。

![](https://oss.javaguide.cn/github/javaguide/java/basis/image-20220714164706390.png)

`compareTo()` 方法可以比较两个 `BigDecimal` 的值，如果相等就返回 0，如果第 1 个数比第 2 个数大则返回 1，反之返回 -1。

```java
BigDecimal a = new BigDecimal("1");
BigDecimal b = new BigDecimal("1.0");
System.out.println(a.compareTo(b));//0
```
