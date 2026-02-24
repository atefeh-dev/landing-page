<template>
  <section class="cta" ref="sectionRef">
    <div class="lv2-container lv2-container--narrow">
      <div class="cta__inner">
        <h2 class="cta__title" v-bind="anim(1)">
          همراه اولین‌ها در این مسیر باشید.
        </h2>
        <img
          src="@/assets/images/landing/announcement.svg?url"
          class=""
          alt=""
          aria-hidden="true"
        />
        <p class="cta__desc" v-bind="anim(2)">
          برای دسترسی زودتر و دریافت به‌روزرسانی‌ها، به لیست انتظار بپیوندید.
        </p>
        <div v-bind="anim(3)">
          <EmailForm button-text="می‌خواهم همراه باشم." />
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

  &__title {
    font-size: clamp(rem(32), 5vw, rem(40));
    font-weight: $font-weight-extrabold;
    line-height: 1.3;
    color: $color-text-muted;
    margin-bottom: $spacing-ms;
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
    &__title {
      font-size: clamp(rem(28), 7vw, rem(40));
    }
    &__desc {
      font-size: $font-size-md;
      margin-bottom: $spacing-lg;
    }
  }
}
</style>
