---
title: 'Arthas'
date: 2023-04-19
updated: '2023-04-19 04:07:42'
category: 'backend'
tags:
  - '后端修仙之路'
  - '工具'
lastUpdated: false
summary: 'Arthas 的字节码插桩技术可以概括为：'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/mliw6aaitw6210vs'
---

# Arthas

## 字节码插桩技术

Arthas 的字节码插桩技术可以概括为：

* **入口**：使用 **Java Attach API** 附着到目标 JVM。
* **授权**：加载 Java Agent，获取 `**java.lang.instrument.Instrumentation**` 的能力，得到修改字节码的“许可”。
* **工具**：使用 **ASM** 框架作为具体的字节码修改工具，对内存中的类进行“手术”。
* **目标**：实现在不重启服务的情况下，动态地监控、诊断和修改 Java 应用的行为。

---

> 更新: 2024-02-05 04:47:32  
> 来源: 语雀导出
