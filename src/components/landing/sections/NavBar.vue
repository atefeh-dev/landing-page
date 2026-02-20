<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__container">
      <div class="nav__logo">
        <a href="#hero" class="nav__logo-link">
          <img
            src="@/assets/brand/logo-dark-mode.svg"
            alt="زونکن"
            class="nav__logo-icon"
          />
          <img
            src="@/assets/brand/logotype.svg"
            alt="زونکن"
            class="nav__logo-type"
          />
        </a>
      </div>

      <nav class="nav__menu" aria-label="منوی اصلی">
        <a href="#philosophy" class="nav__link">مسئله</a>
        <a href="#experiences" class="nav__link">تجربه‌ها</a>
        <a href="#operation" class="nav__link">عملکرد</a>
        <a href="#customers" class="nav__link">مخاطبان</a>
        <a href="#faq" class="nav__link">سوالات متداول</a>
      </nav>

      <div class="nav__actions">
        <BaseButton variant="primary" size="md" @click="handleCta">
          درخواست عضویت
        </BaseButton>

        <button
          class="nav__hamburger"
          :class="{ 'nav__hamburger--active': mobileMenuOpen }"
          type="button"
          :aria-label="mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'"
          :aria-expanded="mobileMenuOpen"
          @click="toggleMenu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <Transition name="nav-overlay">
      <div v-if="mobileMenuOpen" class="nav__overlay" @click="closeMenu" />
    </Transition>

    <Transition name="nav-panel">
      <div
        v-if="mobileMenuOpen"
        class="nav__mobile-panel"
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
      >
        <div class="nav__mobile-header">
          <span class="nav__mobile-title">منو</span>
        </div>

        <nav class="nav__mobile-links">
          <a href="#philosophy" class="nav__mobile-link" @click="closeMenu"
            >فلسفه محصول</a
          >
          <a href="#experiences" class="nav__mobile-link" @click="closeMenu"
            >تجربه‌ها</a
          >
          <a href="#operation" class="nav__mobile-link" @click="closeMenu"
            >عملکرد</a
          >
          <a href="#customers" class="nav__mobile-link" @click="closeMenu"
            >مخاطبان</a
          >
          <a href="#faq" class="nav__mobile-link" @click="closeMenu"
            >سوالات متداول</a
          >
        </nav>

        <div class="nav__mobile-footer">
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
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

const emit = defineEmits(["scroll-to-cta"]);

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

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

function handleCta() {
  emit("scroll-to-cta");
}

function handleMobileCta() {
  closeMenu();
  setTimeout(() => emit("scroll-to-cta"), 300);
}

onMounted(() =>
  window.addEventListener("scroll", handleScroll, { passive: true }),
);
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.7); // $color-bg-primary at 70% opacity
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid $color-border-subtle;
  transition:
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    border-color #{$transition-duration-fast} #{$transition-easing-standard},
    box-shadow #{$transition-duration-fast} #{$transition-easing-standard};

  &--scrolled {
    background: rgba(10, 10, 10, 0.95); // $color-bg-primary at 95% opacity
    border-bottom-color: $color-border-medium;
    box-shadow: $shadow-md;
  }

  // ── Container ─────────────────────────────────────────────

  &__container {
    max-width: rem(1900);
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // ── Logo ──────────────────────────────────────────────────

  &__logo-link {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
  }

  // WHY: Comma selector eliminates one repeated rule block.
  &__logo-icon,
  &__logo-type {
    height: rem(50);
    width: auto;
    display: block;
  }

  // ── Desktop menu ──────────────────────────────────────────

  &__menu {
    display: flex;
    gap: rem(10);
    align-items: center;
  }

  &__link {
    color: $color-text-secondary;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    white-space: nowrap;
    transition: color #{$transition-duration-fast}
      #{$transition-easing-standard};
    padding: rem(4) rem(6) 0 rem(6);
    position: relative;

    // WHY: scaleX is GPU-composited — no layout reflow per frame.
    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      right: 0;
      left: 0;
      height: rem(3);
      background: linear-gradient(
        90deg,
        transparent 0%,
        $color-accent-primary 50%,
        transparent 100%
      );
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.4s #{$transition-easing-standard};
    }

    &:hover {
      color: $color-text-primary;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  // ── Actions ───────────────────────────────────────────────

  &__actions {
    display: flex;
    gap: $spacing-lg;
    align-items: center;
  }

  // ── Hamburger ─────────────────────────────────────────────

  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: rem(28);
    height: rem(22);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;

    span {
      display: block;
      width: 100%;
      height: rem(3);
      background: $color-text-primary;
      border-radius: 2px;
      transition:
        transform 0.3s ease,
        opacity 0.3s ease,
        background-color 0.3s ease;
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

  // ── Overlay ───────────────────────────────────────────────

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 998;
  }

  // ── Mobile panel ──────────────────────────────────────────

  &__mobile-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: rem(320);
    min-width: rem(240); // prevents panel becoming too narrow on 280px devices
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
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
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
    font-weight: $font-weight-medium;
    font-size: $font-size-md;
    transition:
      background-color #{$transition-duration-fast}
        #{$transition-easing-standard},
      color #{$transition-duration-fast} #{$transition-easing-standard},
      border-color #{$transition-duration-fast} #{$transition-easing-standard};
    border-right: 3px solid transparent;

    &:hover {
      background: $color-surface-hover;
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

// ── Transitions ────────────────────────────────────────────────

.nav-overlay-enter-active,
.nav-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.nav-overlay-enter-from,
.nav-overlay-leave-to {
  opacity: 0;
}

.nav-panel-enter-active,
.nav-panel-leave-active {
  transition: transform 0.3s ease;
}
.nav-panel-enter-from,
.nav-panel-leave-to {
  transform: translateX(100%);
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .nav {
    &__menu {
      gap: $spacing-md;
    }

    &__link {
      font-size: 0.9rem;
    }
  }
}

@include respond-to(md) {
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

    &__actions > :first-child {
      display: none;
    }

    &__logo-icon,
    &__logo-type {
      height: rem(40);
    }
  }
}

@include respond-to(sm) {
  .nav__container {
    padding: 0.75rem 1rem;
  }
}
</style>
