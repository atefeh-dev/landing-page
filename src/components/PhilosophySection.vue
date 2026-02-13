<template>
  <section class="section section--philosophy" id="philosophy">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge">✨فلسفه محصول</span>
        <div class="section__title-wrapper">
          <svg
            class="section__title-image"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
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
          <h2 class="section__title">
            زونکن فقط یک

            <span class="highlight">فضای ذخیره‌سازی</span>
            نیست.
          </h2>
        </div>
      </div>

      <p class="philosophy-text">
        زونکن هر سند را در تمام مراحل عمرش همراهی می‌کند. از لحظه ایجاد، تا
        بررسی و اصلاح، تا تایید نهایی و نگه‌داری بلندمدت. ما معتقدیم که مدیریت
        اسناد باید ساختارمند، شفاف و قابل‌اعتماد باشد. برای فریلنسرها و
        کسب‌وکارهای کوچکی که هر روز با قراردادها و مستندات سروکار دارند، زونکن
        نظم و آرامش خاطر به ارمغان می‌آورد.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section--philosophy {
  background: linear-gradient(
    180deg,
    $color-bg-secondary 0%,
    $color-bg-tertiary 100%
  );
}

.philosophy-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: $color-text-secondary;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}
</style>
