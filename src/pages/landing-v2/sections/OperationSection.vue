<template>
  <section class="op" ref="sectionRef">
    <div class="lv2-container">
      <div class="op__header">
        <h2 class="op__title" v-bind="anim(1)">
          ساخت سند، <span class="lv2-highlight">شفاف</span> و مرحله‌به‌مرحله.
        </h2>
        <p class="op__subtitle" v-bind="anim(2)">
          در زونکن، شما قالب موردنیازتان را انتخاب می‌کنید. اطلاعات طرفین را
          وارد می‌کنید. متغیرها با داده‌های واقعی جایگزین می‌شوند. و سند شما شکل
          می‌گیرد.
          <br />
          <span class="lv2-highlight"
            >اما مهم‌تر از تولید سند، مدیریت چرخه آن است.</span
          >
        </p>

        <div class="op__toggle" v-bind="anim(3)">
          <span
            class="op__toggle-label"
            :class="{ 'op__toggle-label--on': !showFilled }"
            >تنظیم هوشمند اسناد</span
          >
          <label class="op__switch" aria-label="تغییر نمایش">
            <input
              type="checkbox"
              v-model="showFilled"
              class="op__switch-input"
            />
            <span class="op__switch-track" aria-hidden="true" />
          </label>
          <span
            class="op__toggle-label"
            :class="{ 'op__toggle-label--on': showFilled }"
            >پیش نمایش</span
          >
        </div>
      </div>

      <!-- Browser mockup -->
      <div class="op__browser" v-bind="anim(4)">
        <!-- Chrome bar -->
        <div class="op__chrome" dir="ltr">
          <div class="op__chrome-dots">
            <span class="op__dot op__dot--red"></span>
            <span class="op__dot op__dot--yellow"></span>
            <span class="op__dot op__dot--green"></span>
          </div>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            class="op__chrome-icon"
          >
            <path
              d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6l-8-4z"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
          <div class="op__chrome-url">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
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
          <div class="op__chrome-actions">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                stroke-width="1.8"
              />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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

        <!-- Document screen -->
        <div class="op__screen">
          <!-- Step progress -->
          <div class="op__steps">
            <div
              v-for="(step, i) in steps"
              :key="i"
              class="op__step"
              :class="{
                'op__step--active': i === activeStep,
                'op__step--completed': i < activeStep,
                'op__step--pending': i > activeStep,
              }"
            >
              <div v-if="i < steps.length - 1" class="op__step-line" />
              <div class="op__step-circle">
                <svg
                  v-if="i < activeStep"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span v-else class="op__step-num">{{ fa(i + 1) }}</span>
              </div>
              <div class="op__step-meta">
                <span class="op__step-title">{{ step.title }}</span>
                <span class="op__step-desc">{{ step.desc }}</span>
              </div>
            </div>
          </div>

          <!-- Document content -->
          <Transition :name="slideDir" mode="out-in">
            <div :key="activeStep" class="op__doc" dir="rtl">
              <div class="op__doc-header">
                <h3 class="op__doc-title" v-html="doc.title" />
                <p class="op__doc-sub">
                  (این
                  <span class="op__doc-link">{{ doc.titleShort }}</span> برابر
                  با ماده ۱۰ قانون مدنی تنظیم و برای طرفین لازم الاجرا است)
                </p>
              </div>
              <div class="op__doc-body">
                <div
                  v-for="(sec, si) in doc.sections"
                  :key="si"
                  class="op__doc-section"
                >
                  <p class="op__doc-section-title">{{ sec.heading }}</p>
                  <div
                    v-for="(line, li) in sec.lines"
                    :key="li"
                    class="op__doc-line"
                    v-html="line"
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef, 0.1);
function anim(n) {
  return reveal(n);
}

const showFilled = ref(false);
const activeStep = ref(1);
const slideDir = ref("op-left");

const steps = [
  { title: "انتخاب نوع سند", desc: "تفاهم نامه، قرارداد، رسید پرداخت و ..." },
  { title: "تنظیم سند", desc: "تکمیل اطلاعات مورد نیاز" },
  { title: "پیش‌نمایش سند", desc: "درج اطلاعات وارد شده در سند" },
  { title: "ذخیره سند", desc: "سند شما تنظیم و آماده‌ی دریافت است" },
];

const fa = (n) =>
  String(n)
    .split("")
    .map((d) => "۰۱۲۳۴۵۶۷۸۹"[+d])
    .join("");

const docs = {
  smart: {
    title: '<span class="op-var">{عنوان سند}</span> (نام سند)',
    titleShort: "عنوان سند",
    sections: [
      {
        heading: "۱. طرفین (عنوان سند)",
        lines: [
          'الف. شرکت <span class="op-var">{نام شرکت کارفرما}</span> به شماره شناسه <span class="op-var">{شماره شناسه}</span> و کد ملی <span class="op-var">{کد ملی کارفرما}</span> به نشانی <span class="op-var">{آدرس پستی کارفرما}</span> و شماره تلفن <span class="op-var">{شماره تلفن کارفرما}</span> که از این پس "کارفرما" نامیده می‌شود.',
          'ب. <span class="op-var">{پیشوند طراح}</span> فرزند <span class="op-var">{نام پدر طراح}</span> به شماره ملی <span class="op-var">{کد ملی طراح}</span> و آدرس <span class="op-var">{آدرس پستی طراح}</span> که ازاین‌پس "طراح" نامیده می‌شود.',
          "ج. اقامتگاه قانونی طرفین همان است که در بند ۱.۱ ماده یک بیان شده است.",
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
        ],
      },
    ],
  },
  filled: {
    title: "قرارداد همکاری طراحی وبسایت",
    titleShort: "قرارداد",
    sections: [
      {
        heading: "۱. طرفین قرارداد",
        lines: [
          'الف. شرکت آرمان اتحاد آرین به شماره شناسه <span class="op-filled">۵۶۵۲۶۹۷۰۱۲۳</span> و کد ملی <span class="op-filled">۳۲۵۸۵۴۵۰۲۶</span> به نشانی تهران، خیابان گاندی، پلاک ۳۴۵، واحد ۲۹ و شماره تلفن <span class="op-filled">۰۲۱۶۶۹۸۴۲۶۵</span> به نمایندگی <span class="op-filled">محمدحسین حیدری</span> که از این پس "کارفرما" نامیده می‌شود.',
          'ب. آقای محمدعلی خسروی فرزند اکبر به شماره ملی <span class="op-filled">۰۰۹۳۵۲۶۵۹۸</span> و آدرس تهران، خیابان آزادی، پلاک ۱۴ و تلفن <span class="op-filled">۰۲۱۶۶۹۴۶۵۸۹</span> که ازاین‌پس "طراح" نامیده می‌شود.',
          "ج. اقامتگاه قانونی طرفین همان است که در بند ۱.۱ ماده یک بیان شده است.",
        ],
      },
      {
        heading: "۲. موضوع قرارداد",
        lines: [
          'الف. موضوع <span class="op-filled">قرارداد</span> عبارت است از <span class="op-filled">طراحی وبسایت شرکت آرمان اتحاد آرین</span> مطابق با پیوست این قرارداد.',
          'ب. کارفرما و طراح اقرار می‌نمایند از مفاد <span class="op-filled">قرارداد</span> کاملاً آگاهی داشته‌اند.',
        ],
      },
      {
        heading: "۳. مدت قرارداد",
        lines: [
          'الف. مدت قرارداد <span class="op-filled">۶ ماه</span> شمسی از تاریخ پرداخت اولین پیش پرداخت محاسبه خواهد شد.',
        ],
      },
    ],
  },
};

const doc = computed(() => (showFilled.value ? docs.filled : docs.smart));

watch(showFilled, async (val) => {
  slideDir.value = val ? "op-left" : "op-right";
  await nextTick();
  activeStep.value = val ? 2 : 1;
});
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.op {
  padding: rem(80) 0;
  background: $color-bg-primary;

  // ── Header ────────────────────────────────────────────────

  &__header {
    text-align: center;
    max-width: rem(900);
    margin: 0 auto rem(48);
  }

  &__title {
    font-size: clamp(rem(26), 4vw, rem(40));
    font-weight: $font-weight-bold;
    line-height: 1.3;
    margin-bottom: $spacing-lg;
  }

  &__subtitle {
    font-size: rem(20);
    font-weight: $font-weight-semibold;
    color: $color-text-faded;
    line-height: 1.7;
    margin-bottom: rem(36);
  }

  // ── Toggle ────────────────────────────────────────────────

  &__toggle {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: rem(8) rem(18);
    background: $color-surface-hover;
    border: 1px solid $color-border-subtle;
    border-radius: $radius-full;
  }

  &__toggle-label {
    font-size: $font-size-sm;
    color: $color-text-muted;
    font-weight: $font-weight-medium;
    user-select: none;
    transition: color $transition-fast $ease-standard;

    &--on {
      color: $color-text-primary;
      font-weight: $font-weight-semibold;
    }
  }

  // Toggle switch
  &__switch {
    position: relative;
    display: inline-block;
    width: rem(44);
    height: rem(24);
    cursor: pointer;
  }
  &__switch-input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    &:checked + .op__switch-track {
      background: $color-accent-primary;
    }
    &:checked + .op__switch-track::before {
      transform: translateX(20px);
    }
  }
  &__switch-track {
    position: absolute;
    inset: 0;
    background: $color-surface-bright;
    border-radius: $radius-full;
    transition: background $transition-fast $ease-standard;
    &::before {
      content: "";
      position: absolute;
      width: rem(18);
      height: rem(18);
      left: rem(3);
      bottom: rem(3);
      background: $color-text-primary;
      border-radius: $radius-full;
      transition: transform 0.3s $ease-standard;
    }
  }

  // ── Browser shell ─────────────────────────────────────────

  &__browser {
    border-radius: $radius-lg;
    overflow: hidden;
    border: 1px solid $color-border-medium;
    box-shadow:
      0 rem(32) rem(80) rgba(0, 0, 0, 0.55),
      0 0 0 1px $color-border-subtle;
  }

  &__chrome {
    display: flex;
    align-items: center;
    gap: rem(10);
    padding: rem(12) rem(16);
    background: $color-bg-tertiary;
    border-bottom: 1px solid $color-border-subtle;
  }

  &__chrome-dots {
    display: flex;
    gap: rem(6);
    flex-shrink: 0;
  }

  &__dot {
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

  &__chrome-icon {
    color: $color-text-muted;
    flex-shrink: 0;
  }

  &__chrome-url {
    display: flex;
    align-items: center;
    gap: rem(5);
    flex: 1;
    justify-content: center;
    max-width: rem(320);
    margin: 0 auto;
    padding: rem(4) rem(12);
    background: $color-bg-secondary;
    border: 1px solid $color-border-subtle;
    border-radius: $radius-sm;
    color: $color-text-tertiary;
    font-size: rem(11);
    white-space: nowrap;
  }

  &__chrome-actions {
    display: flex;
    gap: rem(8);
    color: $color-text-muted;
    opacity: 0.6;
  }

  // ── Screen ────────────────────────────────────────────────

  &__screen {
    padding: rem(24) rem(32) rem(32);
    background: $color-bg-secondary;
    direction: rtl;
    min-height: rem(520);
  }

  // ── Steps ─────────────────────────────────────────────────

  &__steps {
    display: flex;
    justify-content: center;
    margin-bottom: rem(28);
    direction: rtl;
  }

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
    padding: rem(6) rem(4);

    &-line {
      position: absolute;
      top: rem(18);
      left: -50%;
      width: 100%;
      height: 0;
      border-top: 1.5px dashed rgba(255, 255, 255, 0.15);
      z-index: 0;
    }

    &--active .op__step-line {
      border-color: $color-border-primary;
    }
    &--completed .op__step-line {
      border-color: $color-border-primary;
      border-style: solid;
    }

    &--active .op__step-title {
      color: $color-text-primary;
    }
    &--completed .op__step-title {
      color: $color-text-secondary;
    }
    &--pending .op__step-title {
      color: $color-text-muted;
    }
  }

  &__step-circle {
    width: rem(28);
    height: rem(28);
    border-radius: $radius-full;
    border: 1.5px solid $color-border-medium;
    background: $color-bg-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    margin-bottom: rem(6);
    transition:
      background $transition-fast $ease-standard,
      border-color $transition-fast $ease-standard;

    .op__step--completed & {
      background: $color-success;
      border-color: $color-success;
    }
    .op__step--active & {
      border-color: $color-accent-primary;
      background: $color-bg-tertiary;
    }
  }

  &__step-num {
    font-size: rem(10);
    font-weight: $font-weight-bold;
    color: $color-text-tertiary;
    .op__step--active & {
      color: $color-accent-primary;
    }
  }

  &__step-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(2);
    text-align: center;
  }
  &__step-title {
    font-size: rem(12);
    font-weight: $font-weight-semibold;
    line-height: 1.3;
    transition: color $transition-fast $ease-standard;
  }
  &__step-desc {
    font-size: rem(10);
    color: $color-text-muted;
  }

  // ── Document ──────────────────────────────────────────────

  &__doc {
    direction: rtl;
  }

  &__doc-header {
    text-align: center;
    padding-bottom: rem(16);
    margin-bottom: rem(20);
    border-bottom: 1px solid $color-border-subtle;
  }

  &__doc-title {
    font-size: rem(15);
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: rem(6);
  }
  &__doc-sub {
    font-size: rem(11);
    color: $color-text-tertiary;
  }
  &__doc-link {
    color: $color-accent-primary;
  }

  &__doc-body {
    font-size: rem(13);
    line-height: 1.85;
    color: $color-text-secondary;
  }
  &__doc-section {
    margin-bottom: rem(14);
  }
  &__doc-section-title {
    font-weight: $font-weight-bold;
    font-size: rem(12);
    color: $color-text-primary;
    margin-bottom: rem(6);
  }
  &__doc-line {
    margin-bottom: rem(4);
    text-align: right;
  }
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

.op-left-enter-active,
.op-right-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.op-left-leave-active,
.op-right-leave-active {
  transition:
    opacity 0.18s ease-in,
    transform 0.18s ease-in;
  pointer-events: none;
}
.op-left-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
.op-left-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.op-right-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.op-right-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(md) {
  .op {
    padding: rem(60) 0;
    &__subtitle {
      font-size: $font-size-lg;
    }
    &__screen {
      padding: rem(20) rem(20) rem(24);
      min-height: rem(440);
    }
    &__step-desc {
      display: none;
    }
  }
}

@include respond-to(sm) {
  .op {
    padding: rem(48) 0;
    &__subtitle {
      font-size: $font-size-md;
    }
    &__screen {
      padding: rem(14) rem(10) rem(16);
      min-height: rem(400);
    }
    &__chrome-url {
      font-size: rem(9);
      max-width: rem(160);
    }
    &__chrome-actions {
      display: none;
    }
    &__step-circle {
      width: rem(22);
      height: rem(22);
    }
    &__step-desc {
      display: none;
    }
    &__step-title {
      font-size: rem(9);
    }
    &__doc-body {
      font-size: rem(10.5);
    }
  }
}
</style>
