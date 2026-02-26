<template>
  <div class="bih" :class="{ 'bih--error': touched && !!error }">
    <!-- TEXT INPUT -->
    <div
      v-if="type === 'text' || type === 'email' || type === 'tel'"
      class="bih__wrap"
    >
      <input
        v-bind="$attrs"
        v-model="model"
        class="bih__input"
        :class="{ 'bih__input--has-icon': tooltip }"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        @blur="onBlur"
      />
      <!-- Tooltip trigger icon -->
      <div
        v-if="tooltip"
        ref="iconRef"
        class="bih__icon"
        @mouseenter="hinting = true"
        @mouseleave="hinting = false"
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
      </div>
      <!-- Validation icon (only when no tooltip) -->
      <div v-if="touched && !tooltip" class="bih__status">
        <svg
          v-if="isValid"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <circle cx="7" cy="7" r="7" fill="#17B26A" fill-opacity="0.15" />
          <path
            d="M4 7L6 9L10 5"
            stroke="#17B26A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="7" fill="#EF4444" fill-opacity="0.12" />
          <path
            d="M7 4V7.5"
            stroke="#EF4444"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle cx="7" cy="9.5" r="0.75" fill="#EF4444" />
        </svg>
      </div>
    </div>

    <!-- TEXTAREA -->
    <textarea
      v-else-if="type === 'textarea'"
      v-bind="$attrs"
      v-model="model"
      class="bih__input bih__input--textarea"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      @blur="onBlur"
    />

    <!-- CUSTOM SELECT -->
    <div
      v-else-if="type === 'select'"
      ref="selectRef"
      class="bih__select"
      :class="{ 'bih__select--open': selectOpen }"
      @click.stop="toggleSelect"
    >
      <span
        class="bih__select-value"
        :class="{ 'bih__select-value--placeholder': !model }"
      >
        {{ model || placeholder }}
      </span>
      <svg
        class="bih__select-chevron"
        :class="{ 'bih__select-chevron--open': selectOpen }"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="#667085"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <Teleport to="body">
        <Transition name="bih-drop">
          <div
            v-if="selectOpen"
            class="bih__dropdown"
            :style="dropdownStyle"
            @click.stop
          >
            <button
              v-for="opt in selectOptions"
              :key="opt"
              class="bih__option"
              :class="{ 'bih__option--active': model === opt }"
              type="button"
              @click="selectOption(opt)"
            >
              <span>{{ opt }}</span>
              <svg
                v-if="model === opt"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 7L5.5 9.5L11 4"
                  stroke="#fcc015"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </Transition>
      </Teleport>
    </div>

    <!--
      Sub-line: one reserved slot below the field.
      Priority: error (touched+invalid) > hint (icon hover) > empty (height preserved).
      Using a fixed-height container prevents layout shift.
    -->
    <div class="bih__sub">
      <Transition name="bih-sub" mode="out-in">
        <!-- Error wins -->
        <p
          v-if="touched && error"
          key="error"
          class="bih__sub-text bih__sub-text--error"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="6" fill="#EF4444" fill-opacity="0.12" />
            <path
              d="M6 3.5V6.5"
              stroke="#EF4444"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            <circle cx="6" cy="8.5" r="0.6" fill="#EF4444" />
          </svg>
          {{ error }}
        </p>
        <!-- Hint on icon hover -->
        <p
          v-else-if="hinting && tooltip"
          key="hint"
          class="bih__sub-text bih__sub-text--hint"
        >
          {{ tooltip }}
        </p>
        <!-- Empty placeholder — keeps height so nothing shifts -->
        <p v-else key="empty" class="bih__sub-text bih__sub-text--empty">
          &nbsp;
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";

defineOptions({ inheritAttrs: false });

const model = defineModel();

const props = defineProps({
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  tooltip: { type: String, default: "" },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
  selectOptions: { type: Array, default: () => [] },
});

// ── Validation ─────────────────────────────────────────────────────
const touched = ref(false);

const isValid = computed(() => {
  if (!touched.value) return false;
  const val = model.value?.toString().trim() ?? "";
  if (!val) return false;
  if (props.type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  return true;
});

const emit = defineEmits(["blur"]);

defineExpose({
  touch: () => {
    touched.value = true;
  },
  isTouched: () => touched.value,
});

function onBlur() {
  touched.value = true;
  emit("blur");
}

// ── Hint hover ──────────────────────────────────────────────────────
const hinting = ref(false);

// ── Custom select ───────────────────────────────────────────────────
const selectRef = ref(null);
const selectOpen = ref(false);
const dropdownStyle = ref({});

function toggleSelect() {
  if (props.disabled) return;
  selectOpen.value = !selectOpen.value;
  if (selectOpen.value) positionDropdown();
}

function selectOption(opt) {
  model.value = opt;
  touched.value = true;
  selectOpen.value = false;
}

async function positionDropdown() {
  await nextTick();
  if (!selectRef.value) return;
  const rect = selectRef.value.getBoundingClientRect();
  const dropHeight = Math.min(props.selectOptions.length * 44 + 8, 200);
  const openUp = window.innerHeight - rect.bottom < dropHeight + 8;
  dropdownStyle.value = {
    position: "fixed",
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: "9999",
    ...(openUp
      ? { bottom: `${window.innerHeight - rect.top + 4}px` }
      : { top: `${rect.bottom + 4}px` }),
  };
}

function onOutsideClick(e) {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    if (selectOpen.value) touched.value = true;
    selectOpen.value = false;
  }
}

onMounted(() => document.addEventListener("click", onOutsideClick));
onUnmounted(() => document.removeEventListener("click", onOutsideClick));
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

$color-border: #d5d7da;
$color-text: #717680;
.bih {
  width: 100%;

  &__wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  // ── Base field ─────────────────────────────────────────────────
  &__input {
    width: 100%;
    padding: rem(10) rem(14);
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    font-size: $font-size-md;
    font-family: inherit;
    color: $color-text;
    background: #fff;
    text-align: right;
    resize: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    &::placeholder {
      color: $color-text;
    }

    &:focus {
      outline: none;
      border-color: $color-accent-primary;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.12);
    }

    &--has-icon {
      padding-left: rem(36);
    }
    &--textarea {
      min-height: rem(80);
      line-height: 1.6;
      display: block;
    }
  }

  &--error &__input {
    border-color: $color-error;
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }

  &--valid &__input:not(:focus) {
    border-color: $color-success;
  }

  // ── Icon / status ──────────────────────────────────────────────
  &__icon,
  &__status {
    position: absolute;
    left: rem(10);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
  &__icon {
    cursor: default;
    z-index: 1;
  }
  &__status {
    pointer-events: none;
  }

  // ── Custom select ──────────────────────────────────────────────
  &__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(10) rem(14);
    border: 1px solid #d5d7da;
    border-radius: rem(8);
    background: #fff;
    cursor: pointer;
    user-select: none;
    direction: rtl;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    &--open {
      border-color: $color-accent-primary;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.12);
    }
  }

  &--error &__select {
    border-color: $color-error;
  }
  // valid state — no green border

  &__select-value {
    font-size: $font-size-md;
    font-family: inherit;
    color: #101828;
    &--placeholder {
      color: #717680;
    }
  }

  &__select-chevron {
    flex-shrink: 0;
    transition: transform 0.2s ease;
    &--open {
      transform: rotate(180deg);
    }
  }

  // ── Sub-line: hint / error / spacer ───────────────────────────
  &__sub {
    height: rem(20); // enough for one line of small text
    margin-top: rem(3);
    overflow: hidden;
  }

  &__sub-text {
    display: flex;
    align-items: center;
    gap: rem(4);
    font-size: rem(11);
    font-family: inherit;
    line-height: rem(20);
    text-align: right;
    direction: rtl;

    &--error {
      color: $color-error;
    }
    &--hint {
      color: #98a2b3;
    }
    &--empty {
      visibility: hidden;
    } // hidden but preserves height
  }

  // Swap transition — out old, in new
  .bih-sub-enter-active {
    transition: opacity 0.15s ease;
  }
  .bih-sub-leave-active {
    transition: opacity 0.1s ease;
    position: absolute;
  }
  .bih-sub-enter-from,
  .bih-sub-leave-to {
    opacity: 0;
  }
}
</style>

<!-- Unscoped: teleported dropdown lives on body -->
<style lang="scss">
@use "@/styles/global/functions" as *;

.bih__dropdown {
  background: #fff;
  border: 1px solid #e4e7ec;
  border-radius: rem(10);
  box-shadow:
    0 rem(8) rem(24) rgba(0, 0, 0, 0.12),
    0 rem(2) rem(6) rgba(0, 0, 0, 0.06);
  overflow: hidden;
  padding: rem(4) 0;
}

.bih__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: rem(10) rem(14);
  background: none;
  border: none;
  font-size: rem(14);
  font-family: inherit;
  color: #101828;
  cursor: pointer;
  text-align: right;
  direction: rtl;
  transition: background 0.1s ease;

  &:hover {
    background: #f9fafb;
  }
  &--active {
    background: #fffbeb;
    font-weight: 600;
  }
}

.bih-drop-enter-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.bih-drop-leave-active {
  transition: opacity 0.1s ease;
}
.bih-drop-enter-from {
  opacity: 0;
  transform: translateY(rem(-6));
}
.bih-drop-leave-to {
  opacity: 0;
}
</style>
