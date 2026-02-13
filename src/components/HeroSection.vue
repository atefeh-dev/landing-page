<template>
  <section class="hero" id="hero">
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__badge">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span>ساده اما قدرتمند</span>
        </div>

        <h1 class="hero__title">
          هر سند یک<br />
          <span class="hero__title-highlight">مسیر مشخص</span><br />
          دارد
        </h1>

        <p class="hero__description">
          زونکن به شما کمک می‌کند قراردادها و اسنادتان را از ایجاد تا تایید
          نهایی پیگیری کنید. دیگر نگران نسخه‌های مختلف یا تغییرات گم‌شده نباشید.
        </p>

        <div class="hero__cta">
          <button
            class="btn btn--primary btn--large"
            @click="$emit('scroll-to-cta')"
          >
            در جریان انتشار باشید
          </button>
          <a href="#philosophy" class="btn btn--secondary btn--large">
            بیشتر بدانید
          </a>
        </div>

        <p class="hero__note">
          رایگان برای همیشه &bull; بدون نیاز به کارت اعتباری
        </p>
      </div>

      <div class="hero__visual">
        <video
          class="hero__video"
          autoplay
          loop
          muted
          playsinline
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a1a' width='400' height='300'/%3E%3C/svg%3E"
        >
          <source
            src="https://tally.so/videos/demo/intro.mp4#t=15"
            type="video/mp4"
          />
        </video>
        <div class="hero__video-overlay"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(["scroll-to-cta"]);
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
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(
      135deg,
      $color-accent-subtle 0%,
      rgba(252, 192, 21, 0.03) 100%
    );
    border: 1px solid $color-border-medium;
    border-radius: $radius-full;
    color: $color-accent-primary;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: $spacing-lg;
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.6s ease-out 0.1s backwards;
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
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
    font-size: 1.25rem;
    line-height: 1.7;
    color: $color-text-secondary;
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
