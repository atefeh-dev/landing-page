<template>
  <section class="ap" ref="sectionRef">
    <div class="lv2-container">
      <h2 class="ap__title" v-bind="anim(1)">
        این مسیر بر پایه‌ی استانداردهای حقوقی شکل گرفته تا تنظیم قرارداد،
        <span class="lv2-highlight">شفاف</span>،
        <span class="lv2-highlight">دقیق</span> و
        <span class="lv2-highlight">امن</span> باشد.
      </h2>

      <div class="ap__grid">
        <div class="ap__card" v-bind="anim(2)">
          <div class="ap__icon">
            <img
              src="@/assets/images/landing/path.svg?url"
              alt=""
              aria-hidden="true"
            />
          </div>
          <h3 class="ap__card-title">ساختارهای استاندارد</h3>
          <p class="ap__card-text">
            قالب‌ها بر اساس چارچوب‌های حقوقی رایج<br />
            و قابل اتکا تنظیم شده‌اند.
          </p>
        </div>

        <div class="ap__card" v-bind="anim(3)">
          <div class="ap__icon">
            <img
              src="@/assets/images/landing/structure.svg?url"
              alt=""
              aria-hidden="true"
            />
          </div>
          <h3 class="ap__card-title">مسیر شفاف تنظیم اسناد</h3>
          <p class="ap__card-text">
            از ورود اطلاعات تا نسخه‌ی نهایی<br />هر مرحله مشخص و قابل پیگیری
            است.
          </p>
        </div>

        <div class="ap__card" v-bind="anim(4)">
          <div class="ap__icon">
            <img
              src="@/assets/images/landing/security.svg?url"
              alt=""
              aria-hidden="true"
            />
          </div>
          <h3 class="ap__card-title">طراحی با رویکرد امنیت</h3>
          <p class="ap__card-text">
            داده‌ها به‌صورت تفکیک‌شده و رمزنگاری‌شده نگه‌داری می‌شوند و فایل
            نهایی تنها هنگام نیاز تولید می‌شود.
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
  padding: rem(70) 0;
  background: $color-bg-primary;

  &__title {
    font-size: clamp(rem(20), 3vw, rem(40));
    font-weight: $font-weight-semibold;
    line-height: 1.65;
    color: $color-text-muted;
    text-align: center;
    max-width: rem(813);
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(32);
    // max-width: rem(900);
    margin: 0 auto;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: rem(16);
    padding: rem(50) 0;

    width: 100%;
    max-width: rem(363);
    justify-self: center; // 🔥 THIS is the fix
  }

  &__icon {
    width: rem(80);
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: rem(80);
      height: rem(80);
      object-fit: contain;
    }
  }

  &__card-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $color-text-muted;
    padding-top: rem(9);
    line-height: 1.4;
  }

  &__card-text {
    font-size: $font-size-lg;
    font-weight: $font-weight-regular;
    color: $color-text-faded;
    line-height: 1.75;
    margin: 0;
  }
}

@include respond-to(md) {
  .ap {
    padding: rem(60) 0;
    &__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
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
    padding: rem(16) 0;
    &__grid {
      grid-template-columns: 1fr;
      gap: rem(2);
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
