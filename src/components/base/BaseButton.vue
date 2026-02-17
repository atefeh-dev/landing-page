<template>
  <!-- FIX: v-bind="$attrs" comes FIRST so explicit props always take precedence -->
  <button
    v-bind="$attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--loading': loading }]"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "secondary"].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["md", "lg"].includes(v),
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: $font-weight-semibold;
  font-family: inherit;
  white-space: nowrap;
  border: none;
  border-radius: $radius-md;
  cursor: pointer;
  transition: $transition-base;
  position: relative;
  overflow: hidden;

  &--primary {
    padding: 0.75rem 1.25rem;
    background: $color-accent-primary;
    color: $color-bg-primary;
    box-shadow: $shadow-md;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.12) 0%,
        transparent 100%
      );
      opacity: 0;
      transition: $transition-base;
    }

    &:hover:not(:disabled) {
      background: #ffd84d;
      transform: translateY(-2px);
      box-shadow: $shadow-accent;
      &::before {
        opacity: 1;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    padding: 0.75rem 1.25rem;
    background: transparent;
    color: $color-text-secondary;
    border: 1px solid $color-border-medium;

    &:hover:not(:disabled) {
      border-color: $color-border-strong;
      color: $color-text-primary;
    }
  }

  &--md {
    padding: 0.625rem 1rem;
    font-size: 0.9375rem;
  }

  &--lg {
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
  }

  &:disabled,
  &--loading {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
    flex-shrink: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
