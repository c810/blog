---
title: 什么是 BlockingQueue？
publish: false
---

`BlockingQueue` （阻塞队列）是一个接口，继承自 `Queue`。`BlockingQueue` 阻塞的原因是其支持当队列没有元素时一直阻塞，直到有元素；还支持如果队列已满，一直等到队列可以放入新元素时再放入。

```java
public interface BlockingQueue<E> extends Queue<E> {
  // ...
}
```

`BlockingQueue` 常用于生产者 - 消费者模型中，生产者线程会向队列中添加数据，而消费者线程会从队列中取出数据进行处理。

![BlockingQueue|600](https://oss.javaguide.cn/github/javaguide/java/collection/blocking-queue.png)
