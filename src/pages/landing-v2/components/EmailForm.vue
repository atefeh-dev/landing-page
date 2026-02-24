<template>
  <div class="ef">
    <div class="ef__row">
      <input
        v-model="email"
        type="email"
        :placeholder="placeholder"
        class="ef__input"
        :class="{ 'ef__input--error': showError }"
        :disabled="succeeded"
        dir="rtl"
        @blur="touched = true"
      />
      <BaseButton
        variant="primary"
        size="lg"
        :loading="isSubmitting"
        :disabled="succeeded"
        class="ef__btn"
        @click="submit"
      >
        <Transition name="ef-btn" mode="out-in">
          <span v-if="isSubmitting" key="loading">در حال ارسال...</span>
          <span v-else-if="succeeded" key="success">می‌بینمت زود!</span>
          <span v-else key="default">{{ buttonText }}</span>
        </Transition>
      </BaseButton>
    </div>

    <!-- Status: note OR error — fixed height, crossfade -->
    <div class="ef__status">
      <Transition name="ef-fade">
        <p v-if="showError" class="ef__error" role="alert" key="error">
          لطفاً یک آدرس ایمیل معتبر وارد کنید!
        </p>
        <p v-else-if="note" class="ef__note" key="note">
          {{ note }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  placeholder: { type: String, default: "ایمیل شما" },
  buttonText: { type: String, default: "پیوستن به لیست انتظار" },
  note: { type: String, default: "" },
});

const emit = defineEmits(["submit"]);

const email = ref("");
const touched = ref(false);
const isSubmitting = ref(false);
const succeeded = ref(false);

const valid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const showError = computed(
  () => touched.value && !valid.value && email.value.length > 0,
);

async function submit() {
  touched.value = true;
  if (!valid.value) return;

  isSubmitting.value = true;
  try {
    // ── API call goes here ────────────────────────────────
    // Example:
    // await api.post("/waitlist", { email: email.value });
    // ─────────────────────────────────────────────────────

    await new Promise((r) => setTimeout(r, 1500)); // remove when API is ready
    emit("submit", email.value);
    succeeded.value = true;
  } catch (err) {
    // handle API error here if needed
    console.error("Waitlist submit failed:", err);
  } finally {
    isSubmitting.value = false;
  }
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
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__btn {
    flex-shrink: 0;
    min-width: rem(170); // prevents width collapse during loading
  }

  // ── Status area ───────────────────────────────────────────

  &__status {
    position: relative;
    height: rem(24);
    margin-top: rem(16);
    text-align: center;
  }

  &__error,
  &__note {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    font-size: $font-size-sm;
    margin: 0;
  }

  &__error {
    color: $color-error;
  }

  &__note {
    color: #94979c;
  }
}

// ── Button text crossfade ──────────────────────────────────────
.ef-btn-enter-active,
.ef-btn-leave-active {
  transition: opacity 0.15s ease;
}
.ef-btn-enter-from,
.ef-btn-leave-to {
  opacity: 0;
}

// ── Status crossfade ───────────────────────────────────────────
.ef-fade-enter-active,
.ef-fade-leave-active {
  transition: opacity 0.2s ease;
}
.ef-fade-enter-from,
.ef-fade-leave-to {
  opacity: 0;
}

@include respond-to(sm) {
  .ef__row {
    flex-direction: column;
    align-items: stretch;
  }
  .ef__btn {
    width: 100%;
    min-width: unset;
  }
}
</style>
