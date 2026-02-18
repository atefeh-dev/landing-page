<template>
  <section class="section section--cta" id="cta" ref="sectionRef">
    <div class="section__container section__container--narrow">
      <div class="cta" v-bind="reveal()">
        <h2 class="cta__title" v-bind="reveal(1)">
          ما هنوز در حال ساختن هستیم.
        </h2>

        <p class="cta__description" v-bind="reveal(2)">
          <span class="highlight">زونکن</span> در ابتدای مسیر است. ما آن را با
          کمک آدم‌های واقعی توسعه می‌دهیم، گوش می‌دهیم، اصلاح می‌کنیم و جلو
          می‌رویم.
        </p>

        <p class="cta__description" v-bind="reveal(3)">
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
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
// ── Section modifier ───────────────────────────────────────────

.section--cta {
  background: linear-gradient(
    180deg,
    #111111 0%,
    #0d0a0f 50%,
    $color-bg-primary 100%
  );
}

// ── CTA block ──────────────────────────────────────────────────

.cta {
  text-align: center;
  padding: $spacing-3xl $spacing-xl;
  max-width: 800px;
  margin: 0 auto;

  // ── Title ─────────────────────────────────────────────────

  &__title {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: $font-weight-bold;
    line-height: 1.3;
    margin-bottom: $spacing-lg;
    color: $color-text-primary;
  }

  // ── Description ───────────────────────────────────────────

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

// ── Responsive ─────────────────────────────────────────────────

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
