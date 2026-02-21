<template>
  <!--
    LANDING V1 — frozen snapshot of the original design.
    Do NOT modify. This is the reference for "bring back the old design".
    Route: /v1
  -->
  <div class="lv1" dir="rtl">
    <NavBar @scroll-to-cta="scrollToCta" />
    <main>
      <HeroSection />
      <PhilosophySection />
      <TweetTestimonials />
      <OperationSection />
      <CustomerSection />
      <FaqSection />
      <CtaSection ref="ctaRef" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "./sections/NavBar.vue";
import HeroSection from "./sections/HeroSection.vue";
import PhilosophySection from "./sections/PhilosophySection.vue";
import TweetTestimonials from "./sections/TweetTestimonials.vue";
import OperationSection from "./sections/OperationSection.vue";
import CustomerSection from "./sections/CustomerSection.vue";
import FaqSection from "./sections/FaqSection.vue";
import CtaSection from "./sections/CtaSection.vue";
import FooterSection from "./sections/FooterSection.vue";

const ctaRef = ref(null);
function scrollToCta() {
  ctaRef.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style lang="scss">
// V1 imports its own complete style system — zero overlap with V2
@use "./landing-v1.scss";
</style>
