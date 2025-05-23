import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#EBF6F7",
      100: "#DAEEF0",
      200: "#A5D1D6",
      300: "7AB7BF}",
      400: "#33818F",
      500: "#09505f",
      600: "#074554",
      700: "#053647",
      800: "#032638",
      900: "#021B2B",
      950: "#010F1C",
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@primevue/nuxt-module",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: "light",
        },
      },
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "pl", name: "Polish", file: "pl.json" },
    ],
  },
});
