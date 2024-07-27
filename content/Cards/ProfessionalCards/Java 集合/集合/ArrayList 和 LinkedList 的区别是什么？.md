---
title: ArrayList 和 LinkedList 的区别是什么？
publish: false
---

- 底层数据结构
	- ArrayList 是动态数组的数据结构实现
	- LinkedList 是双向链表的数据结构实现
- 操作数据效率
	- 查找（已知索引）：ArrayList 按照下标查询的时间复杂度 O(1)【内存是连续的，根据寻址公式】， LinkedList 不支持下标查询
	- 查找（未知索引）：ArrayList 需要遍历，链表也需要遍历，时间复杂度都是 O(n)
	- 新增和删除
		- ArrayList 尾部插入和删除，时间复杂度是 O(1)；其他部分增删需要挪动数组，时间复杂度是 O(n)
		- LinkedList 头尾节点增删时间复杂度是 O(1)，其他都需要遍历链表，时间复杂度是 O(n)
- 内存空间占用
	- ArrayList 底层是数组，内存连续，节省内存
	- LinkedList 是双向链表需要存储数据，和两个指针，更占用内存
- 线程安全
	- ArrayList 和 LinkedList 都不是线程安全的
	- 如果需要保证线程安全，有两种方案：
		- 在方法内使用，局部变量则是线程安全的
		- 使用线程安全的 ArrayList 和 LinkedList，但性能会下降
		- ![[Pasted image 20240726165308.png|525]]
