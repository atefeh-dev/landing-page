<template>
  <div class="app">
    <NavBar @scroll-to-cta="scrollToCta" />
    <HeroSection @scroll-to-cta="scrollToCta" />
    <PhilosophySection />
    <TweetTestimonials />
    <CustomerSection />
    <FaqSection />
    <CtaSection ref="ctaSectionRef" />
    <FooterSection />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/components/landing/sections/NavBar.vue";
import HeroSection from "@/components/landing/sections/HeroSection.vue";
import PhilosophySection from "@/components/landing/sections/PhilosophySection.vue";
import CustomerSection from "@/components/landing/sections/CustomerSection.vue";
import TweetTestimonials from "@/components/landing/sections/TweetTestimonials.vue";
import FaqSection from "@/components/landing/sections/FaqSection.vue";
import CtaSection from "@/components/landing/sections/CtaSection.vue";
import FooterSection from "@/components/landing/sections/FooterSection.vue";

const ctaSectionRef = ref(null);

function scrollToCta() {
  if (ctaSectionRef.value?.ctaEl) {
    ctaSectionRef.value.ctaEl.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style lang="scss">
.app {
  min-height: 100vh;
}
</style>
