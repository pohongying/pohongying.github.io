---
title: 'ArrayList'
date: 2023-02-06
updated: '2023-02-06 13:34:45'
category: 'backend'
tags:
  - '后端修仙之路'
  - 'Java'
  - 'JavaSE'
lastUpdated: false
summary: 'ArrayList 是 Java 集合框架中的一个核心类，它实现了 List 接口，其底层是基于一个动态数组来存储元素的。它允许存储所有类型的元素，包括 null，并提供了按索引进行快速随机访…'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/up446gf6xzxh03nk'
---

# ArrayList

### 一、是什么？

`ArrayList` 是 Java 集合框架中的一个核心类，它实现了 `List` 接口，其底层是基于一个动态数组来存储元素的。它允许存储所有类型的元素，包括 `null`，并提供了按索引进行快速随机访问的能力。

#### 1. 基本成员变量

* `private static final int DEFAULT_CAPACITY = 10;`
  * 初始容量：当创建一个空的 `ArrayList` 并且首次添加元素时，内部数组的默认大小为 10。
* `transient Object[] elementData;`
  * 元素数组：真正存储数据的数组。它被 `transient` 关键字修饰。
* `private int size;`
  * 数组大小：表示 `ArrayList` 中实际包含的元素数量，这个值总是小于或等于 `elementData` 的长度（容量）。
* `protected transient int modCount = 0;`
  * 操作计数器：记录了 `ArrayList` 结构被修改（如添加、删除元素）的次数。这个变量是实现\*\*快速失败（fail-fast）\*\*机制的关键。当使用迭代器遍历集合时，如果检测到 `modCount` 的值发生了变化，迭代器会立即抛出 `ConcurrentModificationException`，以防止在遍历过程中对集合进行不确定的修改。

#### 2. 常用方法与辅助方法

* 核心方法：`add(E e)``get(int index)``remove(int index)`
* 核心辅助方法：
  * `grow()`: 内部的私有方法，负责在容量不足时执行扩容逻辑。

#### 3. 序列化机制 (`transient` 关键字)

`ArrayList` 的核心数组 `elementData` 被声明为 `transient`。

* 目的：这是为了避免使用 Java 默认的序列化机制。如果直接序列化 `elementData`，那么数组中所有未使用的空间（`null` 值）也会被序列化，这会造成不必要的存储空间浪费。
* 实现：`ArrayList` 内部重写了 `writeObject()` 和 `readObject()` 方法。在序列化时，它只将 `size` 以及 `elementData` 中从 `0` 到 `size-1` 的有效元素写入到输出流。在反序列化时，它会先读取 `size`，然后根据 `size` 创建相应大小的数组，并依次读入元素。这种自定义的序列化方式既高效又节省空间。

***

### 二、为什么？

#### 1. `add(E e)` 原理

`add` 操作的目标是在列表末尾高效地添加一个元素，并在必要时自动扩展存储空间。

检查空间，触发扩容grow，扩容1.5倍，通过拷贝将数组复制到新数组中

#### 2. `get(int index)` 原理

`get` 操作的目标是快速地根据索引返回元素。

#### 3. `remove(int index)` 原理

`remove` 操作需要删除指定位置的元素，并保持数组的连续性。

计算移动的元素数量，利用System的拷贝方法，将删除元素之后的元素整体向前移动，实现覆盖 类似算法删除元素

---

> 更新: 2023-03-28 20:07:06  
> 来源: 语雀导出
