---
title: 如何实现数组和 List 之间的转换？
publish: false
---

如下代码：

![[image-20230428185600918.png]]

参考回答：

- 数组转 List ，使用 JDK 中 java.util.Arrays 工具类的 asList 方法
- List 转数组，使用 List 的 toArray 方法。无参 toArray 方法返回 Object 数组，传入初始化长度的数组对象，返回该对象数组

面试官再问：

1. 用 Arrays.asList 转 List 后，如果修改了数组内容，list 受影响吗？
2. List 用 toArray 转数组后，如果修改了 List 内容，数组受影响吗？

- 数组转 List 受影响：Arrays.asList 转换 list 之后，如果修改了数组的内容，list 会受影响，因为它的底层使用的 Arrays 类中的一个内部类 ArrayList 来构造的集合，在这个集合的构造器中，把我们传入的这个集合进行了包装而已，最终指向的都是同一个内存地址。
- List 转数组不受影响：list 用了 toArray 转数组后，如果修改了 list 内容，数组不会影响，当调用了 toArray 以后，在底层是它是进行了数组的拷贝，跟原来的元素就没啥关系了，所以即使 list 修改了以后，数组也不受影响。

![[image-20230428185657791.png]]
