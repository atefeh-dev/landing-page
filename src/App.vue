<template>
  <div class="app">
    <NavBar @scroll-to-cta="scrollToCta" />
    <HeroSection @scroll-to-cta="scrollToCta" />
    <PhilosophySection />
    <ApproachSection />
    <ProblemsSection />
    <FeaturesSection />
    <UseCasesSection />
    <TweetTestimonials />
    <TestimonialQuote />
    <FaqSection />
    <CtaSection ref="ctaSectionRef" />
    <FooterSection />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import PhilosophySection from "./components/PhilosophySection.vue";
import ApproachSection from "./components/ApproachSection.vue";
import ProblemsSection from "./components/ProblemsSection.vue";
import FeaturesSection from "./components/FeaturesSection.vue";
import UseCasesSection from "./components/UseCasesSection.vue";
import TweetTestimonials from "./components/TweetTestimonials.vue";
import TestimonialQuote from "./components/TestimonialQuote.vue";
import FaqSection from "./components/FaqSection.vue";
import CtaSection from "./components/CtaSection.vue";
import FooterSection from "./components/FooterSection.vue";

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
