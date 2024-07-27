---
title: HashMap 与 HashTable 的区别
publish: false
---

| **区别**     | **HashTable**            | **HashMap**               |
| ---------- | ------------------------ | ------------------------- |
| 数据结构       | 数组 + 链表                  | 数组 + 链表 + 红黑树             |
| 是否可以为 null | Key 和 value 都不能为 null    | 可以为 null（但 null 作为键只能有一个） |
| hash 算法    | key 的 hashCode()         | 二次 hash                   |
| 扩容方式       | 当前容量翻倍 +1                | 当前容量翻倍                    |
| 线程安全       | 同步 (synchronized) 的，线程安全 | 非线程安全                     |
| 效率         | 较低                       | 较高                        |

在实际开发中不建议使用 HashTable，在多线程环境下可以使用 ConcurrentHashMap 类

- **线程是否安全：** `HashMap` 是非线程安全的，`Hashtable` 是线程安全的，因为 `Hashtable` 内部的方法基本都经过 `synchronized` 修饰。（如果你要保证线程安全的话就使用 `ConcurrentHashMap` 吧！）；
- **效率：** 因为线程安全的问题，`HashMap` 要比 `Hashtable` 效率高一点。另外，`Hashtable` 基本被淘汰，不要在代码中使用它；
- **对 Null key 和 Null value 的支持：** `HashMap` 可以存储 null 的 key 和 value，但 null 作为键只能有一个，null 作为值可以有多个；Hashtable 不允许有 null 键和 null 值，否则会抛出 `NullPointerException`。
- **初始容量大小和每次扩充容量大小的不同：**
	- 创建时如果不指定容量初始值，`Hashtable` 默认的初始大小为 11，之后每次扩充，容量变为原来的 2n+1。`HashMap` 默认的初始化大小为 16。之后每次扩充，容量变为原来的 2 倍。
	- 创建时如果给定了容量初始值，那么 `Hashtable` 会直接使用你给定的大小，而 `HashMap` 会将其扩充为 2 的幂次方大小（`HashMap` 中的 `tableSizeFor()` 方法保证，下面给出了源代码）。也就是说 `HashMap` 总是使用 2 的幂作为哈希表的大小,后面会介绍到为什么是 2 的幂次方。[[HashMap 的寻址算法]]、[[为何 HashMap 的数组长度一定是 2 的次幂？]]
- **底层数据结构：** JDK1.8 以后的 `HashMap` 在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为 8）时，将链表转化为红黑树（将链表转换成红黑树前会判断，如果当前数组的长度小于 64，那么会选择先进行数组扩容，而不是转换为红黑树），以减少搜索时间（后文中我会结合源码对这一过程进行分析）。`Hashtable` 没有这样的机制。
- **哈希函数的实现**：`HashMap` 对哈希值进行了高位和低位的混合扰动处理以减少冲突，而 `Hashtable` 直接使用键的 `hashCode()` 值。
