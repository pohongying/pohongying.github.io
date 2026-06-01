---
title: 'BFS算法'
date: 2024-05-02
updated: '2024-05-02 06:03:39'
category: 'backend'
tags:
  - '后端修仙之路'
  - '算法'
  - '数据结构'
lastUpdated: false
summary: '更像是多叉树的，层序遍历的'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/ctkr0sspatc0e2p2'
---

# BFS算法

### 适用场景
更像是多叉树的，层序遍历的

### 代码模板
```java
// 从 s 开始 BFS 遍历图的所有节点，且记录遍历的步数
// 当走到目标节点 target 时，返回步数
int bfs(int s, int target) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> q = new LinkedList<>();
    q.offer(s);
    visited[s] = true;
    // 记录从 s 开始走到当前节点的步数
    int step = 0;
    while (!q.isEmpty()) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            int cur = q.poll();
            System.out.println("visit " + cur + " at step " + step);
            // 判断是否到达终点
            if (cur == target) {
                return step;
            }
            // 将邻居节点加入队列，向四周扩散搜索
            for (int to : neighborsOf(cur)) {
                if (!visited[to]) {
                    q.offer(to);
                    visited[to] = true;
                }
            }
        }
        step++;
    }
    // 如果走到这里，说明在图中没有找到目标节点
    return -1;
}
```

---

> 更新: 2025-10-15 05:58:37  
> 来源: 语雀导出
