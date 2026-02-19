<template>
  <section class="section section--approach" id="approach" ref="sectionRef">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge" v-bind="slideDown()">رویکرد</span>
        <div class="section__title-wrapper" v-bind="reveal(1)">
          <h2 class="section__title reduce-gap">
            اسناد فقط <span class="highlight">متن </span> نیستند.
          </h2>
        </div>
      </div>

      <p class="section__conclusion" v-bind="reveal(4)">
        هر
        <span class="highlight">سند</span>
        یک مسیر دارد؛ از ایجاد تا بررسی، از اصلاح تا تأیید، و در نهایت نگه‌داری.
        <br /><span class="highlight">زونکن</span>
        برای همراهی اسناد در تمام طول این مسیر ساخته شده است.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal, slideDown } = useScrollAnimation(sectionRef, 0.1);
</script>

<style lang="scss" scoped>
.section--approach {
  @include section-dark-gradient;
  position: relative;
  overflow: hidden;
}

.reduce-gap {
  margin-bottom: $spacing-lg;
}
</style>
