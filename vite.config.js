import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],

  css: {
    preprocessorOptions: {
      scss: {
        // WHY additionalData: automatically injects these @use statements
        // into every .scss file and every .vue <style lang="scss"> block.
        // This means components never need to manually import tokens/mixins.
        //
        // WHY these three in this order:
        //   1. functions  — no deps, must come first (rem() used by tokens)
        //   2. tokens     — depends on functions
        //   3. mixins     — depends on tokens (respond-to uses breakpoints)
        //
        // WHY @/ alias works here (unlike in .scss-to-.scss @use):
        // Vite processes additionalData BEFORE passing to Sass,
        // so @/ is resolved by Vite first, then Sass sees the real path.
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
