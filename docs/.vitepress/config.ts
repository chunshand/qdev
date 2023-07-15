import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "QDev",
    description: "快速开发管理系统",
    themeConfig: {
        search: {
            provider: 'local'
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '快速开发', link: '/quick-dev/index' },
            { text: '开发文档', link: '/dev-doc/index' },
            { text: '感谢', link: '/thank-you/index' }
        ],
        sidebar: {
            "/dev-doc": [
                {
                    text: '开发文档',
                    items: [
                        {
                            text: "服务端（serve）",
                            items: [
                                {
                                    text: "基本配置",
                                    link: '/serve/config'
                                }
                            ]
                        }
                    ]
                }
            ],
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
