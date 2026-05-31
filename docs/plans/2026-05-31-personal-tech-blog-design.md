# 个人技术作品集博客设计方案

## 背景

目标是重新搭建一个轻量、美观、易迁移的个人技术作品集博客。站点以技术博客和知识库为主，作品集作为独立入口；内容全部使用 Markdown 存储在 GitHub 仓库中，通过 GitHub Pages 自动发布，并支持直接在 GitHub 网页编辑。

## 已确认决策

- 站点定位：技术博客/知识库优先。
- 迁移规模：已有 Markdown 少量且规整，首版不需要复杂导入管道。
- 编辑方式：使用 GitHub 网页直接编辑 Markdown。
- 技术栈：VitePress。
- 内容组织：按主题分类。
- 作品集：独立 Projects 页面，首页展示少量精选项目。
- 发布方式：`pohongying.github.io` 个人主页仓库，新博客源码使用 `vitepress-blog` 分支，旧 `gh-pages` 分支保留作为原博客备份。
- 视觉方向：个人品牌感更强，首页突出个人定位和技术方向。
- 首版功能：本地搜索、分类/标签、深浅色模式。
- 语言：中文为主。

## 架构

仓库本身就是内容源。所有文章、项目介绍、关于页面和演进文档都以 Markdown 保存。VitePress 读取 `docs/` 目录生成静态站点，GitHub Actions 在 `vitepress-blog` 分支变更后执行构建，并将产物发布到 GitHub Pages。

首版不引入数据库、CMS、评论系统或统计服务。这样可以降低维护成本，同时保持长期备份和迁移能力。后续如果需要评论，可接入 Giscus；如果需要访问统计，可接入 Plausible、Umami 或其他轻量方案。

## 信息架构

- 首页：个人定位、技术方向、精选文章、精选项目、快速入口。
- 文章：按 `frontend`、`backend`、`ai`、`engineering` 等主题组织。
- 项目：独立展示代表项目，包含项目背景、技术栈、亮点和链接。
- 关于：个人简介、技术栈、联系方式和持续关注方向。
- 计划文档：记录站点设计、迁移方案和后续演进。

## 内容模型

文章使用 Markdown frontmatter 维护元信息：

```yaml
---
title: 文章标题
date: 2026-05-31
category: engineering
tags:
  - 架构
  - 效率
summary: 一句话说明文章内容。
---
```

主题目录决定主分类，frontmatter 的 `tags` 用于补充横向索引。少量已有 Markdown 可手工搬运到对应主题目录，补齐标题、日期、摘要和标签。

## 发布与维护

本地开发使用 `npm run dev`，构建使用 `npm run build`。推送到 GitHub 后，Actions 自动安装依赖、构建站点并发布到 Pages。

长期维护时，新增文章只需要在对应主题目录添加 Markdown 文件，并在文章索引页补充链接。内容源完全保存在 GitHub 中，可随时 clone、fork、导出或迁移到其他静态站点生成器。
