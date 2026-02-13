<template>
  <section class="section section--use-cases" id="use-cases">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge">✨برای چه کسانی؟</span>
        <div class="section__title-wrapper">
          <svg class="section__title-image" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="16" r="6" stroke="#44936d" stroke-width="2" />
            <path
              d="M14 32 C14 26 18 24 24 24 C30 24 34 26 34 32"
              stroke="#44936d"
              stroke-width="2"
            />
            <circle cx="36" cy="14" r="3" fill="#fcc015" />
          </svg>
          <h2 class="section__title">
            طراحی‌شده برای کسانی که با اسناد زندگی می‌کنند.
          </h2>
        </div>
      </div>

      <div class="use-cases">
        <div class="use-case" v-for="(useCase, index) in useCases" :key="index">
          <div class="use-case__content">
            <h3 class="use-case__title">{{ useCase.title }}</h3>
            <ul class="use-case__list">
              <li v-for="(item, i) in useCase.items" :key="i">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const useCases = [
  {
    title: "طراحان و خلاق‌ها",
    items: [
      "مدیریت قراردادهای پروژه",
      "پیگیری فیدبک مشتریان",
      "سازمان‌دهی فایل‌های طراحی",
    ],
  },
  {
    title: "تیم‌های کوچک",
    items: [
      "همکاری در اسناد مشترک",
      "ثبت تصمیمات تیمی",
      "پیگیری وظایف و مسئولیت‌ها",
    ],
  },
  {
    title: "کسب‌وکارهای کوچک",
    items: [
      "مدیریت قراردادها با مشتریان",
      "نگهداری اسناد قانونی",
      "سازمان‌دهی فرآیندهای کاری",
    ],
  },
];
</script>

<style lang="scss" scoped>
.section--use-cases {
  background: linear-gradient(
    180deg,
    $color-bg-secondary 0%,
    $color-bg-tertiary 100%
  );
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-xl;
  margin-top: $spacing-xl;
}

.use-case {
  background: linear-gradient(
    135deg,
    $color-bg-elevated 0%,
    $color-bg-tertiary 100%
  );
  border: 1px solid $color-border-subtle;
  border-radius: $radius-lg;
  padding: $spacing-xl;
  display: flex;
  gap: $spacing-md;
  transition: $transition-base;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: $radius-lg;
    padding: 1px;
    background: linear-gradient(
      135deg,
      $color-accent-primary 0%,
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: $transition-base;
  }

  &:hover {
    border-color: $color-border-strong;
    background: linear-gradient(
      135deg,
      $color-bg-elevated 0%,
      $color-bg-secondary 100%
    );
    transform: translateY(-2px);
    box-shadow: $shadow-md;

    &::before {
      opacity: 0.3;
    }
  }

  &__title {
    font-size: 1.375rem;
    font-weight: 600;
    margin-bottom: $spacing-md;
    color: $color-text-primary;
  }

  &__list {
    li {
      position: relative;
      padding-right: 1.5rem;
      color: $color-text-secondary;
      margin-bottom: $spacing-sm;

      &::before {
        content: "\2022";
        position: absolute;
        right: 0;
        color: $color-accent-primary;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .use-cases {
    grid-template-columns: 1fr;
  }
}
</style>
