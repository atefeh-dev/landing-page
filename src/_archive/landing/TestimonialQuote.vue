<template>
  <section class="section section--testimonial-quote">
    <div class="section__container section__container--narrow">
      <div class="testimonial">
        <div class="testimonial__quote">
          &laquo;ما زونکن را ساختیم چون سال‌ها با قراردادها و فایل‌هایی کار
          کردیم که مسیر مشخصی نداشتند. حالا دیگر نگران گم شدن تغییرات یا
          نسخه‌های مختلف نیستیم.&raquo;
        </div>
        <div class="testimonial__author">
          <div class="testimonial__avatar">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill="#fcc015" />
              <text
                x="20"
                y="26"
                text-anchor="middle"
                fill="#0d0d0d"
                font-size="18"
                font-weight="600"
              >
                ت
              </text>
            </svg>
          </div>
          <div class="testimonial__info">
            <div class="testimonial__name">تیم زونکن</div>
            <div class="testimonial__role">بنیان‌گذاران</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section--testimonial-quote {
  background-color: $color-bg-primary;
}

.testimonial {
  background: linear-gradient(
    135deg,
    $color-bg-tertiary 0%,
    $color-bg-secondary 100%
  );
  border: 1px solid $color-border-medium;
  border-radius: $radius-lg;
  padding: $spacing-3xl;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      $color-accent-subtle 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &__quote {
    font-size: 1.5rem;
    line-height: 1.6;
    color: $color-text-primary;
    margin-bottom: $spacing-xl;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }

  &__author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;
    position: relative;
    z-index: 1;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid $color-border-medium;
  }

  &__info {
    text-align: right;
  }

  &__name {
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: $color-text-primary;
  }

  &__role {
    font-size: 0.875rem;
    color: $color-text-tertiary;
  }
}
</style>
