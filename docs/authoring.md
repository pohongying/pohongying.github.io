# 在线写作

<OnlineEditor />

## 写作指南

## 新增文章

1. 在上方选择主题、标题、文件名、标签和摘要。
2. 点击“新建文章”，进入 GitHub 网页编辑器。
3. 在 GitHub 中提交新 Markdown 文件。
4. 回到本站“写作”页，编辑文章索引和主题索引，补充新文章链接。
5. GitHub Actions 构建完成后，GitHub Pages 会自动发布。

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

## 本地预览编辑链接

本地运行时如果还没有 GitHub remote，可以临时指定仓库名：

```bash
VITEPRESS_GITHUB_REPOSITORY=<username>/<username>.github.io npm run dev
```
