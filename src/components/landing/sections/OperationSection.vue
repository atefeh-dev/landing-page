<template>
  <section class="section section--operation" id="operation" ref="sectionRef">
    <div class="section__container">
      <!-- Header -->
      <div class="operation__header">
        <!-- <span class="section__badge" v-bind="slideDown()">عملکرد</span> -->

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

      <!-- Image preview -->
      <div class="operation__preview" v-bind="reveal(3)">
        <div class="operation__preview-inner">
          <transition name="operation__image-fade">
            <img
              :key="showStandard ? 'standard' : 'smart'"
              :src="currentImage"
              :alt="showStandard ? 'فرآیند استاندارد' : 'فرآیند هوشمند'"
              class="operation__image"
            />
          </transition>
        </div>
      </div>

      <!-- Step indicators -->
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
const { reveal, slideDown } = useScrollAnimation(sectionRef, 0.1);

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
.section--operation {
  background: $color-bg-primary;
}

// ── Header ─────────────────────────────────────────────────────

.operation__header {
  text-align: center;
  margin-bottom: $spacing-lg;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

// ── Title ──────────────────────────────────────────────────────

.operation__title {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-md;
  color: $color-text-primary;
  line-height: 1.3;
}

// ── Toggle row ─────────────────────────────────────────────────

.operation__toggle {
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;
  padding: 0.625rem 1.125rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid $color-border-subtle;
  border-radius: $radius-full;
  transition: $transition-base;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: $color-border-medium;
  }
}

.operation__toggle-label {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-weight: $font-weight-medium;
}

// ── Image preview ──────────────────────────────────────────────

.operation__preview {
  max-width: 1000px;
  margin: 0 auto $spacing-xl;
  box-shadow: $shadow-lg;
  background: $color-bg-primary;
}

.operation__preview-inner {
  position: relative;
  width: 100%;
  padding-bottom: 58%;
}

.operation__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

// ── Step indicators row ────────────────────────────────────────

.operation__steps {
  display: flex;
  direction: rtl;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 $spacing-md;
}

// ── Image crossfade transition ─────────────────────────────────

.operation__image-fade-enter-active,
.operation__image-fade-leave-active {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.operation__image-fade-enter-from {
  opacity: 0;
  transform: scale(0.92);
}

.operation__image-fade-leave-to {
  opacity: 0;
  transform: scale(1.08);
}

// ── Responsive ─────────────────────────────────────────────────

@media (max-width: $breakpoint-md) {
  .operation__header {
    margin-bottom: $spacing-md;
  }

  .operation__title {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    margin-bottom: $spacing-sm;
  }

  .operation__preview {
    max-width: 900px;
    margin-bottom: $spacing-md;
  }

  .operation__preview-inner {
    padding-bottom: 62%;
  }
}

@media (max-width: $breakpoint-sm) {
  .operation__header {
    margin-bottom: $spacing-sm;
  }

  .operation__toggle {
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
  }

  .operation__toggle-label {
    font-size: $font-size-xs;
  }

  .operation__preview {
    max-width: 100%;
    margin-bottom: $spacing-sm;
    border-radius: $radius-md;
  }

  .operation__preview-inner {
    padding-bottom: 70%;
  }

  .operation__steps {
    padding: 0 $spacing-sm;
  }
}
</style>
