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
    <p
      v-if="error"
      class="input__error animate-slide-down in-view"
      role="alert"
    >
      {{ error }}
    </p>
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
@use "../styles/variables" as *;

.input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  &__field {
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

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--error {
      border-color: #ef4444;

      &:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
  }

  &__error {
    font-size: 0.875rem;
    color: #ef4444;
    margin: 0;
    text-align: right;
    // animate-slide-down in-view handles the entrance (from main.scss)
  }
}

@media (max-width: $breakpoint-lg) {
  .input__field {
    padding: 0.75rem 0.875rem;
    font-size: 0.9375rem;
  }
}

@media (max-width: 375px) {
  .input__field {
    font-size: 0.875rem;
    padding: 0.625rem 0.875rem;
  }
}
</style>
