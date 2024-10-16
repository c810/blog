---
title: List
publish: false
---

## 概述

有序，可重复，有索引

## 方法

Collection 的方法 List 都继承了。

List 因为有了索引，所以有了特有方法：

| 方法名                           | 描述                      |
| ----------------------------- | ----------------------- |
| void add(int index,E element) | 在此集合中的**指定位置插入**指定的元素   |
| E remove(int index)           | **删除指定索引**处的元素，返回被删除的元素 |
| E set(int index,E element)    | **修改指定索引**处的元素，返回被修改的元素 |
| E get(int index)              | **返回指定索引**处的元素          |

## 遍历

1. 迭代器
2. 增强 for
3. Lambda 表达式
4. 普通 for 循环
5. 列表迭代器

![[Pasted image 20240726215803.png|450]]

代码示例：

```java
//创建集合并添加元素
List<String> list = new ArrayList<>();
list.add("aaa");
list.add("bbb");
list.add("ccc");

//1.迭代器
/*Iterator<String> it = list.iterator();
     while(it.hasNext()){
        String str = it.next();
        System.out.println(str);
}*/


//2.增强for
//下面的变量s，其实就是一个第三方的变量而已。
//在循环的过程中，依次表示集合中的每一个元素
/* for (String s : list) {
       System.out.println(s);
   }*/

//3.Lambda表达式
//forEach方法的底层其实就是一个循环遍历，依次得到集合中的每一个元素
//并把每一个元素传递给下面的accept方法
//accept方法的形参s，依次表示集合中的每一个元素
//list.forEach(s->System.out.println(s) );


//4.普通for循环
//size方法跟get方法还有循环结合的方式，利用索引获取到集合中的每一个元素
/*for (int i = 0; i < list.size(); i++) {
            //i:依次表示集合中的每一个索引
            String s = list.get(i);
            System.out.println(s);
        }*/

// 5.列表迭代器
//获取一个列表迭代器的对象，里面的指针默认也是指向0索引的

//额外添加了一个方法：在遍历的过程中，可以添加元素
ListIterator<String> it = list.listIterator();
while(it.hasNext()){
    String str = it.next();
    if("bbb".equals(str)){
        //qqq
        it.add("qqq");
    }
}
System.out.println(list);
```

## 注意

List 系列集合中的两个删除的方法

```java
1.直接删除元素
2.通过索引进行删除
```

代码示例:

```java
//List系列集合中的两个删除的方法
//1.直接删除元素
//2.通过索引进行删除

//1.创建集合并添加元素
List<Integer> list = new ArrayList<>();

list.add(1);
list.add(2);
list.add(3);


//2.删除元素
//请问：此时删除的是1这个元素，还是1索引上的元素？
//为什么？
//因为在调用方法的时候，如果方法出现了重载现象
//优先调用，实参跟形参类型一致的那个方法。

//list.remove(1);


//手动装箱，手动把基本数据类型的1，变成Integer类型
Integer i = Integer.valueOf(1);
list.remove(i);
System.out.println(list);

```
