<template>
  <section class="section section--faq" id="faq">
    <div class="section__container section__container--narrow">
      <div class="section__header section__header--center">
        <div class="section__title-wrapper">
          <svg class="section__title-image" viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="14"
              stroke="#2d8ff0"
              stroke-width="2"
              opacity="0.3"
            />
            <path
              d="M24 18 Q24 14 20 14 Q16 14 16 18 Q16 22 20 22 L24 22"
              stroke="#fcc015"
              stroke-width="2"
            />
            <circle cx="24" cy="30" r="1.5" fill="#fcc015" />
          </svg>
          <h2 class="section__title">سوالات متداول</h2>
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
            <span>{{ item.question }}</span>
            <svg
              class="faq-item__icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="faq-item__answer" v-show="activeFaq === index">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const activeFaq = ref(null);

const faqs = [
  {
    question: "زونکن چطور کار می‌کند؟",
    answer:
      "زونکن یک پلتفرم مدیریت اسناد است که به شما کمک می‌کند تمام مسیر یک سند را از ایجاد تا تایید نهایی پیگیری کنید. همه تغییرات، نظرات و نسخه‌ها در یک جا ذخیره می‌شوند.",
  },
  {
    question: "آیا زونکن رایگان است؟",
    answer:
      "بله، زونکن برای همیشه رایگان خواهد بود. ما در حال کار روی نسخه اولیه هستیم و به زودی آن را عرضه خواهیم کرد.",
  },
  {
    question: "آیا اسناد من امن هستند؟",
    answer:
      "بله، امنیت اسناد شما برای ما در اولویت است. ما از بالاترین استانداردهای امنیتی برای محافظت از داده‌های شما استفاده می‌کنیم و حریم خصوصی شما برای ما بسیار مهم است.",
  },
  {
    question: "چه زمانی زونکن منتشر می‌شود؟",
    answer:
      "ما در حال کار روی نسخه اولیه زونکن هستیم. اگر می‌خواهید از اولین کسانی باشید که زونکن را امتحان می‌کنند، ایمیل خود را برای ما بفرستید تا شما را در جریان قرار دهیم.",
  },
  {
    question: "آیا می‌توانم با تیمم در زونکن همکاری کنم؟",
    answer:
      "بله، یکی از ویژگی‌های اصلی زونکن امکان همکاری تیمی است. تیم شما می‌تواند به طور هم‌زمان روی اسناد کار کند و همه در جریان آخرین تغییرات باشند.",
  },
];

function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}
</script>

<style lang="scss" scoped>
.section--faq {
  background: linear-gradient(
    180deg,
    $color-bg-secondary 0%,
    $color-bg-tertiary 100%
  );
}

.faq {
  max-width: 700px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid $color-border-subtle;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  transition: $transition-base;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.02) 0%,
      rgba(255, 255, 255, 0.01) 100%
    );
  }

  &__question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-lg $spacing-md;
    background: none;
    border: none;
    color: $color-text-primary;
    font-family: inherit;
    font-size: 1.125rem;
    font-weight: 600;
    text-align: right;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      color: $color-accent-primary;
    }
  }

  &__icon {
    flex-shrink: 0;
    margin-left: $spacing-md;
    transition: $transition-base;
    color: $color-text-secondary;
  }

  &--active &__icon {
    transform: rotate(180deg);
    color: $color-accent-primary;
  }

  &__answer {
    padding: $spacing-lg $spacing-md;
    color: $color-text-secondary;
    line-height: 1.7;
  }
}
</style>
