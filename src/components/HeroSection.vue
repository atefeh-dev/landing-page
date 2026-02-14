<template>
  <section class="hero" id="hero">
    <!-- Floating document icons background -->
    <div class="hero__floating-icons">
      <img
        src="../assets/pagewithcurl.svg"
        alt=""
        class="hero__icon hero__icon--1"
      />
      <img
        src="../assets/pagefacingup.svg"
        alt=""
        class="hero__icon hero__icon--2"
      />
      <img src="../assets/memo.svg" alt="" class="hero__icon hero__icon--3" />
      <img
        src="../assets/clipboard.svg"
        alt=""
        class="hero__icon hero__icon--4"
      />
      <img
        src="../assets/page-facing-up.svg"
        alt=""
        class="hero__icon hero__icon--5"
      />
      <img
        src="../assets/bookmark-tabs.svg"
        alt=""
        class="hero__icon hero__icon--6"
      />
      <img src="../assets/scroll.svg" alt="" class="hero__icon hero__icon--7" />
    </div>

    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge--news">
            <img src="../assets/green-dot.svg" alt="" />
            <span> چه خبر؟ </span>
          </span>
          <span> از امروز لیست انتظار باز است</span>
        </div>

        <h1 class="hero__title">
          اینجا، هر سند <br />
          <span class="hero__title-highlight">یک مسیر مشخص </span>
          دارد
        </h1>

        <p class="hero__description">
          ما زونکن را ساختیم چون سال‌ها با اسناد، قراردادها و فایل‌هایی کار
          کردیم که هیچ مسیر مشخصی نداشتند. زونکن تلاشی است برای اینکه اسناد، از
          همان ابتدا در مسیر درست قرار بگیرند.
        </p>

        <div class="hero__cta">
          <input
            type="email"
            class="hero__email-input"
            placeholder="پست الکترونیک خود را وارد نمایید"
          />
          <button
            class="btn btn--primary btn--large"
            @click="$emit('scroll-to-cta')"
          >
            به لیست انتظار بپیوندید
          </button>
        </div>

        <p class="hero__note">هیچ وقت اسپم ارسال نمی‌کنیم. خیالتون راحت.</p>
      </div>

      <!-- Browser mockup showing the demo -->
      <div class="hero__visual">
        <img
          src="/src/assets/demo.png"
          alt="نمایی از زونکن"
          class="hero__demo-image"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(["scroll-to-cta"]);
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.hero {
  padding-top: 8rem;
  padding-bottom: $spacing-3xl;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;

  // Floating document icons
  &__floating-icons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  &__icon {
    position: absolute;
    width: 80px;
    height: 80px;
    opacity: 0.4;
    filter: brightness(0.8);
    animation: float 20s infinite ease-in-out;

    &--1 {
      top: 21%;
      left: 27%;
      animation-delay: 0s;
      animation-duration: 18s;
      transform: rotate(-15deg);
    }

    &--2 {
      top: 16%;
      left: 25%;
      animation-delay: -3s;
      animation-duration: 22s;
      transform: rotate(8deg);
      width: 60px;
      height: 60px;
    }

    &--3 {
      top: 22%;
      left: 67%;
      animation-delay: -6s;
      animation-duration: 20s;
      transform: rotate(-25deg);
      width: 70px;
      height: 70px;
    }

    &--4 {
      top: 15%;
      right: 25%;
      animation-delay: -9s;
      animation-duration: 24s;
      transform: rotate(12deg);
    }

    &--5 {
      bottom: 83%;
      left: 36%;
      animation-delay: -12s;
      animation-duration: 19s;
      transform: rotate(18deg);
      width: 65px;
      height: 65px;
    }

    &--6 {
      bottom: 83%;
      right: 33%;
      animation-delay: -15s;
      animation-duration: 21s;
      transform: rotate(-8deg);
      width: 75px;
      height: 75px;
    }

    &--7 {
      bottom: 79%;
      right: 65%;
      animation-delay: -18s;
      animation-duration: 23s;
      transform: rotate(22deg);
      width: 70px;
      height: 70px;
    }
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-gap;
    position: relative;
    z-index: 1;
  }

  &__content {
    text-align: center;
    max-width: 700px;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    gap: 0.5rem;
    padding: 0.25rem 0.625rem;
    border: 1px solid $color-border-primary;
    border-radius: $radius-sm;
    color: $color-text-hero;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: $spacing-lg;
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.6s ease-out 0.1s backwards;

    &--news {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      color: $color-text-hero;
      padding: 0.25rem 0.5rem;
      border-radius: $radius-sm;
      border: 1px solid $color-border-primary;
    }
  }

  &__title {
    font-size: $font-size-5xl;
    font-weight: $font-weight-bold;
    line-height: 1.2;
    margin-bottom: $spacing-lg;
    letter-spacing: -0.02em;
    animation: fadeInUp 0.6s ease-out 0.2s backwards;
    color: $color-text-primary;
  }

  &__title-highlight {
    color: $color-accent-primary;
    position: relative;
    display: inline-block;
  }

  &__description {
    font-size: 1.125rem;
    line-height: 1.6;
    color: $color-text-secondary;
    margin-bottom: $spacing-xl;
    margin-left: auto;
    margin-right: auto;
    animation: fadeInUp 0.6s ease-out 0.3s backwards;
  }

  &__cta {
    display: flex;
    gap: $spacing-md;
    margin-bottom: $spacing-xs;
    animation: fadeInUp 0.6s ease-out 0.4s backwards;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 700px;

    .btn {
      flex-shrink: 0;
    }
  }

  &__email-input {
    flex: 1;
    padding: 0.75rem 0.875rem;
    font-size: 1rem;
    font-family: inherit;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid $color-border-medium;
    border-radius: $radius-md;
    color: $color-text-primary;
    transition: $transition-base;
    text-align: right;

    &::placeholder {
      color: $color-text-tertiary;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: $color-border-strong;
    }

    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.1);
      border-color: $color-accent-primary;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.1);
    }
  }

  &__note {
    font-size: 0.875rem;
    color: $color-text-tertiary;
    animation: fadeInUp 0.6s ease-out 0.5s backwards;
    text-align: right;
  }

  // Browser mockup
  &__visual {
    position: relative;
    animation: fadeInUp 0.6s ease-out 0.6s backwards;
    width: 100%;
    max-width: 900px;
  }

  &__browser {
    background: $color-bg-secondary;
    border-radius: $radius-lg;
    overflow: hidden;
    box-shadow: $shadow-xl;
    border: 1px solid $color-border-subtle;
  }

  &__browser-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid $color-border-subtle;
  }

  &__browser-dots {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &--red {
      background: #ff5f57;
    }

    &--yellow {
      background: #ffbd2e;
    }

    &--green {
      background: #28c840;
    }
  }

  &__browser-controls {
    display: flex;
    gap: 0.5rem;
    color: $color-text-tertiary;
    flex-shrink: 0;

    svg {
      opacity: 0.6;
    }
  }

  &__browser-url {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: $radius-sm;
    color: $color-text-tertiary;
    font-size: 0.875rem;
    min-width: 0;

    span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    svg {
      flex-shrink: 0;
      opacity: 0.6;
    }
  }

  &__browser-actions {
    display: flex;
    gap: 0.5rem;
    color: $color-text-tertiary;
    flex-shrink: 0;

    svg {
      opacity: 0.6;
    }
  }

  &__browser-content {
    background: rgba(255, 255, 255, 0.02);
    aspect-ratio: 16 / 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__demo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(var(--rotation, 0deg));
  }
  50% {
    transform: translateY(-20px) rotate(calc(var(--rotation, 0deg) + 5deg));
  }
}

// Tablet
@media (max-width: $breakpoint-lg) {
  .hero {
    &__content {
      max-width: 600px;
    }

    &__visual {
      max-width: 700px;
    }

    &__cta {
      flex-direction: column;
      width: 100%;
    }

    &__email-input {
      width: 100%;
      min-width: unset;
    }

    &__icon {
      width: 60px;
      height: 60px;

      &--2,
      &--5 {
        width: 50px;
        height: 50px;
      }

      &--3,
      &--7 {
        width: 55px;
        height: 55px;
      }
    }
  }
}

// Mobile
@media (max-width: $breakpoint-sm) {
  .hero {
    padding-top: 6rem;
    padding-bottom: $spacing-2xl;

    &__container {
      padding: 0 1.5rem;
      gap: $spacing-xl;
    }

    &__content {
      max-width: 100%;
    }

    &__title {
      font-size: clamp(1.75rem, 8vw, 2rem);
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: 1rem;
      margin-bottom: $spacing-lg;
    }

    &__cta {
      flex-direction: column;
      gap: $spacing-sm;
      width: 100%;

      .btn {
        width: 100%;
      }
    }

    &__email-input {
      width: 100%;
    }

    &__icon {
      width: 50px;
      height: 50px;
      opacity: 0.3;

      &--2,
      &--5 {
        width: 40px;
        height: 40px;
      }

      &--3,
      &--6,
      &--7 {
        display: none; // Hide some icons on mobile to reduce clutter
      }
    }

    &__browser-header {
      padding: 0.5rem;
      gap: 0.5rem;
    }

    &__browser-controls,
    &__browser-actions {
      display: none; // Hide on mobile for cleaner look
    }

    &__browser-url {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }

    &__dot {
      width: 10px;
      height: 10px;
    }
  }
}

// Extra small mobile
@media (max-width: 375px) {
  .hero {
    &__container {
      padding: 0 1rem;
    }

    &__content {
      max-width: 100%;
    }

    &__badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    &__email-input {
      font-size: 0.875rem;
      padding: 0.625rem 1rem;
    }

    &__browser-url span {
      font-size: 0.7rem;
    }
  }
}
</style>
