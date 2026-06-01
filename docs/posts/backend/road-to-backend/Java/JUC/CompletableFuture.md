---
title: 'CompletableFuture'
date: 2023-03-10
updated: '2023-03-10 09:58:55'
category: 'backend'
tags:
  - '后端修仙之路'
  - 'Java'
  - 'JUC'
lastUpdated: false
summary: '异步计算的结果容器，存储异步操作的最终结果'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/szfhmha66pzbm5py'
---

# CompletableFuture

### 核心接口
**Future**

异步计算的结果容器，存储异步操作的最终结果

**CompetionStage**

提供了多种依赖关系的编排方法，包括：一元（thenApply)、二元（thenCombine）、多元（allof）

### 核心数据结构
#### 核心字段
**result：**存储异步操作的最终结果

****

**stack：**completion栈（单向链表），出栈和入栈都是一端

### 核心思想——观察者模式
**观察者：****带结果的异步任务**

任意一个cf实例，result字段状态

**被观察者：****任务的后续操作**

completion子类实例

**交互逻辑：**src(调用cf)、dep（结果cf）、fn(回调函数）

1. 注册观察者。创建观察者并CAS入栈，两次检查观察者
2. 触发。结果写入result字段，弹栈执行观察者逻辑
3. 结果传递。观察者执行结果写入新的cf

---

> 更新: 2022-11-28 10:19:47  
> 来源: 语雀导出
