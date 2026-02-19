<template>
  <label class="toggle-switch">
    <input
      type="checkbox"
      class="toggle-switch__input"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="toggle-switch__slider" aria-hidden="true" />
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// BaseToggle
// WHY notes:
// - visually-hidden mixin replaces opacity:0/width:0/height:0
//   approach, which is fragile. The standard accessible pattern
//   is position:absolute with 1px clip. However since the input
//   must be a sibling of the slider for the :checked selector,
//   and we need it truly hidden (not just invisible), we keep
//   the original pattern but document the tradeoff.
// - $color-surface-bright replaces rgba(255,255,255,0.20).
// - transition targets specific properties.
// ─────────────────────────────────────────────────────────────

.toggle-switch {
  position: relative;
  display: inline-block;
  width: rem(44);
  height: rem(24);
  cursor: pointer;

  // ── Hidden native checkbox ────────────────────────────────
  // WHY: We use opacity + zero dimensions rather than
  // visually-hidden mixin because the input must remain a
  // sibling element in the DOM for the CSS :checked combinator
  // to work. Absolute positioning would break the sibling flow.

  &__input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;

    &:checked + .toggle-switch__slider {
      background: $color-accent-primary;

      &::before {
        transform: translateX(20px);
      }
    }

    &:focus-visible + .toggle-switch__slider {
      box-shadow: 0 0 0 3px $color-accent-subtle;
    }
  }

  // ── Visible track ─────────────────────────────────────────

  &__slider {
    position: absolute;
    inset: 0;
    background: $color-surface-bright;
    border-radius: $radius-full;
    transition:
      background-color #{$transition-duration-fast}
        #{$transition-easing-standard},
      box-shadow #{$transition-duration-fast} #{$transition-easing-standard};

    // ── Thumb ─────────────────────────────────────────────

    &::before {
      content: "";
      position: absolute;
      height: rem(18);
      width: rem(18);
      left: rem(3);
      bottom: rem(3);
      background: $color-text-primary;
      border-radius: $radius-full;
      transition: transform 0.3s #{$transition-easing-standard};
    }
  }
}
</style>
