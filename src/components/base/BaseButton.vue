<template>
  <button
    v-bind="$attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--loading': loading }]"
    :type="type"
    :disabled="disabled || loading"
  >
    <Transition name="btn-content" mode="out-in">
      <span v-if="loading" class="btn__loading-inner" key="loading">
        <slot />
        <span class="btn__dots" aria-hidden="true"
          ><span /><span /><span
        /></span>
      </span>
      <span v-else class="btn__default-inner" key="default">
        <slot />
      </span>
    </Transition>
  </button>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "secondary", "ghost"].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["md", "lg"].includes(v),
  },
  type: { type: String, default: "button" },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;

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
  position: relative;
  overflow: hidden;
  transition:
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    opacity #{$transition-duration-fast} #{$transition-easing-standard},
    transform #{$transition-duration-fast} #{$transition-easing-standard};

  &--md {
    padding: 0.625rem 1rem;
    font-size: 0.9375rem;
  }

  &--lg {
    padding: rem(12) rem(18);
    font-size: $font-size-md;
  }

  &--primary {
    background: $color-accent-primary;
    color: $color-bg-primary;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  }

  &--secondary {
    border: 1.5px solid #e4e7ec;
    background: #fff;
    color: #344054;

    &:hover:not(:disabled) {
      opacity: 0.9;
      background-color: #f2f2f233;
    }
  }

  // Ghost — no background, no border, just text + icon
  // Used for back/tertiary actions
  &--ghost {
    background: none;
    border: none;
    color: #667085;
    padding-inline: 0;
    font-weight: $font-weight-semibold;

    &:hover:not(:disabled) {
      color: #344054;
    }
    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  }

  &:disabled,
  &--loading {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__loading-inner,
  &__default-inner {
    display: inline-flex;
    align-items: center;
    gap: rem(6);
  }

  &__dots {
    display: inline-flex;
    align-items: center;
    gap: rem(5);

    span {
      display: block;
      width: rem(6);
      height: rem(6);
      border-radius: $radius-full;
      background: $color-bg-primary;
      animation: btn-pulse 1.2s ease-in-out infinite;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  .btn-content-enter-active {
    transition: opacity 0.2s ease;
  }
  .btn-content-leave-active {
    transition: opacity 0.15s ease;
  }
  .btn-content-enter-from,
  .btn-content-leave-to {
    opacity: 0;
  }

  @keyframes btn-pulse {
    0%,
    80%,
    100% {
      opacity: 0.3;
      transform: scale(0.7);
    }
    40% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
