<template>
  <div class="se">
    <h2 class="se__title">تأیید نشانی ایمیل</h2>
    <p class="se__sub">
      برای دریافت نسخه نهایی قرارداد، نشانی ایمیل خود را وارد کنید.
    </p>

    <input
      v-model="email"
      type="email"
      class="se__input"
      :class="{ 'se__input--error': showError }"
      placeholder="somename@gmail.com"
      dir="ltr"
      :disabled="isSubmitting"
      @keyup.enter="submit"
      @input="showError = false"
    />
    <Transition name="se-err">
      <p v-if="showError" class="se__error">
        لطفاً یک نشانی ایمیل معتبر وارد کنید.
      </p>
    </Transition>

    <BaseButton
      variant="primary"
      size="lg"
      :loading="isSubmitting"
      :disabled="!isValid"
      style="width: 100%; margin-top: 1rem"
      @click="submit"
    >
      <span v-if="isSubmitting">در حال ارسال</span>
      <span v-else>ارسال کد تأیید</span>
    </BaseButton>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

const emit = defineEmits(["next"]);

const email = ref("");
const showError = ref(false);
const isSubmitting = ref(false);

const isValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));

async function submit() {
  if (!isValid.value) {
    showError.value = true;
    return;
  }
  showError.value = false;
  isSubmitting.value = true;

  try {
    // TODO: replace with real API call
    // await api.sendOtp(email.value)
    await new Promise((r) => setTimeout(r, 1200)); // simulate network
    emit("next", email.value);
  } catch {
    showError.value = true;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;

.se {
  background: #fff;
  border-radius: rem(12);
  padding: rem(24);
  direction: rtl;
  box-shadow: 0 rem(20) rem(48) rgba(0, 0, 0, 0.18);

  &__title {
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: #181d27;
    margin-bottom: rem(10);
    text-align: center;
  }

  &__sub {
    font-size: $font-size-sm;
    color: #535862;
    line-height: 1.6;
    margin-bottom: rem(16);
    text-align: center;
  }

  &__input {
    width: 100%;
    padding: rem(10) rem(14);
    border: 1.5px solid #d0d5dd;
    border-radius: rem(8);
    font-size: rem(14);
    font-family: inherit;
    color: #101828;
    background: #fff;
    text-align: left;
    margin-bottom: rem(4);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    &::placeholder {
      color: #98a2b3;
    }
    &:focus {
      outline: none;
      border-color: #fcc015;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.12);
    }
    &--error {
      border-color: #ef4444;
      &:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  &__error {
    font-size: rem(12);
    color: #ef4444;
    text-align: right;
    margin-bottom: rem(8);
  }

  .se-err-enter-active {
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
  }
  .se-err-leave-active {
    transition: opacity 0.1s ease;
  }
  .se-err-enter-from {
    opacity: 0;
    transform: translateY(rem(-4));
  }
  .se-err-leave-to {
    opacity: 0;
  }
}
</style>
