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
        . یک مسیر دارد؛ از ایجاد تا بررسی، از اصلاح تا تأیید، و در نهایت
        نگه‌داری.
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
// ── Section modifier ───────────────────────────────────────────

.section--approach {
  background: linear-gradient(180deg, #111111 0%, #0d0a0f 50%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}
.reduce-gap {
  margin-bottom: $spacing-lg;
}

// ── Cards grid ─────────────────────────────────────────────────

.approach__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  max-width: 1000px;
  margin: 0 auto $spacing-xl;
  padding: 0 $spacing-lg;
}

// ── Card block ─────────────────────────────────────────────────

.approach__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &-icon {
    width: 80px;
    height: 80px;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  }

  &-text {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #f7f7f7;
    margin: 0;
    font-weight: $font-weight-semibold;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@media (max-width: $breakpoint-lg) {
  .approach__cards {
    gap: $spacing-lg;
    margin-bottom: $spacing-2xl;
    padding: 0 $spacing-md;
  }

  .approach__card {
    padding: $spacing-lg $spacing-md;
    gap: $spacing-md;

    &-icon {
      width: 70px;
      height: 70px;

      img {
        width: 42px;
        height: 42px;
      }
    }

    &-text {
      font-size: 1rem;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .approach__cards {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin-bottom: $spacing-xl;

    .approach__card:last-child {
      grid-column: 1 / -1;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .approach__card {
    padding: $spacing-md;

    &-icon {
      width: 64px;
      height: 64px;

      img {
        width: 38px;
        height: 38px;
      }
    }

    &-text {
      font-size: 0.9375rem;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .approach__cards {
    grid-template-columns: 1fr;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
    padding: 0;

    .approach__card:last-child {
      grid-column: auto;
      max-width: 100%;
    }
  }

  .approach__card {
    padding: $spacing-md;
    gap: $spacing-md;

    &-icon {
      width: 60px;
      height: 60px;

      img {
        width: 36px;
        height: 36px;
      }
    }

    &-text {
      font-size: 0.875rem;
      line-height: 1.6;
    }
  }
}
</style>
