<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__container">
      <div class="nav__logo">
        <a href="#hero" class="nav__logo-link">
          <img
            src="/src/assets/logo-dark-mode.svg"
            alt="زونکن"
            class="nav__logo-icon"
          />
          <img
            src="/src/assets/logotype.svg"
            alt="زونکن"
            class="nav__logo-type"
          />
        </a>
      </div>

      <div class="nav__menu">
        <a href="#philosophy" class="nav__link">فلسفه محصول</a>
        <a href="#approach" class="nav__link">رویکرد</a>
        <a href="#features" class="nav__link">ویژگی‌ها</a>
        <a href="#customers" class="nav__link">مشتریان</a>
        <a href="#faq" class="nav__link">سوالات متداول</a>
      </div>

      <div class="nav__actions">
        <BaseButton variant="primary" size="md" @click="handleCta">
          درخواست عضویت
        </BaseButton>

        <button
          class="nav__hamburger"
          :class="{ 'nav__hamburger--active': mobileMenuOpen }"
          type="button"
          aria-label="باز کردن منو"
          @click="toggleMenu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <transition name="nav-overlay">
      <div v-if="mobileMenuOpen" class="nav__overlay" @click="closeMenu" />
    </transition>

    <!-- Mobile panel — slides from RIGHT (RTL) -->
    <transition name="nav-panel">
      <div v-if="mobileMenuOpen" class="nav__mobile-menu">
        <div class="nav__mobile-header">
          <span class="nav__mobile-title">منو</span>
        </div>

        <nav class="nav__mobile-links">
          <a href="#philosophy" class="nav__mobile-link" @click="closeMenu"
            >فلسفه محصول</a
          >
          <a href="#approach" class="nav__mobile-link" @click="closeMenu"
            >رویکرد</a
          >
          <a href="#features" class="nav__mobile-link" @click="closeMenu"
            >ویژگی‌ها</a
          >
          <a href="#customers" class="nav__mobile-link" @click="closeMenu"
            >مشتریان</a
          >
          <a href="#testimonials" class="nav__mobile-link" @click="closeMenu"
            >نظرات کاربران</a
          >
          <a href="#faq" class="nav__mobile-link" @click="closeMenu"
            >سوالات متداول</a
          >
        </nav>

        <div class="nav__mobile-footer">
          <!-- FIX: using BaseButton -->
          <BaseButton
            variant="primary"
            size="lg"
            class="nav__mobile-cta"
            @click="handleMobileCta"
          >
            درخواست عضویت
          </BaseButton>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(["scroll-to-cta"]);

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

// FIX: window.pageYOffset is deprecated → window.scrollY
function handleScroll() {
  scrolled.value = window.scrollY > 100;
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  document.body.style.overflow = mobileMenuOpen.value ? "hidden" : "";
}

function closeMenu() {
  mobileMenuOpen.value = false;
  document.body.style.overflow = "";
}

// FIX: single handler for both desktop + mobile CTA
function handleCta() {
  emit("scroll-to-cta");
}

function handleMobileCta() {
  closeMenu();
  setTimeout(() => emit("scroll-to-cta"), 300);
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
// FIX: was missing — caused SCSS compile error on all $color-* variables
@use "../styles/variables" as *;

.nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid $color-border-subtle;
  transition: $transition-base;

  &--scrolled {
    background: rgba(10, 10, 10, 0.95);
    border-bottom-color: $color-border-medium;
    box-shadow: $shadow-md;
  }

  // ── Container ────────────────────────────

  &__container {
    max-width: 1900px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // ── Logo ─────────────────────────────────

  &__logo-link {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
  }

  &__logo-icon,
  &__logo-type {
    height: 50px;
    width: auto;
    display: block;
  }

  // ── Desktop Menu ─────────────────────────

  &__menu {
    display: flex;
    gap: $spacing-lg;
    align-items: center;
  }

  &__link {
    color: $color-text-secondary;
    font-weight: 500;
    white-space: nowrap;
    transition: $transition-base;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      right: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        $color-accent-primary 50%,
        transparent 100%
      );
      transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      color: $color-text-primary;
      &::after {
        width: 100%;
      }
    }
  }

  // ── Actions ──────────────────────────────

  &__actions {
    display: flex;
    gap: $spacing-lg;
    align-items: center;
  }

  // ── Hamburger ────────────────────────────

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
      background: $color-text-primary;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &:hover span {
      background: $color-accent-primary;
    }

    &--active span {
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

  // ── Mobile Overlay ───────────────────────

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 998;
  }

  // ── Mobile Panel ─────────────────────────
  // FIX: was left: 0 (slides from left) — RTL site should slide from right

  &__mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 320px;
    max-width: 85vw;
    height: 100vh;
    background: linear-gradient(
      180deg,
      $color-bg-secondary 0%,
      $color-bg-primary 100%
    );
    border-left: 1px solid $color-border-medium;
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
      background: rgba(255, 255, 255, 0.03);
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

// ── Transitions ──────────────────────────────────

.nav-overlay-enter-active,
.nav-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.nav-overlay-enter-from,
.nav-overlay-leave-to {
  opacity: 0;
}

// FIX: was translateX(-100%) — panel now slides from right
.nav-panel-enter-active,
.nav-panel-leave-active {
  transition: transform 0.3s ease;
}
.nav-panel-enter-from,
.nav-panel-leave-to {
  transform: translateX(100%);
}

// ── Responsive ───────────────────────────────────

@media (max-width: $breakpoint-lg) {
  .nav {
    &__menu {
      gap: $spacing-md;
    }
    &__link {
      font-size: 0.9rem;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .nav {
    &__container {
      padding: 1rem 1.5rem;
    }
    &__menu {
      display: none;
    }
    &__hamburger {
      display: flex;
    }

    // Hide desktop CTA button, show hamburger only
    &__actions > :first-child {
      display: none;
    }

    &__logo-icon,
    &__logo-type {
      height: 40px;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .nav__container {
    padding: 0.75rem 1rem;
  }
}
</style>
