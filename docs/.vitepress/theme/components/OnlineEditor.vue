<script setup lang="ts">
import { computed, ref } from 'vue'

declare const __GITHUB_REPOSITORY__: string
declare const __GITHUB_BRANCH__: string
declare const __GITHUB_BASE_URL__: string

const topics = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'AI', value: 'ai' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' }
]

const today = new Date().toISOString().slice(0, 10)
const title = ref('新文章标题')
const topic = ref('engineering')
const slug = ref(`new-post-${today}`)
const tags = ref('写作系统, 技术笔记')
const summary = ref('一句话说明这篇文章要解决的问题。')

const githubBaseUrl = computed(() => __GITHUB_BASE_URL__ || 'https://github.com/pohongying/pohongying.github.io')
const branch = computed(() => __GITHUB_BRANCH__ || 'vitepress-blog')
const repositoryLabel = computed(() => __GITHUB_REPOSITORY__ || 'pohongying/pohongying.github.io')

const fileName = computed(() => {
  const normalized = slug.value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return `${normalized || `new-post-${today}`}.md`
})

const tagLines = computed(() =>
  tags.value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => `  - ${tag}`)
    .join('\n')
)

const articleTemplate = computed(() => `---
title: ${title.value || '新文章标题'}
date: ${today}
category: ${topic.value}
tags:
${tagLines.value || '  - 技术笔记'}
summary: ${summary.value || '一句话说明这篇文章要解决的问题。'}
---

# ${title.value || '新文章标题'}

## 背景

这里说明问题从哪里来，为什么值得写下来。

## 方法

这里记录你的分析、方案或实践过程。

## 结论

这里沉淀可复用的判断、经验或后续行动。
`)

const newArticleUrl = computed(() => {
  const base = `${githubBaseUrl.value}/new/${branch.value}/docs/posts/${topic.value}`
  const params = new URLSearchParams({
    filename: fileName.value,
    value: articleTemplate.value
  })

  return `${base}?${params.toString()}`
})

const editNotesUrl = computed(() => `${githubBaseUrl.value}/edit/${branch.value}/docs/notes.md`)
const editTopicIndexUrl = computed(() => `${githubBaseUrl.value}/edit/${branch.value}/docs/posts/${topic.value}/index.md`)
</script>

<template>
  <section class="online-editor">
    <div class="online-editor__intro">
      <p class="eyebrow">Online Editing</p>
      <h2>用 GitHub 网页编辑文章</h2>
      <p>
        当前发布链路保持纯静态：文章仍然是 Markdown 文件，在线编辑交给 GitHub。
        登录 GitHub 后，新建或修改文件并提交到 <code>{{ branch }}</code> 分支，GitHub Pages 会自动发布。
      </p>
      <span class="online-editor__repo">目标仓库：{{ repositoryLabel }}</span>
    </div>

    <div class="online-editor__panel">
      <label>
        <span>文章标题</span>
        <input v-model="title" type="text" autocomplete="off" />
      </label>
      <label>
        <span>主题分类</span>
        <select v-model="topic">
          <option v-for="item in topics" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </label>
      <label>
        <span>文件名</span>
        <input v-model="slug" type="text" autocomplete="off" />
      </label>
      <label>
        <span>标签</span>
        <input v-model="tags" type="text" autocomplete="off" />
      </label>
      <label class="online-editor__wide">
        <span>摘要</span>
        <textarea v-model="summary" rows="3" />
      </label>
    </div>

    <div class="online-editor__actions">
      <a class="online-editor__primary" :href="newArticleUrl" target="_blank" rel="noreferrer">
        新建文章
      </a>
      <a :href="editNotesUrl" target="_blank" rel="noreferrer">编辑文章索引</a>
      <a :href="editTopicIndexUrl" target="_blank" rel="noreferrer">编辑主题索引</a>
    </div>

    <details class="online-editor__preview">
      <summary>查看将写入的新文章模板</summary>
      <pre><code>{{ articleTemplate }}</code></pre>
    </details>
  </section>
</template>
