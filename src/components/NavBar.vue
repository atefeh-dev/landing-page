<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__container">
      <div class="nav__logo">
        <a href="#hero" class="nav__logo-link">
          <span class="nav__logo-text">
            <img src="/src/assets/logo-dark-mode.svg" alt="زونکن" />
            <img src="/src/assets/logotype.svg" alt="زونکن" />
          </span>
        </a>
      </div>
      <div class="nav__menu">
        <a href="#philosophy" class="nav__link">فلسفه محصول</a>
        <a href="#problems" class="nav__link">رویکرد</a>
        <a href="#features" class="nav__link">ویژگی‌ها</a>
        <a href="#use-cases" class="nav__link">کاربردها</a>
        <!-- <a href="#testimonials" class="nav__link">نظرات کاربران</a> -->
        <a href="#faq" class="nav__link">سوالات متداول</a>
      </div>

      <!-- Desktop Menu -->
      <div class="nav__actions">
        <button
          class="btn btn--primary nav__cta-btn"
          @click="$emit('scroll-to-cta')"
        >
          درخواست عضویت
        </button>

        <!-- Mobile Menu Button -->
        <button
          class="nav__hamburger"
          @click="toggleMenu"
          :class="{ 'nav__hamburger--active': mobileMenuOpen }"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="menu-fade">
      <div v-if="mobileMenuOpen" class="nav__overlay" @click="closeMenu"></div>
    </transition>

    <!-- Mobile Menu Panel -->
    <transition name="menu-slide">
      <div v-if="mobileMenuOpen" class="nav__mobile-menu">
        <div class="nav__mobile-header">
          <span class="nav__mobile-title">منو</span>
        </div>

        <div class="nav__mobile-links">
          <a href="#philosophy" class="nav__mobile-link" @click="closeMenu">
            <span>فلسفه محصول</span>
          </a>
          <a href="#problems" class="nav__mobile-link" @click="closeMenu">
            <span>رویکرد</span>
          </a>
          <a href="#features" class="nav__mobile-link" @click="closeMenu">
            <span>ویژگی‌ها</span>
          </a>
          <a href="#use-cases" class="nav__mobile-link" @click="closeMenu">
            <span>کاربردها</span>
          </a>
          <a href="#testimonials" class="nav__mobile-link" @click="closeMenu">
            <span>نظرات کاربران</span>
          </a>
          <a href="#faq" class="nav__mobile-link" @click="closeMenu">
            <span>سوالات متداول</span>
          </a>
        </div>

        <div class="nav__mobile-footer">
          <button
            class="btn btn--primary btn--large nav__mobile-cta"
            @click="handleMobileCta"
          >
            درخواست عضویت
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["scroll-to-cta"]);

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

function handleScroll() {
  scrolled.value = window.pageYOffset > 100;
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;

  // Prevent body scroll when menu is open
  if (mobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMenu() {
  mobileMenuOpen.value = false;
  document.body.style.overflow = "";
}

function handleMobileCta() {
  closeMenu();
  // Small delay to let the menu close animation finish
  setTimeout(() => {
    emit("scroll-to-cta");
  }, 300);
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = ""; // Clean up
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
    display: flex;
    gap: 0.5rem;
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
    white-space: nowrap;

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

  &__cta-btn {
    white-space: nowrap;
  }

  // Hamburger Menu Button
  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 28px;
    height: 22px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;

    span {
      display: block;
      width: 100%;
      height: 3px;
      background-color: $color-text-primary;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &--active {
      span {
        &:nth-child(1) {
          transform: translateY(9.5px) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: translateY(-9.5px) rotate(-45deg);
        }
      }
    }

    &:hover span {
      background-color: $color-accent-primary;
    }
  }

  // Mobile Menu Overlay
  &__overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 998;
  }

  // Mobile Menu Panel
  &__mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 320px;
    max-width: 85vw;
    height: 100vh;
    background: linear-gradient(
      180deg,
      $color-bg-secondary 0%,
      $color-bg-primary 100%
    );
    border-right: 1px solid $color-border-medium;
    box-shadow: $shadow-xl;
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  &__mobile-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-sm;
    border-bottom: 1px solid $color-border-subtle;
  }

  &__mobile-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $color-text-primary;
  }

  &__mobile-links {
    flex: 1;
    padding: $spacing-md 0;
  }

  &__mobile-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 0.75rem;
    color: $color-text-secondary;
    font-weight: 500;
    font-size: $font-size-md;
    transition: $transition-base;
    border-right: 3px solid transparent;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
      color: $color-text-primary;
      border-right-color: $color-accent-primary;
    }
  }

  &__mobile-footer {
    padding: $spacing-lg;
    border-top: 1px solid $color-border-subtle;
  }

  &__mobile-cta {
    width: 100%;
  }
}

// Animations
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateX(-100%);
}

// Responsive Design
@media (max-width: $breakpoint-lg) {
  .nav__menu {
    gap: $spacing-md;
  }

  .nav__link {
    font-size: 0.9rem;
  }
}

@media (max-width: $breakpoint-md) {
  .nav__container {
    padding: 1rem 1.5rem;
  }

  .nav__menu {
    display: none;
  }

  .nav__cta-btn {
    display: none;
  }

  .nav__hamburger {
    display: flex;
  }

  .nav__logo-text img {
    height: 40px;
  }
}

@media (max-width: $breakpoint-sm) {
  .nav__container {
    padding: 0.75rem 1rem;
  }
}
</style>
