---
title: Java 序列化详解
publish: true
---

[[什么是序列化？什么是反序列化？]]

[[序列化协议对应于 TCP IP 4 层模型的哪一层？]]

[[常见序列化协议有哪些？]]

- [[JDK 自带的序列化方式]]
- [[Kryo]]
- [[Protobuf]]
- [[ProtoStuff]]
- [[Hessian]]
## 总结

Kryo 是专门针对 Java 语言序列化方式并且性能非常好，如果你的应用是专门针对 Java 语言的话可以考虑使用，并且 Dubbo 官网的一篇文章中提到说推荐使用 Kryo 作为生产环境的序列化方式。(文章地址：<https://cn.dubbo.apache.org/zh-cn/docsv2.7/user/serialization/>）。

![|925](https://oss.javaguide.cn/github/javaguide/java/569e541a-22b2-4846-aa07-0ad479f07440-20230814090158124.png)

像 Protobuf、 ProtoStuff、hessian 这类都是跨语言的序列化方式，如果有跨语言需求的话可以考虑使用。

除了我上面介绍到的序列化方式的话，还有像 Thrift，Avro 这些。
