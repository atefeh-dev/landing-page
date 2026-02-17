<template>
  <section class="section section--customers" id="customers" ref="sectionRef">
    <div class="section__container">
      <div class="customers">
        <div
          class="customers__content animate-fade-up"
          :class="{ 'in-view': isVisible }"
        >
          <span
            class="section__badge animate-slide-down animate-delay-1"
            :class="{ 'in-view': isVisible }"
          >
            مشتریان
          </span>

          <h2
            class="customers__title animate-fade-up animate-delay-2"
            :class="{ 'in-view': isVisible }"
          >
            برای کسانی که می‌خواهند
            <span class="customers__title-highlight">منظم‌تر کار کنند</span>
          </h2>

          <div
            class="customers__description animate-fade-up animate-delay-3"
            :class="{ 'in-view': isVisible }"
          >
            <p>
              زونکن امروز بیشتر برای افراد مستقل و کسب‌وکارهای کوچک طراحی شده؛
              جایی که نظم در اسناد، تفاوت بزرگی ایجاد می‌کند.
            </p>
            <p>
              اما از همان ابتدا، با نگاهی ساخته شده که بتواند همراه رشد تیم‌ها و
              سازمان‌ها هم باشد.
            </p>
          </div>
        </div>

        <div
          class="customers__visual animate-fade-up animate-delay-4"
          :class="{ 'in-view': isVisible }"
        >
          <div class="customers__image-wrapper">
            <img
              :src="DashboardImg"
              alt="داشبورد زونکن"
              class="customers__image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import DashboardImg from "@/assets/dashboard.png";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { isVisible } = useScrollAnimation(sectionRef);
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.section--customers {
  background: $color-bg-primary;
  position: relative;
  overflow: hidden;
}

.customers {
  display: flex;
  align-items: center;
  gap: $spacing-3xl;

  &__content {
    flex: 0 0 auto;
    max-width: 600px;
    width: 100%;
    padding-right: 2rem;
    text-align: right;
  }

  &__title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: $font-weight-bold;
    line-height: 1.3;
    margin-bottom: $spacing-lg;
    color: $color-text-primary;
  }

  &__title-highlight {
    color: $color-accent-primary;
    display: block;
  }

  &__description {
    font-size: 1.125rem;
    line-height: 1.8;
    color: $color-text-secondary;

    p {
      margin-bottom: $spacing-md;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__visual {
    flex: 0 0 50%;
    position: relative;
    margin-left: -5%;
  }

  &__image-wrapper {
    position: relative;
    border-radius: 0 $radius-xl $radius-xl 0;
    overflow: hidden;
    box-shadow: $shadow-xl;
    border: 1px solid $color-border-subtle;
    border-left: none;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 25%;
      background: linear-gradient(
        90deg,
        rgba(10, 10, 15, 1) 0%,
        rgba(10, 10, 15, 0.95) 15%,
        rgba(10, 10, 15, 0.85) 30%,
        rgba(10, 10, 15, 0.7) 45%,
        rgba(10, 10, 15, 0.5) 60%,
        rgba(10, 10, 15, 0.3) 75%,
        rgba(10, 10, 15, 0.15) 88%,
        rgba(10, 10, 15, 0.05) 96%,
        transparent 100%
      );
      pointer-events: none;
      z-index: 2;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(252, 192, 21, 0.08) 0%,
        transparent 30%,
        transparent 70%,
        rgba(20, 52, 203, 0.05) 100%
      );
      pointer-events: none;
      z-index: 1;
      opacity: 0.6;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
    position: relative;
    z-index: 0;
  }
}

@media (max-width: $breakpoint-lg) {
  .customers {
    gap: $spacing-2xl;

    &__visual {
      flex: 0 0 45%;
      margin-left: -3%;
    }
    &__content {
      max-width: 500px;
      padding-right: 1.5rem;
    }

    &__title {
      font-size: clamp(1.5rem, 4vw, 2rem);
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: 1.0625rem;
      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .section--customers {
    padding: $spacing-2xl 0;
  }

  .customers {
    flex-direction: column;
    gap: $spacing-xl;
    padding: 0 1.5rem;

    &__visual {
      flex: none;
      width: 100%;
      max-width: 600px;
      // FIX: was margin-left: 0 followed by margin: 0 auto (conflict) — use margin only
      margin: 0 auto;
    }

    &__image-wrapper {
      border-radius: $radius-xl;
      border: 1px solid $color-border-subtle;
      &::before {
        display: none;
      }
    }

    &__content {
      flex: none;
      max-width: 600px;
      text-align: center;
      padding-right: 0;
      margin: 0 auto;
    }

    &__badge {
      margin-bottom: $spacing-md;
    }
    &__title {
      font-size: clamp(1.5rem, 5vw, 1.875rem);
    }
    &__title-highlight {
      display: inline;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .section--customers {
    padding: $spacing-xl 0;
  }

  .customers {
    padding: 0 1.5rem;
    gap: $spacing-lg;

    &__visual {
      max-width: 100%;
    }
    &__image-wrapper {
      border-radius: $radius-md;
    }

    &__badge {
      font-size: 0.875rem;
      padding: 0.375rem 1rem;
    }

    &__title {
      font-size: clamp(1.5rem, 6vw, 1.75rem);
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: 1rem;
      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}
</style>
