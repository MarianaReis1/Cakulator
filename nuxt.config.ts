// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-quasar-ui', "@nuxtjs/google-fonts", "@nuxt/test-utils/module"],
  quasar: {
    sassVariables: './assets/styles/custom.scss'
  },
  googleFonts: {
    families: {
      Gluten: [500],
      PlaywriteAT: [200],
      Georama: [100,200,300,400,500,600,700,800],
    }
  }
})