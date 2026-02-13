<template>
  <section class="section section--features" id="features">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge">ویژگی‌های زونکن</span>
        <div class="section__title-wrapper">
          <svg class="section__title-image" viewBox="0 0 48 48" fill="none">
            <rect
              x="12"
              y="16"
              width="12"
              height="16"
              rx="2"
              stroke="#1434cb"
              stroke-width="2"
              opacity="0.3"
            />
            <rect
              x="24"
              y="12"
              width="12"
              height="20"
              rx="2"
              stroke="#fcc015"
              stroke-width="2"
            />
            <path
              d="M28 18 L32 18 M28 22 L32 22"
              stroke="#fcc015"
              stroke-width="2"
              opacity="0.5"
            />
          </svg>
          <h2 class="section__title">همه چیز برای مدیریت اسناد</h2>
        </div>
        <p class="section__subtitle">
          ابزارهای ساده‌ای که کار با اسناد را تبدیل به یک تجربه روان می‌کنند
        </p>
      </div>

      <div class="features-grid">
        <div
          class="feature-card"
          v-for="(feature, index) in features"
          :key="index"
        >
          <div class="feature-card__icon" v-html="feature.icon"></div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    title: "ردیابی نسخه‌ها",
    description:
      "همه تغییرات و نسخه‌های سند شما ذخیره می‌شود. می‌توانید به راحتی به نسخه‌های قبلی برگردید",
  },
  {
    icon: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: "همکاری آسان",
    description:
      "تیم شما می‌تواند به طور هم‌زمان روی اسناد کار کند. همه در جریان آخرین تغییرات هستند",
  },
  {
    icon: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    title: "مسیر واضح",
    description:
      "مسیر هر سند از ایجاد تا تایید نهایی شفاف است. می‌دانید هر سند در چه مرحله‌ای است",
  },
  {
    icon: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    title: "سازمان‌دهی هوشمند",
    description:
      "اسناد شما به صورت خودکار سازمان‌دهی و دسته‌بندی می‌شوند. جستجو و پیدا کردن خیلی راحت است",
  },
  {
    icon: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    title: "امنیت کامل",
    description:
      "اسناد شما با بالاترین استانداردهای امنیتی محافظت می‌شوند. حریم خصوصی شما برای ما مهم است",
  },
  {
    icon: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    title: "یکپارچه‌سازی",
    description:
      "زونکن با ابزارهایی که استفاده می‌کنید یکپارچه می‌شود. جریان کار شما وقفه نمی‌خورد",
  },
];
</script>

<style lang="scss" scoped>
.section--features {
  background-color: $color-bg-primary;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-lg;
  margin-top: $spacing-xl;
}

.feature-card {
  background: linear-gradient(
    135deg,
    $color-bg-tertiary 0%,
    $color-bg-secondary 100%
  );
  border: 1px solid $color-border-subtle;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  transition: $transition-base;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      $color-accent-primary 100%
    );
    transform: scaleX(0);
    transform-origin: right;
    transition: $transition-base;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: $color-accent-primary;
    background: linear-gradient(
      135deg,
      rgba(252, 192, 21, 0.05) 0%,
      $color-bg-secondary 100%
    );
    box-shadow: $shadow-md;

    &::after {
      transform: scaleX(1);
    }
  }

  &__icon {
    width: 56px;
    height: 56px;
    margin-bottom: $spacing-md;
    color: $color-accent-primary;
    transition: $transition-base;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }

  &:hover &__icon {
    transform: scale(1.1);
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: $spacing-sm;
    color: $color-text-primary;
  }

  &__description {
    color: $color-text-secondary;
    line-height: 1.7;
  }
}

@media (max-width: $breakpoint-sm) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
