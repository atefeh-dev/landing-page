<template>
  <div class="sf">
    <!-- Header — outside the card, top of page -->
    <div class="sf__page-header">
      <h2 class="sf__title">اطلاعات {{ templateName }} را وارد کنید.</h2>
      <p class="sf__sub">اطلاعات زیر برای تنظیم نسخه نهایی استفاده می‌شود.</p>
    </div>

    <!-- White card — full width, scrollable fields inside -->
    <div class="sf__card">
      <div class="sf__fields">
        <div v-for="field in fields" :key="field.id" class="sf__field">
          <label class="sf__label">
            {{ field.label }}
            <span class="sf__req">
              <StarIcon class="sf__req-icon" />
            </span>
          </label>

          <BaseInputWithHint
            v-if="field.type === 'select'"
            :ref="(el) => setRef(field.id, el)"
            v-model="answers[field.id]"
            type="select"
            :placeholder="field.placeholder"
            :select-options="field.selectOptions"
            :error="errors[field.id]"
            @blur="validateField(field)"
          />

          <BaseInputWithHint
            v-else-if="field.type === 'textarea'"
            :ref="(el) => setRef(field.id, el)"
            v-model="answers[field.id]"
            type="textarea"
            :placeholder="field.placeholder"
            :rows="3"
            :error="errors[field.id]"
            @blur="validateField(field)"
          />

          <BaseInputWithHint
            v-else
            :ref="(el) => setRef(field.id, el)"
            v-model="answers[field.id]"
            :placeholder="field.placeholder"
            :tooltip="field.hint ?? ''"
            :error="errors[field.id]"
            @blur="validateField(field)"
          />
        </div>
      </div>
    </div>

    <!-- Footer — outside card, bottom of page -->
    <div class="sf__footer">
      <BaseButton
        variant="primary"
        size="md"
        :disabled="!allFilled"
        @click="submit"
      >
        تنظیم قرارداد
      </BaseButton>
      <button class="sf__back" type="button" @click="$emit('back')">
        بازگشت به مرحله‌ی قبل
        <RightArrowIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInputWithHint from "@/components/base/BaseInputWithHint.vue";
import StarIcon from "@/assets/icons/star.svg";
import RightArrowIcon from "@/assets/icons/right-arrow.svg";

const props = defineProps({ templateId: { type: String, required: true } });
const emit = defineEmits(["next", "back"]);

const templateNames = {
  NDA: "قالب NDA",
  collab: "قرارداد همکاری",
  mou: "تفاهم‌نامه",
};
const templateName = computed(() => templateNames[props.templateId] ?? "قالب");

// ── Validation rules ────────────────────────────────────────────
// Each rule: (value, allAnswers) => errorString | null
const rules = {
  // shared
  partyName: (v) => {
    if (!v) return "نام طرف را وارد کنید";
    if (v.length < 2) return "نام باید حداقل ۲ کاراکتر باشد";
    return null;
  },
  textarea: (v, label) => {
    if (!v) return `${label} را وارد کنید`;
    if (v.trim().length < 5) return "توضیحات باید حداقل ۵ کاراکتر باشد";
    return null;
  },
  select: (v, label) => {
    if (!v) return `${label} را انتخاب کنید`;
    return null;
  },
  duration: (v) => {
    if (!v) return "مدت زمان را وارد کنید";
    if (v.trim().length < 2) return "مدت زمان معتبر نیست";
    return null;
  },
  fee: (v) => {
    if (!v) return "مبلغ قرارداد را وارد کنید";
    // accept persian/arabic digits too
    const normalized = v
      .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
      .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632));
    if (!/\d/.test(normalized)) return "مبلغ باید شامل عدد باشد";
    return null;
  },
  deadline: (v) => {
    if (!v) return "مهلت تحویل را وارد کنید";
    if (v.trim().length < 3) return "مهلت تحویل معتبر نیست";
    return null;
  },
};

// ── Fields + inline validator per field ─────────────────────────
const templateFields = {
  NDA: [
    {
      id: "party_a",
      label: "نام طرف افشاکننده",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "طرفی که اطلاعات محرمانه را افشا می‌کند",
      validate: (v) => rules.partyName(v),
    },
    {
      id: "party_b",
      label: "نام طرف دریافت‌کننده",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "طرفی که اطلاعات محرمانه را دریافت می‌کند",
      validate: (v, all) => {
        const base = rules.partyName(v);
        if (base) return base;
        if (v.trim() === all.party_a?.trim())
          return "طرف دریافت‌کننده نمی‌تواند همان طرف افشاکننده باشد";
        return null;
      },
    },
    {
      id: "subject",
      label: "عنوان محتوا",
      placeholder: "توضیح مختصر اطلاعات محرمانه",
      type: "textarea",
      validate: (v) => rules.textarea(v, "عنوان محتوا"),
    },
    {
      id: "has_content",
      label: "عنوان محتوای قابل انتخاب",
      placeholder: "انتخاب کنید",
      type: "select",
      selectOptions: ["دارد", "ندارد"],
      validate: (v) => rules.select(v, "این گزینه"),
    },
    {
      id: "duration",
      label: "مدت زمان تعهد",
      placeholder: "مثلاً ۲ سال",
      type: "text",
      hint: "مدت زمانی که تعهد عدم افشا برقرار است",
      validate: rules.duration,
    },
  ],
  collab: [
    {
      id: "party_a",
      label: "نام کارفرما",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "شخص یا شرکت سفارش‌دهنده پروژه",
      validate: (v) => rules.partyName(v),
    },
    {
      id: "party_b",
      label: "نام پیمانکار",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "شخص یا شرکت انجام‌دهنده پروژه",
      validate: (v, all) => {
        const base = rules.partyName(v);
        if (base) return base;
        if (v.trim() === all.party_a?.trim())
          return "پیمانکار نمی‌تواند همان کارفرما باشد";
        return null;
      },
    },
    {
      id: "project",
      label: "عنوان پروژه",
      placeholder: "توضیح مختصر پروژه",
      type: "textarea",
      validate: (v) => rules.textarea(v, "عنوان پروژه"),
    },
    {
      id: "fee",
      label: "مبلغ قرارداد",
      placeholder: "مثلاً ۵۰ میلیون تومان",
      type: "text",
      hint: "مبلغ کل قرارداد به تومان",
      validate: rules.fee,
    },
    {
      id: "deadline",
      label: "مهلت تحویل",
      placeholder: "مثلاً ۳ ماه یا ۱۴۰۳/۰۶/۳۱",
      type: "text",
      hint: "تاریخ یا مدت زمان تحویل نهایی",
      validate: rules.deadline,
    },
  ],
  mou: [
    {
      id: "party_a",
      label: "نام طرف اول",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "اولین طرف تفاهم‌نامه",
      validate: (v) => rules.partyName(v),
    },
    {
      id: "party_b",
      label: "نام طرف دوم",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "دومین طرف تفاهم‌نامه",
      validate: (v, all) => {
        const base = rules.partyName(v);
        if (base) return base;
        if (v.trim() === all.party_a?.trim())
          return "طرف دوم نمی‌تواند همان طرف اول باشد";
        return null;
      },
    },
    {
      id: "purpose",
      label: "هدف همکاری",
      placeholder: "توضیح مختصر هدف همکاری",
      type: "textarea",
      validate: (v) => rules.textarea(v, "هدف همکاری"),
    },
    {
      id: "duration",
      label: "مدت تفاهم‌نامه",
      placeholder: "مثلاً ۱ سال",
      type: "text",
      hint: "مدت زمان اعتبار تفاهم‌نامه",
      validate: rules.duration,
    },
  ],
};

const fields = computed(
  () => templateFields[props.templateId] ?? templateFields.NDA,
);
const answers = ref({});
const errors = ref({});
const inputRefs = ref({});

// Watch answers live — revalidate ALL touched fields, clearing errors when fixed
watch(
  answers,
  (vals) => {
    const updated = { ...errors.value };
    fields.value.forEach((f) => {
      if (inputRefs.value[f.id]?.isTouched?.()) {
        const err = f.validate?.(vals[f.id]?.toString().trim() ?? "", vals);
        if (err) {
          updated[f.id] = err; // set / update error
        } else {
          delete updated[f.id]; // clear error when field is now valid
        }
      }
    });
    errors.value = updated;
  },
  { deep: true },
);

function setRef(id, el) {
  if (el) inputRefs.value[id] = el;
}

// Validate a single field immediately on blur
function validateField(field) {
  const val = answers.value[field.id]?.toString().trim() ?? "";
  const err = field.validate?.(val, answers.value);
  if (err) {
    errors.value = { ...errors.value, [field.id]: err };
  } else {
    const updated = { ...errors.value };
    delete updated[field.id];
    errors.value = updated;
  }
}

function validate() {
  const newErrors = {};
  fields.value.forEach((f) => {
    const err = f.validate?.(
      answers.value[f.id]?.toString().trim() ?? "",
      answers.value,
    );
    if (err) newErrors[f.id] = err;
  });
  errors.value = newErrors;
  Object.values(inputRefs.value).forEach((el) => el?.touch?.());
  return Object.keys(newErrors).length === 0;
}

function submit() {
  if (validate()) emit("next", answers.value);
}

const allFilled = computed(() =>
  fields.value.every(
    (f) =>
      !f.validate?.(
        answers.value[f.id]?.toString().trim() ?? "",
        answers.value,
      ),
  ),
);
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;

$color-title: #181d27;
$color-subtitle: #535862;
$color-lable: #414651;

.sf {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  direction: rtl;
  overflow: hidden;

  // ── Page header — gray area above the card ──────────────────────
  &__page-header {
    flex-shrink: 0;
    padding: rem(20) rem(28) rem(16);
    text-align: right;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-title;
    margin-bottom: rem(4);
  }

  &__sub {
    font-size: $font-size-lg;
    color: $color-subtitle;
  }

  // ── White card — 30px margins, 12px radius ─────────────────────
  &__card {
    flex: 1;
    background: #fff;
    border: 1px solid #e4e7ec;
    border-radius: rem(12);
    margin: 0 rem(30) rem(16);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  // ── Scrollable fields inside card ───────────────────────────────
  &__fields {
    flex: 1;
    overflow-y: auto;
    padding: rem(20) rem(28);
    display: flex;
    flex-direction: column;
    gap: rem(8);

    &::-webkit-scrollbar {
      width: rem(4);
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #e4e7ec;
      border-radius: rem(4);
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: rem(5);
  }

  &__label {
    display: inline-flex;
    align-items: center;
    gap: rem(4);
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-lable;
  }

  &__req {
    display: inline-flex;
    position: relative;
    top: -2px;
    align-items: center;
    &-icon {
      color: $color-accent-primary;
      flex-shrink: 0;
    }
  }

  &__hint {
    font-size: rem(12);
    color: #98a2b3;
    text-align: right;
  }

  // ── Footer — outside card, 30px side padding matches card margin
  &__footer {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: rem(4) rem(30) rem(16);
  }

  &__back {
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: rem(4);
    background: none;
    border: none;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
    transition: color 0.15s ease;
    &:hover {
      color: #344054;
    }
  }
}
</style>
