<template>
  <div class="email-form" ref="formRef">
    <div class="email-form__row">
      <BaseInput
        v-model="email"
        type="email"
        :placeholder="placeholder"
        :error="showError ? errorMessage : ''"
        class="email-form__input animate-fade-up animate-delay-1"
        :class="{ 'in-view': isVisible }"
        @blur="handleBlur"
      />

      <BaseButton
        variant="primary"
        size="lg"
        :loading="isSubmitting"
        class="email-form__btn animate-fade-up animate-delay-2"
        :class="{ 'in-view': isVisible }"
        @click="handleSubmit"
      >
        {{ isSubmitting ? submitText : buttonText }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

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

const formRef = ref(null);
const { isVisible } = useScrollAnimation(formRef, 0.1);

const email = ref("");
const touched = ref(false);
const isSubmitting = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmailValid = computed(() => emailRegex.test(email.value));
const showError = computed(
  () => touched.value && !isEmailValid.value && email.value.length > 0,
);
const errorMessage = computed(() =>
  showError.value ? "لطفاً یک آدرس ایمیل معتبر وارد کنید" : "",
);

const handleBlur = () => {
  touched.value = true;
};

const handleSubmit = () => {
  touched.value = true;
  if (!isEmailValid.value) return;

  isSubmitting.value = true;
  emit("submit", email.value);

  setTimeout(() => {
    isSubmitting.value = false;
    email.value = "";
    touched.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped>
.email-form {
  width: 100%;

  &__row {
    display: flex;
    gap: $spacing-md;
    align-items: flex-start;
    max-width: 700px;
    margin: 0 auto;
  }

  &__input {
    flex: 1;
    min-width: 0;
  }

  &__btn {
    flex-shrink: 0;
  }
}

@media (max-width: $breakpoint-sm) {
  .email-form__row {
    flex-direction: column;
    align-items: stretch;
    gap: $spacing-sm;
  }

  .email-form__btn {
    width: 100%;
  }
}
</style>
