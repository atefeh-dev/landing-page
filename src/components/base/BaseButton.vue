<template>
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
// ─────────────────────────────────────────────────────────────
// BaseButton
// WHY notes:
// - $color-accent-hover replaces the magic number #ffd84d.
// - transition targets specific properties (color, background,
//   transform, box-shadow) instead of "all" — better GPU perf.
// - ::before shimmer uses pseudo-overlay pattern consistently.
// - Disabled/loading states merged: both produce identical output.
// ─────────────────────────────────────────────────────────────

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: $font-weight-semibold;
  white-space: nowrap;
  border: none;
  border-radius: $radius-md;
  cursor: pointer;
  transition:
    color #{$transition-duration-fast} #{$transition-easing-standard},
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    transform #{$transition-duration-fast} #{$transition-easing-standard},
    box-shadow #{$transition-duration-fast} #{$transition-easing-standard},
    border-color #{$transition-duration-fast} #{$transition-easing-standard};
  position: relative;
  overflow: hidden;

  // ── Sizes ────────────────────────────────────────────────

  &--md {
    padding: 0.625rem 1rem;
    font-size: 0.9375rem;
  }

  &--lg {
    padding: 0.875rem 1.5rem;
    font-size: $font-size-md;
  }

  // ── Variants ─────────────────────────────────────────────

  &--primary {
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
      transition: opacity #{$transition-duration-fast}
        #{$transition-easing-standard};
      pointer-events: none;
    }

    &:hover:not(:disabled) {
      // background: $color-accent-hover;
      // transform: translateY(-2px);
      // box-shadow: $shadow-accent;

      &::before {
        opacity: 1;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: transparent;
    color: $color-text-secondary;
    border: 1px solid $color-border-medium;

    &:hover:not(:disabled) {
      border-color: $color-border-strong;
      color: $color-text-primary;
    }
  }

  // ── States ───────────────────────────────────────────────
  // WHY: Both :disabled and .btn--loading produce identical
  // visual output, so they share one rule block.

  &:disabled,
  &--loading {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  // ── Elements ─────────────────────────────────────────────

  &__spinner {
    width: rem(14);
    height: rem(14);
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-top-color: currentColor;
    border-radius: $radius-full;
    animation: spin 0.65s linear infinite;
    flex-shrink: 0;
  }
}
</style>
