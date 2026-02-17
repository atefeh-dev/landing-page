<template>
  <section class="section section--faq" id="faq" ref="sectionRef">
    <div class="section__container section__container--narrow">
      <div class="section__header section__header--center">
        <span class="section__badge" :class="slideDown(1)">سوالات متداول</span>
        <div class="section__title-wrapper" :class="reveal()">
          <h2 class="section__title">
            پرسش‌هایی که ممکن است در ذهن شما هم باشد.
          </h2>
        </div>
      </div>

      <div class="faq">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq-item"
          :class="[
            { 'faq-item--active': activeFaq === index },
            reveal(Math.min(index + 1, 6)),
          ]"
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
    question: "آیا استفاده از زونکن رایگان است?",
    answer:
      '<span class="highlight">شروع به استفاده از زونکن برای همیشه رایگان است</span> ولی بر اساس سیاست مصرف منصفانه ممکن است برای مدتی رایگان باشد.',
  },
  {
    question: "استفاده از قالب‌های عمومی در زونکن به چه صورت است?",
    answer:
      '<span class="highlight">قالب‌های عمومی در زونکن کاملاً رایگان و در دسترس همه کاربران هستند</span> و می‌توانید از آن‌ها برای ایجاد اسناد خود استفاده کنید.',
  },
  {
    question: "آیا امکان تنظیم قالب اختصاصی خودمان در زونکن وجود دارد?",
    answer:
      '<span class="highlight">بله، امکان ایجاد و ذخیره قالب‌های اختصاصی برای شما وجود دارد</span>. این قالب‌ها فقط برای شما و تیم شما قابل دسترسی خواهند بود.',
  },
  {
    question:
      "آیا افرادی که اسناد تنظیم شده را امضا می‌کنند باید عضو زونکن شوند?",
    answer:
      '<span class="highlight">خیر، امضاکنندگان نیازی به ثبت‌نام در زونکن ندارند</span>. آن‌ها می‌توانند از طریق لینک ارسال شده، اسناد را مشاهده و امضا کنند.',
  },
  {
    question: "نگهداری و امنیت اسناد من در زونکن چگونه تضمین می‌شود?",
    answer:
      '<span class="highlight">تمام اسناد شما با پروتکل‌های امنیتی پیشرفته رمزنگاری می‌شوند</span>. ما از استانداردهای بین‌المللی برای حفظ امنیت استفاده می‌کنیم.',
  },
  {
    question: "چه زمانی می‌توانم از خدمات زونکن استفاده کنم?",
    answer:
      '<span class="highlight">زونکن در حال حاضر در مرحله توسعه قرار دارد</span>. با ثبت‌نام در لیست انتظار، از اولین افرادی خواهید بود که دسترسی خواهید داشت.',
  },
];

function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}
</script>

<style lang="scss" scoped>
.section--faq {
  background: linear-gradient(180deg, #111111 0%, #0d0a0f 50%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
  margin-top: $spacing-2xl;
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
    transition: opacity $transition-base;
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

@media (max-width: $breakpoint-lg) {
  .faq {
    padding: 0;
  }
  .faq-item {
    &__question {
      padding: $spacing-md $spacing-lg;
      font-size: 1.0625rem;
      gap: $spacing-md;
    }
    &__answer {
      padding: 0 $spacing-lg;
      font-size: 1rem;
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

@media (max-width: $breakpoint-sm) {
  .faq-item {
    margin-bottom: $spacing-sm;
    border-radius: $radius-md;
    &__question {
      padding: $spacing-md;
      font-size: 1rem;
      gap: $spacing-sm;
    }
    &__answer {
      padding: 0 $spacing-md;
      font-size: 0.9375rem;
      line-height: 1.7;
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
</style>
