---
title: BigDecimal 详解
publish: true
---

《阿里巴巴 Java 开发手册》中提到：“为了避免精度丢失，可以使用 `BigDecimal` 来进行浮点数的运算”。

浮点数的运算竟然还会有精度丢失的风险吗？确实会！

[[为什么浮点数运算的时候会有精度丢失的风险？]]

[[BigDecimal 介绍]]

[[BigDecimal 常见方法]]

[[BigDecimal 等值比较问题]]

[[BigDecimal 工具类分享]]

## 总结

浮点数没有办法用二进制精确表示，因此存在精度丢失的风险。

不过，Java 提供了 `BigDecimal` 来操作浮点数。`BigDecimal` 的实现利用到了 `BigInteger` （用来操作大整数）, 所不同的是 `BigDecimal` 加入了小数位的概念。
