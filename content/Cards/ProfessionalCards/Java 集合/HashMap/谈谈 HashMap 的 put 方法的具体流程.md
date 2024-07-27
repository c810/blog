---
title: 谈谈 HashMap 的 put 方法的具体流程
publish: false
---

1. 判断键值对数组 table 是否为空或为 null，否则执行 resize() 进行扩容（初始化）
2. 根据键值 key 计算 hash 值得到数组索引
3. 判断 table\[i] == null，条件成立，直接新建节点添加
4. 如果 table\[i] == null ,不成立
	1. 判断 table\[i] 的首个元素是否和 key 一样，如果相同直接覆盖 value
	2. 判断 table\[i] 是否为 treeNode，即 table\[i] 是否是红黑树，如果是红黑树，则直接在树中插入键值对
	3. 遍历 table\[i]，链表的尾部插入数据，然后判断链表长度是否大于 8，大于 8 的话把链表转换为红黑树，在红黑树中执行插入操作，遍历过程中若发现 key 已经存在直接覆盖 value
5. 插入成功后，判断实际存在的键值对数量 size 是否超多了最大容量 threshold（数组长度 *0.75），如果超过，进行扩容。

![[image-20230428210624847.png]]
