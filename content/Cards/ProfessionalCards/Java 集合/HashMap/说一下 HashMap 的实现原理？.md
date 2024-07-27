---
title: 说一下 HashMap 的实现原理？
publish: false
---

HashMap 的数据结构： 底层使用 hash 表数据结构，即数组和链表或红黑树

1. 当我们往 HashMap 中 put 元素时，利用 key 的 hashCode 重新 hash 计算出当前对象的元素在数组中的下标
2. 存储时，如果出现 hash 值相同的 key，此时有两种情况。
	1. 如果 key 相同，则覆盖原始值；
	2. 如果 key 不同（出现冲突），则将当前的 key-value 放入链表或红黑树中
3. 获取时，直接找到 hash 值对应的下标，在进一步判断 key 是否相同，从而找到对应值。

![[image-20230428204902016.png|725]]
