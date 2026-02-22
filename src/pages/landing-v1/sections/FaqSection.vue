<template>
  <section class="section section--faq" id="faq" ref="sectionRef">
    <div class="section__container section__container--narrow">
      <div class="section__header section__header--center">
        <span class="section__badge" v-bind="slideDown(1)">سوالات متداول</span>
        <div class="section__title-wrapper" v-bind="reveal()">
          <h2 class="section__title section__title--faq">
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
            :ref="(el) => setWrapperRef(el, index)"
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
const wrapperRefs = {};

function setWrapperRef(el, index) {
  if (el) wrapperRefs[index] = el;
}

// WHY double rAF: a single rAF can be batched into the same paint
// cycle as the height assignment, so the browser never sees a
// "before" state and skips the transition entirely.
// Two rAF calls guarantee the starting value is painted first.

function collapse(wrapper) {
  const inner = wrapper.firstElementChild;
  inner.style.opacity = "0";
  wrapper.style.height = wrapper.scrollHeight + "px";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wrapper.style.height = "0px";
    });
  });
}

function expand(wrapper) {
  const inner = wrapper.firstElementChild;
  inner.style.opacity = "0";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wrapper.style.height = inner.scrollHeight + "px";
      inner.style.opacity = "1";
    });
  });
}

function toggleFaq(index) {
  const wrapper = wrapperRefs[index];
  if (!wrapper) return;

  const isOpen = activeFaq.value === index;

  // Close previously open item if it's a different one
  if (activeFaq.value !== null && activeFaq.value !== index) {
    collapse(wrapperRefs[activeFaq.value]);
  }

  if (isOpen) {
    collapse(wrapper);
    activeFaq.value = null;
  } else {
    activeFaq.value = index;
    expand(wrapper);
  }
}

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
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// FaqSection
// WHY JS height animation over CSS-only approaches:
// - max-height: pauses on close (animates from 500px ceiling
//   to real height before collapsing) — visible tail.
// - grid-template-rows: content slides upward on close — wrong.
// - JS scrollHeight: exact pixel height, crisp in both directions.
// ─────────────────────────────────────────────────────────────

.section--faq {
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;
  margin-top: $spacing-2xl;
}

.faq {
  max-width: rem(900);
  margin: 0 auto;
  // padding: 0 $spacing-md;

  // ── Item ──────────────────────────────────────────────────

  &__item {
    border: 1px solid $color-border-subtle;
    border-radius: $radius-lg;
    margin-bottom: $spacing-sm;
    overflow: hidden;
    transition:
      border-color #{$transition-duration-fast} #{$transition-easing-standard},
      box-shadow #{$transition-duration-fast} #{$transition-easing-standard};

    &:hover {
      border-color: $color-border-medium;
      // background-color: $color-hover-bg;
    }

    &--active {
      border-color: $color-border-medium;
      box-shadow: $shadow-sm;
      background-color: $color-hover-bg;
    }
  }

  // ── Question ──────────────────────────────────────────────

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
    transition:
      color #{$transition-duration-fast} #{$transition-easing-standard},
      padding-bottom 0.45s cubic-bezier(0.22, 1, 0.36, 1);

    span {
      flex: 1;
    }

    .faq__item--active & {
      padding-bottom: 0;
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
  // height is driven entirely by JS toggleFaq().
  // CSS only provides the transition — JS provides the values.

  &__answer-wrapper {
    height: 0;
    overflow: hidden;
    transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &__answer {
    padding: rem(4) rem(64) rem(23) 1.5rem;
    color: $color-text-tertiary;
    font-weight: $font-weight-regular;
    line-height: 1.8;
    font-size: $font-size-md;
    opacity: 1;
    transition: opacity 0.25s ease;

    p {
      margin: 0;
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

      .faq__item--active & {
        padding-bottom: 0;
      }
    }

    &__answer {
      padding: 0 $spacing-lg rem(23) $spacing-lg;
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
      border-radius: $radius-md;
    }

    &__question {
      padding: $spacing-md;
      gap: $spacing-sm;

      .faq__item--active & {
        padding-bottom: 0;
      }
    }

    &__answer {
      padding: 0 $spacing-md rem(23) $spacing-md;
      font-size: 0.9375rem;
      line-height: 1.7;
    }

    &__icon {
      width: rem(20);
      height: rem(20);
    }
  }
}
</style>
