---
title: 'LRU算法'
date: 2023-11-13
updated: '2023-11-13 11:54:12'
category: 'backend'
tags:
  - '后端修仙之路'
  - '算法'
  - '数据结构'
lastUpdated: false
summary: '后端修仙之路中的「LRU算法」笔记。'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/zfgolh7f42xfxfz1'
---

# LRU算法

```java
class LRUCache {
    // 1. 定义双向链表节点
    class Node {
        int key, value;
        Node prev, next;
        Node() {}
        Node(int k, int v) { key = k; value = v; }
    }

    private Map<Integer, Node> cache = new HashMap<>();
    private int size;
    private int capacity;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        // 2. 初始化虚拟头尾节点，互相连接
        head = new Node();
        tail = new Node();
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) return -1;
        moveToHead(node); // 只要访问，就移到头
        return node.value;
    }

    public void put(int key, int value) {
        Node node = cache.get(key);
        if (node == null) {
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addFirst(newNode); // 新节点插到头
            size++;
            if (size > capacity) {
                Node removed = removeTail(); // 删掉最久的（尾部）
                cache.remove(removed.key);
                size--;
            }
        } else {
            node.value = value; // 更新值
            moveToHead(node);   // 移到头
        }
    }

    // --- 链表操作小工具（面试重点） ---

    private void addFirst(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addFirst(node);
    }

    private Node removeTail() {
        Node res = tail.prev;
        removeNode(res);
        return res;
    }
}
```

---

> 更新: 2026-04-30 05:54:32  
> 来源: 语雀导出
