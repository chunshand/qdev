import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "QDev",
  description: "快速开发管理系统",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开发', link: '/quick-dev' },
      { text: '学习资料', link: '/quick-dev'  },
      { text: '感谢', link: '/quick-dev'  }
    ],
    sidebar: {
      "/quick-dev": [
        {
          text: '快速开发',
          items: []
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/chunshand' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present chunshand'
    }
  }
})
