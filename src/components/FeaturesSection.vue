<template>
  <section class="features section" id="features">
    <div class="section__container">
      <!-- Header -->
      <div class="section__header section__header--center">
        <span class="section__badge">✨ امکانات</span>
        <h2 class="features__title">
          اسناد خود را با یک
          <span class="features__title-highlight">کلیک ساده</span>
          به اشتراک بگذارید
        </h2>
        <p class="features__subtitle">
          به راحتی اسناد خود را با هر کسی به اشتراک بگذارید. فقط با یک کلیک، کد
          شما آماده مشاهده، همکاری یا نمایش است—بدون نیاز به تنظیمات پیچیده.
        </p>
      </div>

      ```
      <!-- Main Content -->
      <div class="features__content">
        <!-- Left Features -->
        <div class="features__list features__list--left">
          <div
            class="features__item"
            v-for="(feature, index) in leftFeatures"
            :key="index"
          >
            <div class="features__item-icon" v-html="feature.icon"></div>
            <div class="features__item-text">
              <h3 class="features__item-title">{{ feature.title }}</h3>
              <p class="features__item-description">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Center Mockup -->
        <div class="features__mockup">
          <div class="features__mockup-window">
            <div class="features__mockup-header">
              <div class="features__mockup-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="features__mockup-title">داشبورد پروژه</div>
            </div>
            <div class="features__mockup-content">
              <div class="features__mockup-tabs">
                <div class="tab active">همه</div>
                <div class="tab">در حال انجام</div>
                <div class="tab">تکمیل شده</div>
              </div>

              <div class="features__mockup-items">
                <div class="mockup-item" v-for="i in 4" :key="i">
                  <div class="mockup-item__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M9 11l3 3L22 4"></path>
                      <path
                        d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                      ></path>
                    </svg>
                  </div>
                  <div class="mockup-item__content">
                    <div class="mockup-item__name">سند پروژه</div>
                    <div class="mockup-item__meta">
                      به‌روزرسانی {{ i }} روز پیش
                    </div>
                  </div>
                  <div class="mockup-item__status">
                    <span class="status-badge">در انتظار</span>
                  </div>
                  <div class="mockup-item__chart">
                    <svg width="60" height="24" viewBox="0 0 60 24">
                      <polyline
                        points="0,20 10,15 20,18 30,10 40,12 50,8 60,5"
                        fill="none"
                        stroke="rgba(252, 192, 21, 0.5)"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <button class="mockup-item__button">📤 اشتراک</button>
                </div>
              </div>
            </div>
          </div>
          <div class="features__mockup-glow"></div>
        </div>

        <!-- Right Benefits -->
        <div class="features__list features__list--right">
          <div
            class="features__item"
            v-for="(benefit, index) in rightBenefits"
            :key="index"
          >
            <div class="features__item-emoji">{{ benefit.emoji }}</div>
            <div class="features__item-text">
              <h3 class="features__item-title">{{ benefit.title }}</h3>
              <p class="features__item-description">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    ```
  </section>
</template>

<script setup>
import { ref } from "vue";

const leftFeatures = ref([
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v20M2 12h20"></path>
    </svg>`,
    title: "پیگیری پروژه‌ها و پیشرفت",
    description: "همه چیز را در یک نگاه ببینید",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>`,
    title: "میزبانی و همکاری کد",
    description: "با تیم خود همکاری کنید",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
      <path d="M9 3v18"></path>
    </svg>`,
    title: "سازماندهی و اشتراک آسان",
    description: "ساده و سریع سازماندهی کنید",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="7" width="20" height="14" rx="2"></rect>
      <path d="M16 3v4M8 3v4"></path>
    </svg>`,
    title: "سازماندهی و اشتراک آسان",
    description: "مدیریت حرفه‌ای پروژه‌ها",
  },
]);

const rightBenefits = ref([
  {
    emoji: "📬",
    title: "به‌روزرسانی‌های فوری",
    description: "در جریان آخرین تغییرات باشید",
  },
  {
    emoji: "🦊",
    title: "مدیریت پروژه‌ها و کد",
    description: "کنترل کامل بر روی پروژه‌ها",
  },
  {
    emoji: "📧",
    title: "همکاری ساختاریافته",
    description: "کار تیمی بهتر و منظم‌تر",
  },
  {
    emoji: "📊",
    title: "مدیریت بصری پروژه",
    description: "نمای واضح از پیشرفت کار",
  },
]);
</script>

<style lang="scss" scoped>
.features {
  background: linear-gradient(
    180deg,
    $color-bg-primary 0%,
    $color-bg-secondary 50%,
    $color-bg-primary 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, $color-accent-glow 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.2;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: $spacing-md;
  }

  &__title-highlight {
    color: $color-accent-secondary;
    position: relative;
  }

  &__subtitle {
    font-size: 1.125rem;
    color: $color-text-secondary;
    max-width: 700px;
    margin: 0 auto $spacing-3xl;
    line-height: 1.6;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: $spacing-xl;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;

    &--left {
      padding-right: $spacing-lg;
    }

    &--right {
      padding-left: $spacing-lg;
    }
  }

  &__item {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-md;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.01) 100%
    );
    border: 1px solid $color-border-subtle;
    border-radius: $radius-md;
    transition: $transition-base;
    backdrop-filter: blur(10px);

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0.02) 100%
      );
      border-color: $color-border-medium;
      transform: translateX(-4px);

      .features__item-icon {
        color: $color-accent-primary;
        transform: scale(1.1);
      }

      .features__item-emoji {
        transform: scale(1.2);
      }
    }
  }

  &__item-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      $color-bg-elevated 0%,
      $color-bg-tertiary 100%
    );
    border: 1px solid $color-border-medium;
    border-radius: $radius-md;
    color: $color-text-secondary;
    transition: $transition-base;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__item-emoji {
    font-size: 2rem;
    line-height: 1;
    flex-shrink: 0;
    transition: $transition-base;
  }

  &__item-text {
    flex: 1;
  }

  &__item-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: $color-text-primary;
  }

  &__item-description {
    font-size: 0.875rem;
    color: $color-text-tertiary;
    line-height: 1.4;
  }

  // Mockup Styles
  &__mockup {
    position: relative;
    animation: float 6s ease-in-out infinite;
  }

  &__mockup-window {
    background: $color-bg-elevated;
    border: 1px solid $color-border-medium;
    border-radius: $radius-lg;
    box-shadow: $shadow-xl;
    overflow: hidden;
    position: relative;
    z-index: 2;
  }

  &__mockup-header {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md;
    background: $color-bg-tertiary;
    border-bottom: 1px solid $color-border-subtle;
  }

  &__mockup-dots {
    display: flex;
    gap: 6px;

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: $color-bg-elevated;
      border: 1px solid $color-border-medium;

      &:nth-child(1) {
        background: rgba(255, 95, 86, 0.3);
        border-color: rgba(255, 95, 86, 0.5);
      }

      &:nth-child(2) {
        background: rgba(255, 189, 46, 0.3);
        border-color: rgba(255, 189, 46, 0.5);
      }

      &:nth-child(3) {
        background: rgba(39, 201, 63, 0.3);
        border-color: rgba(39, 201, 63, 0.5);
      }
    }
  }

  &__mockup-title {
    font-size: 0.875rem;
    color: $color-text-secondary;
    font-weight: 600;
  }

  &__mockup-content {
    padding: $spacing-lg;
  }

  &__mockup-tabs {
    display: flex;
    gap: $spacing-sm;
    margin-bottom: $spacing-lg;

    .tab {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      color: $color-text-tertiary;
      background: transparent;
      border: 1px solid transparent;
      border-radius: $radius-sm;
      cursor: pointer;
      transition: $transition-base;

      &.active {
        color: $color-text-primary;
        background: $color-bg-tertiary;
        border-color: $color-border-medium;
      }

      &:not(.active):hover {
        color: $color-text-secondary;
        background: rgba(255, 255, 255, 0.02);
      }
    }
  }

  &__mockup-items {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__mockup-glow {
    position: absolute;
    inset: -20%;
    background: radial-gradient(
      circle,
      rgba(252, 192, 21, 0.15) 0%,
      transparent 70%
    );
    filter: blur(40px);
    z-index: 1;
    pointer-events: none;
  }
}

.mockup-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  background: $color-bg-tertiary;
  border: 1px solid $color-border-subtle;
  border-radius: $radius-sm;
  transition: $transition-base;

  &:hover {
    background: $color-bg-elevated;
    border-color: $color-border-medium;
  }

  &__icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-bg-elevated;
    border-radius: $radius-sm;
    color: $color-accent-primary;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__name {
    font-size: 0.875rem;
    font-weight: 500;
    color: $color-text-primary;
    margin-bottom: 2px;
  }

  &__meta {
    font-size: 0.75rem;
    color: $color-text-tertiary;
  }

  &__status {
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: $color-accent-primary;
      background: $color-accent-subtle;
      border: 1px solid rgba(252, 192, 21, 0.2);
      border-radius: $radius-full;
      white-space: nowrap;
    }
  }

  &__chart {
    flex-shrink: 0;
    opacity: 0.6;
  }

  &__button {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: $color-text-primary;
    background: $color-accent-primary;
    border: none;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: $transition-base;
    white-space: nowrap;
    font-family: inherit;

    &:hover {
      background: #ffd84d;
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

// Responsive Design
@media (max-width: $breakpoint-xl) {
  .features__content {
    grid-template-columns: 1fr;
    gap: $spacing-2xl;
  }

  .features__list {
    &--left,
    &--right {
      padding: 0;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .features__mockup {
    order: -1;
    max-width: 700px;
    margin: 0 auto;
  }
}

@media (max-width: $breakpoint-md) {
  .features__item {
    &:hover {
      transform: none;
    }
  }

  .mockup-item {
    flex-wrap: wrap;

    &__chart {
      display: none;
    }

    &__button {
      width: 100%;
      margin-top: $spacing-sm;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .features__subtitle {
    font-size: 1rem;
  }

  .features__mockup-content {
    padding: $spacing-md;
  }

  .mockup-item {
    gap: $spacing-sm;
    padding: $spacing-sm;

    &__status {
      width: 100%;
      margin-top: $spacing-sm;
    }
  }
}
</style>
