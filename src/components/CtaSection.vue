<template>
  <section class="section section--cta" ref="ctaEl">
    <div class="section__container section__container--narrow">
      <div class="cta">
        <h2 class="cta__title">ما هنوز در حال ساختن هستیم.</h2>
        <p class="cta__description">
          <span class="highlight">زونکن</span> در ابتدای مسیر است. ما آن را با
          کمک آدم‌های واقعی توسعه می‌دهیم، گوش می‌دهیم، اصلاح می‌کنیم و جلو
          می‌رویم.
        </p>
        <p class="cta__description">
          اگر همراه این مسیر باشید، نظر شما بخشی از شکل‌گیری زونکن خواهد بود.
        </p>

        <EmailForm />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import EmailForm from "./EmailForm.vue";

const ctaEl = ref(null);

defineExpose({ ctaEl });

const scrollToForm = () => {
  // Scroll to hero section form
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.section--cta {
  background: $color-bg-primary;
  padding: $spacing-3xl 0;
}

.cta {
  text-align: center;
  padding: $spacing-3xl $spacing-xl;
  max-width: 800px;
  margin: 0 auto;

  &__title {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-lg;
    color: $color-text-primary;
    line-height: 1.3;
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

  &__actions {
    display: flex;
    gap: $spacing-md;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}

// Tablet
@media (max-width: $breakpoint-lg) {
  .cta {
    padding: $spacing-2xl $spacing-lg;

    &__title {
      font-size: clamp(1.5rem, 4vw, 2rem);
    }

    &__description {
      font-size: 1.0625rem;
    }

    &__actions {
      gap: $spacing-sm;
    }
  }
}

// Mobile
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

    &__actions {
      flex-direction: column;
      width: 100%;
      gap: $spacing-sm;

      .btn {
        width: 100%;
      }
    }
  }
}

// Extra small mobile
@media (max-width: 375px) {
  .cta {
    padding: $spacing-lg $spacing-sm;

    &__title {
      font-size: 1.5rem;
    }

    &__description {
      font-size: 0.9375rem;
    }
  }
}
</style>
