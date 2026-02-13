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

        <form class="cta__form" @submit.prevent="submitEmail">
          <div class="cta__input-wrapper">
            <input
              type="email"
              class="cta__input"
              :class="{
                'cta__input--error': error && touched,
                'cta__input--success': success,
              }"
              placeholder="ایمیل شما"
              v-model="email"
              @blur="handleBlur"
              @input="handleInput"
            />

            <!-- Error Icon -->
            <transition name="fade">
              <div
                v-if="error && touched"
                class="cta__input-icon cta__input-icon--error"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
            </transition>

            <!-- Success Icon -->
            <transition name="fade">
              <div
                v-if="success"
                class="cta__input-icon cta__input-icon--success"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </transition>
          </div>

          <button
            class="btn btn--primary cta__submit"
            type="submit"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">درخواست عضویت</span>
            <span v-else class="cta__loading">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
              در حال ارسال...
            </span>
          </button>
        </form>

        <!-- Error Message -->
        <transition name="slide-fade">
          <div v-if="error && touched" class="cta__error-message">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{{ error }}</span>
          </div>
        </transition>

        <!-- Success Message -->
        <transition name="slide-fade">
          <div v-if="success && !error" class="cta__success-message">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span
              >عالی! ایمیل شما با موفقیت ثبت شد. به زودی از ما خبر خواهید
              داشت.</span
            >
          </div>
        </transition>

        <p class="cta__note" v-if="!success">
          با عضویت، از جدیدترین اخبار زونکن مطلع می‌شوید.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const email = ref("");
const touched = ref(false);
const success = ref(false);
const isSubmitting = ref(false);
const ctaEl = ref(null);

defineExpose({ ctaEl });

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Computed error message
const error = computed(() => {
  // Don't show errors if not touched or if successful
  if (!touched.value || success.value) return "";

  if (!email.value) {
    return "لطفاً ایمیل خود را وارد کنید";
  }

  if (email.value.length < 5) {
    return "ایمیل خیلی کوتاه است";
  }

  if (!email.value.includes("@")) {
    return "ایمیل باید شامل @ باشد";
  }

  if (!emailRegex.test(email.value)) {
    return "فرمت ایمیل صحیح نیست";
  }

  return "";
});

function handleInput() {
  // Reset success and touched state when user starts typing again
  if (success.value) {
    success.value = false;
  }

  // Don't mark as touched while typing - only on blur or submit
  if (touched.value) {
    touched.value = false;
  }
}

function handleBlur() {
  // Mark as touched when user leaves the input field
  touched.value = true;
}

async function submitEmail() {
  touched.value = true;

  // Check for errors
  if (error.value) {
    return;
  }

  // Simulate API call
  isSubmitting.value = true;

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success!
    success.value = true;

    // Reset form after 5 seconds
    setTimeout(() => {
      email.value = "";
      touched.value = false;
      success.value = false;
    }, 5000);
  } catch (err) {
    console.error("Submission error:", err);
  } finally {
    isSubmitting.value = false;
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

  &__input-wrapper {
    flex: 1;
    position: relative;
  }

  &__input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    background-color: $color-bg-elevated;
    border: 2px solid $color-border-medium;
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

    &--error {
      border-color: #ef4444;
      background-color: rgba(239, 68, 68, 0.05);

      &:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }

    &--success {
      border-color: $color-success;
      background-color: rgba(68, 147, 109, 0.05);

      &:focus {
        border-color: $color-success;
        box-shadow: 0 0 0 3px rgba(68, 147, 109, 0.1);
      }
    }
  }

  &__input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    &--error {
      color: #ef4444;
    }

    &--success {
      color: $color-success;

      svg {
        animation: checkmark 0.6s ease;
      }
    }
  }

  &__submit {
    white-space: nowrap;
    min-width: 150px;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      animation: spin 1s linear infinite;
    }
  }

  &__error-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: $radius-md;
    color: #ef4444;
    font-size: 0.875rem;
    font-weight: 500;
    max-width: 500px;
    margin: 0 auto $spacing-md;
    position: relative;
    z-index: 1;

    svg {
      flex-shrink: 0;
    }
  }

  &__success-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(68, 147, 109, 0.1);
    border: 1px solid rgba(68, 147, 109, 0.3);
    border-radius: $radius-md;
    color: $color-success;
    font-size: 0.875rem;
    font-weight: 500;
    max-width: 500px;
    margin: 0 auto $spacing-md;
    position: relative;
    z-index: 1;

    svg {
      flex-shrink: 0;
    }
  }

  &__note {
    font-size: 0.875rem;
    color: $color-text-tertiary;
    position: relative;
    z-index: 1;
  }
}

// Animations
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes checkmark {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

// Responsive Design
@media (max-width: $breakpoint-md) {
  .cta {
    padding: $spacing-2xl $spacing-lg;
  }

  .cta__form {
    flex-direction: column;
  }

  .cta__input {
    padding: 1rem 3rem 1rem 1.5rem;
  }

  .cta__submit {
    width: 100%;
  }

  .cta__error-message,
  .cta__success-message {
    text-align: right;
  }
}

@media (max-width: $breakpoint-sm) {
  .cta {
    padding: $spacing-xl $spacing-md;
  }

  .cta__illustration svg {
    width: 100px;
    height: 100px;
  }
}
</style>
