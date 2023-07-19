// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    devtools: { enabled: true },
    modules: [
        '@element-plus/nuxt',
        '@unocss/nuxt'
    ],
    unocss: {
        attributify: true,
        icons: true,
        components: false,
        shortcuts: [
        ],
    },
    imports: {
        dirs: ["apis", "composables"],
    },
    nitro: {
        devProxy: {
            '/uploads': 'http://localhost:3000/uploads',
        }
    }
})
