<template>
  <section class="section section--approach" id="approach" ref="sectionRef">
    <div class="section__container section__header--center">
      <div class="section__header">
        <span class="section__badge" :class="{ 'in-view': isVisible }"
          >✨رویکرد</span
        >
        <div class="section__title-wrapper" :class="{ 'in-view': isVisible }">
          <svg
            class="section__title-image"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="24" cy="24" r="10" stroke="#fcc015" opacity="0.5" />
            <path d="M14 24 L20 30 L34 16" stroke="#fcc015" stroke-width="3" />
          </svg>
          <h2 class="section__title" :class="{ 'in-view': isVisible }">
            مشکل فقط <span class="highlight">نگهداری فایل</span>
            نیست.
          </h2>
        </div>
      </div>

      <p class="approach-text" :class="{ 'in-view': isVisible }">
        هر سند یک مسیر دارد -- و این مسیر باید شفاف و قابل‌پیگیری باشد.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { isVisible } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.section--approach {
  background: linear-gradient(
    180deg,
    $color-bg-secondary 0%,
    $color-bg-primary 100%
  );
}

.approach-text {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  
  &.in-view {
    animation: fadeInUp 0.6s ease-out 0.2s forwards;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
</style>
