---
title: 'Redis分页'
date: 2026-02-27
updated: '2026-02-27 15:18:09'
category: 'backend'
tags:
  - '后端修仙之路'
  - '场景题'
lastUpdated: false
summary: '社交网络中的动态、电商平台中的商品列表、博客网站中的文章评论，还有卡牌的成就和奖励列表。分页可以提高用户体验，用户根据自己的需要去加载，而不是一次性加载。而使用缓存，可以减轻数据库访问压力，避…'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/mqwo69q8u2vp8afv'
---

# Redis分页

## 分页的场景
社交网络中的动态、电商平台中的商品列表、博客网站中的文章评论，还有卡牌的成就和奖励列表。分页可以提高用户体验，用户根据自己的需要去加载，而不是一次性加载。而使用缓存，可以减轻数据库访问压力，避免MySQL的低效率查询。

## 方案
1. zset。zrange
2. list。LRANGE，不够灵活
3. hash。HSCAN，一般的话，会在逻辑用zset做排序，hash+zset可以使用条件查询

---

> 更新: 2023-12-23 00:32:03  
> 来源: 语雀导出
