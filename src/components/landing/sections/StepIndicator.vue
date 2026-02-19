<template>
  <div
    class="step-indicator"
    :class="{ 'step-indicator--completed': completed }"
  >
    <div
      class="step-indicator__circle"
      :class="{ 'step-indicator__circle--completed': completed }"
      :style="circleStyle"
    >
      <img
        v-if="completed"
        src="@/assets/icons/whitecheck.svg"
        class="step-indicator__check"
        alt=""
        aria-hidden="true"
      />
      <span v-else class="step-indicator__number" :style="numberStyle">
        {{ persianNumber }}
      </span>
    </div>

    <div class="step-indicator__content">
      <div class="step-indicator__title">
        <slot name="title" />
      </div>
      <div class="step-indicator__description">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  stepNumber: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const persianNumber = computed(() =>
  String(props.stepNumber)
    .split("")
    .map((d) => persianDigits[parseInt(d)])
    .join(""),
);

const numberOpacity = computed(() => {
  if (props.completed) return 1;
  return Math.max(0.18, 0.55 - (props.stepNumber - 1) * 0.13);
});

const numberStyle = computed(() => ({
  color: `rgba(255, 255, 255, ${numberOpacity.value})`,
}));

const circleStyle = computed(() => {
  if (props.completed) return {};
  return { borderColor: `rgba(255, 255, 255, ${numberOpacity.value * 0.5})` };
});
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// StepIndicator
// WHY notes:
// - Connector line uses transform:scaleX instead of animating
//   width — GPU-composited, no layout reflow.
// - respond-to() replaces raw @media.
// ─────────────────────────────────────────────────────────────

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  position: relative;
  flex: 1;

  // Connector line
  &::after {
    content: "";
    position: absolute;
    top: rem(13);
    left: -43%;
    width: 100%;
    height: 0;
    border-top: 2px dotted rgba(255, 255, 255, 0.2);
    transform: translateY(-50%);
    z-index: 0;
  }

  &:last-child::after {
    display: none;
  }

  &--completed::after {
    border-color: $color-border-primary;
  }

  // ── Circle ────────────────────────────────────────────────

  &__circle {
    width: $spacing-md;
    height: $spacing-md;
    border: 2px solid $color-border-subtle;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-bg-primary;
    transition:
      background-color #{$transition-duration-fast}
        #{$transition-easing-standard},
      border-color #{$transition-duration-fast} #{$transition-easing-standard},
      box-shadow #{$transition-duration-fast} #{$transition-easing-standard};
    position: relative;
    z-index: 1;

    &--completed {
      background: $color-success;
      border-color: $color-success;
      box-shadow: 0 0 0 4px rgba(68, 147, 109, 0.15);
    }
  }

  &__number {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    transition: color 0.3s ease;
  }

  &__check {
    width: rem(12);
    height: rem(12);
    display: block;
  }

  // ── Content ───────────────────────────────────────────────

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-align: center;
    line-height: 1.4;
  }

  &__description {
    font-size: $font-size-xs;
    color: $color-text-tertiary;
    text-align: center;
    line-height: 1.4;
    max-width: rem(160);
  }

  &--completed &__title {
    color: $color-text-primary;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(sm) {
  .step-indicator {
    gap: 0.375rem;

    &::after {
      top: rem(18);
    }

    &__circle {
      width: rem(36);
      height: rem(36);
    }

    &__number {
      font-size: $font-size-md;
    }
    &__title {
      font-size: $font-size-xs;
    }

    &__description {
      font-size: 0.6875rem;
      max-width: rem(120);
    }
  }
}
</style>
