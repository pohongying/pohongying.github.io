import { defineConfig } from 'vitepress'
import { existsSync, readdirSync } from 'node:fs'
import { basename, join, relative, sep } from 'node:path'

const repository = process.env.VITEPRESS_GITHUB_REPOSITORY || process.env.GITHUB_REPOSITORY || ''
const branch = process.env.VITEPRESS_GITHUB_BRANCH || process.env.GITHUB_REF_NAME || 'vitepress-blog'
const githubBaseUrl = repository
  ? `https://github.com/${repository}`
  : 'https://github.com/pohongying/pohongying.github.io'
const backendRoadRoot = join(process.cwd(), 'docs/posts/backend/road-to-backend')
const vibecodingRoot = join(process.cwd(), 'docs/posts/vibecoding')

const topLevelOrder = [
  'Java',
  '数据库',
  '分布式',
  '算法',
  '中间件',
  '场景题',
  '计网',
  '操作系统',
  '书籍阅读',
  '工具',
  '秋招'
]

const vibecodingOrder = ['AI', 'ai-assisted-knowledge-work.md']

const fileOrder = ['index.md']
const skipDirs = new Set(['img', 'attachments'])

function sortByKnowledgeOrder(a: string, b: string, order = topLevelOrder) {
  const aTop = order.indexOf(a)
  const bTop = order.indexOf(b)
  if (aTop !== -1 || bTop !== -1) {
    if (aTop === -1) return 1
    if (bTop === -1) return -1
    return aTop - bTop
  }

  const aFile = fileOrder.indexOf(a)
  const bFile = fileOrder.indexOf(b)
  if (aFile !== -1 || bFile !== -1) {
    if (aFile === -1) return 1
    if (bFile === -1) return -1
    return aFile - bFile
  }

  return a.localeCompare(b, 'zh-CN')
}

function titleFromMarkdown(filePath: string) {
  const name = basename(filePath, '.md')
  return name === 'index' ? basename(join(filePath, '..')) : name
}

function linkFromMarkdown(filePath: string, root: string, base: string) {
  const rel = relative(root, filePath).split(sep).join('/')
  const cleanRel = rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
  return `${base}${cleanRel}`
}

function hasMarkdown(dir: string): boolean {
  return readdirSync(dir, { withFileTypes: true }).some((entry) => {
    if (entry.isFile()) return entry.name.endsWith('.md')
    if (!entry.isDirectory() || skipDirs.has(entry.name)) return false
    return hasMarkdown(join(dir, entry.name))
  })
}

function buildMarkdownTree(root: string, base: string, dir = root, depth = 0, order = topLevelOrder) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => {
      if (entry.isDirectory()) return !skipDirs.has(entry.name) && hasMarkdown(join(dir, entry.name))
      return entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md'
    })
    .sort((a, b) => sortByKnowledgeOrder(a.name, b.name, order))
    .map((entry) => {
      const fullPath = join(dir, entry.name)

      if (entry.isFile()) {
        return {
          text: titleFromMarkdown(fullPath),
          link: linkFromMarkdown(fullPath, root, base)
        }
      }

      const indexPath = join(fullPath, 'index.md')
      return {
        text: entry.name,
        link: existsSync(indexPath) ? linkFromMarkdown(indexPath, root, base) : undefined,
        collapsed: depth > 0,
        items: buildMarkdownTree(root, base, fullPath, depth + 1, order)
      }
    })
}

const backendRoadSidebar = [
  {
    text: '后端修仙之路',
    link: '/posts/backend/road-to-backend/',
    items: buildMarkdownTree(backendRoadRoot, '/posts/backend/road-to-backend/')
  }
]

const vibecodingSidebar = [
  {
    text: 'Vibecoding',
    link: '/posts/vibecoding/',
    items: buildMarkdownTree(vibecodingRoot, '/posts/vibecoding/', vibecodingRoot, 0, vibecodingOrder)
  }
]

export default defineConfig({
  title: '破虹影的技术笔记',
  description: '工程实践、系统设计与 AI 工具化',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '后端修仙之路', link: '/posts/backend/road-to-backend/' },
      { text: 'Vibecoding', link: '/posts/vibecoding/' },
      { text: '文章', link: '/notes' },
      { text: '项目', link: '/projects/' },
      { text: '写作', link: '/authoring' },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/notes': [
        ...backendRoadSidebar,
        ...vibecodingSidebar
      ],
      '/posts/vibecoding/': vibecodingSidebar,
      '/posts/backend/road-to-backend/': backendRoadSidebar,
      '/posts/backend/': [
        {
          text: 'Backend',
          items: [
            { text: 'Backend 首页', link: '/posts/backend/' },
            { text: '后端修仙之路', link: '/posts/backend/road-to-backend/' },
            { text: 'Vibecoding', link: '/posts/vibecoding/' }
          ]
        }
      ],
      '/posts/': [
        {
          text: '文章主题',
          items: [
            { text: 'Engineering', link: '/posts/engineering/' },
            { text: 'Vibecoding', link: '/posts/vibecoding/' },
            { text: 'Frontend', link: '/posts/frontend/' },
            { text: 'Backend', link: '/posts/backend/' }
          ]
        },
        {
          text: '精选文章',
          items: [
            {
              text: '长期可维护的技术博客',
              link: '/posts/engineering/building-a-durable-tech-blog'
            },
            {
              text: 'AI 辅助知识工作',
              link: '/posts/vibecoding/ai-assisted-knowledge-work'
            }
          ]
        }
      ],
      '/projects/': [
        {
          text: '项目',
          items: [{ text: '项目首页', link: '/projects/' }]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pohongying/pohongying.github.io' }
    ],
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    editLink: {
      pattern: `${githubBaseUrl}/edit/${branch}/docs/:path`,
      text: '在 GitHub 编辑此页'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    darkModeSwitchLabel: '深浅色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清空搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#2f6f73' }],
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  vite: {
    define: {
      __GITHUB_REPOSITORY__: JSON.stringify(repository),
      __GITHUB_BRANCH__: JSON.stringify(branch),
      __GITHUB_BASE_URL__: JSON.stringify(githubBaseUrl)
    }
  }
})
