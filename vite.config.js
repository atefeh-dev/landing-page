import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],

  css: {
    preprocessorOptions: {
      scss: {
        // WHY three separate @use statements instead of one @forward index:
        // @forward compiles each module in isolation — _mixins.scss cannot
        // see $color-bg-primary even if _variables.scss is also forwarded,
        // because @forward does not share scope between sibling modules.
        //
        // Injecting each file explicitly in dependency order works because
        // Sass deduplicates @use: if a file @uses the same module twice,
        // the second is silently ignored. Order must follow the dep chain:
        //   1. functions  (no deps)
        //   2. variables  (depends on functions via @use inside the file)
        //   3. mixins     (depends on variables via @use inside the file)
        additionalData:
          [
            `@use "@/styles/functions" as *;`,
            `@use "@/styles/variables" as *;`,
            `@use "@/styles/mixins" as *;`,
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
