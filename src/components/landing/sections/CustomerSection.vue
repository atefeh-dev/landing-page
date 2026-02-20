<template>
  <section class="section section--customers" id="customers" ref="sectionRef">
    <div class="customers">
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
//   content first in DOM → appears on RIGHT (correct ✓)
//   visual second in DOM → appears on LEFT  (correct ✓)
// WHY notes:
// - Added md breakpoint for customers__description to smooth the
//   jump from rem(24) desktop to rem(16) mobile (was too abrupt).
// ─────────────────────────────────────────────────────────────

.section--customers {
  background: $color-bg-primary;
  overflow: visible;
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

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: $spacing-2xl $spacing-2xl $spacing-2xl $spacing-xl;
    text-align: right;
  }

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
  }
}

@include respond-to(md) {
  .section--customers {
    overflow: hidden;
    padding: $spacing-xl 0;
  }

  .customers {
    flex-direction: column;

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

    // FIX: added md step — description was jumping directly from
    // rem(24) to rem(16) with no intermediate size at tablet.
    &__description {
      font-size: rem(18);
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

    &__description {
      font-size: $font-size-md;

      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}
</style>
