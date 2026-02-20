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
            >تنظیم هوشمند اسناد</span
          >

          <ToggleSwitch v-model="showStandard" />

          <span
            class="operation__toggle-label"
            :class="{ 'operation__toggle-label--active': showStandard }"
            >پیش نمایش</span
          >
        </div>
      </div>

      <!-- Browser mockup -->
      <div class="operation__preview" v-bind="reveal(4)">
        <div class="operation__browser">
          <div class="operation__chrome">
            <div class="operation__chrome-dots" aria-hidden="true">
              <span
                class="operation__chrome-dot operation__chrome-dot--red"
              ></span>
              <span
                class="operation__chrome-dot operation__chrome-dot--yellow"
              ></span>
              <span
                class="operation__chrome-dot operation__chrome-dot--green"
              ></span>
            </div>
            <div class="operation__chrome-icons" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                class="operation__chrome-icon"
              >
                <path
                  d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6l-8-4z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  fill="none"
                />
              </svg>
            </div>
            <div class="operation__chrome-url" dir="ltr">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                class="operation__chrome-lock"
              >
                <rect
                  x="5"
                  y="11"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path
                  d="M8 11V7a4 4 0 0 1 8 0v4"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>
              zoonkan.com/app/create/document
            </div>
            <div class="operation__chrome-actions" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                class="operation__chrome-action-icon"
              >
                <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" fill="currentColor" />
                <rect
                  x="4"
                  y="18"
                  width="16"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                class="operation__chrome-action-icon"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                class="operation__chrome-action-icon"
              >
                <rect
                  x="9"
                  y="9"
                  width="11"
                  height="13"
                  rx="1.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </div>
          </div>

          <div class="operation__screen">
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
                <div
                  v-if="i < steps.length - 1"
                  class="operation__step-line"
                ></div>

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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import ToggleSwitch from "@/components/base/BaseToggle.vue";
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
          'الف. شرکت <span class="op-var">{نام شرکت کارفرما}</span> به شماره شناسه <span class="op-var">{شماره شناسه کارفرما}</span> و کد ملی <span class="op-var">{کد ملی کارفرما}</span> و شماره ثبت <span class="op-var">{شماره ثبت کارفرما}</span> به نشانی <span class="op-var">{آدرس پستی کارفرما}</span> و شماره تلفن <span class="op-var">{شماره تلفن کارفرما}</span> و پست الکترونیکی <span class="op-var">{پست الکترونیکی کارفرما}</span> به نمایندگی <span class="op-var">{نام نمایندگی کارفرما}</span> بعنوان <span class="op-var">{سمت نمایندگی کارفرما}</span> به عنوان رییس هیأت مدیره و یا صاحب امضاء مجاز که از این پس در این <span class="op-var">{عنوان سند}</span> "کارفرما" نامیده می‌شود.',
          'ب. <span class="op-var">{پیشوند طراح}</span> فرزند <span class="op-var">{نام پدر طراح}</span> به شماره ملی <span class="op-var">{کد ملی طراح}</span> و آدرس <span class="op-var">{آدرس پستی طراح}</span> و تلفن <span class="op-var">{شماره تلفن طراح}</span> و پست الکترونیکی <span class="op-var">{پست الکترونیکی طراح}</span> که ازاین‌پس در این <span class="op-var">{عنوان سند}</span> "طراح" نامیده می‌شود.',
          "ج. اقامتگاه قانونی طرفین همان است که در بند ۱.۱ ماده یک بیان شده است.",
          "د. مطابق با مواد ۶ و ۱۲ قانون تجارت الکترونیکی مکاتبات انجام پذیرفته الکترونیکی در حکم و برابر با مکاتبات سنتی و فیزیکی و قابل استناد خواهد بود.",
        ],
      },
      {
        heading: "۲. موضوع قرارداد",
        lines: [
          'الف. موضوع <span class="op-var">{عنوان سند}</span> عبارت است از <span class="op-var">{موضوع قرارداد}</span> با توجه به ارائه درخواست کارفرما مطابق با پیوست این قرارداد که <span class="op-var">{مفاد قرارداد}</span> را به وضوح بیان نموده است.',
          'ب. کارفرما و طراح اقرار می‌نمایند از مفاد و مواد <span class="op-var">{عنوان سند}</span> کاملاً آگاهی داشته و با امضای ذیل این قرارداد هرگونه ناآگاهی را از خود نفی می‌نمایند.',
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
          'الف. شرکت آرمان اتحاد آرین به شماره شناسه <span class="op-var op-filled">۵۶۵۲۶۹۷۰۱۲۳</span> و کد ملی <span class="op-var op-filled">۳۲۵۸۵۴۵۰۲۶</span> و شماره ثبت <span class="op-var op-filled">۱۰۲۶۹۸۴۵۶</span> به نشانی تهران، تهران، خیابان گاندی، کوی نهم، پلاک ۳۴۵، واحد ۲۹ و شماره تلفن <span class="op-var op-filled">۰۲۱۶۶۹۸۴۲۶۵</span> و پست الکترونیکی <span class="op-var op-filled">info@armanetehad.com</span> به نمایندگی <span class="op-var op-filled">محمدحسین حیدری</span> بعنوان مدیرعامل و <span class="op-var op-filled">مریم حیدری</span> به عنوان رییس هیأت مدیره و یا صاحب امضاء مجاز که از این پس در این قرارداد "کارفرما" نامیده می‌شود.',
          'ب. آقای محمدعلی خسروی فرزند اکبر به شماره ملی <span class="op-var op-filled">۰۰۹۳۵۲۶۵۹۸</span> و آدرس تهران، تهران، خیابان آزادی، بعد از تقاطع استادمعین، پلاک ۱۴ و تلفن <span class="op-var op-filled">۰۲۱۶۶۹۴۶۵۸۹</span> و پست الکترونیکی <span class="op-var op-filled">khosravi@gmail.com</span> که ازاین‌پس در این قرارداد "طراح" نامیده می‌شود.',
          "ج. اقامتگاه قانونی طرفین همان است که در بند ۱.۱ ماده یک بیان شده است.",
          "د. مطابق با مواد ۶ و ۱۲ قانون تجارت الکترونیکی مکاتبات انجام پذیرفته الکترونیکی در حکم و برابر با مکاتبات سنتی و فیزیکی و قابل استناد خواهد بود.",
        ],
      },
      {
        heading: "۲. موضوع قرارداد",
        lines: [
          'الف. موضوع <span class="op-var op-filled">قرارداد</span> عبارت است از <span class="op-var op-filled">طراحی وبسایت شرکت آرمان اتحاد آرین</span> با توجه به ارائه درخواست کارفرما مطابق با پیوست این <span class="op-var op-filled">قرارداد</span> که <span class="op-var op-filled">به توضیح موارد مربوط به طراحی UI و UX و پیاده‌سازی سیستم مدیریت محتوا بر اساس سیستم Wordpress است</span> را به وضوح بیان نموده است.',
          'ب. کارفرما و طراح اقرار می‌نمایند از مفاد و مواد <span class="op-var op-filled">قرارداد</span> کاملاً آگاهی داشته و با امضای ذیل این قرارداد هرگونه ناآگاهی را از خود نفی می‌نمایند.',
        ],
      },
      {
        heading: "۳. مدت قرارداد",
        lines: [
          'الف. مدت قرارداد <span class="op-var op-filled">۶ ماه</span> شمسی از تاریخ پرداخت اولین پیش پرداخت محاسبه خواهد شد.',
          'ب. در صورتی که مدت <span class="op-var op-filled">قرارداد</span> به اتمام رسیده و طرفین نسبت به تمدید آن اقدام ننموده و موضوع <span class="op-var op-filled">قرارداد</span> نیز تحویل نگردد، مطابق ماده فسخ (ماده ۱۲) عمل خواهد شد.',
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
// ─────────────────────────────────────────────────────────────
// OperationSection
// WHY notes:
// - $color-text-faded replaces the magic color #94979c.
// - $font-size-3xl replaces the magic rem(30) in subtitle.
// - operation__toggle mobile padding tightened via respond-to(sm).
// ─────────────────────────────────────────────────────────────

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
  font-size: $font-size-3xl; // FIX: was magic rem(30) — now uses token
  font-weight: $font-weight-semibold;
  color: $color-text-faded; // FIX: was magic #94979c — now uses token
  margin: 0 auto;
  margin-bottom: rem(50);

  strong {
    color: $color-text-primary;
    font-weight: $font-weight-semibold;
  }
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
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    border-color #{$transition-duration-fast} #{$transition-easing-standard};

  &:hover {
    background: $color-surface-light;
    border-color: $color-border-medium;
  }
}

.operation__toggle-label {
  font-size: $font-size-sm;
  color: $color-text-muted;
  font-weight: $font-weight-medium;
  transition: color #{$transition-duration-fast} #{$transition-easing-standard};
  user-select: none;

  &--active {
    color: $color-text-primary;
    font-weight: $font-weight-semibold;
  }
}

// ── Browser shell ──────────────────────────────────────────────

.operation__preview {
  margin-bottom: $spacing-xl;
}

.operation__browser {
  border-radius: $radius-lg;
  overflow: hidden;
  border: 1px solid $color-border-medium;
  background: $color-bg-secondary;
  box-shadow:
    0 rem(32) rem(80) rgba(0, 0, 0, 0.55),
    0 0 0 1px $color-border-subtle;
}

// ── Chrome bar ─────────────────────────────────────────────────

.operation__chrome {
  display: flex;
  align-items: center;
  gap: rem(12);
  padding: rem(12) rem(16);
  background: $color-bg-tertiary;
  border-bottom: 1px solid $color-border-subtle;
  direction: ltr;
}

.operation__chrome-dots {
  display: flex;
  gap: rem(6);
  flex-shrink: 0;
}

.operation__chrome-dot {
  width: rem(12);
  height: rem(12);
  border-radius: $radius-full;

  &--red {
    background: #ff5f57;
  }
  &--yellow {
    background: #ffbd2e;
  }
  &--green {
    background: #28ca42;
  }
}

.operation__chrome-icons {
  display: flex;
  gap: rem(8);
  flex-shrink: 0;
  color: $color-text-muted;
}

.operation__chrome-icon {
  width: rem(14);
  height: rem(14);
}

.operation__chrome-url {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: rem(5);
  padding: rem(4) rem(14);
  background: $color-bg-secondary;
  border: 1px solid $color-border-subtle;
  border-radius: $radius-sm;
  color: $color-text-tertiary;
  font-size: rem(12);
  max-width: rem(340);
  margin: 0 auto;
  white-space: nowrap;
}

.operation__chrome-lock {
  flex-shrink: 0;
  color: $color-text-muted;
}

.operation__chrome-actions {
  display: flex;
  gap: rem(10);
  flex-shrink: 0;
  color: $color-text-muted;
}

.operation__chrome-action-icon {
  width: rem(16);
  height: rem(16);
  opacity: 0.6;
}

// ── Document screen ────────────────────────────────────────────

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
  gap: 0;
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
  transition:
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    border-color #{$transition-duration-fast} #{$transition-easing-standard};

  &-line {
    position: absolute;
    top: rem(20);
    left: -50%;
    width: 100%;
    height: 0;
    border-top: 1.5px dashed rgba(255, 255, 255, 0.15);
    z-index: 0;
  }

  &--active {
    .operation__step-line {
      border-color: $color-border-primary;
    }
    .operation__step-title {
      color: $color-text-primary;
    }
  }

  &--completed {
    .operation__step-line {
      border-color: $color-border-primary;
      border-style: solid;
    }
    .operation__step-title {
      color: $color-text-secondary;
    }
  }

  &--pending {
    .operation__step-title {
      color: $color-text-muted;
    }
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
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    border-color #{$transition-duration-fast} #{$transition-easing-standard};

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
  transition: color #{$transition-duration-fast} #{$transition-easing-standard};
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
  cursor: default;
}

:deep(.op-filled) {
  color: $color-accent-primary;
  font-weight: $font-weight-medium;
}

// ── Slide transitions ──────────────────────────────────────────

$_slide-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
$_slide-distance: 40px;

.op-slide-left-enter-active,
.op-slide-right-enter-active {
  transition:
    opacity 0.4s $_slide-easing,
    transform 0.4s $_slide-easing;
}

.op-slide-left-leave-active,
.op-slide-right-leave-active {
  transition:
    opacity 0.18s ease-in,
    transform 0.18s ease-in,
    filter 0.18s ease-in;
  pointer-events: none;
}

.op-slide-left-enter-from {
  opacity: 0;
  transform: translateX(-#{$_slide-distance});
}
.op-slide-left-leave-to {
  opacity: 0;
  transform: translateX($_slide-distance);
  filter: blur(2px);
}

.op-slide-right-enter-from {
  opacity: 0;
  transform: translateX($_slide-distance);
}
.op-slide-right-leave-to {
  opacity: 0;
  transform: translateX(-#{$_slide-distance});
  filter: blur(2px);
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .operation__screen {
    min-height: rem(500);
  }
}

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
    flex-direction: column;
    gap: rem(4);
    padding: rem(12) rem(16); // FIX: was rem(16) rem(24) — tightened side padding
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

  .operation__chrome-url {
    font-size: rem(9);
    max-width: rem(160);
  }

  .operation__chrome-actions,
  .operation__chrome-icons {
    display: none;
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
