# 个人技术作品集博客

这是一个基于 VitePress 的轻量个人技术博客/知识库。内容使用 Markdown 存储在 GitHub 仓库中，GitHub Pages 负责自动发布。

## 本地开发

```bash
npm install
npm run dev
```

## 常用命令

```bash
npm run build
npm run preview
```

## 内容结构

- `docs/posts/`：按主题分类的技术文章
- `docs/projects/`：作品集项目
- `docs/about.md`：关于页面
- `docs/notes.md`：文章索引
- `docs/plans/`：设计与演进文档

## 发布

将仓库发布为 `<username>.github.io` 后，推送到 `main` 分支即可通过 GitHub Actions 自动构建并发布到 GitHub Pages。
