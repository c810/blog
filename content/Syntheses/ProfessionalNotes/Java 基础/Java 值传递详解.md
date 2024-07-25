---
title: Java 值传递详解
publish: true
---

开始之前，我们先来搞懂下面这两个概念：

- 形参&实参
- 值传递&引用传递

[[形参&实参]]

[[值传递&引用传递]]

[[为什么 Java 只有值传递？]]

[[引用传递是怎么样的？]]

[[为什么 Java 不引入引用传递呢？]]

## 总结

Java 中将实参传递给方法（或函数）的方式是 **值传递**：

- 如果参数是基本类型的话，很简单，传递的就是基本类型的字面量值的拷贝，会创建副本。
- 如果参数是引用类型，传递的就是实参所引用的对象在堆中地址值的拷贝，同样也会创建副本。

## 参考

- 《Java 核心技术卷 Ⅰ》基础知识第十版第四章 4.5 小节
- [Java 到底是值传递还是引用传递？ - Hollis 的回答 - 知乎](https://www.zhihu.com/question/31203609/answer/576030121)
- [Oracle Java Tutorials - Passing Information to a Method or a Constructor](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)
- [Interview with James Gosling, Father of Java](https://mappingthejourney.com/single-post/2017/06/29/episode-3-interview-with-james-gosling-father-of-java/)
