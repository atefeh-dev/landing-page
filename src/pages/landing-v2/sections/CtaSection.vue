<template>
  <section class="cta" ref="sectionRef">
    <div class="lv2-container lv2-container--narrow">
      <div class="cta__inner">
        <div class="cta__title-row" v-bind="anim(1)">
          <h2 class="cta__title">همراه اولین‌ها در این مسیر باشید.</h2>
          <img
            src="@/assets/images/landing/announcement.svg?url"
            class="cta__icon"
            alt=""
            aria-hidden="true"
          />
        </div>

        <p class="cta__desc" v-bind="anim(2)">
          برای دسترسی زودتر و دریافت به‌روزرسانی‌ها، به لیست انتظار بپیوندید.
        </p>
        <div v-bind="anim(3)">
          <EmailForm
            button-text="می‌خواهم همراه باشم."
            note="پس از فعال‌شدن دسترسی، دعوتنامه برای شما ارسال خواهد شد."
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import EmailForm from "../components/EmailForm.vue";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef);
function anim(n) {
  return reveal(n);
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.cta {
  padding: rem(100) 0;
  background: $color-bg-primary;

  &__inner {
    text-align: center;
  }

  &__title-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(12);
    direction: rtl;
    margin-bottom: $spacing-ms;
  }

  &__title {
    font-size: clamp(rem(32), 5vw, rem(40));
    font-weight: $font-weight-extrabold;
    line-height: 1.3;
    color: $color-text-muted;
    margin-bottom: 0;
  }

  &__icon {
    height: rem(75); // scales automatically with title font-size
    width: auto;
    flex-shrink: 0;
  }

  &__desc {
    font-size: $font-size-xl;
    color: $color-text-faded;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-xl;
    line-height: 1.7;
  }
}

@include respond-to(sm) {
  .cta {
    padding: rem(64) 0;
    &__title-row {
      gap: rem(8);
    }
    &__title {
      font-size: clamp(rem(20), 5vw, rem(28));
      white-space: nowrap;
    }
    &__icon {
      height: 3.3em;
    }
    &__desc {
      font-size: $font-size-md;
      margin-bottom: $spacing-lg;
    }
  }
}
</style>
