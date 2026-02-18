<template>
  <section class="section section--operation" id="operation" ref="sectionRef">
    <div class="section__container">
      <!-- Header -->
      <div class="operation__header">
        <span class="section__badge" :class="slideDown()">عملکرد</span>

        <h2 class="operation__title" :class="reveal(1)">
          ساخت سند، شفاف و مرحله‌به‌مرحله.
        </h2>

        <p class="operation__description" :class="reveal(2)">
          در زونکن، شما قالب موردنیازتان را انتخاب می‌کنید. اطلاعات طرفین را
          وارد می‌کنید. متغیرها با داده‌های واقعی جایگزین می‌شوند. و سند شما شکل
          می‌گیرد. اما مهمتر از تولید سند، مدیریت چرخه آن است.
        </p>

        <!-- Toggle switch -->
        <div class="operation__toggle" :class="reveal(3)">
          <ToggleSwitch v-model="showStandard" />
          <span class="operation__toggle-label">
            {{ showStandard ? "دریافت اسناد استاندارد" : "تنظیم هوشمند اسناد" }}
          </span>
        </div>
      </div>

      <!-- 
        FIX: Wrapper with fixed aspect ratio prevents layout shift
        Images overlap during transition (no jumping)
      -->
      <div class="operation__preview" :class="reveal(4)">
        <div class="operation__preview-inner">
          <transition name="image-crossfade">
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
      <div class="operation__steps-wrapper" :class="reveal(5)">
        <div class="operation__steps">
          <StepIndicator
            v-for="(step, index) in currentSteps"
            :key="`${showStandard ? 'standard' : 'smart'}-${index}`"
            :step-number="index + 1"
            :active="false"
            :completed="isStepCompleted(index)"
          >
            <template #title>{{ step.title }}</template>
            <template #description>{{ step.description }}</template>
          </StepIndicator>
        </div>
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

// Smart workflow steps
const smartSteps = [
  {
    title: "انتخاب نوع سند",
    description: "نام‌گذاری، قالب، رسید، پرداخت و ...",
  },
  { title: "تنظیم سند", description: "تکمیل اطلاعات مورد نیاز سند" },
  { title: "پیش‌نمایش سند", description: "درج اطلاعات وارد شده در سند" },
  { title: "ذخیره سند", description: "سند شما تنظیم و آمادگی دریافت است" },
];

// Standard workflow steps
const standardSteps = [
  { title: "ذخیره سند", description: "سند شما تنظیم و آمادگی دریافت است" },
  { title: "پیش‌نمایش سند", description: "درج اطلاعات وارد شده در سند" },
  { title: "تنظیم سند", description: "تکمیل اطلاعات مورد نیاز سند" },
  {
    title: "انتخاب نوع سند",
    description: "نام‌گذاری، قالب، رسید، پرداخت و ...",
  },
];

const currentSteps = computed(() => {
  return showStandard.value ? standardSteps : smartSteps;
});

const currentImage = computed(() => {
  return showStandard.value ? Step2 : Step1;
});

// FIX: Correct completion logic
// Smart workflow (تنظیم هوشمند اسناد) → step 2 (index 1) completed
// Standard workflow (دریافت اسناد استاندارد) → step 1 (index 0) completed
function isStepCompleted(index) {
  if (showStandard.value) {
    return index === 0; // First step completed in standard
  } else {
    return index === 1; // Second step completed in smart
  }
}
</script>

<style lang="scss" scoped>
.section--operation {
  background: $color-bg-primary;
  padding-top: calc($nav-height + $spacing-3xl);
  padding-bottom: $spacing-3xl;
}

.operation__header {
  text-align: center;
  margin-bottom: $spacing-3xl;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.operation__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-md;
  color: $color-text-primary;
}

.operation__description {
  font-size: $font-size-lg;
  line-height: 1.8;
  color: $color-text-secondary;
  max-width: 800px;
  margin: 0 auto $spacing-lg;
}

.operation__toggle {
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid $color-border-subtle;
  border-radius: $radius-full;
}

.operation__toggle-label {
  font-size: $font-size-md;
  color: $color-text-secondary;
  font-weight: $font-weight-medium;
}

/*
  FIX: Prevent layout shift during image transition
  - Wrapper has fixed aspect ratio (16:9 common for screenshots)
  - Inner container is position:relative so images can position:absolute
  - Images overlap during transition (no gap/jump)
*/
.operation__preview {
  width: 100%;
  max-width: 900px;
  margin: 0 auto $spacing-3xl;
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-xl;
  border: 2px solid $color-accent-primary;
}

.operation__preview-inner {
  position: relative;
  width: 100%;
  padding-bottom: 66.67%; // 3:2 aspect ratio (adjust to your image ratio)
  background: $color-bg-primary;
}

.operation__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.operation__steps-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.operation__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-lg;
  position: relative;

  // Dotted connector line
  &::before {
    content: "";
    position: absolute;
    top: 28px;
    right: calc(12.5% + 28px);
    left: calc(12.5% + 28px);
    height: 1px;
    background-image: repeating-linear-gradient(
      to left,
      rgba(255, 255, 255, 0.15) 0px,
      rgba(255, 255, 255, 0.15) 4px,
      transparent 4px,
      transparent 8px
    );
    z-index: 0;
  }
}

/*
  FIX: Smooth overlapping crossfade
  Both images exist at same time during transition
  Old scales up + fades out, new scales down + fades in
  Duration increased to 0.7s for smoother rhythm
*/
.image-crossfade-enter-active {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-crossfade-leave-active {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-crossfade-enter-from {
  opacity: 0;
  transform: scale(0.88);
}

.image-crossfade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.image-crossfade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.image-crossfade-leave-to {
  opacity: 0;
  transform: scale(1.12);
}

@media (max-width: $breakpoint-md) {
  .section--operation {
    padding-top: calc($nav-height + $spacing-2xl);
    padding-bottom: $spacing-2xl;
  }

  .operation__header {
    margin-bottom: $spacing-2xl;
  }
  .operation__title {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }
  .operation__description {
    font-size: $font-size-md;
  }

  .operation__steps {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xl $spacing-lg;
    &::before {
      display: none;
    }
  }

  .operation__preview {
    margin-bottom: $spacing-2xl;
  }
}

@media (max-width: $breakpoint-sm) {
  .section--operation {
    padding-top: calc($nav-height + $spacing-xl);
    padding-bottom: $spacing-xl;
  }

  .operation__header {
    margin-bottom: $spacing-xl;
  }

  .operation__steps {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg $spacing-md;
  }

  .operation__toggle {
    flex-direction: column;
    gap: $spacing-xs;
    padding: 0.625rem 1rem;
  }

  .operation__preview {
    margin-bottom: $spacing-xl;
  }
}
</style>
