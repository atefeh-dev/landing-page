<template>
  <section class="hero" id="hero" ref="sectionRef">
    <div class="hero__floating-icons">
      <img
        src="@/assets/icons/pagewithcurl.svg"
        alt=""
        class="hero__icon hero__icon--1"
      />
      <img
        src="@/assets/icons/pagefacingup.svg"
        alt=""
        class="hero__icon hero__icon--2"
      />
      <img
        src="@/assets/icons/memo.svg"
        alt=""
        class="hero__icon hero__icon--3"
      />
      <img
        src="@/assets/icons/clipboard.svg"
        alt=""
        class="hero__icon hero__icon--4"
      />
      <img
        src="@/assets/icons/page-facing-up.svg"
        alt=""
        class="hero__icon hero__icon--5"
      />
      <img
        src="@/assets/icons/bookmark-tabs.svg"
        alt=""
        class="hero__icon hero__icon--6"
      />
      <img
        src="@/assets/icons/scroll.svg"
        alt=""
        class="hero__icon hero__icon--7"
      />
    </div>

    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__badge" :class="reveal(1)">
          <span class="hero__badge--news">
            <img src="@/assets/ui/green-dot.svg" alt="" />
            <span>چه خبر؟</span>
          </span>
          <span>از امروز لیست انتظار باز است</span>
        </div>

        <h1 class="hero__title" :class="reveal(2)">
          اینجا، هر سند <br />
          <span class="hero__title-highlight">یک مسیر مشخص</span>
          دارد
        </h1>

        <p class="hero__description" :class="reveal(3)">
          ما زونکن را ساختیم چون سال‌ها با اسناد، قراردادها و فایل‌هایی کار
          کردیم که هیچ مسیر مشخصی نداشتند. زونکن تلاشی است برای اینکه اسناد، از
          همان ابتدا در مسیر درست قرار بگیرند.
        </p>

        <EmailForm @submit="handleSubmit" />

        <p class="hero__note" :class="reveal(5)">
          هیچ وقت اسپم ارسال نمی‌کنیم. خیالتون راحت
        </p>
      </div>

      <div class="hero__visual" :class="reveal(6)">
        <img
          src="@/assets/images/demo.png"
          alt="نمایی از زونکن"
          class="hero__demo-image"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import EmailForm from "@/components/landing/sections/EmailForm.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

defineEmits(["scroll-to-cta"]);

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef, 0); // threshold 0 → triggers immediately

const handleSubmit = () => {};
</script>

<style lang="scss" scoped>
.hero {
  padding-top: 8rem;
  padding-bottom: $spacing-3xl;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;

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
      top: 13%;
      left: 8%;
      animation-delay: 0s;
      animation-duration: 18s;
      transform: rotate(-15deg);
    }
    &--2 {
      top: 9%;
      left: 25%;
      animation-delay: -3s;
      animation-duration: 22s;
      transform: rotate(8deg);
      width: 60px;
      height: 60px;
    }
    &--3 {
      top: 15%;
      left: 75%;
      animation-delay: -6s;
      animation-duration: 20s;
      transform: rotate(-25deg);
      width: 70px;
      height: 70px;
    }
    &--4 {
      top: 11%;
      right: 8%;
      animation-delay: -9s;
      animation-duration: 24s;
      transform: rotate(12deg);
    }
    &--5 {
      top: 22%;
      left: 18%;
      animation-delay: -12s;
      animation-duration: 19s;
      transform: rotate(18deg);
      width: 65px;
      height: 65px;
    }
    &--6 {
      top: 28%;
      right: 15%;
      animation-delay: -15s;
      animation-duration: 21s;
      transform: rotate(-8deg);
      width: 75px;
      height: 75px;
    }
    &--7 {
      top: 14%;
      right: 62%;
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
    gap: 0.5rem;
    padding: 0.25rem 0.625rem;
    border: 1px solid $color-border-primary;
    border-radius: $radius-sm;
    color: $color-text-hero;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: $spacing-lg;
    backdrop-filter: blur(10px);

    &--news {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: $radius-sm;
      border: 1px solid $color-border-primary;
      color: $color-text-hero;
    }
  }

  &__title {
    font-size: $font-size-5xl;
    font-weight: $font-weight-bold;
    line-height: 1.2;
    margin-bottom: $spacing-md;
    letter-spacing: -0.02em;
    color: $color-text-primary;
  }

  &__title-highlight {
    color: $color-accent-primary;
    display: inline-block;
  }

  &__description {
    font-size: $font-size-xl;
    line-height: 1.6;
    color: #e9d7fe;
    margin-bottom: $spacing-md;
  }

  &__note {
    font-size: 0.875rem;
    color: $color-text-tertiary;
    margin-top: 0.25rem;
    text-align: right;
  }

  &__visual {
    width: 100%;
    max-width: 900px;
  }

  &__demo-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    opacity: 0.9;
  }
}

@media (max-width: $breakpoint-lg) {
  .hero {
    &__content {
      max-width: 600px;
    }
    &__visual {
      max-width: 700px;
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
        display: none;
      }
    }
  }
}
</style>
