<template>
  <label class="toggle-switch">
    <input
      type="checkbox"
      class="toggle-switch__input"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="toggle-switch__slider" />
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
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .toggle-switch__slider {
      background: $color-accent-primary;

      &::before {
        transform: translateX(20px);
      }
    }

    &:focus + .toggle-switch__slider {
      box-shadow: 0 0 0 3px $color-accent-subtle;
    }
  }

  &__slider {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: $radius-full;
    transition: $transition-base;

    &::before {
      content: "";
      position: absolute;
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background: white;
      border-radius: $radius-full;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}
</style>
