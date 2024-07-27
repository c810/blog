---
title: HashMap 的寻址算法
publish: false
---

![[image-20230428212501408.png]]

在 putVal 方法中，有一个 hash(key) 方法（二次哈希），这个方法就是来去计算 key 的 hash 值的，看下面的代码

![[image-20230428212601977.png]]

首先获取 key 的 hashCode 值，然后右移 16 位 异或运算 原来的 hashCode 值，主要作用就是使原来的 hash 值更加均匀，减少 hash 冲突

有了 hash 值之后，就很方便的去计算当前 key 的在数组中存储的下标，看下面的代码：

![[image-20230428212729580.png]]

(n-1)&hash : 得到数组中的索引，代替取模，性能更好，数组长度必须是 2 的 n 次幂，否则不能代替取模
