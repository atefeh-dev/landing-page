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
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal, slideDown } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// FooterSection
// WHY notes:
// - Social icon imgs use aria-hidden="true" — the link carries
//   the aria-label; duplicate alt text is noise.
// - respond-to(xs) replaces the raw @media (max-width: 375px).
// - transition targets specific properties.
// ─────────────────────────────────────────────────────────────

.footer {
  background: $color-bg-secondary;
  border-top: 1px solid $color-border-subtle;
  padding: $spacing-2xl 0 $spacing-lg;

  &__container {
    max-width: rem(1200);
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-xl;
  }

  &__brand {
    flex: 1;
  }

  &__brand-text {
    color: $color-text-tertiary;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin: 0;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: rem(47);
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
    transition: opacity #{$transition-duration-fast}
      #{$transition-easing-standard};

    img {
      width: rem(24);
      height: rem(24);
      opacity: 0.65;
      transition: opacity #{$transition-duration-fast}
        #{$transition-easing-standard};
    }

    &:hover img {
      opacity: 1;
    }
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
      width: rem(42);
    }

    &__social {
      gap: $spacing-sm;
    }

    &__social-link img {
      width: rem(18);
      height: rem(18);
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
        width: rem(38);
      }
    }

    &__social {
      flex: none;
      width: 100%;
      justify-content: center;
      gap: $spacing-sm;
    }

    &__social-link img {
      width: rem(16);
      height: rem(16);
    }
  }
}

@include respond-to(xs) {
  .footer {
    &__container {
      padding: 0 1rem;
    }

    &__brand-text {
      font-size: 0.8125rem;
    }

    &__logo img {
      width: rem(35);
    }

    &__social-link img {
      width: rem(15);
      height: rem(15);
    }
  }
}
</style>
