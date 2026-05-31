import { defineConfig } from 'vitepress'

const repository = process.env.VITEPRESS_GITHUB_REPOSITORY || process.env.GITHUB_REPOSITORY || ''
const branch = process.env.VITEPRESS_GITHUB_BRANCH || process.env.GITHUB_REF_NAME || 'vitepress-blog'
const githubBaseUrl = repository
  ? `https://github.com/${repository}`
  : 'https://github.com/pohongying/pohongying.github.io'

export default defineConfig({
  title: '罗一的技术笔记',
  description: '工程实践、系统设计与 AI 工具化',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/notes' },
      { text: '项目', link: '/projects/' },
      { text: '写作', link: '/authoring' },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/posts/': [
        {
          text: '文章主题',
          items: [
            { text: 'Engineering', link: '/posts/engineering/' },
            { text: 'AI', link: '/posts/ai/' },
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
              link: '/posts/ai/ai-assisted-knowledge-work'
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
