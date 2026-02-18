<template>
  <div class="step-indicator">
    <div
      class="step-indicator__circle"
      :class="{
        'step-indicator__circle--completed': completed,
      }"
      :style="circleStyle"
    >
      <img
        ref="checkImage"
        v-if="completed"
        src="@/assets/icons/whitecheck.svg"
        class="step-indicator__check"
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
import CheckIcon from "@/assets/icons/whitecheck.svg";

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

const persianNumber = computed(() => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(props.stepNumber)
    .split("")
    .map((d) => persianDigits[parseInt(d)])
    .join("");
});

// Progressive opacity: higher step numbers = brighter
const numberOpacity = computed(() => {
  if (props.completed) return 1;

  // Step 1: 0.35, Step 2: 0.45, Step 3: 0.55, Step 4: 0.65
  const baseOpacity = 0.25;
  const increment = 0.1;
  return baseOpacity + props.stepNumber * increment;
});

const numberStyle = computed(() => ({
  color: `rgba(255, 255, 255, ${numberOpacity.value})`,
}));

const circleStyle = computed(() => {
  if (props.completed) return {};
  return {
    borderColor: `rgba(255, 255, 255, ${numberOpacity.value * 0.4})`,
  };
});
</script>

<style lang="scss" scoped>
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
    top: 13px; // center of 44px circle
    left: -43%; // start from center of THIS step
    width: 100%; // go to next step center
    height: 0;
    border-top: 2px dotted rgba(255, 255, 255, 0.2);
    transform: translateY(-50%);
    z-index: 0;
  }

  &:last-child::after {
    display: none;
  }

  &--completed::after {
    border-color: $color-success;
  }

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
    &__number {
      font-size: $font-size-sm;
      font-weight: $font-weight-bold;
      transition: color 0.3s ease;
    }

    &__check {
      color: white;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
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
    max-width: 160px;
  }

  &__circle--completed ~ &__content &__title {
    color: $color-text-primary;
  }
}

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
