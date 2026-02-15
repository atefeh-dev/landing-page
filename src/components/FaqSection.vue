<template>
  <section class="section section--faq" id="faq">
    <div class="section__container section__container--narrow">
      <div class="section__header section__header--center">
        <div class="section__title-wrapper">
          <h2 class="section__title">
            پرسش‌هایی که ممکن است در ذهن شما هم باشد.
          </h2>
        </div>
      </div>

      <div class="faq">
        <div
          class="faq-item"
          v-for="(item, index) in faqs"
          :key="index"
          :class="{ 'faq-item--active': activeFaq === index }"
        >
          <button class="faq-item__question" @click="toggleFaq(index)">
            <img
              v-if="activeFaq === index"
              :src="MinusIcon"
              alt="بستن"
              class="faq-item__icon"
            />
            <img v-else :src="PlusIcon" alt="باز کردن" class="faq-item__icon" />
            <span>{{ item.question }}</span>
          </button>
          <div
            class="faq-item__answer-wrapper"
            :class="{ 'faq-item__answer-wrapper--open': activeFaq === index }"
          >
            <div class="faq-item__answer">
              <p v-html="item.answer"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import PlusIcon from "@/assets/plus.svg";
import MinusIcon from "@/assets/minus.svg";

const activeFaq = ref(null); // All closed by default

const faqs = [
  {
    question: "آیا استفاده از زونکن رایگان است؟",
    answer:
      '<span class="highlight">شروع به استفاده از زونکن برای همیشه رایگان است</span> ولی بر اساس سیاست مصرف منصفانه ممکن است برای مدتی رایگان باشد و یا با توجه به تعداد تنظیم اسناد تا سقف مجاز رایگان بودن آن تعیین شود.',
  },
  {
    question: "استفاده از قالب‌های عمومی در زونکن به چه صورت است؟",
    answer:
      '<span class="highlight">قالب‌های عمومی در زونکن کاملاً رایگان و در دسترس همه کاربران هستند</span> و می‌توانید از آن‌ها برای ایجاد اسناد خود استفاده کنید. این قالب‌ها توسط تیم ما و جامعه کاربران تهیه شده‌اند.',
  },
  {
    question: "آیا امکان تنظیم قالب اختصاصی خودمان در زونکن وجود دارد؟",
    answer:
      '<span class="highlight">بله، امکان ایجاد و ذخیره قالب‌های اختصاصی برای شما وجود دارد</span>. این قالب‌ها فقط برای شما و تیم شما قابل دسترسی خواهند بود.',
  },
  {
    question:
      "آیا افرادی که اسناد تنظیم شده را امضا می‌کنند باید عضو زونکن شوند؟",
    answer:
      '<span class="highlight">خیر، امضاکنندگان نیازی به ثبت‌نام در زونکن ندارند</span>. آن‌ها می‌توانند از طریق لینک ارسال شده، اسناد را مشاهده و امضا کنند.',
  },
  {
    question: "نگهداری و امنیت اسناد من در زونکن چگونه تضمین می‌شود؟",
    answer:
      '<span class="highlight">تمام اسناد شما با پروتکل‌های امنیتی پیشرفته رمزنگاری می‌شوند</span>. ما از استانداردهای بین‌المللی برای حفظ امنیت و حریم خصوصی اطلاعات شما استفاده می‌کنیم.',
  },
  {
    question: "چه زمانی می‌توانم از خدمات زونکن استفاده کنم؟",
    answer:
      '<span class="highlight">زونکن در حال حاضر در مرحله توسعه قرار دارد</span>. با ثبت‌نام در لیست انتظار، از اولین افرادی خواهید بود که به محض عرضه محصول، دسترسی خواهید داشت.',
  },
];
function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.section--faq {
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;
  margin-top: $spacing-2xl;

  .section__container {
    position: relative;
    z-index: 1;
  }
}

.section__title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-md;
  flex-wrap: wrap;
}

.section__title-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 36px;
  padding: 0 $spacing-md;
  background: linear-gradient(135deg, #e91e8c 0%, #c2158f 100%);
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: $radius-sm;
  box-shadow: 0 4px 12px rgba(233, 30, 140, 0.3);
}

.faq {
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 0 $spacing-md;
}

.faq-item {
  background: $color-bg-secondary;
  border: 1px solid $color-border-subtle;
  border-radius: $radius-lg;
  margin-bottom: $spacing-md;
  overflow: hidden;
  transition: $transition-base;

  &:hover {
    border-color: $color-border-medium;
    background: rgba(255, 255, 255, 0.02);
  }

  &--active {
    border-color: $color-border-medium;
    box-shadow: $shadow-sm;
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

  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    opacity: 0.7;
    transition: $transition-base;
  }

  &:hover &__icon {
    opacity: 1;
  }

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

    .faq-item__answer-wrapper--open & {
      padding-bottom: $spacing-lg;
    }
  }
}

// Tablet
@media (max-width: $breakpoint-lg) {
  .section__title-badge {
    min-width: 46px;
    height: 34px;
    font-size: 1.125rem;
  }

  .faq {
    padding: 0;
  }

  .faq-item {
    &__question {
      padding: $spacing-md $spacing-lg;
      font-size: 1.0625rem;
      gap: $spacing-md;
    }

    &__answer-wrapper {
      transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__answer {
      padding: 0 $spacing-lg;
      font-size: 1rem;
      transition: padding-bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1);

      .faq-item__answer-wrapper--open & {
        padding-bottom: $spacing-md;
      }
    }

    &__icon {
      width: 22px;
      height: 22px;
    }
  }
}

// Mobile
@media (max-width: $breakpoint-sm) {
  .section--faq {
    &::before {
      height: 140px;
    }

    &::after {
      height: 100px;
    }
  }

  .section__title-badge {
    min-width: 42px;
    height: 32px;
    font-size: 1rem;
    padding: 0 $spacing-sm;
  }

  .faq-item {
    margin-bottom: $spacing-sm;
    border-radius: $radius-md;

    &__question {
      padding: $spacing-md;
      font-size: 1rem;
      gap: $spacing-sm;
    }

    &__answer-wrapper {
      transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__answer {
      padding: 0 $spacing-md;
      font-size: 0.9375rem;
      line-height: 1.7;
      transition: padding-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      .faq-item__answer-wrapper--open & {
        padding-bottom: $spacing-md;
      }
    }

    &__icon {
      width: 20px;
      height: 20px;
    }
  }
}

// Extra small mobile
@media (max-width: 375px) {
  .faq-item {
    &__question {
      font-size: 0.9375rem;
      padding: $spacing-sm $spacing-md;
    }

    &__answer-wrapper {
      transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__answer {
      font-size: 0.875rem;
      transition: padding-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      .faq-item__answer-wrapper--open & {
        padding-bottom: $spacing-sm;
      }
    }
  }
}
</style>
