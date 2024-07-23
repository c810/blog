---
title: " 为什么说 Java 语言“编译与解释并存”？"
publish: false
---

我们可以将高级编程语言按照程序的执行方式分为两种：

- **编译型**：[编译型语言](https://zh.wikipedia.org/wiki/%E7%B7%A8%E8%AD%AF%E8%AA%9E%E8%A8%80) 会通过 [编译器](https://zh.wikipedia.org/wiki/%E7%B7%A8%E8%AD%AF%E5%99%A8) 将源代码一次性翻译成可被该平台执行的机器码。一般情况下，编译语言的执行速度比较快，开发效率比较低。常见的编译性语言有 C、C++、Go、Rust 等等。
- **解释型**：[解释型语言](https://zh.wikipedia.org/wiki/%E7%9B%B4%E8%AD%AF%E8%AA%9E%E8%A8%80) 会通过 [解释器](https://zh.wikipedia.org/wiki/直譯器) 一句一句的将代码解释（interpret）为机器代码后再执行。解释型语言开发效率比较快，执行速度比较慢。常见的解释性语言有 Python、JavaScript、PHP 等等。

![[Pasted image 20240721105441.png]]

根据维基百科介绍：

> 为了改善解释语言的效率而发展出的 [即时编译](https://zh.wikipedia.org/wiki/即時編譯) 技术，已经缩小了这两种语言间的差距。这种技术混合了编译语言与解释型语言的优点，它像编译语言一样，先把程序源代码编译成 [字节码](https://zh.wikipedia.org/wiki/字节码)。到执行期时，再将字节码直译之后执行。[Java](https://zh.wikipedia.org/wiki/Java) 与 [LLVM](https://zh.wikipedia.org/wiki/LLVM) 是这种技术的代表产物。
>
> 相关阅读：[基本功 | Java 即时编译器原理解析及实践](https://tech.meituan.com/2020/10/22/java-jit-practice-in-meituan.html)

## 为什么说 Java 语言“编译与解释并存”？

1. **编译阶段**：
	1. 当你使用 Java 编译器（如 javac）编译 Java 源代码时，它不会直接生成机器码，而是生成一种中间代码，称为字节码（Bytecode）。字节码是一种平台无关的二进制格式，它并不直接针对任何特定的处理器架构。
2. **解释执行阶段**：
	1. 字节码随后由 Java 虚拟机（JVM）解释执行。JVM 读取字节码文件（.class 文件），并将字节码转换为具体硬件平台上的机器指令。这个过程是在运行时进行的，类似于解释性语言的执行方式，即逐行或逐指令地解析和执行。
3. **即时编译（Just-In-Time Compilation, JIT）**：
	1. 为了提高性能，JVM 使用 JIT 编译器将经常使用的代码片段从字节码转换为本地机器码，并缓存这些编译后的代码以供后续调用。这样，在多次调用相同方法时，可以直接执行机器码而不需要再次解释字节码，从而提高了执行效率。

因此，Java 语言既利用了编译带来的性能提升（通过 JIT 编译），又保留了解释执行的灵活性（能够处理运行时数据类型和异常）。这种“编译与解释并存”的特性使得 Java 能够在多种平台上高效运行，并且具有良好的可移植性和安全性。

## JIT

> 🌈 拓展：[有关 JIT 的实现细节: JVM C1、C2 编译器](https://mp.weixin.qq.com/s/4haTyXUmh8m-dBQaEzwDJw)

![[Pasted image 20240721105141.png]]

> HotSpot 采用了惰性评估 (Lazy Evaluation) 的做法，根据二八定律，消耗大部分系统资源的只有那一小部分的代码（热点代码），而这也就是 JIT 所需要编译的部分。JVM 会根据代码每次被执行的情况收集信息并相应地做出一些优化，因此执行的次数越多，它的速度就越快。

JDK、JRE、JVM、JIT 这四者的关系如下图所示。

![[Pasted image 20240721105202.png]]

下面这张图是 JVM 的大致结构模型。

![[Pasted image 20240721105223.png]]
