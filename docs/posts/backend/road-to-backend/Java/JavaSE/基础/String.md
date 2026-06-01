---
title: 'String'
date: 2023-07-24
updated: '2023-07-24 17:42:09'
category: 'backend'
tags:
  - '后端修仙之路'
  - 'Java'
  - 'JavaSE'
lastUpdated: false
summary: 'String 是不可变类，也就是线程安全的，每次创建修改一个字符串实际上是在新创建一个对象，例如：string a = "张三", a = “李四”，如果这两个字符串在常量池都不存在，那么都会…'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/sxgf64z1wifye8zp'
---

# String

### 基础
String 是不可变类，也就是线程安全的，每次创建修改一个字符串实际上是在新创建一个对象，例如：string a = "张三", a = “李四”，如果这两个字符串在常量池都不存在，那么都会创建一个新的对象。

一般string 创建对象有这几种情况：

1. String a = new String("a"）。在字符a，在常量池中不存在的情况下，会首先在常量池中创建对象，然后在堆中又创建一个对象，存放的是常量池对象的地址。不建议用这种方式创建字符串
2. String a = "abc"。这种方式，a实际上上常量池中对象的地址，只创建了一个对象
3. intern()方法。会去常量池中查找同样字符的，如果存在直接返回常量池中的对象地址。如果不存在则把堆对象的引用，推进到常量池中，因为1.7以后都在堆里面了

```java
public class Test {
    public static void main(String[] args) {
        String s1 = new String("abc").intern();
        String s2 = "abc";
        System.out.println(s1 == s2); // 输出 true
    }
}
```

4. String a = "abc" + "de";  注意拼接会用到StringBuilder中的append，并最后用toString()转换成字符串，会产生两个对象。

### StringBuilder和StringBuffer
相同点：它们都是可变类

不同点：

+ 线程安全：StringBuilder 是线程不安全的
+ 效率：StringBuilder 速度快

---

> 更新: 2023-03-01 08:11:16  
> 来源: 语雀导出
