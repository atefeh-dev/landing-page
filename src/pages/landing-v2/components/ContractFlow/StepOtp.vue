<template>
  <div class="so">
    <div class="so__overlay" />
    <div class="so__modal">
      <h2 class="so__title">کد تأیید را وارد کنید</h2>
      <p class="so__sub">
        کد ارسال‌شده به
        <span class="so__email" dir="ltr">{{ email }}</span>
        را وارد نمایید.
      </p>

      <div class="so__otp" dir="ltr">
        <input
          v-for="(_, i) in 4"
          :key="i"
          :ref="(el) => (inputs[i] = el)"
          v-model="digits[i]"
          class="so__digit"
          :class="{ 'so__digit--filled': digits[i] }"
          type="text"
          inputmode="numeric"
          maxlength="1"
          @input="onInput(i, $event)"
          @keydown="onKeydown(i, $event)"
          @paste="onPaste"
        />
      </div>

      <p class="so__resend">
        کد تأیید را دریافت نکردید؟
        <button class="so__resend-btn" @click="$emit('resend')">
          ارسال دوباره
        </button>
      </p>

      <button
        class="so__cta"
        :disabled="!complete"
        @click="$emit('next', digits.join(''))"
      >
        تأیید
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({ email: { type: String, default: "" } });
defineEmits(["next", "resend"]);

const digits = ref(["", "", "", ""]);
const inputs = ref([]);

const complete = computed(() => digits.value.every((d) => d !== ""));

function onInput(i, e) {
  const val = e.target.value.replace(/\D/g, "").slice(-1);
  digits.value[i] = val;
  if (val && i < 3) inputs.value[i + 1]?.focus();
}

function onKeydown(i, e) {
  if (e.key === "Backspace" && !digits.value[i] && i > 0) {
    inputs.value[i - 1]?.focus();
  }
}

function onPaste(e) {
  const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
  text.split("").forEach((ch, i) => {
    digits.value[i] = ch;
  });
  inputs.value[Math.min(text.length, 3)]?.focus();
  e.preventDefault();
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

.so {
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
    margin-bottom: rem(24);
    line-height: 1.6;
  }

  &__email {
    color: #344054;
    font-weight: 600;
  }

  &__otp {
    display: flex;
    justify-content: center;
    gap: rem(12);
    margin-bottom: rem(16);
  }

  &__digit {
    width: rem(56);
    height: rem(64);
    border: 1.5px solid #d0d5dd;
    border-radius: rem(10);
    font-size: rem(28);
    font-weight: 700;
    color: #fcc015;
    text-align: center;
    background: #fff;
    font-family: inherit;
    transition: border-color 0.15s ease;

    &:focus {
      outline: none;
      border-color: #fcc015;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.12);
    }

    &--filled {
      border-color: #fcc015;
      background: #fffbeb;
    }
  }

  &__resend {
    font-size: rem(13);
    color: #667085;
    margin-bottom: rem(20);
  }

  &__resend-btn {
    background: none;
    border: none;
    color: #fcc015;
    font-weight: 600;
    font-size: rem(13);
    font-family: inherit;
    cursor: pointer;
    padding: 0;
    margin-right: rem(4);

    &:hover {
      text-decoration: underline;
    }
  }

  &__cta {
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
