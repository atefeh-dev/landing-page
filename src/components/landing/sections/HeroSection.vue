<template>
  <section class="hero" id="hero" ref="sectionRef">
    <!-- Floating decorative icons — static, no animation -->
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

    <!-- Above-fold content -->
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
          بیشتر اختلاف‌های کاری از نبود یک سند شفاف شروع می‌شوند.<br />
          <span class="highlight">زونکن</span>
          از همین تجربه شکل گرفت؛ برای اینکه اسناد، از همان ابتدا در مسیر درست
          قرار بگیرند.
        </p>

        <EmailForm @submit="handleSubmit" />

        <p class="hero__note" v-bind="reveal(5)">
          با ثبت ایمیل، از زمان دسترسی و خبرهای رونمایی باخبر می‌شوید.
        </p>
      </div>
    </div>

    <!-- Demo browser mockup — shown below the fold -->
    <div class="hero__demo" v-bind="reveal(6)">
      <div class="hero__browser">
        <div class="hero__browser-bar">
          <span class="hero__browser-dot hero__browser-dot--red"></span>
          <span class="hero__browser-dot hero__browser-dot--yellow"></span>
          <span class="hero__browser-dot hero__browser-dot--green"></span>
          <div class="hero__browser-url">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
              />
            </svg>
            <span>zoonkan.com/template/NDA</span>
          </div>
        </div>
        <div class="hero__browser-content">
          <iframe
            src="https://zoonkan.com/template/NDA"
            title="نمایش زنده زونکن"
            loading="lazy"
            class="hero__iframe"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
      </div>
      <p class="hero__demo-caption">
        این همان مسیری است که سال‌ها جایش خالی بود.
      </p>
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
// - Icons are static (no animation) per design requirement.
// - Opacity varies per icon (0.70–0.90) for visual depth.
// - Demo browser mockup uses an iframe sized to show content large.
// - All backgrounds solid $color-bg-primary (no gradients).
// ─────────────────────────────────────────────────────────────

.hero {
  padding-top: rem(128);
  padding-bottom: $spacing-2xl;
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;

  // ── Floating icon layer ───────────────────────────────────
  // WHY static: animation removed per design requirement.
  // WHY varying opacity: mixed 0.70–0.90 range gives depth.

  &__icons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  &__icon {
    position: absolute;
    --icon-size: 72px;
    width: var(--icon-size);
    height: var(--icon-size);
    filter: brightness(0.9);

    // No animation — static placement

    &--1 {
      top: 11%;
      left: 25%;
      opacity: 0.8;
      --rotation: -15deg;
      transform: rotate(-15deg);
    }
    &--2 {
      top: 14%;
      left: 34%;
      opacity: 0.9;
      --icon-size: 50px;
      transform: rotate(8deg);
    }
    &--3 {
      top: 22%;
      left: 24%;
      opacity: 0.85;
      transform: rotate(-25deg);
    }
    &--4 {
      top: 13%;
      right: 31%;
      opacity: 0.95;

      transform: rotate(12deg);
    }
    &--5 {
      top: 16%;
      right: 19%;
      opacity: 0.8;
      transform: rotate(18deg);
    }
    &--6 {
      top: 23%;
      right: 21%;
      opacity: 0.89;
      transform: rotate(-8deg);
    }
    &--7 {
      top: 18%;
      left: 16%;
      opacity: 0.92;
      transform: rotate(22deg);
    }
  }

  // ── Above-fold container ──────────────────────────────────

  &__container {
    max-width: rem(1200);
    margin: 0 auto;
    padding: 0 $spacing-lg;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  &__content {
    text-align: center;
    max-width: rem(716);
  }

  // ── Badge ─────────────────────────────────────────────────

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: rem(8);
    padding: rem(4) rem(10);
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
    gap: rem(4);
    padding: rem(4) rem(8);
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
    margin-top: rem(16);
    text-align: center;
  }

  // ── Demo section ──────────────────────────────────────────
  // Large browser mockup showing the live product.
  // WHY full-bleed: the mockup needs visual weight — max-width
  // would make it feel small and unconvincing.

  &__demo {
    position: relative;
    z-index: 1;
    margin-top: $spacing-2xl;
    padding: 0 $spacing-lg;
    max-width: rem(960);
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

  &__browser {
    border-radius: $radius-lg;
    overflow: hidden;
    border: 1px solid $color-border-medium;
    background: $color-bg-elevated;
    box-shadow:
      0 rem(32) rem(80) rgba(0, 0, 0, 0.6),
      0 0 0 1px $color-border-subtle;
  }

  // ── Browser chrome bar ────────────────────────────────────

  &__browser-bar {
    display: flex;
    align-items: center;
    gap: rem(8);
    padding: rem(12) rem(16);
    background: $color-bg-tertiary;
    border-bottom: 1px solid $color-border-subtle;

    direction: ltr;
  }

  &__browser-dot {
    width: rem(12);
    height: rem(12);
    border-radius: $radius-full;
    flex-shrink: 0;

    &--red {
      background: #ff5f57;
    }
    &--yellow {
      background: #ffbd2e;
    }
    &--green {
      background: #28ca42;
    }
  }

  &__browser-url {
    display: flex;
    align-items: center;
    gap: rem(6);
    margin: 0 auto;
    padding: rem(4) rem(12);
    background: $color-bg-secondary;
    border: 1px solid $color-border-subtle;
    border-radius: $radius-sm;
    color: $color-text-tertiary;
    font-size: $font-size-xs;
    direction: ltr;
    min-width: rem(200);
    justify-content: center;
  }

  // ── iframe ────────────────────────────────────────────────
  // WHY no padding-bottom aspect ratio: iframe has its own
  // content — let it breathe at a fixed tall height so the
  // product is clearly readable.

  &__browser-content {
    position: relative;
    width: 100%;
    height: rem(560);
    background: #f5f5f5; // light placeholder while iframe loads
  }

  &__iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  // ── Demo caption ──────────────────────────────────────────

  &__demo-caption {
    text-align: center;
    margin-top: $spacing-md;
    font-size: clamp(1rem, 2.5vw, $font-size-2xl);
    font-weight: $font-weight-bold;
    color: $color-text-secondary;
    line-height: 1.5;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .hero {
    &__content {
      max-width: rem(600);
    }
    &__demo {
      max-width: rem(800);
      padding: 0 $spacing-md;
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

    &__browser-content {
      height: rem(460);
    }
  }
}

@include respond-to(md) {
  .hero {
    padding-top: rem(100);
    &__demo {
      padding: 0 $spacing-sm;
    }
    &__browser-content {
      height: rem(380);
    }
  }
}

@include respond-to(sm) {
  .hero {
    padding-top: rem(80);
    padding-bottom: $spacing-xl;

    &__container {
      padding: 0 $spacing-sm;
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

    &__demo {
      margin-top: $spacing-xl;
      padding: 0 $spacing-xs;
    }

    &__browser-content {
      height: rem(280);
    }

    &__demo-caption {
      font-size: $font-size-md;
    }
  }
}
</style>
