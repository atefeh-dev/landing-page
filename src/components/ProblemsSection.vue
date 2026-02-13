<template>
  <section class="section section--problem" id="problems">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge">✨رویکرد</span>
        <div class="section__title-wrapper">
          <svg
            class="section__title-image"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="24" cy="24" r="10" stroke="#fcc015" opacity="0.5" />
            <path d="M14 24 L20 30 L34 16" stroke="#fcc015" stroke-width="3" />
          </svg>
          <h2 class="section__title">
            مشکل فقط <span class="highlight">نگهداری فایل</span>
            نیست.
          </h2>
        </div>
        <p class="approach-text">
          پاره ای از مشکلاتی که همه می شناسیم اما برای ما روشن است که هر سند یک
          مسیر دارد و این مسیر باید شفاف و قابل‌پیگیری باشد.
        </p>
      </div>

      <div class="problem-grid">
        <div
          class="problem-card"
          v-for="(problem, index) in problems"
          :key="index"
        >
          <div class="problem-card__icon" v-html="problem.icon"></div>
          <h3 class="problem-card__title">{{ problem.title }}</h3>
          <p class="problem-card__text">{{ problem.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const problems = [
  {
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    title: "قراردادهای شفاهی",
    text: "قراردادهایی که شفاهی آغاز شدند و هیچ‌وقت به طور دقیق ثبت نشدند.",
  },
  {
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,
    title: "نسخه‌های مختلف",
    text: "فایل‌هایی که چند نسخه مختلف داشتند و هیچ‌کس نمی‌دانست کدام نسخه نهایی است.",
  },
  {
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    title: "تغییرات گم‌شده",
    text: "اصلاحاتی که در میان صدها پیام گم شدند و زمان زیادی برای پیدا کردنشان صرف شد.",
  },
];
</script>

<style lang="scss" scoped>
.section--problem {
  background: linear-gradient(
    180deg,
    $color-bg-secondary 0%,
    $color-bg-tertiary 100%
  );
}

.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-lg;
  margin-top: $spacing-xl;
}

.problem-card {
  background: linear-gradient(
    135deg,
    $color-bg-elevated 0%,
    $color-bg-tertiary 100%
  );
  border: 1px solid $color-border-subtle;
  border-radius: $radius-lg;
  padding: $spacing-xl;
  transition: $transition-base;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle,
      $color-accent-subtle 0%,
      transparent 70%
    );
    opacity: 0;
    transition: $transition-base;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: $color-border-strong;
    box-shadow: $shadow-lg;

    &::before {
      opacity: 1;
    }
  }

  &__icon {
    width: 48px;
    height: 48px;
    margin-bottom: $spacing-md;
    color: $color-accent-primary;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: $spacing-sm;
    color: $color-text-primary;
  }

  &__text {
    color: $color-text-secondary;
    line-height: 1.7;
  }
}
.approach-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: $color-text-secondary;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: $breakpoint-sm) {
  .problem-grid {
    grid-template-columns: 1fr;
  }
}
</style>
