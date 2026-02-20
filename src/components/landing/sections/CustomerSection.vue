<template>
  <section class="section section--customers" id="customers" ref="sectionRef">
    <div class="customers">
      <!-- RIGHT column: text (first in DOM = right side in RTL) -->
      <div class="customers__content" v-bind="reveal(1)">
        <span class="section__badge" v-bind="slideDown(1)">مخاطبان</span>

        <h2 class="section__title" v-bind="reveal(2)">
          برای کسانی که<br />
          اسناد را جدی می‌گیرند.
        </h2>

        <div class="customers__description" v-bind="reveal(3)">
          <p>
            زونکن امروز بیشتر برای افراد مستقل و کسب‌وکارهای کوچک طراحی شده؛
            جایی که نظم در اسناد، تفاوت واقعی ایجاد می‌کند.
          </p>
          <p>ما از تیم‌های کوچک شروع کرده‌ایم، اما بزرگ فکر می‌کنیم.</p>
        </div>
      </div>

      <!-- LEFT column: image bleeds to left viewport edge (second in DOM = left in RTL) -->
      <div class="customers__visual" v-bind="reveal(4)">
        <img :src="DashboardImg" alt="داشبورد زونکن" class="customers__image" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import DashboardImg from "@/assets/images/dashboard.png";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal, slideDown } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// CustomerSection
// RTL LAYOUT LOGIC:
//   Page is direction:rtl. In RTL flex, first DOM child = RIGHT.
//   So: content first in DOM → appears on RIGHT (correct ✓)
//       visual second in DOM → appears on LEFT  (correct ✓)
//   No direction override needed — RTL does the right thing.
// ─────────────────────────────────────────────────────────────

.section--customers {
  background: $color-bg-primary;
  overflow: visible; // allow left-bleed past section edge
  padding-top: $spacing-2xl;
  padding-bottom: $spacing-2xl;
  min-height: 0;
}

.customers {
  display: flex;
  align-items: stretch;

  &__visual {
    flex: 0 0 48%;
    overflow: hidden;
    // Only right side gets rounded corners; left is raw viewport edge
    border-radius: 0 $radius-xl $radius-xl 0;
    border: 1px solid $color-border-subtle;
    border-left: none;
    box-shadow: $shadow-xl;
    min-height: rem(500);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
    display: block;
  }

  // ── Right column: text content ─────────────────────────────

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: flex-start keeps children at their natural RTL start (= right side)
    align-items: flex-start;
    padding: $spacing-2xl $spacing-2xl $spacing-2xl $spacing-xl;
    text-align: right;
  }

  // ── Badge — scoped to avoid global section__badge bleed ────
  // WHY scoped: the global .section__badge has no width constraint
  // inside a flex column. Scoping lets us use display:inline-block
  // which shrinks to content width correctly.

  &__description {
    font-size: rem(24);
    line-height: 1.8;
    color: #f7f7f7;

    p {
      margin-bottom: $spacing-md;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .customers {
    &__visual {
      flex: 0 0 50%;
      min-height: rem(440);
    }
    &__content {
      padding: $spacing-xl $spacing-xl $spacing-xl $spacing-lg;
    }
    &__title {
      font-size: clamp(1.5rem, 4vw, 2.25rem);
    }
  }
}

@include respond-to(md) {
  .section--customers {
    overflow: hidden;
    padding: $spacing-xl 0;
  }

  .customers {
    flex-direction: column; // stack: content on top, image below

    &__visual {
      flex: none;
      width: calc(100% - #{$spacing-lg} * 2);
      min-height: rem(280);
      border-radius: $radius-xl;
      border: 1px solid $color-border-subtle;
      margin: 0 auto;
    }

    &__content {
      flex: none;
      width: 100%;
      align-items: center;
      text-align: center;
      padding: $spacing-lg;
    }

    &__title {
      font-size: clamp(1.5rem, 5vw, 1.875rem);
    }
    &__title-highlight {
      display: inline;
    }
    &__description {
      text-align: center;
    }
  }
}

@include respond-to(sm) {
  .section--customers {
    padding: $spacing-lg 0;
  }

  .customers {
    &__visual {
      width: calc(100% - #{$spacing-md} * 2);
      min-height: rem(200);
      border-radius: $radius-md;
    }

    &__content {
      padding: $spacing-md;
    }

    &__title {
      font-size: clamp(1.375rem, 6vw, 1.75rem);
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: $font-size-md;
      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}
</style>
