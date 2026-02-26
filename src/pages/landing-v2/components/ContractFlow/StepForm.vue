<template>
  <div class="sf">
    <div class="sf__header">
      <h2 class="sf__title">اطلاعات {{ templateName }} را وارد کنید</h2>
      <p class="sf__sub">اطلاعات زیر برای تنظیم نسخه نهایی استفاده می‌شود.</p>
    </div>

    <div class="sf__fields">
      <div v-for="field in fields" :key="field.id" class="sf__field">
        <label class="sf__label"
          >{{ field.label }} <span class="sf__req">*</span></label
        >
        <textarea
          v-if="field.type === 'textarea'"
          v-model="answers[field.id]"
          class="sf__textarea"
          :placeholder="field.placeholder"
          rows="3"
        />
        <div v-else-if="field.type === 'select'" class="sf__select-wrap">
          <select v-model="answers[field.id]" class="sf__select">
            <option value="" disabled>{{ field.placeholder }}</option>
            <option v-for="opt in field.options" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
          <svg
            class="sf__select-arrow"
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
          v-model="answers[field.id]"
          class="sf__input"
          :placeholder="field.placeholder"
        />
        <span v-if="field.hint" class="sf__hint">{{ field.hint }}</span>
      </div>
    </div>

    <div class="sf__footer">
      <button class="sf__back" @click="$emit('back')">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="#667085"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        بازگشت به مرحله‌ی قبل
      </button>
      <button
        class="sf__cta"
        :disabled="!allFilled"
        @click="$emit('next', answers)"
      >
        تنظیم قرارداد
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  templateId: { type: String, required: true },
});
defineEmits(["next", "back"]);

const templateNames = {
  NDA: "قالب NDA",
  collab: "قرارداد همکاری",
  mou: "تفاهم‌نامه",
};

const templateName = computed(() => templateNames[props.templateId] ?? "قالب");

const templateFields = {
  NDA: [
    {
      id: "party_a",
      label: "نام طرف افشاکننده",
      placeholder: "نام شخص یا شرکت",
      type: "text",
    },
    {
      id: "party_b",
      label: "نام طرف دریافت‌کننده",
      placeholder: "نام شخص یا شرکت",
      type: "text",
    },
    {
      id: "subject",
      label: "عنوان محتوا",
      placeholder: "متن پاسخ برای محتوا ...",
      type: "textarea",
      hint: "متن راهنمای محتوا در صورت وجود",
    },
    {
      id: "has_content",
      label: "عنوان محتوای قابل انتخاب",
      placeholder: "دارد",
      type: "select",
      options: ["دارد", "ندارد"],
      hint: "متن راهنمای محتوا در صورت وجود",
    },
    {
      id: "duration",
      label: "مدت زمان تعهد",
      placeholder: "مثلاً ۲ سال",
      type: "text",
    },
  ],
  collab: [
    {
      id: "party_a",
      label: "نام کارفرما",
      placeholder: "نام شخص یا شرکت",
      type: "text",
    },
    {
      id: "party_b",
      label: "نام پیمانکار",
      placeholder: "نام شخص یا شرکت",
      type: "text",
    },
    {
      id: "project",
      label: "عنوان پروژه",
      placeholder: "توضیح مختصر پروژه",
      type: "textarea",
    },
    {
      id: "fee",
      label: "مبلغ قرارداد",
      placeholder: "مثلاً ۵۰ میلیون تومان",
      type: "text",
    },
    {
      id: "deadline",
      label: "مهلت تحویل",
      placeholder: "تاریخ یا مدت زمان",
      type: "text",
    },
  ],
  mou: [
    {
      id: "party_a",
      label: "نام طرف اول",
      placeholder: "نام شخص یا شرکت",
      type: "text",
    },
    {
      id: "party_b",
      label: "نام طرف دوم",
      placeholder: "نام شخص یا شرکت",
      type: "text",
    },
    {
      id: "purpose",
      label: "هدف همکاری",
      placeholder: "توضیح مختصر هدف",
      type: "textarea",
    },
    {
      id: "duration",
      label: "مدت تفاهم‌نامه",
      placeholder: "مثلاً ۱ سال",
      type: "text",
    },
  ],
};

const fields = computed(
  () => templateFields[props.templateId] ?? templateFields.NDA,
);

const answers = ref({});

const allFilled = computed(() =>
  fields.value.every((f) => answers.value[f.id]?.trim?.()),
);
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

.sf {
  display: flex;
  flex-direction: column;
  width: rem(480);
  max-width: calc(100% - rem(32));
  max-height: calc(100% - rem(32));
  background: #fff;
  direction: rtl;
  border-radius: rem(16);
  overflow: hidden;
  box-shadow: 0 rem(4) rem(24) rgba(0, 0, 0, 0.08);
  box-shadow: 0 rem(4) rem(24) rgba(0, 0, 0, 0.08);

  &__header {
    padding: rem(24) rem(28) rem(16);
    text-align: right;
  }

  &__title {
    font-size: rem(17);
    font-weight: 700;
    color: #101828;
    margin-bottom: rem(4);
  }

  &__sub {
    font-size: rem(13);
    color: #667085;
  }

  &__fields {
    flex: 1;
    overflow-y: auto;
    padding: 0 rem(28) rem(16);
    display: flex;
    flex-direction: column;
    gap: rem(16);
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: rem(5);
  }

  &__label {
    font-size: rem(13);
    font-weight: 600;
    color: #344054;
    text-align: right;
  }

  &__req {
    color: #ef4444;
    margin-right: rem(2);
  }

  &__input,
  &__textarea,
  &__select {
    width: 100%;
    padding: rem(10) rem(12);
    border: 1.5px solid #d0d5dd;
    border-radius: rem(8);
    font-size: rem(14);
    font-family: inherit;
    color: #101828;
    background: #fff;
    text-align: right;
    resize: none;
    transition: border-color 0.15s ease;

    &::placeholder {
      color: #98a2b3;
    }
    &:focus {
      outline: none;
      border-color: #fcc015;
      box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.12);
    }
  }

  &__select-wrap {
    position: relative;
  }

  &__select {
    appearance: none;
    cursor: pointer;
    padding-left: rem(32);
  }

  &__select-arrow {
    position: absolute;
    left: rem(10);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  &__hint {
    font-size: rem(12);
    color: #98a2b3;
    text-align: right;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(16) rem(28) rem(20);
    border-top: 1px solid #f2f4f7;
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: rem(4);
    background: none;
    border: none;
    font-size: rem(13);
    color: #667085;
    cursor: pointer;
    font-family: inherit;
    padding: 0;

    &:hover {
      color: #344054;
    }
  }

  &__cta {
    padding: rem(10) rem(24);
    border-radius: rem(8);
    border: none;
    background: #fcc015;
    color: #101828;
    font-size: rem(14);
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }
}
</style>
