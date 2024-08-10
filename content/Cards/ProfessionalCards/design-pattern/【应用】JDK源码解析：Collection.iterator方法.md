---
title: 【应用】JDK源码解析：Collection.iterator方法
publish: true
---

```java
public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("令狐冲");
        list.add("风清扬");
        list.add("任我行");

        //获取迭代器对象
        Iterator<String> it = list.iterator();
        //使用迭代器遍历
        while(it.hasNext()) {
            String ele = it.next();
            System.out.println(ele);
        }
    }
}
```

对上面的代码大家应该很熟，使用迭代器遍历集合，获取集合中的元素。而**单列集合获取迭代器的方法**就使用到了工厂方法模式。我们看通过类图看看结构：

![[Pasted image 20240810171121.png]]

Collection 接口是抽象工厂类，ArrayList 是具体的工厂类；Iterator 接口是抽象商品类，ArrayList 类中的 Iter 内部类是具体的商品类。在具体的工厂类中 iterator() 方法创建具体的商品类的对象。

- 使对象的创建和使用分离，降低他们之间的耦合，实现不用修改原有代码便可实现代码功能的拓展
	- 在集合框架中，客户端只需要知道集合类提供了 `iterator()` 方法来获取一个 `Iterator`，而不需要知道具体的 `Iterator` 是如何实现的。如果将来需要更改 `Iterator` 的实现或者引入新的集合类，只需要修改或添加相应的集合类和 `Iterator` 实现，而不需要修改客户端代码。
- 自定义一个集合类，开闭原则，只需新增实现自定义集合类和自定义迭代器
	- 假设你需要一个新的集合类 `CustomList`，并且需要它有自己特定的迭代器 `CustomIterator`。你可以通过实现 `Collection` 接口来创建 `CustomList`，并在其中定义自己的 `iterator()` 方法来返回 `CustomIterator`。这整个过程不需要修改任何现有的集合框架代码，也不影响现有代码的运行。这种方式实现了系统的扩展性，同时保持了原有代码的稳定性。

对比工厂模式：

![[Pasted image 20240810170826.png]]

> 另：
> ​	1,DateForamt 类中的 getInstance() 方法使用的是工厂模式；
> ​	2,Calendar 类中的 getInstance() 方法使用的是工厂模式；
