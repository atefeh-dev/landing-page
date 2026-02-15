<template>
  <section class="section section--philosophy" id="philosophy" ref="sectionRef">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge" :class="{ 'in-view': isVisible }"
          >فلسفه</span
        >
        <div class="section__title-wrapper" :class="{ 'in-view': isVisible }">
          <h2 class="section__title" :class="{ 'in-view': isVisible }">
            مشکل فقط
            <span class="highlight">نگهداری فایل</span>
            نیست
          </h2>
        </div>
      </div>

      <!-- Problem Cards -->
      <div class="philosophy__cards">
        <div class="philosophy__card" :class="{ 'in-view': isVisible }">
          <div class="philosophy__card-icon">
            <img src="../assets/notion.svg" alt="Notion" />
          </div>
          <p class="philosophy__card-text">
            اصلاحاتی که در پیام‌ها و ایمیل‌ها گم شدند.
          </p>
        </div>

        <div class="philosophy__card" :class="{ 'in-view': isVisible }">
          <div class="philosophy__card-icon philosophy__card-icon--slack">
            <img src="../assets/slack.svg" alt="Slack" />
          </div>
          <p class="philosophy__card-text">
            فایل‌هایی که نمی‌دانستیم آخرین نسخه‌شان کدام است.
          </p>
        </div>

        <div class="philosophy__card" :class="{ 'in-view': isVisible }">
          <div class="philosophy__card-icon philosophy__card-icon--slack">
            <img src="../assets/slack.svg" alt="Slack" />
          </div>
          <p class="philosophy__card-text">
            قراردادهایی که شفاهی شروع شدند و بعداً سوءتفاهم ساختند.
          </p>
        </div>
      </div>

      <p class="philosophy__text" :class="{ 'in-view': isVisible }">
        این‌ها چیزهایی بود که خودمان تجربه کردیم، قبل از اینکه به فکر ساخت
        <span class="highlight">زونکن</span>
        بیفتیم.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { isVisible } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.section--philosophy {
  background: linear-gradient(
    180deg,
    $color-bg-primary 0%,
    $color-bg-secondary 50%,
    $color-bg-tertiary 100%
  );
  position: relative;
  overflow: hidden;
}

.philosophy__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  max-width: 1000px;
  margin: 0 auto 3.125rem;
  padding: 0 $spacing-lg;
}

.philosophy__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
  transition: $transition-base;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;

  &.in-view {
    animation: fadeInUp 0.6s ease-out forwards;

    &:nth-child(1) {
      animation-delay: 0.1s;
    }

    &:nth-child(2) {
      animation-delay: 0.15s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }
  }
}

.philosophy__card-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $radius-md;
  transition: $transition-base;

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
}

.philosophy__card-text {
  font-size: 20px;
  line-height: 1.7;
  color: #f7f7f7;
  margin: 0;
  font-weight: $font-weight-semibold;
}

.philosophy__text {
  font-size: $font-size-3xl;
  line-height: 1.8;
  color: $color-text-secondary;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding: 0 $spacing-lg;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;

  &.in-view {
    animation: fadeInUp 0.6s ease-out 0.25s forwards;
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

// Tablet
@media (max-width: $breakpoint-lg) {
  .philosophy__cards {
    gap: $spacing-lg;
    margin-bottom: $spacing-2xl;
    padding: 0 $spacing-md;
  }

  .philosophy__card {
    padding: $spacing-lg $spacing-md;
    gap: $spacing-md;
  }

  .philosophy__card-icon {
    width: 70px;
    height: 70px;

    img {
      width: 42px;
      height: 42px;
    }
  }

  .philosophy__card-text {
    font-size: 1rem;
  }

  .philosophy__text {
    font-size: 1.125rem;
  }
}

// Tablet Portrait - 2 columns
@media (max-width: $breakpoint-md) {
  .philosophy__cards {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin-bottom: $spacing-xl;

    // Make third card span full width
    .philosophy__card:last-child {
      grid-column: 1 / -1;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .philosophy__card {
    padding: $spacing-md;
  }

  .philosophy__card-icon {
    width: 64px;
    height: 64px;

    img {
      width: 38px;
      height: 38px;
    }
  }

  .philosophy__card-text {
    font-size: 0.9375rem;
  }

  .philosophy__text {
    font-size: 1.0625rem;
  }
}

// Mobile
@media (max-width: $breakpoint-sm) {
  .philosophy__cards {
    grid-template-columns: 1fr;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
    padding: 0;

    .philosophy__card:last-child {
      grid-column: auto;
      max-width: 100%;
    }
  }

  .philosophy__card {
    padding: $spacing-md;
    gap: $spacing-md;
  }

  .philosophy__card-icon {
    width: 60px;
    height: 60px;

    img {
      width: 36px;
      height: 36px;
    }
  }

  .philosophy__card-text {
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .philosophy__text {
    font-size: 1rem;
    line-height: 1.7;
    padding: 0;
  }
}

// Extra small mobile
@media (max-width: 375px) {
  .philosophy__card {
    padding: $spacing-sm $spacing-sm;
  }

  .philosophy__card-icon {
    width: 56px;
    height: 56px;

    img {
      width: 32px;
      height: 32px;
    }
  }

  .philosophy__card-text {
    font-size: 0.8125rem;
  }

  .philosophy__text {
    font-size: 0.9375rem;
  }
}
</style>
