<template>
  <footer class="foot" ref="sectionRef">
    <div class="lv2-container">
      <div class="foot__inner" v-bind="reveal()">
        <p class="foot__tagline" v-bind="reveal(1)">با افتخار ساخت ایران</p>
        <a href="#" class="foot__logo" v-bind="reveal(2)">
          <img src="@/assets/brand/logo.svg?url" alt="زونکن" />
        </a>
        <div class="foot__social" v-bind="reveal(3)">
          <a
            href="https://x.com/doclastapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="توییتر"
          >
            <img
              src="@/assets/social/x-social.svg?url"
              alt=""
              aria-hidden="true"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/zoonkan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="لینکدین"
          >
            <img
              src="@/assets/social/social-linkedin.svg?url"
              alt=""
              aria-hidden="true"
            />
          </a>
          <a
            href="https://www.instagram.com/zoonkanapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="اینستاگرام"
          >
            <img
              src="@/assets/social/social-instagram.svg?url"
              alt=""
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.foot {
  background: $color-bg-secondary;
  border-top: 1px solid $color-border-subtle;
  padding: rem(48) 0 rem(32);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__tagline {
    color: $color-text-tertiary;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    flex: 1;
  }

  &__logo {
    display: block;
    img {
      width: rem(44);
      height: auto;
      transition: opacity $transition-fast $ease-standard;
    }
    &:hover img {
      opacity: 0.75;
    }
  }

  &__social {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: rem(20);
    align-items: center;

    a {
      display: flex;
      align-items: center;
    }

    img {
      width: rem(22);
      height: rem(22);
      opacity: 0.6;
      transition: opacity $transition-fast $ease-standard;
    }

    a:hover img {
      opacity: 1;
    }
  }
}

@include respond-to(sm) {
  .foot {
    padding: rem(32) 0 rem(20);

    &__inner {
      flex-direction: column;
      gap: rem(20);
      text-align: center;
    }
    &__logo {
      order: -1;
    }
    &__tagline {
      flex: none;
      font-size: $font-size-sm;
    }
    &__social {
      flex: none;
      justify-content: center;
    }
  }
}
</style>
