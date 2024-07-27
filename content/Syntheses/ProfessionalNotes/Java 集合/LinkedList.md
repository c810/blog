---
title: LinkedList
publish: false
---

## LinkedList

*LinkedList* 同时实现了 *List* 接口和 *Deque* 接口，也就是说它既可以看作一个顺序容器，又可以看作一个队列 (*Queue*)，同时又可以看作一个栈 (*Stack*)。这样看来，*LinkedList* 简直就是个全能冠军。当你需要使用栈或者队列时，可以考虑使用 *LinkedList*，一方面是因为 Java 官方已经声明不建议使用 *Stack* 类，更遗憾的是，Java 里根本没有一个叫做 *Queue* 的类 (它是个接口名字)。关于栈或队列，现在的首选是 *ArrayDeque*，它有着比 *LinkedList*(当作栈或队列使用时) 有着更好的性能。

*LinkedList* 的实现方式决定了所有跟下标相关的操作都是线性时间，而在首段或者末尾删除元素只需要常数时间。为追求效率 *LinkedList* 没有实现同步 (synchronized)，如果需要多个线程并发访问，可以先采用 `Collections.synchronizedList()` 方法对其进行包装。

[[LinkedList 插入和删除元素的时间复杂度？]]

[[LinkedList 为什么不能实现 RandomAccess 接口？]]

[[双向链表和双向循环链表]]

[[RandomAccess 接口]]

## LinkedList 源码解析

[Collection - LinkedList源码解析 | Java 全栈知识体系](https://pdai.tech/md/java/collection/java-collection-LinkedList.html)
