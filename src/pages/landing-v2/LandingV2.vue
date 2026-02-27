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

  // A single div behind everything — just a gradient, no blur
  // This is the only honest solution: backdrop-filter cannot be masked
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    // Tall enough to fade naturally, but clipped by overflow
    height: rem(120);
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
