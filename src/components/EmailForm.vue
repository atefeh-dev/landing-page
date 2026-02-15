<template>
  <div class="email-form">
    <div class="email-form__wrapper">
      <div class="email-form__input-wrapper">
        <input
          v-model="localEmail"
          type="email"
          class="email-form__input"
          :class="{ 'email-form__input--error': showError }"
          :placeholder="placeholder"
          @blur="handleBlur"
          @input="handleInput"
        />
        <p v-if="showError" class="email-form__error-message">
          {{ errorMessage }}
        </p>
      </div>
      <button
        class="btn btn--primary btn--large"
        :disabled="isSubmitting"
        @click="handleSubmit"
      >
        {{ isSubmitting ? submitText : buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "پست الکترونیک خود را وارد نمایید",
  },
  buttonText: {
    type: String,
    default: "به لیست انتظار بپیوندید",
  },
  submitText: {
    type: String,
    default: "در حال ارسال...",
  },
});

const emit = defineEmits(["submit"]);

const localEmail = ref("");
const touched = ref(false);
const isSubmitting = ref(false);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Computed validation
const isEmailValid = computed(() => {
  if (!localEmail.value) return false;
  return emailRegex.test(localEmail.value);
});

const showError = computed(() => {
  return touched.value && !isEmailValid.value && localEmail.value.length > 0;
});

const errorMessage = computed(() => {
  if (!touched.value || !localEmail.value) return "";
  if (!isEmailValid.value) return "لطفاً یک آدرس ایمیل معتبر وارد کنید";
  return "";
});

// Handle blur event
const handleBlur = () => {
  touched.value = true;
};

// Handle button click
const handleSubmit = () => {
  touched.value = true;

  if (!isEmailValid.value) {
    return;
  }

  isSubmitting.value = true;

  // Emit the event to parent
  emit("submit", localEmail.value);

  // Reset after a short delay (simulating submission)
  setTimeout(() => {
    isSubmitting.value = false;
    // Reset form
    localEmail.value = "";
    touched.value = false;
  }, 2000);
};

// Handle input change
const handleInput = () => {
  if (!touched.value && localEmail.value.length > 0) {
    touched.value = true;
  }
};
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.email-form {
  width: 100%;

  &__wrapper {
    display: flex;
    gap: $spacing-md;
    align-items: flex-start;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }

  &__input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  &__input {
    width: 100%;
    padding: 0.75rem 1rem;
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

    &--error {
      border-color: #ef4444;

      &:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
  }

  &__error-message {
    font-size: 0.875rem;
    color: #ef4444;
    margin: 0;
    text-align: right;
    animation: slideDown 0.2s ease-out;
  }

  .btn {
    flex-shrink: 0;
    white-space: nowrap;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Tablet
@media (max-width: $breakpoint-lg) {
  .email-form {
    &__input {
      padding: 0.75rem 0.875rem;
      font-size: 0.9375rem;
    }
  }
}

// Mobile
@media (max-width: $breakpoint-sm) {
  .email-form {
    &__wrapper {
      flex-direction: column;
      align-items: stretch;
      gap: $spacing-sm;
    }

    &__input-wrapper {
      width: 100%;
    }

    &__input {
      padding: 0.75rem 1rem;
    }

    .btn {
      width: 100%;
    }
  }
}

// Extra small mobile
@media (max-width: 375px) {
  .email-form {
    &__input {
      font-size: 0.875rem;
      padding: 0.625rem 0.875rem;
    }
  }
}
</style>
