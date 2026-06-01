---
title: '常用方法'
date: 2024-06-22
updated: '2024-06-22 18:50:20'
category: 'backend'
tags:
  - '后端修仙之路'
  - '算法'
  - '常用方法'
lastUpdated: false
summary: '以下是对 Java 中数组、字符串和字符类型之间常用方法的总结，使用 Markdown 格式呈现：'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/lql95krmwnuy83nn'
---

# 常用方法

以下是对 Java 中数组、字符串和字符类型之间常用方法的总结，使用 Markdown 格式呈现：

## 数组、字符串和字符类型的常用方法总结

### 1. **Array**

#### 字符串转字符数组

* **方法**：`String.toCharArray()`

```java
String str = "Hello";
char[] charArray = str.toCharArray();
```

#### 字符数组转字符串

* **方法**：`String.valueOf(char[])` 或直接构造

```java
char[] charArray = {'H', 'e', 'l', 'l', 'o'};
String str1 = String.valueOf(charArray);
String str2 = new String(charArray);
```

#### 字符串转整数数组

* **方法**：逐字符解析

```java
String str = "1234";
int[] intArray = new int[str.length()];
for (int i = 0; i < str.length(); i++) {
    intArray[i] = Integer.parseInt(String.valueOf(str.charAt(i)));
}
```

#### 整数数组转字符串

* **方法**：`Arrays.toString()` 或拼接

```java
int[] intArray = {1, 2, 3, 4};
String str1 = Arrays.toString(intArray); // 输出 "[1, 2, 3, 4]"
String str2 = ""; 
for (int num : intArray) {
    str2 += num;
} // 输出 "1234"
```

### 2. **String & Char**

#### 字符串转字符

* **方法**：`String.charAt(index)`

```java
String str = "Hello";
char c = str.charAt(0); // 'H'
```

#### 字符转字符串

* **方法**：`String.valueOf(char)` 或直接拼接

```java
char c = 'H';
String str1 = String.valueOf(c);
String str2 = "" + c;
```

### 3. **Char Array & Char**

#### 字符数组转字符

* **方法**：直接访问数组元素

```java
char[] charArray = {'H', 'e', 'l', 'l', 'o'};
char c = charArray[0]; // 'H'
```

#### 字符转字符数组

* **方法**：构造单元素数组

```java
char c = 'H';
char[] charArray = {c};
```

### 4. **字符串的常见操作**

#### 字符串拼接

* **方法**：`+` 或 `StringBuilder`

```java
String str1 = "Hello";
String str2 = "World";
String result1 = str1 + " " + str2; // "Hello World"
StringBuilder sb = new StringBuilder();
sb.append(str1).append(" ").append(str2);
String result2 = sb.toString(); // "Hello World"
```

#### 字符串分割

* **方法**：`String.split()`

```java
String str = "Hello,World,Java";
String[] parts = str.split(","); // ["Hello", "World", "Java"]
```

#### 字符串查找

* **方法**：`String.indexOf()` 或 `String.contains()`

```java
String str = "Hello";
int index = str.indexOf('e'); // 1
boolean contains = str.contains("He"); // true
```

#### 字符串替换

* **方法**：`String.replace()`

```java
String str = "Hello";
String newStr = str.replace('l', 'x'); // "Hexxo"
```

### 5. **字符的常见操作**

#### 字符大小写转换

* **方法**：`Character.toUpperCase()` 和 `Character.toLowerCase()`

```java
char c = 'a';
char upper = Character.toUpperCase(c); // 'A'
char lower = Character.toLowerCase(c); // 'a'
```

#### 字符是否为数字

* **方法**：`Character.isDigit()`

```java
char c = '5';
boolean isDigit = Character.isDigit(c); // true
```

#### 字符转整数

* **方法**：`Character.getNumericValue()`

```java
char c = '5';
int num = Character.getNumericValue(c); // 5
```

#### 整数转字符

* **方法**：`String.valueOf()` 或直接转换

```java
int num = 5;
char c1 = (char) (num + '0'); // '5'
char c2 = String.valueOf(num).charAt(0); // '5'
```

### 6. **数组的常见操作**

#### 数组转字符串

* **方法**：`Arrays.toString()`

```java
int[] array = {1, 2, 3};
String str = Arrays.toString(array); // "[1, 2, 3]"
```

#### 数组排序

* **方法**：`Arrays.sort()`

```java
int[] array = {3, 1, 2};
Arrays.sort(array); // [1, 2, 3]
```

#### 数组查找

* **方法**：`Arrays.binarySearch()`（需先排序）

```java
int[] array = {1, 2, 3};
int index = Arrays.binarySearch(array, 2); // 1
```

### 7. **其他常用方法**

#### 字符串转整数

* **方法**：`Integer.parseInt()`

```java
String str = "123";
int num = Integer.parseInt(str); // 123
```

#### 整数转字符串

* **方法**：`String.valueOf()` 或直接拼接

```java
int num = 123;
String str1 = String.valueOf(num); // "123"
String str2 = "" + num; // "123"
```

#### 字符串去空格

* **方法**：`String.trim()`

```java
String str = " Hello ";
String trimmed = str.trim(); // "Hello"
```

#### 字符串反转

* **方法**：`StringBuilder.reverse()`

```java
String str = "Hello";
String reversed = new StringBuilder(str).reverse().toString(); // "olleH"
```

以上是 Java 中数组、字符串和字符类型的常用方法总结，涵盖了相互之间的转换以及常见操作。希望这些方法能帮助你更高效地解决算法题！

---

> 更新: 2025-07-02 06:47:03  
> 来源: 语雀导出
