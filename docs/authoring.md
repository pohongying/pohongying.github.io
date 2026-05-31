# 写作指南

## 新增文章

1. 在 `docs/posts/<topic>/` 下新建 Markdown 文件。
2. 添加 frontmatter。
3. 在 `docs/notes.md` 和对应主题的 `index.md` 中补充链接。
4. 提交到 `main` 分支，等待 GitHub Pages 自动发布。

## 推荐 frontmatter

```yaml
---
title: 文章标题
date: 2026-05-31
category: engineering
tags:
  - 标签一
  - 标签二
summary: 一句话摘要。
---
```

## 图片

建议把图片放在文章同目录的 `assets/` 子目录中，再用相对路径引用：

```md
![图片说明](./assets/example.png)
```

## 迁移已有 Markdown

少量旧文章可以直接复制到对应主题目录，重点补齐标题、日期、摘要和标签。图片引用如果失效，优先把图片一起搬到文章附近的 `assets/` 目录。
