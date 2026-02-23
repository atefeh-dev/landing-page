<template>
  <section class="ap" ref="sectionRef">
    <div class="lv2-container">
      <h2 class="ap__title" v-bind="anim(1)">
        این مسیر بر پایه‌ی استانداردهای حقوقی شکل گرفته<br />
        تا تنظیم قرارداد، <span class="lv2-highlight">شفاف</span>،
        <span class="lv2-highlight">دقیق</span> و
        <span class="lv2-highlight">امن</span> باشد
      </h2>

      <div class="ap__grid">
        <div class="ap__card" v-bind="anim(2)">
          <div class="ap__icon">
            <img src="@/assets/ui/slack.svg?url" alt="" aria-hidden="true" />
          </div>
          <h3 class="ap__card-title">ساختارهای استاندارد</h3>
          <p class="ap__card-text">
            قالب‌ها بر اساس چارچوب‌های حقوقی رایج<br />و قابل اتکا تنظیم
            شده‌اند.
          </p>
        </div>

        <div class="ap__card" v-bind="anim(3)">
          <div class="ap__icon">
            <img src="@/assets/ui/notion.svg?url" alt="" aria-hidden="true" />
          </div>
          <h3 class="ap__card-title">مسیر شفاف تنظیم اسناد</h3>
          <p class="ap__card-text">
            از ورود اطلاعات تا نسخه‌ی نهایی،<br />هر مرحله مشخص و قابل پیگیری
            است.
          </p>
        </div>

        <div class="ap__card" v-bind="anim(4)">
          <div class="ap__icon">
            <img src="@/assets/ui/slack.svg?url" alt="" aria-hidden="true" />
          </div>
          <h3 class="ap__card-title">طراحی با رویکرد امنیت</h3>
          <p class="ap__card-text">
            داده‌ها به‌صورت تفکیک‌شده و رمزگاری‌شده نگه‌داری<br />می‌شوند و فایل
            نهایی تنها تولید می‌شود.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef, 0.1);
function anim(n) {
  return reveal(n);
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.ap {
  padding: rem(80) 0;
  background: $color-bg-primary;

  &__title {
    font-size: clamp(rem(20), 3vw, rem(32));
    font-weight: $font-weight-semibold;
    line-height: 1.65;
    color: $color-text-secondary;
    text-align: center;
    max-width: rem(780);
    margin: 0 auto rem(56);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(24);
    max-width: rem(900);
    margin: 0 auto;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: rem(16);
    padding: rem(32) rem(20);
  }

  &__icon {
    width: rem(72);
    height: rem(72);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: rem(52);
      height: rem(52);
      object-fit: contain;
    }
  }

  &__card-title {
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    line-height: 1.4;
  }

  &__card-text {
    font-size: $font-size-sm;
    color: $color-text-tertiary;
    line-height: 1.75;
    margin: 0;
  }
}

@include respond-to(md) {
  .ap {
    padding: rem(60) 0;
    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }
    &__card:last-child {
      grid-column: 1 / -1;
      max-width: rem(360);
      margin: 0 auto;
    }
    &__title {
      font-size: clamp(rem(18), 3vw, rem(26));
      margin-bottom: rem(40);
    }
  }
}

@include respond-to(sm) {
  .ap {
    padding: rem(48) 0;
    &__grid {
      grid-template-columns: 1fr;
    }
    &__card:last-child {
      grid-column: auto;
      max-width: 100%;
    }
    &__card {
      padding: rem(24) rem(16);
    }
  }
}
</style>
