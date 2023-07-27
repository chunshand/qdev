import { defineConfig } from 'vitepress'
import devDocSidebar from "../dev-doc/sidebar"
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "QDev",
    base: "/qdev",
    description: "快速开发管理系统",
    head: [
        [
            "script",
            {},
            `
var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?6b3af6be3d4340757af2232cd4f31e7e";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(hm, s);
})();`
        ]
    ],
    themeConfig: {
        search: {
            provider: 'local'
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '快速开发', link: '/quick-dev/index' },
            { text: '开发文档', link: '/dev-doc/index' },
            // { text: '感谢', link: '/thank-you/index' }
        ],
        sidebar: {
            ...devDocSidebar
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/chunshand/qdev' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present chunshand'
        }
    }
})
