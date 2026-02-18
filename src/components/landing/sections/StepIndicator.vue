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

// Progressive opacity: step 1 = brightest, higher step index = more faded
// step 1 → 0.65, step 2 → 0.52, step 3 → 0.39, step 4 → 0.26
const numberOpacity = computed(() => {
  if (props.completed) return 1;
  return 0.65 - (props.stepNumber - 1) * 0.13;
});

const numberStyle = computed(() => ({
  color: `rgba(255, 255, 255, ${numberOpacity.value})`,
}));

const circleStyle = computed(() => {
  if (props.completed) return {};
  return { borderColor: `rgba(255, 255, 255, ${numberOpacity.value * 0.4})` };
});
</script>

<style lang="scss" scoped>
// ── Block ──────────────────────────────────────────────────────

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  position: relative;
  flex: 1;

  // Connector line between steps
  &::after {
    content: "";
    position: absolute;
    top: 13px;
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

  // ── Completed modifier (connector becomes green) ──────────

  &--completed::after {
    border-color: $color-border-primary;
  }

  // ── Circle element ────────────────────────────────────────

  &__circle {
    width: $spacing-md;
    height: $spacing-md;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-bg-primary;
    transition: $transition-base;
    position: relative;
    z-index: 1;

    &--completed {
      background: $color-success;
      border-color: $color-success;
      box-shadow: 0 0 0 4px rgba(68, 147, 109, 0.15);
    }
  }

  // ── Number (shown when not completed) ─────────────────────

  &__number {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    transition: color 0.3s ease;
  }

  // ── Check icon (shown when completed) ─────────────────────

  &__check {
    width: 12px;
    height: 12px;
    display: block;
  }

  // ── Content wrapper ───────────────────────────────────────

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  // ── Title ─────────────────────────────────────────────────

  &__title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-align: center;
    line-height: 1.4;
  }

  // ── Description ───────────────────────────────────────────

  &__description {
    font-size: $font-size-xs;
    color: $color-text-tertiary;
    text-align: center;
    line-height: 1.4;
    max-width: 160px;
  }

  // When step is completed, brighten its title
  &--completed &__title {
    color: $color-text-primary;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@media (max-width: $breakpoint-sm) {
  .step-indicator {
    gap: 0.375rem;

    &::after {
      top: 18px;
    }

    &__circle {
      width: 36px;
      height: 36px;
    }

    &__number {
      font-size: $font-size-md;
    }

    &__title {
      font-size: $font-size-xs;
    }

    &__description {
      font-size: 0.6875rem;
      max-width: 120px;
    }
  }
}
</style>
