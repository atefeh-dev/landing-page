<template>
  <div class="lv2">
    <header
      class="lv2-topbar"
      :class="{ 'lv2-topbar--scrolled': scrolled }"
      aria-label="سربرگ"
    >
      <a href="#" class="lv2-topbar__logo" aria-label="صفحه اصلی زونکن">
        <img src="@/assets/brand/logo-dark-mode.svg?url" alt="زونکن" />
      </a>
      <span class="lv2-topbar__tagline">
        <img
          src="@/assets/brand/catchphrase.svg?url"
          alt="اسناد در مسیر درست"
        />
      </span>
    </header>

    <main>
      <HeroSection />
      <ApproachSection />
      <CtaSection />
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import HeroSection from "./sections/HeroSection.vue";
import ApproachSection from "./sections/ApproachSection.vue";
import CtaSection from "./sections/CtaSection.vue";
import FooterSection from "./sections/FooterSection.vue";

const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 60;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style lang="scss">
@use "./landing-v2.scss";
</style>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.lv2-topbar {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: rem(30);
  pointer-events: none;
  background: none;
  // No height set — topbar is only as tall as logo content
  // This prevents it from covering the mockup chrome below

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // Gradient overflows visually but pointer-events:none = never blocks
    height: rem(130);
    background: linear-gradient(
      to bottom,
      #0a0a0a 0%,
      rgba(10, 10, 10, 0) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  &__logo,
  &__tagline {
    position: relative;
    z-index: 1;
  }

  &__logo {
    pointer-events: auto;
    display: block;
    flex-shrink: 0;

    img {
      display: block;
      width: rem(28);
      height: auto;
    }
  }

  &__tagline {
    pointer-events: auto;
    display: block;
    flex-shrink: 0;

    img {
      display: block;
      width: rem(123);
      height: rem(60);
      object-fit: contain;
      object-position: right center;
    }
  }
}

@include respond-to(md) {
  .lv2-topbar {
    padding: rem(20) rem(24);

    // Tablet: solid dark + blur — safe because bg is always dark here
    &::after {
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      height: 100%;
    }

    &__logo img {
      width: rem(28);
    }
    &__tagline img {
      width: rem(100);
      height: rem(48);
    }
  }
}

@include respond-to(sm) {
  .lv2-topbar {
    padding: rem(16) rem(16);

    // Mobile: solid dark + strong blur — content scrolls under, blur hides it cleanly
    &::after {
      background: rgba(10, 10, 10, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      height: 100%;
    }

    &__logo img {
      width: rem(24);
    }
    &__tagline img {
      width: rem(80);
      height: rem(40);
    }
  }
}
</style>
