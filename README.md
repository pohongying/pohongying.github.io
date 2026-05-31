# 个人技术作品集博客

这是一个基于 VitePress 的轻量个人技术博客/知识库。内容使用 Markdown 存储在 GitHub 仓库中，GitHub Pages 负责自动发布。

## 本地开发

```bash
npm install
npm run dev
```

如果需要在本地预览 GitHub 在线编辑链接，可以指定目标仓库：

```bash
VITEPRESS_GITHUB_REPOSITORY=pohongying/pohongying.github.io VITEPRESS_GITHUB_BRANCH=vitepress-blog npm run dev
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

将仓库推送到 `pohongying/pohongying.github.io` 的 `vitepress-blog` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。旧的 `gh-pages` 分支可以保留作为原博客备份。

## 在线编辑

- 每个页面底部都有“在 GitHub 编辑此页”入口。
- `docs/authoring.md` 提供新建文章表单，会生成带 frontmatter 的 GitHub 新文件链接。
- 新文章提交后，记得同步更新 `docs/notes.md` 和对应主题目录的 `index.md`。
