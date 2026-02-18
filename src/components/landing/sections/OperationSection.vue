<template>
  <section class="section section--operation" id="operation" ref="sectionRef">
    <div class="section__container">
      <!-- Header -->
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

      <!-- Image preview — fixed aspect-ratio box so height never collapses during transition -->
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

      <!-- Step indicators — original floating style -->
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
// ── Section ────────────────────────────────────────────────────

.section--operation {
  background: $color-bg-primary;
}

// ── Header ─────────────────────────────────────────────────────

.operation__header {
  text-align: center;
  margin-bottom: $spacing-xl;
  max-width: 700px;
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
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid $color-border-subtle;
  border-radius: $radius-full;
  transition: $transition-base;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: $color-border-medium;
  }
}

.operation__toggle-label {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-weight: $font-weight-medium;
}

// ── Image preview ──────────────────────────────────────────────
// Uses padding-bottom aspect-ratio trick so the box NEVER collapses
// to zero height during the Vue transition (which caused the blank flash).
// Both entering and leaving images are position:absolute inside this box.

.operation__preview {
  position: relative;
  // Break out of container to give image more room — same trick as steps row
  margin-left: -4rem;
  margin-right: -4rem;
  margin-bottom: $spacing-xl;
  // Aspect ratio box — keeps height stable during transition so no flash
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

// ── Step indicators row ────────────────────────────────────────
// Steps use negative horizontal margins to escape the container's
// max-width, giving them more breathing room than the rest of the section.

.operation__steps {
  display: flex;
  direction: rtl;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  // Escape the container on both sides by the same amount
  margin-left: -4rem;
  margin-right: -4rem;
}

// ── Image transition ───────────────────────────────────────────
// Enter: image scales up from slightly smaller → normal (feels like it "reveals")
// Leave: image scales up further and fades (feels like it "recedes")
// Both are absolute so container height is ALWAYS held by padding-bottom.

.op-fade-enter-active {
  transition:
    opacity 0.55s ease-out,
    transform 0.55s cubic-bezier(0.2, 0, 0.2, 1);
}
.op-fade-leave-active {
  transition:
    opacity 0.4s ease-in,
    transform 0.4s cubic-bezier(0.2, 0, 0.2, 1);
  // Must be absolute during leave so it doesn't push layout
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

@media (max-width: $breakpoint-md) {
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
    // Reduce the breakout on tablet
    margin-left: -2rem;
    margin-right: -2rem;
  }
}

@media (max-width: $breakpoint-sm) {
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
    // Reset the negative margins — container padding is already small on mobile
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
}
</style>
