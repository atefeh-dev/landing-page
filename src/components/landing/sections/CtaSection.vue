<template>
  <section class="section section--cta" ref="sectionRef">
    <div class="section__container section__container--narrow">
      <div class="cta animate-fade-up" :class="{ 'in-view': isVisible }">
        <h2
          class="cta__title animate-fade-up animate-delay-1"
          :class="{ 'in-view': isVisible }"
        >
          ما هنوز در حال ساختن هستیم.
        </h2>

        <p
          class="cta__description animate-fade-up animate-delay-2"
          :class="{ 'in-view': isVisible }"
        >
          <span class="highlight">زونکن</span> در ابتدای مسیر است. ما آن را با
          کمک آدم‌های واقعی توسعه می‌دهیم، گوش می‌دهیم، اصلاح می‌کنیم و جلو
          می‌رویم.
        </p>

        <p
          class="cta__description animate-fade-up animate-delay-3"
          :class="{ 'in-view': isVisible }"
        >
          اگر همراه این مسیر باشید، نظر شما بخشی از شکل‌گیری زونکن خواهد بود.
        </p>

        <EmailForm />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import EmailForm from "@/components/landing/sections/EmailForm.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { isVisible } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
.section--cta {
  background: $color-bg-primary;
}

.cta {
  text-align: center;
  padding: $spacing-3xl $spacing-xl;
  max-width: 800px;
  margin: 0 auto;

  &__title {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: $font-weight-bold;
    line-height: 1.3;
    margin-bottom: $spacing-lg;
    color: $color-text-primary;
  }

  &__description {
    font-size: 1.125rem;
    line-height: 1.8;
    color: $color-text-secondary;
    margin-bottom: $spacing-md;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;

    &:last-of-type {
      margin-bottom: $spacing-xl;
    }
  }
}

@media (max-width: $breakpoint-lg) {
  .cta {
    padding: $spacing-2xl $spacing-lg;
    &__title {
      font-size: clamp(1.5rem, 4vw, 2rem);
    }
    &__description {
      font-size: 1.0625rem;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .section--cta {
    padding: $spacing-2xl 0;
  }

  .cta {
    padding: $spacing-xl $spacing-md;

    &__title {
      font-size: clamp(1.5rem, 6vw, 1.75rem);
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: 1rem;
      margin-bottom: $spacing-sm;
      &:last-of-type {
        margin-bottom: $spacing-lg;
      }
    }
  }
}
</style>
