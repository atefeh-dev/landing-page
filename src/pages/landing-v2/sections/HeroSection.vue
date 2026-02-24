<template>
  <section class="hero" ref="sectionRef">
    <!-- Floating document icons -->
    <div class="hero__icons" aria-hidden="true">
      <img
        src="@/assets/images/landing/float-icon-1.svg?url"
        alt=""
        class="hero__icon hero__icon--1"
      />
      <img
        src="@/assets/images/landing/float-icon-2.svg?url"
        alt=""
        class="hero__icon hero__icon--2"
      />
      <img
        src="@/assets/images/landing/float-icon-3.svg?url"
        alt=""
        class="hero__icon hero__icon--3"
      />
      <img
        src="@/assets/images/landing/float-icon-4.svg?url"
        alt=""
        class="hero__icon hero__icon--4"
      />
      <img
        src="@/assets/images/landing/float-icon-5.svg?url"
        alt=""
        class="hero__icon hero__icon--5"
      />
      <img
        src="@/assets/images/landing/float-icon-6.svg?url"
        alt=""
        class="hero__icon hero__icon--6"
      />
      <img
        src="@/assets/images/landing/float-icon-7.svg?url"
        alt=""
        class="hero__icon hero__icon--7"
      />
      <img
        src="@/assets/images/landing/float-icon-8.svg?url"
        alt=""
        class="hero__icon hero__icon--8"
      />
      <img
        src="@/assets/images/landing/float-icon-9.svg?url"
        alt=""
        class="hero__icon hero__icon--9"
      />
      <img
        src="@/assets/images/landing/float-icon-10.svg?url"
        alt=""
        class="hero__icon hero__icon--10"
      />
    </div>

    <!-- Above-fold content -->
    <div class="lv2-container">
      <div class="hero__content">
        <div class="hero__badge" v-bind="anim(1)">
          <span class="hero__badge-pill">
            <img
              src="@/assets/ui/green-dot.svg?url"
              alt=""
              aria-hidden="true"
            />
            <span>چه خبر؟</span>
          </span>
          <span>از امروز لیست انتظار باز است</span>
        </div>

        <h1 class="hero__title" v-bind="anim(2)">
          قراردادهای خود را <span class="lv2-highlight">دقیق</span> و<br />
          <span class="lv2-highlight"> بدون ابهام </span>
          تنظیم کنید.
        </h1>

        <p class="hero__description" v-bind="anim(3)">
          در <span class="lv2-highlight">زونکن</span> به قالب‌های استاندارد
          حقوقی دسترسی دارید، اطلاعات موردنیاز را وارد می‌کنید،<br />
          و قرارداد شما در یک مسیر مشخص و شفاف تنظیم می‌شود.
        </p>

        <div class="hero__form" v-bind="anim(4)">
          <EmailForm
            button-text="پیوستن به لیست انتظار"
            note="نسخه‌ی اولیه به زودی در دسترس می‌گیرد."
          />
        </div>
      </div>
    </div>

    <!-- Demo browser -->
    <div class="lv2-container">
      <div class="hero__demo" v-bind="anim(6)">
        <div class="hero__demo-label">
          <span>قرارداد شما، مرحله به مرحله</span>
          <img
            src="@/assets/images/landing/approval.svg?url"
            class="hero__demo-icon"
            alt=""
            aria-hidden="true"
          />
        </div>
        <BrowserMockup
          url="zoonkan.com/template/NDA"
          src="https://zoonkan.com/template/NDA"
          iframe-title="نمایش زنده زونکن"
          height="744px"
          theme="light"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import EmailForm from "../components/EmailForm.vue";
import BrowserMockup from "@/components/base/BrowserMockup.vue";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef, 0);

function anim(n) {
  return reveal(n);
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.hero {
  padding-top: rem(140);
  padding-bottom: rem(30);
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;

  // ── Floating icons ────────────────────────────────────────────────
  &__icons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  &__icon {
    position: absolute;
    --sz: 60px;
    width: var(--sz);
    height: var(--sz);
    animation: lv2-float 20s infinite ease-in-out;

    // Durations are prime-adjacent — icons never re-sync.
    // Delays are spread unevenly so no two share the same phase.
    &--1 {
      top: 13%;
      left: 15%;
      animation-duration: 36s;
      animation-delay: -4s;
    }
    &--2 {
      top: 24%;
      left: 13%;
      animation-duration: 46s;
      animation-delay: -16s;
    }
    &--3 {
      top: 18%;
      left: 21%;
      animation-duration: 38s;
      animation-delay: -28s;
    }
    &--4 {
      top: 10%;
      left: 24%;
      animation-duration: 50s;
      animation-delay: -10s;
    }
    &--5 {
      top: 12%;
      right: 24%;
      animation-duration: 42s;
      animation-delay: -22s;
    }
    &--6 {
      top: 20%;
      right: 20%;
      animation-duration: 54s;
      animation-delay: -34s;
      --rotation: -14deg;
    }
    &--7 {
      top: 27%;
      right: 23%;
      animation-duration: 44s;
      animation-delay: -6s;
    }
    &--8 {
      top: 15%;
      right: 12%;
      animation-duration: 58s;
      animation-delay: -40s;
      --rotation: -18deg;
    }
    &--9 {
      top: 26%;
      right: 14%;
      animation-duration: 34s;
      animation-delay: -14s;
      --rotation: 16deg;
    }
    &--10 {
      top: 27%;
      left: 22%;
      animation-duration: 40s;
      animation-delay: -26s;
    }
  }

  // ── Content block ──────────────────────────────────────────────────

  &__content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: rem(760);
    margin: 0 auto;
  }

  // ── Badge ─────────────────────────────────────────────────────────

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: rem(8);
    padding: rem(8);
    border: 1px solid $color-border-primary;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    margin-bottom: $spacing-lg;
  }

  &__badge-pill {
    display: inline-flex;
    align-items: center;
    gap: rem(4);
    padding: rem(6) rem(8);
    color: $color-text-secondary;
    border: 1px solid $color-border-primary;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
  }

  // ── Title ────────────────────────────────────────────────────────────

  &__title {
    font-size: clamp(rem(36), 6vw, rem(64));
    font-weight: $font-weight-bold;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
  }

  // ── Description ───────────────────────────────────────────────────

  &__description {
    font-size: $font-size-lg;
    line-height: 1.8;
    color: $color-text-secondary;
    margin-bottom: rem(28);
  }

  // ── Note ──────────────────────────────────────────────────────────────

  &__note {
    font-size: $font-size-sm;
    color: $color-text-tertiary;
    margin-top: rem(14);
  }

  // ── Demo ──────────────────────────────────────────────────────────────

  &__demo {
    position: relative;
    z-index: 1;
    margin-top: rem(64);
    width: rem(1000);
    height: rem(696);
    max-width: 100%; // never overflow on smaller screens
    margin-left: auto;
    margin-right: auto;
  }

  &__browser-wrap {
    display: block;
    width: rem(1100);
    max-width: calc(100% - rem(48));
    margin: 0 auto;
  }

  &__demo-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8);
    direction: rtl;
    font-size: $font-size-3xl;
    font-weight: $font-weight-semibold;
    margin-bottom: rem(20);
    color: #fff;
  }

  &__demo-icon {
    height: rem(50);
    width: auto;
    flex-shrink: 0;
    display: block;
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

  &__browser-bar {
    display: flex;
    align-items: center;
    gap: rem(8);
    padding: rem(12) rem(16);
    background: $color-bg-tertiary;
    border-bottom: 1px solid $color-border-subtle;
  }

  &__dot {
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
    gap: rem(5);
    flex: 1;
    justify-content: center;
    max-width: rem(280);
    margin: 0 auto;
    padding: rem(4) rem(12);
    background: $color-bg-secondary;
    border: 1px solid $color-border-subtle;
    border-radius: $radius-sm;
    color: $color-text-tertiary;
    font-size: $font-size-xs;
  }

  &__browser-actions {
    display: flex;
    gap: rem(10);
    color: $color-text-muted;
    opacity: 0.6;
    margin-right: auto;
  }

  &__browser-content {
    position: relative;
    width: 100%;
    height: rem(540);
    background: #f5f5f5;
  }

  &__iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
}

// ── Responsive ─────────────────────────────────────────────────────────────

@include respond-to(lg) {
  .hero {
    &__browser-content {
      height: rem(440);
    }
    &__icon {
      --sz: 54px;
    }
  }
}

@include respond-to(md) {
  .hero {
    padding-top: rem(100);
    &__demo {
      margin-top: $spacing-2xl;
    }
    &__browser-content {
      height: rem(360);
    }
    &__demo-label {
      font-size: $font-size-xl;
    }
    &__demo-icon {
      height: rem(38);
    }
    &__icons {
      display: none;
    }
  }
}

@include respond-to(sm) {
  .hero {
    padding-top: rem(80);
    padding-bottom: rem(48);

    &__content {
      max-width: 100%;
    }
    &__title {
      font-size: clamp(rem(28), 8vw, rem(44));
    }
    &__description {
      font-size: $font-size-md;
    }
    &__demo {
      margin-top: $spacing-xl;
    }
    &__demo-label {
      font-size: $font-size-md;
    }
    &__demo-icon {
      height: rem(28);
    }
    &__browser-content {
      height: rem(260);
    }
    &__browser-actions {
      display: none;
    }

    // icons hidden via md rule above
  }
}
</style>
