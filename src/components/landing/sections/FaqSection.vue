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
          <button class="faq__question" @click="toggleFaq(index)">
            <img
              v-if="activeFaq === index"
              :src="MinusIcon"
              alt="بستن"
              class="faq__icon"
            />
            <img v-else :src="PlusIcon" alt="باز کردن" class="faq__icon" />
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
      '<span class="highlight">شروع استفاده از زونکن ساده و بدون هزینه‌ی اولیه است</span> و دسترسی به قالب‌های عمومی و تنظیم اسناد در چارچوب مشخص در اختیار کاربران قرار می‌گیرد. در صورت استفاده گسترده‌تر و یا نیاز به امکانات پیشرفته، شرایط استفاده بر اساس سیاست مصرف منصفانه مشخص می‌شود',
  },
  {
    question: "آیا استفاده از قالب‌های عمومی در زونکن نیاز به پرداخت دارد؟",
    answer:
      "قالب‌های عمومی برای دسترسی و استفاده در اختیار کاربران قرار می‌گیرند. زونکن تلاش کرده دسترسی به اسناد استاندارد را ساده و در دسترس نگه دارد.",
  },
  {
    question: "استفاده از قالب‌های عمومی در زونکن چگونه است؟",
    answer:
      "شما قالب موردنظر را انتخاب می‌کنید، اطلاعات طرفین را وارد می‌کنید، و سند شما با جایگزینی دقیق متغیرها تنظیم می‌شود و بعد از آن قابل دانلود و پیگیری است.",
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
    answer: `زونکن با رویکرد حداقلی در نگه‌داری داده طراحی شده است. ساختار سیستم به‌گونه‌ای است که اطلاعات به‌صورت رمزنگاری‌شده پردازش می‌شوند و <span class="highlight">فایل نهایی اسناد به‌صورت پایدار در سرورهای زونکن ذخیره نمی‌شود.</span> ما تلاش کرده‌ایم طراحی فنی زونکن به‌گونه‌ای باشد که حتی در صورت بروز اختلال یا دسترسی غیرمجاز، داده قابل‌استفاده‌ای در اختیار اشخاص قرار نگیرد.`,
  },
  {
    question: "چه زمانی دسترسی عمومی برای استفاده از زونکن فعال می‌شود؟",
    answer:
      "دسترسی عمومی پس از تکمیل فاز اولیه توسعه و تست فعال خواهد شد. کاربران لیست انتظار در اولویت اطلاع‌رسانی قرار می‌گیرند.",
  },
];

function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}
</script>

<style lang="scss" scoped>
// ── Section modifier ───────────────────────────────────────────

.section--faq {
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;
  margin-top: $spacing-2xl;
}

// ── FAQ block ──────────────────────────────────────────────────

.faq {
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 0 $spacing-md;

  // ── Item ───────────────────────────────────────────────────

  &__item {
    background: $color-bg-secondary;
    border: 1px solid $color-border-subtle;
    border-radius: $radius-lg;
    margin-bottom: $spacing-sm;
    overflow: hidden;
    transition:
      border-color 0.3s ease,
      background 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      border-color: $color-border-medium;
      background: rgba(255, 255, 255, 0.02);
    }

    &--active {
      border-color: $color-border-medium;
      box-shadow: $shadow-sm;
    }
  }

  // ── Question button ────────────────────────────────────────

  &__question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md;
    background: none;
    border: none;
    color: #f7f7f7;
    font-family: inherit;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    text-align: right;
    cursor: pointer;
    transition: $transition-base;

    span {
      flex: 1;
    }
  }

  // ── Toggle icon ────────────────────────────────────────────

  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity $transition-base;

    .faq__item:hover & {
      opacity: 1;
    }
  }

  // ── Answer accordion ───────────────────────────────────────

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
    padding-bottom: 0;
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

@media (max-width: $breakpoint-lg) {
  .faq {
    padding: 0;

    &__question {
      padding: $spacing-md $spacing-lg;
      font-size: 1.0625rem;
      gap: $spacing-md;
    }

    &__answer {
      padding: 0 $spacing-lg;
      font-size: 1rem;

      .faq__answer-wrapper--open & {
        padding-bottom: $spacing-md;
      }
    }

    &__icon {
      width: 22px;
      height: 22px;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .faq {
    &__item {
      margin-bottom: $spacing-sm;
      border-radius: $radius-md;
    }

    &__question {
      padding: $spacing-md;
      font-size: 1rem;
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
      width: 20px;
      height: 20px;
    }
  }
}
</style>
