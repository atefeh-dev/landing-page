<template>
  <footer class="footer" ref="sectionRef">
    <div class="footer__container">
      <div class="footer__content" v-bind="reveal()">
        <div class="footer__brand" v-bind="reveal(1)">
          <p class="footer__brand-text">با افتخار ساخت ایران</p>
        </div>

        <div class="footer__logo" v-bind="slideDown()">
          <img src="@/assets/brand/logo.svg" alt="لوگوی زونکن" />
        </div>

        <div class="footer__social" v-bind="reveal(2)">
          <a
            href="https://www.linkedin.com/company/zoonkan/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="لینکدین"
          >
            <img
              src="@/assets/social/social-linkedin.svg"
              alt=""
              aria-hidden="true"
            />
          </a>
          <a
            href="https://www.instagram.com/zoonkanapp"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="اینستاگرام"
          >
            <img
              src="@/assets/social/social-instagram.svg"
              alt=""
              aria-hidden="true"
            />
          </a>
          <a
            href="https://x.com/doclastapp"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="توییتر / ایکس"
          >
            <img src="@/assets/social/x-social.svg" alt="" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} زونکن. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal, slideDown } = useScrollAnimation(sectionRef);

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.footer {
  background: $color-bg-secondary;
  border-top: 1px solid $color-border-subtle;
  padding: $spacing-2xl 0 $spacing-lg;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-xl;
    padding-bottom: $spacing-xl;
    border-bottom: 1px solid $color-border-subtle;
  }

  &__brand {
    flex: 1;
  }

  &__brand-text {
    color: $color-text-secondary;
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    margin: 0;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 47px;
      height: auto;
      transition: opacity #{$transition-duration-fast}
        #{$transition-easing-standard};

      &:hover {
        opacity: 0.8;
      }
    }
  }

  &__social {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: $spacing-md;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: $radius-full;
    background: $color-surface-subtle;
    transition:
      background-color #{$transition-duration-fast}
        #{$transition-easing-standard},
      transform #{$transition-duration-fast} #{$transition-easing-standard};

    img {
      width: 20px;
      height: 20px;
      opacity: 0.7;
      transition: opacity #{$transition-duration-fast}
        #{$transition-easing-standard};
    }

    &:hover {
      background: $color-surface-light;
      transform: translateY(-2px);

      img {
        opacity: 1;
      }
    }
  }

  &__bottom {
    padding-top: $spacing-lg;
    text-align: center;
  }

  &__copyright {
    color: $color-text-tertiary;
    font-size: $font-size-sm;
    margin: 0;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .footer {
    padding: $spacing-xl 0 $spacing-md;

    &__container {
      padding: 0 1.5rem;
    }
    &__content {
      gap: $spacing-lg;
      padding-bottom: $spacing-lg;
    }
    &__brand-text {
      font-size: 0.9375rem;
    }
    &__logo img {
      width: 42px;
    }
    &__social {
      gap: $spacing-sm;
    }
    &__bottom {
      padding-top: $spacing-md;
    }

    &__social-link {
      width: 38px;
      height: 38px;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }
}

@include respond-to(sm) {
  .footer {
    padding: $spacing-lg 0 $spacing-sm;

    &__container {
      padding: 0 1.5rem;
    }

    &__content {
      flex-direction: column;
      gap: $spacing-md;
      padding-bottom: $spacing-md;
      text-align: center;
    }

    &__brand {
      flex: none;
      width: 100%;
    }

    &__brand-text {
      font-size: $font-size-sm;
    }

    &__logo {
      order: -1;

      img {
        width: 38px;
      }
    }

    &__social {
      flex: none;
      width: 100%;
      justify-content: center;
      gap: $spacing-sm;
    }

    &__social-link {
      width: 36px;
      height: 36px;

      img {
        width: 16px;
        height: 16px;
      }
    }

    &__bottom {
      padding-top: $spacing-sm;
    }
    &__copyright {
      font-size: 0.75rem;
    }
  }
}

@media (max-width: 375px) {
  .footer {
    &__container {
      padding: 0 1rem;
    }
    &__brand-text {
      font-size: 0.8125rem;
    }
    &__logo img {
      width: 35px;
    }

    &__social-link {
      width: 34px;
      height: 34px;

      img {
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>
