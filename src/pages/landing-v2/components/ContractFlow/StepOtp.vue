<template>
  <div class="so">
    <h2 class="so__title">کد تأیید را وارد کنید.</h2>
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
        :disabled="isSubmitting"
        @input="onInput(i, $event)"
        @keydown="onKeydown(i, $event)"
        @paste="onPaste"
      />
    </div>

    <Transition name="so-err">
      <p v-if="showError" class="so__error">
        کد وارد شده صحیح نیست. لطفاً دوباره امتحان کنید.
      </p>
    </Transition>

    <p class="so__resend">
      کد تأیید را دریافت نکردید؟
      <button class="so__resend-btn" :disabled="isSubmitting" @click="onResend">
        ارسال دوباره
      </button>
    </p>

    <BaseButton
      variant="primary"
      size="lg"
      :loading="isSubmitting"
      :disabled="!complete"
      style="width: 100%"
      @click="submit"
    >
      <span v-if="isSubmitting">در حال تأیید</span>
      <span v-else>تأیید</span>
    </BaseButton>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({ email: { type: String, default: "" } });
const emit = defineEmits(["next", "resend"]);

const digits = ref(["", "", "", ""]);
const inputs = ref([]);
const isSubmitting = ref(false);
const showError = ref(false);

const complete = computed(() => digits.value.every((d) => d !== ""));

function onInput(i, e) {
  const val = e.target.value.replace(/\D/g, "").slice(-1);
  digits.value[i] = val;
  showError.value = false;
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

async function submit() {
  if (!complete.value) return;
  showError.value = false;
  isSubmitting.value = true;

  try {
    // TODO: replace with real API call
    // await api.verifyOtp(props.email, digits.value.join(''))
    await new Promise((r) => setTimeout(r, 1200)); // simulate network
    emit("next", digits.value.join(""));
  } catch {
    showError.value = true;
    digits.value = ["", "", "", ""];
    inputs.value[0]?.focus();
  } finally {
    isSubmitting.value = false;
  }
}

function onResend() {
  digits.value = ["", "", "", ""];
  showError.value = false;
  emit("resend");
}
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;

.so {
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

  &__email {
    color: #344054;
    font-weight: 600;
  }

  &__otp {
    display: flex;
    justify-content: center;
    gap: rem(10);
    margin-bottom: rem(8);
  }

  &__digit {
    width: 5rem;
    height: 5rem;
    border: 2px solid #d0d5dd;
    border-radius: 0.75rem;

    text-align: center;
    font-size: 3.125rem;
    font-weight: 800;
    color: $color-accent-primary;

    padding: 0;
    line-height: 5rem;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: $color-accent-primary;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.12);
    }
    &--filled {
      border-color: $color-accent-primary;
      background: #fffbeb;
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  &__error {
    font-size: rem(12);
    color: $color-error;
    text-align: center;
    margin-bottom: rem(8);
  }

  .so-err-enter-active {
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
  }
  .so-err-leave-active {
    transition: opacity 0.1s ease;
  }
  .so-err-enter-from {
    opacity: 0;
    transform: translateY(rem(-4));
  }
  .so-err-leave-to {
    opacity: 0;
  }

  &__resend {
    color: #535862;
    font-weight: $font-weight-regular;
    font-size: $font-size-sm;
    margin-bottom: rem(18);
    text-align: center;
  }

  &__resend-btn {
    background: none;
    border: none;
    color: #535862;
    font-weight: $font-weight-regular;
    font-size: $font-size-sm;
    font-family: inherit;
    cursor: pointer;
    padding: 0;
    margin-right: rem(4);

    &:hover:not(:disabled) {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
}
</style>
