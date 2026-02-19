<template>
  <section class="section section--operation" id="operation" ref="sectionRef">
    <div class="section__container">
      <div class="operation__header">
        <h2 class="operation__title" v-bind="reveal(1)">
          ساخت سند، شفاف و مرحله‌به‌مرحله.
        </h2>

        <div class="operation__toggle" v-bind="reveal(2)">
          <ToggleSwitch v-model="showStandard" />
          <span class="operation__toggle-label">
            {{ showStandard ? "دریافت اسناد استاندارد" : "تنظیم هوشمند اسناد" }}
          </span>
        </div>
      </div>

      <div class="operation__preview" v-bind="reveal(3)">
        <transition name="op-fade">
          <img
            :key="showStandard ? 'standard' : 'smart'"
            :src="currentImage"
            :alt="showStandard ? 'فرآیند استاندارد' : 'فرآیند هوشمند'"
            class="operation__image"
          />
        </transition>
      </div>

      <div class="operation__steps" v-bind="reveal(4)">
        <StepIndicator
          v-for="(step, index) in steps"
          :key="`step-${index}`"
          :step-number="index + 1"
          :completed="index <= currentStepIndex - 1"
        >
          <template #title>{{ step.title }}</template>
          <template #description>{{ step.description }}</template>
        </StepIndicator>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import ToggleSwitch from "@/components/base/BaseToggle.vue";
import StepIndicator from "@/components/landing/sections/StepIndicator.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import Step1 from "@/assets/images/step1.png";
import Step2 from "@/assets/images/step2.png";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef, 0.1);

const showStandard = ref(false);

const steps = [
  { title: "انتخاب نوع سند", description: "نام‌گذاری" },
  { title: "تنظیم سند", description: "تکمیل اطلاعات" },
  { title: "پیش‌نمایش سند", description: "درج اطلاعات" },
  { title: "ذخیره سند", description: "دریافت سند" },
];

const currentImage = computed(() => (showStandard.value ? Step2 : Step1));
const currentStepIndex = computed(() => (showStandard.value ? 1 : 2));
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// OperationSection
// No structural changes needed — this section was already clean.
// WHY changes:
// - respond-to() mixin replaces raw @media.
// - $color-surface-hover replaces rgba(255,255,255,0.06).
// - transition targets specific properties.
// ─────────────────────────────────────────────────────────────

.section--operation {
  background: $color-bg-primary;
}

.operation__header {
  text-align: center;
  margin-bottom: $spacing-xl;
  max-width: rem(700);
  margin-left: auto;
  margin-right: auto;
}

.operation__title {
  font-size: clamp(1.375rem, 3.5vw, 2rem);
  font-weight: $font-weight-bold;
  line-height: 1.3;
  margin-bottom: $spacing-md;
  color: $color-text-primary;
}

.operation__toggle {
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;
  padding: 0.625rem 1.25rem;
  background: $color-surface-hover;
  border: 1px solid $color-border-subtle;
  border-radius: $radius-full;
  transition:
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    border-color #{$transition-duration-fast} #{$transition-easing-standard};

  &:hover {
    background: $color-surface-light;
    border-color: $color-border-medium;
  }
}

.operation__toggle-label {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-weight: $font-weight-medium;
}

// ── Image preview ──────────────────────────────────────────────
// WHY: padding-bottom aspect-ratio trick keeps height stable
// during the Vue transition, preventing the blank-flash bug.

.operation__preview {
  position: relative;
  margin-left: -4rem;
  margin-right: -4rem;
  margin-bottom: $spacing-xl;
  padding-bottom: 58%;
}

.operation__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.operation__steps {
  display: flex;
  direction: rtl;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  margin-left: -4rem;
  margin-right: -4rem;
}

// ── Image transition ───────────────────────────────────────────

.op-fade-enter-active {
  transition:
    opacity 0.55s ease-out,
    transform 0.55s #{$transition-easing-standard};
}

.op-fade-leave-active {
  transition:
    opacity 0.4s ease-in,
    transform 0.4s #{$transition-easing-standard};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.op-fade-enter-from {
  opacity: 0;
  transform: scale(0.94);
}

.op-fade-leave-to {
  opacity: 0;
  transform: scale(1.04);
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(md) {
  .operation__header {
    margin-bottom: $spacing-lg;
  }

  .operation__title {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
  }

  .operation__preview {
    margin-left: -2rem;
    margin-right: -2rem;
    padding-bottom: 62%;
    margin-bottom: $spacing-lg;
  }

  .operation__steps {
    margin-left: -2rem;
    margin-right: -2rem;
  }
}

@include respond-to(sm) {
  .operation__toggle {
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
  }

  .operation__preview {
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    padding-bottom: 70%;
    margin-bottom: $spacing-md;
  }

  .operation__steps {
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
}
</style>
