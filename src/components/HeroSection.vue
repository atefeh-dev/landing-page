<template>
  <section class="hero" id="hero">
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge--news">
            <img src="../assets/green-dot.svg" />
            <span> چه خبر؟ </span>
          </span>

          <span> از امروز لیست انتظار باز است</span>
        </div>

        <h1 class="hero__title">
          اینجا، هر سند <br />
          <span class="hero__title-highlight">یک مسیر مشخص </span>
          دارد.
        </h1>

        <p class="hero__description">
          ما زونکن را ساختیم چون سال‌ها با اسناد، قراردادها و فایل‌هایی کار
          کردیم که هیچ مسیر مشخصی نداشتند. زونکن تلاشی است برای اینکه اسناد، از
          همان ابتدا در مسیر درست قرار بگیرند.
        </p>

        <div class="hero__cta">
          <button
            class="btn btn--primary btn--large"
            @click="$emit('scroll-to-cta')"
          >
            به لیست انتظار بپیوندید
          </button>
        </div>

        <p class="hero__note">هیچ وقت اسپم ارسال نمی کنیم. خیالتون راحت</p>
      </div>

      <div class="hero__visual">
        <img
          src="/src/assets/demo.png"
          alt="نمایی از زونکن"
          class="hero__video"
        />
        <div class="hero__video-overlay"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(["scroll-to-cta"]);
import PageWithCurlImg from "@/assets/pagewithcurl.svg";
import PageFacingUp1Img from "@/assets/pagefacingup.svg";
import PageFacingUp2Img from "@/assets/page-facing-up.svg";
import MemoImg from "@/assets/memo.svg";
import ClipboardImg from "@/assets/clipboard.svg";
import BookmarkTabImg from "@/assets/bookmark-tabs.svg";
import ScrollImg from "@/assets/scroll.svg";
import ZoonkanDemo from "@/assets/demo.png";
</script>

<style lang="scss" scoped>
.hero {
  padding-top: 8rem;
  padding-bottom: $spacing-3xl;
  min-height: 100vh;
  display: flex;
  align-items: center;
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
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, $color-accent-glow 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.3;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-3xl;
    align-items: center;
    position: relative;
    z-index: 1;
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
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    line-height: 1.1;
    margin-bottom: $spacing-lg;
    letter-spacing: -0.02em;
    animation: fadeInUp 0.6s ease-out 0.2s backwards;
  }

  &__title-highlight {
    color: $color-accent-primary;
    position: relative;
    display: inline-block;
  }

  &__description {
    font-size: $font-size-xl;
    font-weight: $font-weight-regular;
    color: #e9d7fe;
    margin-bottom: $spacing-xl;
    max-width: 500px;
    animation: fadeInUp 0.6s ease-out 0.3s backwards;
  }

  &__cta {
    margin-bottom: $spacing-md;
    animation: fadeInUp 0.6s ease-out 0.4s backwards;
  }

  &__note {
    font-size: 0.875rem;
    color: $color-text-tertiary;
    animation: fadeInUp 0.6s ease-out 0.5s backwards;
  }

  &__visual {
    position: relative;
    border-radius: $radius-xl;
    overflow: hidden;
    background-color: $color-bg-tertiary;
    border: 1px solid $color-border-subtle;
    box-shadow: $shadow-xl;
  }

  &__video {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    opacity: 0.9;
  }

  &__video-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
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

@media (max-width: $breakpoint-lg) {
  .hero__container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__content {
    order: 1;
  }

  .hero__visual {
    order: 2;
    max-width: 500px;
    margin: 0 auto;
  }

  .hero__description {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: $breakpoint-sm) {
  .hero {
    padding-top: 6rem;
  }
}
</style>
