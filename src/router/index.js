import { createRouter, createWebHistory } from "vue-router";

// Each page is a lazy-loaded chunk — zero bleed between pages
const routes = [
  {
    path: "/",
    name: "landing-v2",
    component: () => import("@/pages/landing-v2/LandingV2.vue"),
    meta: { title: "زونکن — قراردادهای خود را دقیق تنظیم کنید" },
  },
  {
    // V1 always accessible — frozen in time, your manager can't touch it
    path: "/v1",
    name: "landing-v1",
    component: () => import("@/pages/landing-v1/LandingV1.vue"),
    meta: { title: "زونکن — نسخه قدیمی" },
  },
  // Future pages plug in here — zero interference with landing styles
  // { path: "/dashboard", name: "dashboard", component: () => import("@/pages/dashboard/Dashboard.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Update page title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title ?? "زونکن";
});

export default router;
