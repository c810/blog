---
title: HashMap 与 HashSet 的区别
publish: false
---

如果你看过 `HashSet` 源码的话就应该知道：`HashSet` 底层就是基于 `HashMap` 实现的。（`HashSet` 的源码非常非常少，因为除了 `clone()`、`writeObject()`、`readObject()` 是 `HashSet` 自己不得不实现之外，其他方法都是直接调用 `HashMap` 中的方法。

|            `HashMap`            |                                      `HashSet`                                       |
| :-----------------------------: | :----------------------------------------------------------------------------------: |
|          实现了 `Map` 接口           |                                     实现 `Set` 接口                                      |
|              存储键值对              |                                        仅存储对象                                         |
|     调用 `put()` 向 map 中添加元素      |                              调用 `add()` 方法向 `Set` 中添加元素                              |
| `HashMap` 使用键（Key）计算 `hashcode` | `HashSet` 使用成员对象来计算 `hashcode` 值，对于两个对象来说 `hashcode` 可能相同，所以 `equals()` 方法用来判断对象的相等性 |

(1)HashSet 实现了 Set 接口, 仅存储对象; HashMap 实现了 Map 接口, 存储的是键值对.

(2)HashSet 底层其实是用 HashMap 实现存储的, HashSet 封装了一系列 HashMap 的方法. 依靠 HashMap 来存储元素值,(利用 hashMap 的 key 键进行存储), 而 value 值默认为 Object 对象. 所以 HashSet 也不允许出现重复值, 判断标准和 HashMap 判断标准相同, 两个元素的 hashCode 相等并且通过 equals() 方法返回 true.

![[image-20221007110404375.png]]
