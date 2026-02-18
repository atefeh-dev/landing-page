<template>
  <section class="section section--philosophy" id="philosophy" ref="sectionRef">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge" v-bind="slideDown()">مسئله</span>
        <div class="section__title-wrapper" v-bind="reveal(1)">
          <h2 class="section__title">
            مسئله فقط <span class="highlight">یک قرارداد</span> نیست.
          </h2>
        </div>
      </div>

      <div class="philosophy__cards">
        <div class="philosophy__card" v-bind="reveal(1)">
          <div class="philosophy__card-icon">
            <img src="@/assets/ui/notion.svg" alt="Notion" />
          </div>
          <p class="philosophy__card-text">
            خیلی از همکاری‌ها بدون سند شروع می‌شوند.
          </p>
        </div>

        <div class="philosophy__card" v-bind="reveal(2)">
          <div class="philosophy__card-icon">
            <img src="@/assets/ui/slack.svg" alt="Slack" />
          </div>
          <p class="philosophy__card-text">
            خیلی از قرارداده با عجله نوشته می‌شوند.
          </p>
        </div>

        <div class="philosophy__card" v-bind="reveal(3)">
          <div class="philosophy__card-icon">
            <img src="@/assets/ui/slack.svg" alt="Slack" />
          </div>
          <p class="philosophy__card-text">
            خیلی از فایل‌ها میان پیام‌ها، ایمیل‌ها و نسخه‌های مختلف گم می‌شوند.
          </p>
        </div>
      </div>

      <p class="section__conclusion" v-bind="reveal(4)">
        <span>نتیجه؟</span><br />
        سوءتفاهم‌ها، اختلاف، و بی‌اعتمادی از جایی شروع می‌شوند که
        <span class="highlight">سندها مسیر مشخصی ندارند.</span>
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

.section--philosophy {
  background: linear-gradient(180deg, #111111 0%, #0d0a0f 50%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

// ── Cards grid ─────────────────────────────────────────────────

.philosophy__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  max-width: 1000px;
  margin: 0 auto $spacing-xl;
  padding: 0 $spacing-lg;
}

// ── Card block ─────────────────────────────────────────────────

.philosophy__card {
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
  .philosophy__cards {
    gap: $spacing-lg;
    margin-bottom: $spacing-2xl;
    padding: 0 $spacing-md;
  }

  .philosophy__card {
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
  .philosophy__cards {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin-bottom: $spacing-xl;

    .philosophy__card:last-child {
      grid-column: 1 / -1;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .philosophy__card {
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
  .philosophy__cards {
    grid-template-columns: 1fr;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
    padding: 0;

    .philosophy__card:last-child {
      grid-column: auto;
      max-width: 100%;
    }
  }

  .philosophy__card {
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
