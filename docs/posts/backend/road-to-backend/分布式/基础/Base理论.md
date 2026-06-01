---
title: 'Base理论'
date: 2025-04-06
updated: '2025-04-06 17:41:16'
category: 'backend'
tags:
  - '后端修仙之路'
  - '分布式'
  - '基础'
lastUpdated: false
summary: 'eBay 公司的工程师 Dan Pritchett 曾提出了一种分布式存储系统的设计模式——BASE 理论。 BASE 理论包括基本可用（Basically Available）、柔性状态（S…'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/yocf2etwe0fg5rxp'
---

# Base理论

eBay 公司的工程师 Dan Pritchett 曾提出了一种分布式存储系统的设计模式——BASE 理论。 BASE 理论包括基本可用（Basically Available）、柔性状态（Soft State）和最终一致性（Eventual Consistency）。

+ 基本可用：分布式系统出现故障的时候，允许损失一部分功能的可用性，保证核心功能可用。比如，某些电商 618 大促的时候，会对一些非核心链路的功能进行降级处理。
+ 柔性状态：在柔性事务中，允许系统存在中间状态，且这个中间状态不会影响系统整体可用性。比如，数据库读写分离，写库同步到读库（主库同步到从库）会有一个延时，其实就是一种柔性状态。
+ 最终一致性：事务在操作过程中可能会由于同步延迟等问题导致不一致，但最终状态下，所有数据都是一致的。

---

> 更新: 2023-09-19 04:49:34  
> 来源: 语雀导出
