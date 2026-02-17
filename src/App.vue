<template>
  <div class="app">
    <NavBar @scroll-to-cta="scrollToCta" />

    <main>
      <HeroSection />
      <PhilosophySection />
      <TweetTestimonials />
      <CustomersSection />
      <FaqSection />
      <CtaSection ref="ctaRef" />
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref } from "vue";

import NavBar from "@/components/landing/sections/NavBar.vue";
import HeroSection from "@/components/landing/sections/HeroSection.vue";
import PhilosophySection from "@/components/landing/sections/PhilosophySection.vue";
import TweetTestimonials from "@/components/landing/sections/TweetTestimonials.vue";
import CustomersSection from "@/components/landing/sections/CustomerSection.vue";
import FaqSection from "@/components/landing/sections/FaqSection.vue";
import CtaSection from "@/components/landing/sections/CtaSection.vue";
import FooterSection from "@/components/landing/sections/FooterSection.vue";

const ctaRef = ref(null);

function scrollToCta() {
  // ctaRef.value is the component instance.
  // $el is the root DOM element of that component.
  ctaRef.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style lang="scss">
@use "./styles/main.scss";

.app {
  min-height: 100vh;
}
</style>
