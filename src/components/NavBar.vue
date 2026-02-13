<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__container">
      <div class="nav__logo">
        <a href="#hero" class="nav__logo-link">
          <span class="nav__logo-text"
            ><img src="/src/assets/logo-dark-mode.svg" alt="زونکن"
          /></span>
        </a>
      </div>

      <div class="nav__actions">
        <div class="nav__menu">
          <a href="#philosophy" class="nav__link">فلسفه محصول</a>
          <a href="#problems" class="nav__link">رویکرد</a>
          <a href="#features" class="nav__link">ویژگی‌ها</a>
          <a href="#use-cases" class="nav__link">کاربردها</a>
          <a href="#testimonials" class="nav__link">نظرات کاربران</a>
          <a href="#faq" class="nav__link">سوالات متداول</a>
        </div>

        <button class="btn btn--primary" @click="$emit('scroll-to-cta')">
          درخواست عضویت
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

defineEmits(["scroll-to-cta"]);

const scrolled = ref(false);

function handleScroll() {
  scrolled.value = window.pageYOffset > 100;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid $color-border-subtle;
  transition: $transition-base;

  &--scrolled {
    background-color: rgba(10, 10, 10, 0.95);
    border-bottom-color: $color-border-medium;
    box-shadow: $shadow-md;
  }

  &__container {
    max-width: 1900px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    color: $color-text-primary;
    letter-spacing: -0.02em;
  }

  &__logo-text img {
    height: 50px;
    width: auto;
    display: block;
  }

  &__menu {
    display: flex;
    gap: $spacing-lg;
    align-items: center;
  }

  &__link {
    color: $color-text-secondary;
    font-weight: 500;
    transition: $transition-base;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      right: 0;
      width: 0;
      height: 2px;
      background-color: $color-accent-primary;
      transition: $transition-base;
    }

    &:hover {
      color: $color-text-primary;

      &::after {
        width: 100%;
      }
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-lg;
    align-items: center;
  }
}

@media (max-width: $breakpoint-md) {
  .nav__menu {
    display: none;
  }
}
</style>
