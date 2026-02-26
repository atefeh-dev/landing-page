<template>
  <div class="se">
    <div class="se__overlay" />
    <div class="se__modal">
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
        @keyup.enter="submit"
      />
      <p v-if="showError" class="se__error">
        لطفاً یک نشانی ایمیل معتبر وارد کنید.
      </p>

      <button class="se__cta" :disabled="!email" @click="submit">
        ارسال کد تأیید
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["next"]);

const email = ref("");
const showError = ref(false);

const isValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));

function submit() {
  if (!isValid.value) {
    showError.value = true;
    return;
  }
  showError.value = false;
  emit("next", email.value);
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

.se {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #fff;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(52, 64, 84, 0.5);
    backdrop-filter: blur(2px);
  }

  &__modal {
    position: relative;
    z-index: 1;
    background: #fff;
    border-radius: rem(16);
    padding: rem(32) rem(28);
    width: rem(360);
    max-width: calc(100% - rem(32));
    box-shadow: 0 rem(24) rem(48) rgba(0, 0, 0, 0.18);
    direction: rtl;
    text-align: center;
  }

  &__title {
    font-size: rem(18);
    font-weight: 700;
    color: #101828;
    margin-bottom: rem(8);
  }

  &__sub {
    font-size: rem(13);
    color: #667085;
    margin-bottom: rem(20);
    line-height: 1.6;
  }

  &__input {
    width: 100%;
    padding: rem(11) rem(14);
    border: 1.5px solid #d0d5dd;
    border-radius: rem(8);
    font-size: rem(14);
    font-family: inherit;
    color: #101828;
    background: #fff;
    text-align: left;
    margin-bottom: rem(6);
    transition: border-color 0.15s ease;

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
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
      }
    }
  }

  &__error {
    font-size: rem(12);
    color: #ef4444;
    text-align: right;
    margin-bottom: rem(12);
  }

  &__cta {
    margin-top: rem(8);
    width: 100%;
    padding: rem(12) rem(20);
    border-radius: rem(8);
    border: none;
    background: #fcc015;
    color: #101828;
    font-size: rem(15);
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }
}
</style>
