<template>
  <div class="bi" :class="{ 'bi--error': error }">
    <div class="bi__wrap">
      <!-- Input or Textarea -->
      <textarea
        v-if="type === 'textarea'"
        v-bind="$attrs"
        v-model="model"
        class="bi__field bi__field--textarea"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
      />
      <div v-else-if="type === 'select'" class="bi__select-wrap">
        <select
          v-bind="$attrs"
          v-model="model"
          class="bi__field bi__field--select"
          :disabled="disabled"
        >
          <option value="" disabled>{{ placeholder }}</option>
          <slot name="options" />
        </select>
        <svg
          class="bi__select-arrow"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 5L7 9L11 5"
            stroke="#667085"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <input
        v-else
        v-bind="$attrs"
        v-model="model"
        class="bi__field"
        :class="{ 'bi__field--has-icon': tooltip }"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
      />

      <!-- Tooltip icon — only on text inputs -->
      <div
        v-if="tooltip && type !== 'textarea' && type !== 'select'"
        class="bi__icon"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7.25" stroke="#D0D5DD" stroke-width="1.5" />
          <path
            d="M8 7V11"
            stroke="#98A2B3"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle cx="8" cy="5" r="0.75" fill="#98A2B3" />
        </svg>
        <div class="bi__tooltip" role="tooltip">
          {{ tooltip }}
          <div class="bi__tooltip-arrow" />
        </div>
      </div>
    </div>

    <!-- Error message -->
    <p v-if="error" class="bi__error">{{ error }}</p>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

const model = defineModel();

defineProps({
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  tooltip: { type: String, default: "" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
});
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

$color-placeholder: #717680;
$color-border: #d5d7da;
.bi {
  width: 100%;

  &__wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  // ── Field base ──────────────────────────────────────────────────
  &__field {
    width: 100%;
    padding: rem(10) rem(14);
    border: 1.5px solid $color-border;
    border-radius: $radius-sm;
    font-size: $font-size-md;
    font-family: inherit;
    color: #101828;
    background: #fff;
    text-align: right;
    resize: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    &::placeholder {
      color: $color-placeholder;
    }

    &:focus {
      outline: none;
      border-color: #fcc015;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.12);
    }

    // leave room for tooltip icon on the left
    &--has-icon {
      padding-left: rem(36);
    }

    &--textarea {
      min-height: rem(80);
      line-height: 1.6;
    }

    &--select {
      appearance: none;
      cursor: pointer;
      padding-left: rem(32);
    }
  }

  // ── Error state ─────────────────────────────────────────────────
  &--error &__field {
    border-color: #ef4444;
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
    }
  }

  &__error {
    margin-top: rem(4);
    font-size: rem(12);
    color: #ef4444;
    text-align: right;
  }

  // ── Select arrow ────────────────────────────────────────────────
  &__select-wrap {
    position: relative;
    width: 100%;
  }

  &__select-arrow {
    position: absolute;
    left: rem(10);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  // ── Tooltip icon ────────────────────────────────────────────────
  &__icon {
    position: absolute;
    left: rem(10);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 1;

    svg {
      display: block;
    }

    // show tooltip on hover
    &:hover .bi__tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }

  &__tooltip {
    position: absolute;
    bottom: calc(100% + rem(8));
    left: 50%;
    transform: translateX(-50%) translateY(rem(4));
    background: #101828;
    color: #fff;
    font-size: rem(12);
    font-family: inherit;
    line-height: 1.5;
    white-space: nowrap;
    padding: rem(6) rem(10);
    border-radius: rem(6);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
    z-index: 100;
  }

  &__tooltip-arrow {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: rem(5) solid transparent;
    border-top-color: #101828;
  }
}
</style>
