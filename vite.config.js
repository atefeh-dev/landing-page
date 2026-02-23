import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {},
      svgo: false,
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          [
            `@use "@/styles/global/functions" as *;`,
            `@use "@/styles/global/tokens" as *;`,
            `@use "@/styles/global/mixins" as *;`,
          ].join("\n") + "\n",
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
