<template>
  <button
    type="button"
    class="step-radio"
    :class="{
      'step-radio--active': active,
      'step-radio--completed': completed,
    }"
    :aria-pressed="active"
    @click="$emit('click')"
  >
    <span class="step-radio__indicator">
      <svg
        v-if="completed"
        class="step-radio__check"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="step-radio__label">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// BaseRadio (StepOption)
// WHY notes:
// - $color-surface-hover replaces magic rgba(255,255,255,0.03).
// - $transition-easing-spring replaces the duplicate cubic-bezier.
// - transition targets specific properties for GPU performance.
// - respond-to() mixin replaces raw @media.
// ─────────────────────────────────────────────────────────────

.step-radio {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  background: transparent;
  border: none;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: background-color #{$transition-duration-fast}
    #{$transition-easing-standard};
  text-align: right;
  width: 100%;

  &:hover {
    background: $color-surface-hover;
  }

  // ── Indicator circle ──────────────────────────────────────

  &__indicator {
    width: 20px;
    height: 20px;
    border: 2px solid $color-border-medium;
    border-radius: $radius-full;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      border-color #{$transition-duration-fast} #{$transition-easing-standard},
      background-color #{$transition-duration-fast}
        #{$transition-easing-standard},
      box-shadow #{$transition-duration-fast} #{$transition-easing-standard};
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: $radius-full;
      background: $color-accent-primary;
      transform: scale(0);
      transition: transform 0.3s #{$transition-easing-spring};
    }
  }

  // ── Check icon ────────────────────────────────────────────

  &__check {
    color: $color-bg-primary;
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 0.3s #{$transition-easing-spring},
      transform 0.3s #{$transition-easing-spring};
  }

  // ── Label ─────────────────────────────────────────────────

  &__label {
    flex: 1;
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    color: $color-text-tertiary;
    transition: color #{$transition-duration-fast}
      #{$transition-easing-standard};
    line-height: 1.5;
  }

  // ── Active state ──────────────────────────────────────────

  &--active {
    .step-radio__indicator {
      border-color: $color-accent-primary;
      box-shadow: 0 0 0 4px $color-accent-subtle;

      &::before {
        transform: scale(1);
      }
    }

    .step-radio__label {
      color: $color-text-primary;
      font-weight: $font-weight-semibold;
    }
  }

  // ── Completed state ───────────────────────────────────────

  &--completed {
    .step-radio__indicator {
      background: $color-success;
      border-color: $color-success;
    }

    .step-radio__check {
      opacity: 1;
      transform: scale(1);
    }

    .step-radio__label {
      color: $color-text-secondary;
    }
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(sm) {
  .step-radio {
    padding: 0.75rem 1rem;
    gap: 0.625rem;

    &__indicator {
      width: 18px;
      height: 18px;
    }

    &__label {
      font-size: $font-size-sm;
    }
  }
}
</style>
