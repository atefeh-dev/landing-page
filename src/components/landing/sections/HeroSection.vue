<template>
  <section class="hero" id="hero" ref="sectionRef">
    <div class="hero__icons" aria-hidden="true">
      <img
        src="@/assets/icons/pagewithcurl.svg"
        alt=""
        class="hero__icon hero__icon--1"
      />
      <img
        src="@/assets/icons/pagefacingup.svg"
        alt=""
        class="hero__icon hero__icon--2"
      />
      <img
        src="@/assets/icons/memo.svg"
        alt=""
        class="hero__icon hero__icon--3"
      />
      <img
        src="@/assets/icons/clipboard.svg"
        alt=""
        class="hero__icon hero__icon--4"
      />
      <img
        src="@/assets/icons/page-facing-up.svg"
        alt=""
        class="hero__icon hero__icon--5"
      />
      <img
        src="@/assets/icons/bookmark-tabs.svg"
        alt=""
        class="hero__icon hero__icon--6"
      />
      <img
        src="@/assets/icons/scroll.svg"
        alt=""
        class="hero__icon hero__icon--7"
      />
    </div>

    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__badge" v-bind="reveal(1)">
          <span class="hero__badge-label">
            <img src="@/assets/ui/green-dot.svg" alt="" aria-hidden="true" />
            <span>چه خبر؟</span>
          </span>
          <span>از امروز لیست انتظار باز است</span>
        </div>

        <h1 class="hero__title" v-bind="reveal(2)">
          اینجا، هر سند <br />
          <span class="hero__title-highlight">یک مسیر مشخص</span>
          دارد.
        </h1>

        <p class="hero__description" v-bind="reveal(3)">
          ما زونکن را ساختیم چون سال‌ها با اسناد، قراردادها و فایل‌هایی کار
          کردیم که هیچ مسیر مشخصی نداشتند. زونکن تلاشی است برای اینکه اسناد، از
          همان ابتدا در مسیر درست قرار بگیرند.
        </p>

        <EmailForm @submit="handleSubmit" />

        <p class="hero__note" v-bind="reveal(5)">
          با ثبت ایمیل، از زمان دسترسی و خبرهای رونمایی باخبر می‌شوید.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import EmailForm from "@/components/landing/sections/EmailForm.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

defineEmits(["scroll-to-cta"]);

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef, 0);

const handleSubmit = () => {};
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// HeroSection
// WHY notes:
// - Floating icon sizes use --icon-size custom property to avoid
//   repeating width + height declarations on each modifier.
// - hero__badge-news renamed to hero__badge-label (clearer intent).
// - respond-to() mixin replaces raw @media blocks.
// ─────────────────────────────────────────────────────────────

.hero {
  padding-top: 8rem;
  padding-bottom: $spacing-3xl;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;

  // ── Floating icon layer ───────────────────────────────────

  &__icons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  &__icon {
    position: absolute;
    // WHY: CSS custom property for size avoids duplicating
    // width + height on every modifier class.
    --icon-size: 80px;
    width: var(--icon-size);
    height: var(--icon-size);
    opacity: 0.4;
    filter: brightness(0.8);
    animation: float 20s infinite ease-in-out;

    &--1 {
      top: 31%;
      left: 15%;
      animation-duration: 18s;
      --rotation: -15deg;
    }
    &--2 {
      top: 38%;
      left: 25%;
      animation-delay: -3s;
      animation-duration: 22s;
      --rotation: 8deg;
      --icon-size: 60px;
    }
    &--3 {
      top: 30%;
      left: 64%;
      animation-delay: -6s;
      animation-duration: 20s;
      --rotation: -25deg;
      --icon-size: 70px;
    }
    &--4 {
      top: 23%;
      right: 21%;
      animation-delay: -9s;
      animation-duration: 24s;
      --rotation: 12deg;
    }
    &--5 {
      top: 57%;
      left: 21%;
      animation-delay: -12s;
      animation-duration: 19s;
      --rotation: 18deg;
      --icon-size: 65px;
    }
    &--6 {
      top: 44%;
      right: 23%;
      animation-delay: -15s;
      animation-duration: 21s;
      --rotation: -8deg;
      --icon-size: 75px;
    }
    &--7 {
      top: 22%;
      right: 60%;
      animation-delay: -18s;
      animation-duration: 23s;
      --rotation: 22deg;
      --icon-size: 70px;
    }
  }

  // ── Container ─────────────────────────────────────────────

  &__container {
    max-width: rem(1200);
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-xl;
    position: relative;
    z-index: 1;
  }

  // ── Content ───────────────────────────────────────────────

  &__content {
    text-align: center;
    max-width: rem(700);
  }

  // ── Badge ─────────────────────────────────────────────────

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.625rem;
    border: 1px solid $color-border-primary;
    border-radius: $radius-sm;
    color: $color-text-hero;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-lg;
    backdrop-filter: blur(10px);
  }

  &__badge-label {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: $radius-sm;
    border: 1px solid $color-border-primary;
    color: $color-text-hero;
  }

  // ── Title ─────────────────────────────────────────────────

  &__title {
    font-size: $font-size-5xl;
    font-weight: $font-weight-bold;
    line-height: 1.2;
    margin-bottom: $spacing-md;
    letter-spacing: -0.02em;
    color: $color-text-primary;
  }

  &__title-highlight {
    color: $color-accent-primary;
    display: inline-block;
  }

  // ── Description ───────────────────────────────────────────

  &__description {
    font-size: $font-size-xl;
    line-height: 1.6;
    color: #e9d7fe;
    margin-bottom: $spacing-md;
  }

  // ── Note ──────────────────────────────────────────────────

  &__note {
    font-size: $font-size-sm;
    color: $color-text-tertiary;
    margin-top: 0.25rem;
    text-align: right;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .hero {
    &__content {
      max-width: rem(600);
    }

    &__icon {
      --icon-size: 60px;

      &--2,
      &--5 {
        --icon-size: 50px;
      }
      &--3,
      &--7 {
        --icon-size: 55px;
      }
    }
  }
}

@include respond-to(sm) {
  .hero {
    padding-top: 6rem;
    padding-bottom: $spacing-2xl;

    &__container {
      padding: 0 1.5rem;
      gap: $spacing-xl;
    }

    &__content {
      max-width: 100%;
    }

    &__title {
      font-size: clamp(1.75rem, 8vw, 2rem);
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: $font-size-md;
      margin-bottom: $spacing-lg;
    }

    &__icon {
      --icon-size: 50px;
      opacity: 0.3;

      &--2,
      &--5 {
        --icon-size: 40px;
      }
      &--3,
      &--6,
      &--7 {
        display: none;
      }
    }
  }
}
</style>
