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
// ─────────────────────────────────────────────────────────────
// PhilosophySection
// WHY: section--philosophy, section--approach, section--cta and
// section--customers all used the identical dark gradient.
// Now all four use @include section-dark-gradient — one change
// updates them all.
// ─────────────────────────────────────────────────────────────

.section--philosophy {
  @include section-dark-gradient;
  position: relative;
  overflow: hidden;
}

// ── Cards ──────────────────────────────────────────────────────
// WHY: card-grid mixin replaces the duplicated grid definition
// that was copy-pasted from ApproachSection verbatim.

.philosophy__cards {
  @include card-grid;
}

.philosophy__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &-icon {
    width: rem(80);
    height: rem(80);
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: rem(48);
      height: rem(48);
      object-fit: contain;
    }
  }

  &-text {
    font-size: $font-size-xl;
    line-height: 1.7;
    color: $color-text-primary;
    margin: 0;
    font-weight: $font-weight-semibold;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .philosophy__cards {
    gap: $spacing-lg;
    margin-bottom: $spacing-2xl;
    padding: 0 $spacing-md;
  }

  .philosophy__card {
    padding: $spacing-lg $spacing-md;
    gap: $spacing-md;

    &-icon {
      width: rem(70);
      height: rem(70);

      img {
        width: rem(42);
        height: rem(42);
      }
    }

    &-text {
      font-size: $font-size-md;
    }
  }
}

@include respond-to(md) {
  .philosophy__cards {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin-bottom: $spacing-xl;

    .philosophy__card:last-child {
      grid-column: 1 / -1;
      max-width: rem(500);
      margin: 0 auto;
    }
  }

  .philosophy__card {
    padding: $spacing-md;

    &-icon {
      width: rem(64);
      height: rem(64);

      img {
        width: rem(38);
        height: rem(38);
      }
    }

    &-text {
      font-size: 0.9375rem;
    }
  }
}

@include respond-to(sm) {
  .philosophy__cards {
    grid-template-columns: 1fr;
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
      width: rem(60);
      height: rem(60);

      img {
        width: rem(36);
        height: rem(36);
      }
    }

    &-text {
      font-size: $font-size-sm;
      line-height: 1.6;
    }
  }
}
</style>
