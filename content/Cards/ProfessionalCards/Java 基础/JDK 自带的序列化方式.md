---
title: JDK 自带的序列化方式
publish: false
---

JDK 自带的序列化，只需实现 `java.io.Serializable` 接口即可。

```java
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
public class RpcRequest implements Serializable {
    private static final long serialVersionUID = 1905122041950251207L;
    private String requestId;
    private String interfaceName;
    private String methodName;
    private Object[] parameters;
    private Class<?>[] paramTypes;
    private RpcMessageTypeEnum rpcMessageTypeEnum;
}
```

[[serialVersionUID 有什么作用？]]

[[serialVersionUID 不是被 static 变量修饰了吗？为什么还会被“序列化”？]]

[[如果有些字段不想进行序列化怎么办？]]

[[为什么不推荐使用 JDK 自带的序列化？]]
