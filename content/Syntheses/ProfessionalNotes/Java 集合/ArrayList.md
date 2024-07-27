---
title: ArrayList
publish: false
---

## ArrayList

[[ArrayList 可以添加 null 值吗？]]

[[ArrayList 插入和删除元素的时间复杂度？]]

[[如何实现数组和 List 之间的转换？]]

## ArrayList 源码解析

分析 ArrayList 源码主要从三个方面去翻阅：成员变量，构造函数，关键方法

> 以下源码都来源于 jdk1.8

### 成员变量

![[image-20230427192118259.png]]

> *DEFAULT_CAPACITY* = 10; 默认初始的容量**(CAPACITY)
>
> *EMPTY_ELEMENTDATA* = {}; 用于空实例的共享空数组实例
>
> *DEFAULTCAPACITY_EMPTY_ELEMENTDATA* = {}; 用于默认大小的空实例的共享空数组实例
>
> Object\[] elementData; 存储元素的数组缓冲区
>
> int size; ArrayList 的大小（它包含的元素数量）

### 构造方法

![[image-20230427192154014.png]]

> 第一个构造是带初始化容量的构造函数，可以按照指定的容量初始化数组
>
> 第二个是无参构造函数，默认创建一个空集合

![[image-20230427192200918.png]]

> 将 collection 对象转换成数组，然后将数组的地址的赋给 elementData

### ArrayList 源码分析

添加数据的流程：

#### 第 1 次添加数据

开辟 10 个空间

![[Pasted image 20240726160238.png|325]]

![[Pasted image 20240726160304.png|325]]

![[image-20230427192644244.png]]

#### 第 2 至 10 次添加数据

无需扩容，直接添加元素

![[Pasted image 20240726160139.png|325]]

以第 10 次为例：

![[Pasted image 20240726160611.png]]

#### 第 11 次添加数据

![[Pasted image 20240726160157.png|325]]

![[Pasted image 20240726160630.png]]

#### 结论

- 底层数据结构
	- ArrayList 底层是用动态的数组实现的
- 初始容量
	- ArrayList 初始容量为 0，当第一次添加数据的时候才会初始化容量为 10
- 扩容逻辑
	- ArrayList 在进行扩容的时候是原来容量的 1.5 倍，每次扩容都需要拷贝数组
- 添加逻辑
	- 确保数组已使用长度（size）加 1 之后足够存下下一个数据
		- 计算数组的容量，如果当前数组已使用长度 +1 后的大于当前的数组长度，则调用 grow 方法扩容（原来的 1.5 倍）
	- 确保新增的数据有地方存储之后，则将新元素添加到位于 size 的位置上。
	- 返回添加成功布尔值。

关于自动扩容：

每当向数组中添加元素时，都要去检查添加后元素的个数是否会超出当前数组的长度，如果超出，数组将会进行扩容，以满足添加数据的需求。数组扩容通过一个公开的方法 ensureCapacity(int minCapacity) 来实现。在实际添加大量元素前，我也可以使用 ensureCapacity 来手动增加 ArrayList 实例的容量，以减少递增式再分配的数量。

数组进行扩容时，会将老数组中的元素重新拷贝一份到新的数组中，每次数组容量的增长大约是其原容量的 1.5 倍。这种操作的代价是很高的，因此在实际使用时，我们应该尽量避免数组容量的扩张。当我们可预知要保存的元素的多少时，要在构造 ArrayList 实例时，就指定其容量，以避免数组扩容的发生。或者根据实际需求，通过调用 ensureCapacity 方法来手动增加 ArrayList 实例的容量。

[[ArrayList 底层的实现原理是什么？]]

[[ArrayList list = new ArrayList(10) 中的 list 扩容几次？]]

## add()、set() 等源码解析

[Collection - ArrayList 源码解析 | Java 全栈知识体系](https://pdai.tech/md/java/collection/java-collection-ArrayList.html)

## ArrayList 扩容机制

详见这篇文章: [ArrayList 扩容机制分析](https://javaguide.cn/java/collection/arraylist-source-code.html#_3-1-%E5%85%88%E4%BB%8E-arraylist-%E7%9A%84%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E8%AF%B4%E8%B5%B7)。
