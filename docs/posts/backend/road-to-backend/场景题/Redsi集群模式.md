---
title: 'Redsi集群模式'
date: 2026-05-27
updated: '2026-05-27 22:41:59'
category: 'backend'
tags:
  - '后端修仙之路'
  - '场景题'
lastUpdated: false
summary: '用于存储大量节点，有多对主-从'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/kqadythoe1u2f51s'
---

# Redsi集群模式

## 介绍
用于存储大量节点，有多对主-从

## key如何存储
> 任何一次要操作多个 key 的命令
>

利用哈希槽，一个切片集群共有16384个哈希槽，CRC16算法计算一个16bit的值。可以利用hash tag来保证两个键都在同一个哈希槽中

---

> 更新: 2023-12-31 01:11:13  
> 来源: 语雀导出
