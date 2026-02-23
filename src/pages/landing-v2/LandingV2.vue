<template>
  <div class="lv2">
    <!-- Topbar -->
    <header class="lv2-topbar" aria-label="سربرگ">
      <span class="lv2-topbar__tagline">اسناد<br />در مسیر درست</span>
      <a href="#" class="lv2-topbar__logo" aria-label="صفحه اصلی زونکن">
        <img src="@/assets/brand/logo-dark-mode.svg?url" alt="زونکن" />
      </a>
    </header>

    <main>
      <HeroSection />
      <OperationSection />
      <ApproachSection />
      <CtaSection />
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import HeroSection from "./sections/HeroSection.vue";
import OperationSection from "./sections/OperationSection.vue";
import ApproachSection from "./sections/ApproachSection.vue";
import CtaSection from "./sections/CtaSection.vue";
import FooterSection from "./sections/FooterSection.vue";
</script>

<style lang="scss">
// Page-level global import — scoped to this page only via .lv2 root
@use "./landing-v2.scss";
</style>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

// ── Topbar ────────────────────────────────────────────────────
// Fixed corners only — not a full navbar.

.lv2-topbar {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: rem(20) rem(24);
  pointer-events: none;
  // WHY: fixed topbar over scrolling content needs a backdrop,
  // otherwise page content bleeds through. backdrop-filter gives
  // the frosted glass effect without a hard color edge.
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 10, 0.85) 0%,
    rgba(10, 10, 10, 0) 100%
  );

  &__tagline {
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    color: $color-accent-primary;
    line-height: 1.5;
    text-align: right;
    pointer-events: auto;
  }

  &__logo {
    pointer-events: auto;
    display: block;

    img {
      width: rem(38);
      height: auto;
    }
  }
}

@include respond-to(sm) {
  .lv2-topbar {
    padding: rem(16) rem(16);

    &__logo img {
      width: rem(32);
    }
  }
}
</style>
