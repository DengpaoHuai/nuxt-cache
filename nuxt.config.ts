// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@vee-validate/nuxt", "@nuxt/ui", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  experimental: {
    inlineRouteRules: true,
  },
  nitro: {
    prerender: {
      ignore: ["/movies"],
    },
  },
});
