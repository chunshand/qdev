// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@unocss/nuxt'
  ],
  unocss: {
    attributify: true,
    icons: true,
    components: true,
    shortcuts: [
    ],
  },
  imports: {
    dirs: ["apis","composables"],
  },
})
