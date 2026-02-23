<template>
  <div class="ef">
    <div class="ef__row">
      <input
        v-model="email"
        type="email"
        :placeholder="placeholder"
        class="ef__input"
        :class="{ 'ef__input--error': showError }"
        dir="rtl"
        @blur="touched = true"
      />
      <button
        class="ef__btn"
        :disabled="isSubmitting"
        type="button"
        @click="submit"
      >
        <span v-if="isSubmitting" class="ef__spinner" aria-hidden="true" />
        <span v-else>{{ buttonText }}</span>
      </button>
    </div>
    <p v-if="showError" class="ef__error" role="alert">
      لطفاً یک آدرس ایمیل معتبر وارد کنید
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  placeholder: { type: String, default: "ایمیل شما" },
  buttonText: { type: String, default: "پیوستن به لیست انتظار" },
});

const emit = defineEmits(["submit"]);

const email = ref("");
const touched = ref(false);
const isSubmitting = ref(false);

const valid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const showError = computed(
  () => touched.value && !valid.value && email.value.length > 0,
);

function submit() {
  touched.value = true;
  if (!valid.value) return;
  isSubmitting.value = true;
  emit("submit", email.value);
  setTimeout(() => {
    isSubmitting.value = false;
    email.value = "";
    touched.value = false;
  }, 2000);
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.ef {
  width: 100%;

  &__row {
    display: flex;
    gap: rem(12);
    align-items: flex-start;
    max-width: rem(500);
    margin: 0 auto;
  }

  &__input {
    flex: 1;
    min-width: 0;
    padding: rem(12) rem(14);
    font-size: $font-size-md;
    font-family: inherit;
    background: $color-bg-placeholder;
    border: 1px solid $color-border-placeholder;
    border-radius: $radius-sm;
    color: $color-text-placeholder;
    transition:
      border-color $transition-fast $ease-standard,
      box-shadow $transition-fast $ease-standard;
    text-align: right;

    &::placeholder {
      color: $color-text-placeholder;
    }
    &:focus {
      outline: none;
      border-color: $color-accent-primary;
      box-shadow: 0 0 0 3px $color-accent-subtle;
    }
    &--error {
      border-color: $color-error;
    }
  }

  &__btn {
    flex-shrink: 0;
    padding: rem(12) rem(18);
    background: $color-accent-primary;
    color: $color-text-caption;
    font-family: inherit;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    border: none;
    border-radius: $radius-md;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: rem(8);
    transition: opacity $transition-fast $ease-standard;
    white-space: nowrap;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }

  &__spinner {
    width: rem(14);
    height: rem(14);
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-top-color: currentColor;
    border-radius: $radius-full;
    animation: lv2-spin 0.65s linear infinite;
  }

  &__error {
    font-size: $font-size-sm;
    color: $color-error;
    margin-top: rem(8);
    text-align: center;
  }
}

@include respond-to(sm) {
  .ef__row {
    flex-direction: column;
    align-items: stretch;
  }
  .ef__btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
