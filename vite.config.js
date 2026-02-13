import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables" as *;\n`,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
