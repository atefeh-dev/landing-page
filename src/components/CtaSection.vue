<template>
  <section class="section section--cta" ref="ctaEl">
    <div class="section__container section__container--narrow">
      <div class="cta">
        <div class="cta__illustration">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="40"
              r="25"
              fill="none"
              stroke="#fcc015"
              stroke-width="3"
            />
            <path
              d="M50 55 L55 60 L70 45"
              stroke="#fcc015"
              stroke-width="3"
              fill="none"
            />
            <path
              d="M35 70 Q60 65 85 70"
              stroke="#1434cb"
              stroke-width="2"
              fill="none"
            />
            <circle cx="35" cy="70" r="4" fill="#1434cb" />
            <circle cx="85" cy="70" r="4" fill="#44936d" />
          </svg>
        </div>
        <h2 class="cta__title">زونکن هنوز در ابتدای مسیر است.</h2>
        <p class="cta__description">
          اگر دوست دارید در جریان این مسیر باشید، خوشحال می‌شویم کنارمان باشید.
        </p>
        <div class="cta__form">
          <input
            type="email"
            class="cta__input"
            placeholder="ایمیل شما"
            v-model="email"
          />
          <button class="btn btn--primary" @click="submitEmail">
            درخواست عضویت
          </button>
        </div>
        <p class="cta__note">با عضویت، از جدیدترین اخبار زونکن مطلع می‌شوید</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const ctaEl = ref(null);

defineExpose({ ctaEl });

function submitEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && emailRegex.test(email.value)) {
    alert(
      `متشکریم! ${email.value} با موفقیت ثبت شد. به زودی از ما خبر خواهید داشت.`,
    );
    email.value = "";
  } else {
    alert("لطفا یک ایمیل معتبر وارد کنید");
  }
}
</script>

<style lang="scss" scoped>
.section--cta {
  background-color: $color-bg-primary;
}

.cta {
  background: linear-gradient(
    135deg,
    $color-bg-tertiary 0%,
    $color-bg-secondary 100%
  );
  border: 1px solid $color-border-medium;
  border-radius: $radius-xl;
  padding: $spacing-3xl;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, $color-accent-glow 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.5;
  }

  &__illustration {
    margin-bottom: $spacing-xl;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  &__title {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 700;
    margin-bottom: $spacing-md;
    position: relative;
    z-index: 1;
  }

  &__description {
    font-size: 1.125rem;
    color: $color-text-secondary;
    max-width: 500px;
    margin: 0 auto $spacing-xl;
    line-height: 1.7;
    position: relative;
    z-index: 1;
  }

  &__form {
    display: flex;
    gap: $spacing-sm;
    max-width: 500px;
    margin: 0 auto $spacing-md;
    position: relative;
    z-index: 1;
  }

  &__input {
    flex: 1;
    padding: 1rem 1.5rem;
    background-color: $color-bg-elevated;
    border: 1px solid $color-border-medium;
    border-radius: $radius-md;
    color: $color-text-primary;
    font-family: inherit;
    font-size: 1rem;
    transition: $transition-base;

    &:focus {
      outline: none;
      border-color: $color-accent-primary;
      background-color: $color-bg-tertiary;
      box-shadow: 0 0 0 3px $color-accent-subtle;
    }

    &::placeholder {
      color: $color-text-tertiary;
    }
  }

  &__note {
    font-size: 0.875rem;
    color: $color-text-tertiary;
    position: relative;
    z-index: 1;
  }
}

@media (max-width: $breakpoint-md) {
  .cta__form {
    flex-direction: column;
  }
}
</style>
