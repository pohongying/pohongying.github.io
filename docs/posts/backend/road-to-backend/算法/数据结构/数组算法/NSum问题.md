---
title: 'NSum问题'
date: 2026-03-05
updated: '2026-03-05 17:51:09'
category: 'backend'
tags:
  - '后端修仙之路'
  - '算法'
  - '数据结构'
lastUpdated: false
summary: '这类问题本质是穷举，可以用回溯算法。要进行优化的话，可以用双指针，类似于二分查找，需要排序，不同的在于并不是查找某个数，而是需要通过左右双指针，慢慢来筛选符合条件的组合，筛选则需要通过去重和指…'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/hytkwogcy9hal1wl'
---

# NSum问题

这类问题本质是穷举，可以用回溯算法。要进行优化的话，可以用双指针，类似于二分查找，需要排序，不同的在于并不是查找某个数，而是需要通过左右双指针，慢慢来筛选符合条件的组合，筛选则需要通过去重和指针移动来实现。

主要思想：

+ 转换成twoSum模版
+ 固定一个数/ 递归调用
+ 去重

基本模版：

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        // n 为 4，从 nums[0] 开始计算和为 target 的四元组
        return nSumTarget(nums, 4, 0, target);
    }

    // 注意：调用这个函数之前一定要先给 nums 排序
    // n 填写想求的是几数之和，start 从哪个索引开始计算（一般填 0），target 填想凑出的目标和
    private List<List<Integer>> nSumTarget(int[] nums, int n, int start, long target) {
        int sz = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        // 至少是 2Sum，且数组大小不应该小于 n
        if (n < 2 || sz < n) return res;
        // 2Sum 是 base case
        if (n == 2) {
            // 双指针那一套操作
            int lo = start, hi = sz - 1;
            while (lo < hi) {
                int sum = nums[lo] + nums[hi];
                int left = nums[lo], right = nums[hi];
                if (sum < target) {
                    while (lo < hi && nums[lo] == left) lo++;
                } else if (sum > target) {
                    while (lo < hi && nums[hi] == right) hi--;
                } else {
                    res.add(new ArrayList<>(Arrays.asList(left, right)));
                    while (lo < hi && nums[lo] == left) lo++;
                    while (lo < hi && nums[hi] == right) hi--;
                }
            }
        } else {
            // n > 2 时，递归计算 (n-1)Sum 的结果
            for (int i = start; i < sz; i++) {
                List<List<Integer>> sub = nSumTarget(nums, n - 1, i + 1, target - nums[i]);
                for (List<Integer> arr : sub) {
                    // (n-1)Sum 加上 nums[i] 就是 nSum
                    arr.add(nums[i]);
                    res.add(arr);
                }
                while (i < sz - 1 && nums[i] == nums[i + 1]) i++;
            }
        }
        return res;
    }
}
```

---

> 更新: 2025-12-07 07:16:00  
> 来源: 语雀导出
