<template>
  <section class="section section--approach" id="approach">
    <div class="section__container section__header--center">
      <div class="section__header">
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
      </div>

      <p class="approach-text">
        هر سند یک مسیر دارد -- و این مسیر باید شفاف و قابل‌پیگیری باشد.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section--approach {
  background: linear-gradient(
    180deg,
    $color-bg-secondary 0%,
    $color-bg-primary 100%
  );
}
</style>
