<template>
  <div class="input">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input__field"
      :class="{ 'input__field--error': error }"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <!--
      WHY: Removed input__error--visible modifier class.
      The element is only rendered when `error` is truthy (v-if),
      so toggling a --visible class on top is redundant.
      The enter/leave transition is handled by Vue's <Transition>.
    -->
    <Transition name="input-error">
      <p v-if="error" class="input__error" role="alert">
        {{ error }}
      </p>
    </Transition>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue", "blur"]);
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// BaseInput
// WHY notes:
// - $color-error replaces the scattered magic number #ef4444.
// - $color-surface-* tokens replace magic rgba() values.
// - transition targets specific properties for performance.
// - Error animation moved to Vue <Transition> — no modifier needed.
// - respond-to() mixin replaces raw @media breakpoints.
// ─────────────────────────────────────────────────────────────

.input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  // ── Field ─────────────────────────────────────────────────

  &__field {
    width: 100%;
    padding: rem(12) rem(14);
    font-size: $font-size-md;
    font-family: inherit;
    background: $color-surface-subtle;
    border: 1px solid $color-border-medium;
    border-radius: $radius-md;
    color: $color-text-primary;
    line-height: 1.4;
    transition:
      background-color #{$transition-duration-fast}
        #{$transition-easing-standard},
      border-color #{$transition-duration-fast} #{$transition-easing-standard},
      box-shadow #{$transition-duration-fast} #{$transition-easing-standard};
    text-align: right;

    &::placeholder {
      color: $color-text-tertiary;
    }

    &:hover {
      background: $color-surface-light;
      border-color: $color-border-strong;
    }

    &:focus {
      outline: none;
      background: $color-surface-bright;
      border-color: $color-accent-primary;
      box-shadow: 0 0 0 3px $color-accent-subtle;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--error {
      border-color: $color-error;

      &:focus {
        border-color: $color-error;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
  }

  // ── Error message ─────────────────────────────────────────

  &__error {
    font-size: $font-size-sm;
    color: $color-error;
    margin: 0;
    text-align: right;
  }
}

// ── Error enter/leave transition (via Vue <Transition>) ───────

.input-error-enter-active,
.input-error-leave-active {
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
}

.input-error-enter-from,
.input-error-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .input__field {
    padding: 0.75rem 0.875rem;
    font-size: 0.9375rem;
  }
}

@media (max-width: 375px) {
  .input__field {
    font-size: $font-size-sm;
    padding: 0.625rem 0.875rem;
  }
}
</style>
