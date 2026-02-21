import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

// Global styles = reset + design tokens ONLY.
// NO layout rules. Each page owns its own.
import "@/styles/index.scss";
createApp(App).use(router).mount("#app");
