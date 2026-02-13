<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <div class="footer__brand">
          <h4 class="footer__logo">زونکن</h4>
          <p class="footer__tagline">مدیریت هوشمند اسناد</p>
        </div>

        <div class="footer__links">
          <div class="footer__column">
            <h4 class="footer__heading">محصول</h4>
            <ul class="footer__list">
              <li><a href="#features">ویژگی‌ها</a></li>
              <li><a href="#use-cases">کاربردها</a></li>
              <li><a href="#faq">راهنما</a></li>
            </ul>
          </div>

          <div class="footer__column">
            <h4 class="footer__heading">منابع</h4>
            <ul class="footer__list">
              <li><a href="#">وبلاگ</a></li>
              <li><a href="#">مستندات</a></li>
              <li><a href="#">پشتیبانی</a></li>
            </ul>
          </div>

          <div class="footer__column">
            <h4 class="footer__heading">شرکت</h4>
            <ul class="footer__list">
              <li><a href="#">درباره ما</a></li>
              <li><a href="#">تماس</a></li>
              <li><a href="#">حریم خصوصی</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">
          ساخته شده در ایران &bull; &copy; 2026 زونکن
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: $color-bg-secondary;
  border-top: 1px solid $color-border-subtle;
  padding: $spacing-3xl 0 $spacing-xl;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__main {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: $spacing-3xl;
    margin-bottom: $spacing-xl;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: $spacing-sm;
    letter-spacing: -0.02em;
  }

  &__tagline {
    color: $color-text-secondary;
    margin-bottom: $spacing-md;
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xl;
  }

  &__heading {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: $spacing-md;
    color: $color-text-primary;
  }

  &__list {
    li {
      margin-bottom: $spacing-sm;
    }

    a {
      color: $color-text-secondary;
      transition: $transition-base;
      display: inline-block;

      &:hover {
        color: $color-text-primary;
        transform: translateX(-2px);
      }
    }
  }

  &__bottom {
    padding-top: $spacing-xl;
    border-top: 1px solid $color-border-subtle;
    text-align: center;
  }

  &__copyright {
    color: $color-text-tertiary;
    font-size: 0.875rem;
  }
}

// Tablet optimization
@media (max-width: $breakpoint-lg) {
  .footer {
    padding: $spacing-2xl 0 $spacing-lg;
  }

  .footer__container {
    padding: 0 1.5rem;
  }

  .footer__main {
    gap: $spacing-xl;
    margin-bottom: $spacing-lg;
  }

  .footer__links {
    gap: $spacing-lg;
  }

  .footer__bottom {
    padding-top: $spacing-lg;
  }
}

// Mobile optimization
@media (max-width: $breakpoint-md) {
  .footer {
    padding: $spacing-xl 0 $spacing-md;
  }

  .footer__container {
    padding: 0 1rem;
  }

  .footer__main {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
    margin-bottom: $spacing-md;
  }

  .footer__brand {
    text-align: center;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $color-border-subtle;
  }

  .footer__links {
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md;
  }

  .footer__column {
    text-align: center;
  }

  .footer__heading {
    font-size: 0.875rem;
    margin-bottom: $spacing-sm;
  }

  .footer__list {
    li {
      margin-bottom: 0.5rem;
    }

    a {
      font-size: 0.875rem;

      &:hover {
        transform: none;
      }
    }
  }

  .footer__bottom {
    padding-top: $spacing-md;
  }

  .footer__copyright {
    font-size: 0.75rem;
  }
}

// Small mobile optimization
@media (max-width: $breakpoint-sm) {
  .footer {
    padding: $spacing-lg 0 $spacing-sm;
  }

  .footer__links {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
    max-width: 200px;
    margin: 0 auto;
  }

  .footer__column {
    padding: $spacing-sm 0;

    &:not(:last-child) {
      border-bottom: 1px solid $color-border-subtle;
    }
  }

  .footer__list li {
    margin-bottom: 0.375rem;
  }
}
</style>
