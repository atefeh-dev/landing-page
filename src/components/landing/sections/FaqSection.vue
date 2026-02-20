<template>
  <section class="section section--faq" id="faq" ref="sectionRef">
    <div class="section__container section__container--narrow">
      <div class="section__header section__header--center">
        <span class="section__badge" v-bind="slideDown(1)">سوالات متداول</span>
        <div class="section__title-wrapper" v-bind="reveal()">
          <h2 class="section__title">
            پرسش‌هایی که ممکن است در ذهن شما هم باشد.
          </h2>
        </div>
      </div>

      <div class="faq">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq__item"
          :class="[
            { 'faq__item--active': activeFaq === index },
            reveal(Math.min(index + 1, 6)),
          ]"
        >
          <button
            class="faq__question"
            :aria-expanded="activeFaq === index"
            @click="toggleFaq(index)"
          >
            <img
              :src="activeFaq === index ? MinusIcon : PlusIcon"
              :alt="activeFaq === index ? 'بستن' : 'باز کردن'"
              class="faq__icon"
            />
            <span>{{ item.question }}</span>
          </button>

          <div
            class="faq__answer-wrapper"
            :class="{ 'faq__answer-wrapper--open': activeFaq === index }"
          >
            <div class="faq__answer">
              <p v-html="item.answer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import PlusIcon from "@/assets/ui/plus.svg";
import MinusIcon from "@/assets/ui/minus.svg";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal, slideDown } = useScrollAnimation(sectionRef);

const activeFaq = ref(null);

const faqs = [
  {
    question: "عضویت و استفاده از زونکن چگونه است؟",
    answer:
      '<span class="highlight">شروع استفاده از زونکن ساده و بدون هزینه‌ی اولیه است</span> و دسترسی به قالب‌های عمومی و تنظیم اسناد در چارچوب مشخص در اختیار کاربران قرار می‌گیرد.',
  },
  {
    question: "آیا استفاده از قالب‌های عمومی در زونکن نیاز به پرداخت دارد؟",
    answer:
      "قالب‌های عمومی برای دسترسی و استفاده در اختیار کاربران قرار می‌گیرند.",
  },
  {
    question: "استفاده از قالب‌های عمومی در زونکن چگونه است؟",
    answer:
      "شما قالب موردنظر را انتخاب می‌کنید، اطلاعات طرفین را وارد می‌کنید، و سند شما با جایگزینی دقیق متغیرها تنظیم می‌شود.",
  },
  {
    question: "آیا امکان تنظیم قالب اختصاصی وجود دارد؟",
    answer:
      "امکان استفاده از قالب‌های اختصاصی در نسخه‌های توسعه‌یافته زونکن پیش‌بینی شده است.",
  },
  {
    question: "آیا طرفین اسناد برای امضا باید عضو زونکن باشند؟",
    answer:
      "خیر. اسناد می‌توانند بدون الزام به عضویت طرف مقابل ارسال و امضا شوند.",
  },
  {
    question:
      "نگهداری، امنیت و محرمانگی اسناد من در زونکن چگونه مدیریت می‌شود؟",
    answer: `زونکن با رویکرد حداقلی در نگه‌داری داده طراحی شده است. <span class="highlight">فایل نهایی اسناد به‌صورت پایدار در سرورهای زونکن ذخیره نمی‌شود.</span>`,
  },
  {
    question: "چه زمانی دسترسی عمومی برای استفاده از زونکن فعال می‌شود؟",
    answer: "دسترسی عمومی پس از تکمیل فاز اولیه توسعه و تست فعال خواهد شد.",
  },
];

function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// FaqSection
// WHY notes:
// - :src binding consolidated to ternary — removes v-if/v-else
//   on img elements (same visual result, less template noise).
// - aria-expanded added to faq__question for accessibility.
// - respond-to() mixin replaces raw @media.
// ─────────────────────────────────────────────────────────────

.section__title {
  font-size: clamp(rem(28), 4vw, rem(36));
}

.section--faq {
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;
  margin-top: $spacing-2xl;
}

.faq {
  max-width: rem(900);
  margin: 0 auto;
  padding: 0 $spacing-md;

  &__item {
    background: $color-bg-secondary;
    border: 1px solid $color-border-subtle;
    border-radius: $radius-lg;
    margin-bottom: $spacing-sm;
    overflow: hidden;
    transition:
      border-color #{$transition-duration-fast} #{$transition-easing-standard},
      background-color #{$transition-duration-fast}
        #{$transition-easing-standard},
      box-shadow #{$transition-duration-fast} #{$transition-easing-standard};

    &:hover {
      border-color: $color-border-medium;
      background: $color-surface-hover;
    }

    &--active {
      border-color: $color-border-medium;
      box-shadow: $shadow-sm;
    }
  }

  &__question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md;
    background: none;
    border: none;
    color: $color-text-primary;
    font-family: inherit;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    text-align: right;
    cursor: pointer;
    transition: color #{$transition-duration-fast}
      #{$transition-easing-standard};

    span {
      flex: 1;
    }
  }

  &__icon {
    width: rem(24);
    height: rem(24);
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity #{$transition-duration-fast}
      #{$transition-easing-standard};

    .faq__item:hover & {
      opacity: 1;
    }
  }

  // ── Accordion ─────────────────────────────────────────────
  // WHY: grid-template-rows animation avoids the well-known
  // "height: auto cannot be animated" problem without JS.

  &__answer-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;

    &--open {
      grid-template-rows: 1fr;
    }
  }

  &__answer {
    min-height: 0;
    padding: 0 3.5rem 0 1.5rem;
    color: $color-text-secondary;
    line-height: 1.8;
    font-size: $font-size-md;
    transition: padding-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    p {
      margin: 0;
    }

    .faq__answer-wrapper--open & {
      padding-bottom: $spacing-lg;
    }
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .faq {
    padding: 0;

    &__question {
      padding: $spacing-md $spacing-lg;
      font-size: 1.0625rem;
      gap: $spacing-md;
    }

    &__answer {
      padding: 0 $spacing-lg;
      font-size: $font-size-md;

      .faq__answer-wrapper--open & {
        padding-bottom: $spacing-md;
      }
    }

    &__icon {
      width: rem(22);
      height: rem(22);
    }
  }
}

@include respond-to(sm) {
  .faq {
    &__item {
      margin-bottom: $spacing-sm;
      border-radius: $radius-md;
    }

    &__question {
      padding: $spacing-md;
      font-size: $font-size-md;
      gap: $spacing-sm;
    }

    &__answer {
      padding: 0 $spacing-md;
      font-size: 0.9375rem;
      line-height: 1.7;

      .faq__answer-wrapper--open & {
        padding-bottom: $spacing-md;
      }
    }

    &__icon {
      width: rem(20);
      height: rem(20);
    }
  }
}
</style>
