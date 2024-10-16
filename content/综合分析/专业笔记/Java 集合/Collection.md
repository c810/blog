---
title: Collection
publish: false
---

## 概述

Collection 是单例集合的顶层接口，JDK 不提供此接口的任何直接实现，它提供更具体的子接口（如 Set 和 List）实现。

## 方法

| 方法名                            | 说明                                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| boolean **add**(E e)           | 添加元素<br>List 只会返回 true，因为可重复。Set 可以返回 true 或 false                                           |
| boolean **remove**(Object o)   | 从集合中移除指定的元素                                                                                  |
| boolean removeIf(Object o)     | 根据条件进行移除                                                                                     |
| void **clear**()               | 清空集合中的元素                                                                                     |
| boolean **contains**(Object o) | 判断集合中是否存在指定的元素<br>**底层是依赖 equals 方法进行判断的，所以，如果集合中存储的是自定义对象，也想使用此方法的话，则一定要在实体类中重写 equals 方法** |
| boolean **isEmpty**()          | 判断集合是否为空                                                                                     |
| int **size**()                 | 集合的长度，也就是集合中元素的个数                                                                            |

## 遍历

- 迭代器
- 增强 for
- lambda 表达式

因为 Collection 包含 Set，而 Set 集合无索引，因此无法使用普通 for 遍历。

### 迭代器遍历

迭代器，==集合专用遍历方式==，不依赖索引

迭代器需要掌握的三个方法：

```Java
Iterator<String> it = list.iterator();
while(it.hasNext()) {
	String str = it.next();
	System.out.println(str);
}
```

迭代器的四个细节：

- 如果当前位置没有元素，还要强行获取，会报 NoSuchElementException
- 迭代器遍历完毕，指针不会复位
- 循环中只能用一次 next 方法，如果用两次，则一下子就遍历两个了
- 迭代器遍历时，不能用集合的方法进行增加或删除
### 增强 for

- 它是 JDK5 之后出现的,其内部原理是一个 Iterator 迭代器
- 实现 Iterable 接口的类才可以使用迭代器和增强 for
- **所有的单列集合和数组**才能使用增强 for 进行遍历
- 简化数组和 Collection 集合的遍历
- 修改增强 for 中的变量（比如下面的 str），不会改变集合中原本的数据

```Java
​for(集合/数组中元素的数据类型 变量名 : 集合/数组名) {
​	// 已经将当前遍历到的元素封装到变量中了,直接使用变量即可
}

for(String str : list){
	System.out.println(str);
}
```

### lambda 表达式

​利用 forEach 方法，再结合 lambda 表达式的方式进行遍历

```java
public class A07_CollectionDemo7 {
    public static void main(String[] args) {
       /* 
        lambda表达式遍历：
                default void forEach(Consumer<? super T> action):
        */

        //1.创建集合并添加元素
        Collection<String> coll = new ArrayList<>();
        coll.add("zhangsan");
        coll.add("lisi");
        coll.add("wangwu");
        //2.利用匿名内部类的形式
        //底层原理：
        //其实也会自己遍历集合，依次得到每一个元素
        //把得到的每一个元素，传递给下面的accept方法
        //s依次表示集合中的每一个数据
       /* coll.forEach(new Consumer<String>() {
            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        });*/

        //lambda表达式
        coll.forEach((String s) -> {
		        System.out.println(s)
	        }
		);
		// 简化：
        coll.forEach(s -> System.out.println(s));
    }
}
```

## 工具类（不重要）

**`Collections` 工具类常用方法**:

- 排序
- 查找,替换操作
- 同步控制 (不推荐，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合)

### 排序操作

```java
void reverse(List list)//反转
void shuffle(List list)//随机排序
void sort(List list)//按自然排序的升序排序
void sort(List list, Comparator c)//定制排序，由Comparator控制排序逻辑
void swap(List list, int i , int j)//交换两个索引位置的元素
void rotate(List list, int distance)//旋转。当distance为正数时，将list后distance个元素整体移到前面。当distance为负数时，将 list的前distance个元素整体移到后面
```

### 查找,替换操作

```java
int binarySearch(List list, Object key)//对List进行二分查找，返回索引，注意List必须是有序的
int max(Collection coll)//根据元素的自然顺序，返回最大的元素。 类比int min(Collection coll)
int max(Collection coll, Comparator c)//根据定制排序，返回最大元素，排序规则由Comparatator类控制。类比int min(Collection coll, Comparator c)
void fill(List list, Object obj)//用指定的元素代替指定list中的所有元素
int frequency(Collection c, Object o)//统计元素出现次数
int indexOfSubList(List list, List target)//统计target在list中第一次出现的索引，找不到则返回-1，类比int lastIndexOfSubList(List source, list target)
boolean replaceAll(List list, Object oldVal, Object newVal)//用新元素替换旧元素
```

### 同步控制

`Collections` 提供了多个 `synchronizedXxx()` 方法·，该方法可以将指定集合包装成线程同步的集合，从而解决多线程并发访问集合时的线程安全问题。

我们知道 `HashSet`，`TreeSet`，`ArrayList`,`LinkedList`,`HashMap`,`TreeMap` 都是线程不安全的。`Collections` 提供了多个静态方法可以把他们包装成线程同步的集合。

**最好不要用下面这些方法，效率非常低，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合。**

方法如下：

```java
synchronizedCollection(Collection<T>  c) //返回指定 collection 支持的同步（线程安全的）collection。
synchronizedList(List<T> list)//返回指定列表支持的同步（线程安全的）List。
synchronizedMap(Map<K,V> m) //返回由指定映射支持的同步（线程安全的）Map。
synchronizedSet(Set<T> s) //返回指定 set 支持的同步（线程安全的）set。
```
