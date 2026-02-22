<template>
  <section class="section section--operation" id="operation" ref="sectionRef">
    <div class="section__container">
      <!-- Header -->
      <div class="operation__header">
        <div class="section__header section__header--center">
          <span class="section__badge" v-bind="slideDown()">عملکرد</span>
        </div>
        <h2 class="operation__title" v-bind="reveal(1)">
          ساخت سند، <span class="highlight">شفاف</span> و مرحله‌به‌مرحله.
        </h2>
        <p class="operation__subtitle" v-bind="reveal(2)">
          در زونکن، شما قالب موردنیازتان را انتخاب می‌کنید. اطلاعات طرفین را
          وارد می‌کنید. متغیرها با داده‌های واقعی جایگزین می‌شوند. و سند شما شکل
          می‌گیرد.
          <br />
          <span class="highlight"
            >اما مهم‌تر از تولید سند، مدیریت چرخه آن است.</span
          >
        </p>

        <div class="operation__toggle" v-bind="reveal(3)">
          <span
            class="operation__toggle-label"
            :class="{ 'operation__toggle-label--active': !showStandard }"
          >
            تنظیم هوشمند اسناد
          </span>
          <ToggleSwitch v-model="showStandard" />
          <span
            class="operation__toggle-label"
            :class="{ 'operation__toggle-label--active': showStandard }"
          >
            پیش نمایش
          </span>
        </div>
      </div>

      <!-- Browser mockup — BrowserMockup handles all chrome -->
      <div class="operation__preview" v-bind="reveal(4)">
        <BrowserMockup
          url="zoonkan.com/app/create/document"
          theme="dark"
          height="auto"
        >
          <!-- Document screen lives inside the browser via slot -->
          <div class="operation__screen">
            <!-- Step progress bar -->
            <div class="operation__steps-bar">
              <div
                v-for="(step, i) in steps"
                :key="i"
                class="operation__step"
                :class="{
                  'operation__step--active': i === activeStep,
                  'operation__step--completed': i < activeStep,
                  'operation__step--pending': i > activeStep,
                }"
              >
                <div v-if="i < steps.length - 1" class="operation__step-line" />

                <div class="operation__step-circle">
                  <svg
                    v-if="i < activeStep"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span v-else class="operation__step-num">{{
                    persianNum(i + 1)
                  }}</span>
                </div>

                <div class="operation__step-info">
                  <span class="operation__step-title">{{ step.title }}</span>
                  <span class="operation__step-desc">{{
                    step.description
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Document content -->
            <transition :name="slideDirection" mode="out-in">
              <div :key="activeStep" class="operation__doc">
                <div class="operation__doc-header">
                  <h3 class="operation__doc-title">
                    <span class="operation__doc-var">{{ docData.title }}</span>
                  </h3>
                  <p class="operation__doc-subtitle">
                    (این
                    <span class="operation__doc-link">{{
                      docData.titleShort
                    }}</span>
                    برابر با ماده ۱۰ قانون مدنی تنظیم و برای طرفین لازم الاجرا
                    است)
                  </p>
                </div>

                <div class="operation__doc-body">
                  <div
                    v-for="(section, si) in docData.sections"
                    :key="si"
                    class="operation__doc-section"
                  >
                    <p class="operation__doc-section-title">
                      {{ section.heading }}
                    </p>
                    <div
                      v-for="(line, li) in section.lines"
                      :key="li"
                      class="operation__doc-line"
                    >
                      <span v-html="line"></span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </BrowserMockup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import ToggleSwitch from "@/components/base/BaseToggle.vue";
import BrowserMockup from "@/components/base/BrowserMockup.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal, slideDown } = useScrollAnimation(sectionRef, 0.1);

const showStandard = ref(false);
const activeStep = ref(1);
const slideDirection = ref("op-slide-left");

const steps = [
  {
    title: "انتخاب نوع سند",
    description: "تفاهم نامه، قرارداد، رسید پرداخت و ...",
  },
  { title: "تنظیم سند", description: "تکمیل اطلاعات مورد نیاز" },
  { title: "پیش‌نمایش سند", description: "درج اطلاعات وارد شده در سند" },
  { title: "ذخیره سند", description: "سند شما تنظیم و آماده‌ی دریافت است" },
];

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const persianNum = (n) =>
  String(n)
    .split("")
    .map((d) => persianDigits[+d])
    .join("");

const docStates = {
  smart: {
    title: "{عنوان سند} (نام سند)",
    titleShort: "عنوان سند",
    sections: [
      {
        heading: "۱. طرفین (عنوان سند)",
        lines: [
          'الف. شرکت <span class="op-var">{نام شرکت کارفرما}</span> به شماره شناسه <span class="op-var">{شماره شناسه کارفرما}</span> و کد ملی <span class="op-var">{کد ملی کارفرما}</span> و شماره ثبت <span class="op-var">{شماره ثبت کارفرما}</span> به نشانی <span class="op-var">{آدرس پستی کارفرما}</span> و شماره تلفن <span class="op-var">{شماره تلفن کارفرما}</span> و پست الکترونیکی <span class="op-var">{پست الکترونیکی کارفرما}</span> به نمایندگی <span class="op-var">{نام نمایندگی کارفرما}</span> بعنوان <span class="op-var">{سمت نمایندگی کارفرما}</span> که از این پس "کارفرما" نامیده می‌شود.',
          'ب. <span class="op-var">{پیشوند طراح}</span> فرزند <span class="op-var">{نام پدر طراح}</span> به شماره ملی <span class="op-var">{کد ملی طراح}</span> و آدرس <span class="op-var">{آدرس پستی طراح}</span> که ازاین‌پس "طراح" نامیده می‌شود.',
          "ج. اقامتگاه قانونی طرفین همان است که در بند ۱.۱ ماده یک بیان شده است.",
          "د. مطابق با مواد ۶ و ۱۲ قانون تجارت الکترونیکی مکاتبات انجام پذیرفته الکترونیکی در حکم و برابر با مکاتبات سنتی و فیزیکی و قابل استناد خواهد بود.",
        ],
      },
      {
        heading: "۲. موضوع قرارداد",
        lines: [
          'الف. موضوع <span class="op-var">{عنوان سند}</span> عبارت است از <span class="op-var">{موضوع قرارداد}</span> با توجه به ارائه درخواست کارفرما مطابق با پیوست این قرارداد.',
          'ب. کارفرما و طراح اقرار می‌نمایند از مفاد و مواد <span class="op-var">{عنوان سند}</span> کاملاً آگاهی داشته‌اند.',
        ],
      },
      {
        heading: "۳. مدت قرارداد",
        lines: [
          'الف. مدت قرارداد <span class="op-var">{مدت زمان قرارداد}</span> شمسی از تاریخ پرداخت اولین پیش پرداخت محاسبه خواهد شد.',
          'ب. در صورتی که مدت <span class="op-var">{عنوان سند}</span> به اتمام رسیده و طرفین نسبت به تمدید آن اقدام ننموده باشند قرارداد فسخ می‌شود.',
        ],
      },
    ],
  },
  standard: {
    title: "قرارداد همکاری طراحی وبسایت",
    titleShort: "قرارداد",
    sections: [
      {
        heading: "۱. طرفین قرارداد",
        lines: [
          'الف. شرکت آرمان اتحاد آرین به شماره شناسه <span class="op-var op-filled">۵۶۵۲۶۹۷۰۱۲۳</span> و کد ملی <span class="op-var op-filled">۳۲۵۸۵۴۵۰۲۶</span> به نشانی تهران، خیابان گاندی، پلاک ۳۴۵، واحد ۲۹ و شماره تلفن <span class="op-var op-filled">۰۲۱۶۶۹۸۴۲۶۵</span> به نمایندگی <span class="op-var op-filled">محمدحسین حیدری</span> که از این پس "کارفرما" نامیده می‌شود.',
          'ب. آقای محمدعلی خسروی فرزند اکبر به شماره ملی <span class="op-var op-filled">۰۰۹۳۵۲۶۵۹۸</span> و آدرس تهران، خیابان آزادی، پلاک ۱۴ و تلفن <span class="op-var op-filled">۰۲۱۶۶۹۴۶۵۸۹</span> که ازاین‌پس "طراح" نامیده می‌شود.',
          "ج. اقامتگاه قانونی طرفین همان است که در بند ۱.۱ ماده یک بیان شده است.",
        ],
      },
      {
        heading: "۲. موضوع قرارداد",
        lines: [
          'الف. موضوع <span class="op-var op-filled">قرارداد</span> عبارت است از <span class="op-var op-filled">طراحی وبسایت شرکت آرمان اتحاد آرین</span> مطابق با پیوست این قرارداد.',
          'ب. کارفرما و طراح اقرار می‌نمایند از مفاد <span class="op-var op-filled">قرارداد</span> کاملاً آگاهی داشته‌اند.',
        ],
      },
      {
        heading: "۳. مدت قرارداد",
        lines: [
          'الف. مدت قرارداد <span class="op-var op-filled">۶ ماه</span> شمسی از تاریخ پرداخت اولین پیش پرداخت محاسبه خواهد شد.',
        ],
      },
    ],
  },
};

const docData = computed(() =>
  showStandard.value ? docStates.standard : docStates.smart,
);

watch(showStandard, async (val) => {
  slideDirection.value = val ? "op-slide-left" : "op-slide-right";
  await nextTick();
  activeStep.value = val ? 2 : 1;
});
</script>

<style lang="scss" scoped>
.section--operation {
  background: $color-bg-primary;
}

// ── Header ─────────────────────────────────────────────────────

.operation__header {
  text-align: center;
  margin-bottom: $spacing-xl;
  max-width: rem(967);
  margin-left: auto;
  margin-right: auto;
}

.operation__title {
  font-size: clamp(rem(28), 4vw, rem(40));
  font-weight: $font-weight-bold;
  line-height: 1.3;
  margin-bottom: $spacing-xl;
}

.operation__subtitle {
  font-size: $font-size-3xl;
  font-weight: $font-weight-semibold;
  color: $color-text-faded;
  margin: 0 auto rem(50);
}

.operation__toggle {
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;
  padding: rem(8) rem(16);
  background: $color-surface-hover;
  border: 1px solid $color-border-subtle;
  border-radius: $radius-full;
  cursor: pointer;
  transition:
    background-color $transition-duration-fast $transition-easing-standard,
    border-color $transition-duration-fast $transition-easing-standard;

  &:hover {
    background: $color-surface-light;
    border-color: $color-border-medium;
  }
}

.operation__toggle-label {
  font-size: $font-size-sm;
  color: $color-text-muted;
  font-weight: $font-weight-medium;
  transition: color $transition-duration-fast $transition-easing-standard;
  user-select: none;

  &--active {
    color: $color-text-primary;
    font-weight: $font-weight-semibold;
  }
}

// ── Preview wrapper ────────────────────────────────────────────

.operation__preview {
  margin-bottom: $spacing-xl;
}

// ── Document screen (goes inside BrowserMockup slot) ───────────

.operation__screen {
  padding: rem(24) rem(32) rem(32);
  background: $color-bg-secondary;
  direction: rtl;
  min-height: rem(560);
  overflow: hidden;
  position: relative;
}

// ── Step progress bar ──────────────────────────────────────────

.operation__steps-bar {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: rem(28);
  direction: rtl;
}

.operation__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  padding: rem(8) rem(4);
  border-radius: $radius-sm;

  &-line {
    position: absolute;
    top: rem(20);
    left: -50%;
    width: 100%;
    height: 0;
    border-top: 1.5px dashed rgba(255, 255, 255, 0.15);
    z-index: 0;
  }

  &--active .operation__step-line {
    border-color: $color-border-primary;
  }
  &--completed .operation__step-line {
    border-color: $color-border-primary;
    border-style: solid;
  }
  &--active .operation__step-title {
    color: $color-text-primary;
  }
  &--completed .operation__step-title {
    color: $color-text-secondary;
  }
  &--pending .operation__step-title {
    color: $color-text-muted;
  }
}

.operation__step-circle {
  width: rem(28);
  height: rem(28);
  border-radius: $radius-full;
  border: 1.5px solid $color-border-medium;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-bg-primary;
  position: relative;
  z-index: 1;
  margin-bottom: rem(6);
  transition:
    background-color $transition-duration-fast $transition-easing-standard,
    border-color $transition-duration-fast $transition-easing-standard;

  .operation__step--completed & {
    background: $color-success;
    border-color: $color-success;
  }
  .operation__step--active & {
    border-color: $color-accent-primary;
    background: $color-bg-tertiary;
  }
}

.operation__step-num {
  font-size: rem(11);
  font-weight: $font-weight-bold;
  color: $color-text-tertiary;
  .operation__step--active & {
    color: $color-accent-primary;
  }
}

.operation__step-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: rem(2);
  text-align: center;
}

.operation__step-title {
  font-size: rem(12);
  font-weight: $font-weight-semibold;
  line-height: 1.3;
}
.operation__step-desc {
  font-size: rem(10);
  color: $color-text-muted;
  line-height: 1.3;
}

// ── Document content ───────────────────────────────────────────

.operation__doc {
  direction: rtl;
}

.operation__doc-header {
  text-align: center;
  margin-bottom: rem(20);
  padding-bottom: rem(16);
  border-bottom: 1px solid $color-border-subtle;
}

.operation__doc-title {
  font-size: rem(16);
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: rem(6);
}
.operation__doc-subtitle {
  font-size: rem(12);
  color: $color-text-tertiary;
  direction: rtl;
}
.operation__doc-link {
  color: $color-accent-primary;
}
.operation__doc-body {
  font-size: rem(13);
  line-height: 1.85;
  color: $color-text-secondary;
  direction: rtl;
}
.operation__doc-section {
  margin-bottom: rem(16);
}
.operation__doc-section-title {
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  font-size: rem(13);
  margin-bottom: rem(6);
}
.operation__doc-line {
  margin-bottom: rem(4);
  text-align: right;
}

:deep(.op-var) {
  color: $color-accent-primary;
  font-weight: $font-weight-medium;
}
:deep(.op-filled) {
  color: $color-accent-primary;
  font-weight: $font-weight-medium;
}

// ── Slide transitions ──────────────────────────────────────────

$_ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
$_dist: 40px;

.op-slide-left-enter-active,
.op-slide-right-enter-active {
  transition:
    opacity 0.4s $_ease,
    transform 0.4s $_ease;
}
.op-slide-left-leave-active,
.op-slide-right-leave-active {
  transition:
    opacity 0.18s ease-in,
    transform 0.18s ease-in;
  pointer-events: none;
}
.op-slide-left-enter-from {
  opacity: 0;
  transform: translateX(-$_dist);
}
.op-slide-left-leave-to {
  opacity: 0;
  transform: translateX($_dist);
}
.op-slide-right-enter-from {
  opacity: 0;
  transform: translateX($_dist);
}
.op-slide-right-leave-to {
  opacity: 0;
  transform: translateX(-$_dist);
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(md) {
  .operation__header {
    margin-bottom: $spacing-lg;
  }
  .operation__title {
    font-size: clamp(rem(22), 4vw, rem(32));
  }
  .operation__subtitle {
    font-size: $font-size-lg;
    margin-bottom: rem(32);
  }
  .operation__screen {
    padding: rem(20) rem(20) rem(24);
    min-height: rem(440);
  }
  .operation__step-title {
    font-size: rem(11);
  }
  .operation__step-desc {
    display: none;
  }
}

@include respond-to(sm) {
  .operation__toggle {
    gap: rem(10);
    padding: rem(8) rem(12);
  }
  .operation__title {
    font-size: clamp(rem(20), 6vw, rem(28));
    margin-bottom: $spacing-md;
  }
  .operation__subtitle {
    font-size: $font-size-md;
    line-height: 1.6;
    margin-bottom: rem(24);
  }
  .operation__screen {
    padding: rem(14) rem(10) rem(16);
    min-height: rem(420);
  }
  .operation__step-circle {
    width: rem(20);
    height: rem(20);
  }
  .operation__step-num {
    font-size: rem(8);
  }
  .operation__step-title {
    font-size: rem(9);
  }
  .operation__step-desc {
    display: none;
  }
  .operation__doc-body {
    font-size: rem(10.5);
    line-height: 1.75;
  }
  .operation__doc-title {
    font-size: rem(13);
  }
  .operation__doc-section-title {
    font-size: rem(11);
  }
}
</style>
