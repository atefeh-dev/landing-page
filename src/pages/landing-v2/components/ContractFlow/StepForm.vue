<template>
  <div class="sf">
    <div class="sf__header">
      <h2 class="sf__title">اطلاعات {{ templateName }} را وارد کنید</h2>
      <p class="sf__sub">اطلاعات زیر برای تنظیم نسخه نهایی استفاده می‌شود.</p>
    </div>

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
          v-model="answers[field.id]"
          type="select"
          :placeholder="field.placeholder"
        >
          <template #options>
            <option v-for="opt in field.options" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </template>
        </BaseInputWithHint>

        <BaseInput
          v-else-if="field.type === 'textarea'"
          v-model="answers[field.id]"
          type="textarea"
          :placeholder="field.placeholder"
          :rows="3"
        />

        <BaseInputWithHint
          v-else
          v-model="answers[field.id]"
          :placeholder="field.placeholder"
          :tooltip="field.hint ?? ''"
        />
      </div>
    </div>

    <div class="sf__footer">
      <button class="sf__back" type="button" @click="$emit('back')">
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
      <BaseButton
        variant="primary"
        size="md"
        :disabled="!allFilled"
        @click="$emit('next', answers)"
      >
        تنظیم قرارداد
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInputWithHint from "@/components/base/BaseInputWithHint.vue";
import StarIcon from "@/assets/icons/star.svg";

const props = defineProps({ templateId: { type: String, required: true } });
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
      hint: "طرفی که اطلاعات محرمانه را افشا می‌کند",
    },
    {
      id: "party_b",
      label: "نام طرف دریافت‌کننده",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "طرفی که اطلاعات محرمانه را دریافت می‌کند",
    },
    {
      id: "subject",
      label: "عنوان محتوا",
      placeholder: "متن پاسخ برای محتوا ...",
      type: "textarea",
    },
    {
      id: "has_content",
      label: "عنوان محتوای قابل انتخاب",
      placeholder: "دارد",
      type: "select",
      options: ["دارد", "ندارد"],
    },
    {
      id: "duration",
      label: "مدت زمان تعهد",
      placeholder: "مثلاً ۲ سال",
      type: "text",
      hint: "مدت زمانی که تعهد عدم افشا برقرار است",
    },
  ],
  collab: [
    {
      id: "party_a",
      label: "نام کارفرما",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "شخص یا شرکت سفارش‌دهنده پروژه",
    },
    {
      id: "party_b",
      label: "نام پیمانکار",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "شخص یا شرکت انجام‌دهنده پروژه",
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
      hint: "مبلغ کل قرارداد به تومان",
    },
    {
      id: "deadline",
      label: "مهلت تحویل",
      placeholder: "تاریخ یا مدت زمان",
      type: "text",
      hint: "تاریخ یا مدت زمان تحویل نهایی",
    },
  ],
  mou: [
    {
      id: "party_a",
      label: "نام طرف اول",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "اولین طرف تفاهم‌نامه",
    },
    {
      id: "party_b",
      label: "نام طرف دوم",
      placeholder: "نام شخص یا شرکت",
      type: "text",
      hint: "دومین طرف تفاهم‌نامه",
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
      hint: "مدت زمان اعتبار تفاهم‌نامه",
    },
  ],
};

const fields = computed(
  () => templateFields[props.templateId] ?? templateFields.NDA,
);
const answers = ref({});
const allFilled = computed(() =>
  fields.value.every((f) => answers.value[f.id]?.toString().trim()),
);
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

.sf {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  direction: rtl;
  overflow: hidden;

  &__header {
    padding: rem(24) rem(28) rem(16);
    border-bottom: 1px solid #f2f4f7;
  }

  &__title {
    font-size: rem(17);
    font-weight: 700;
    color: #101828;
    margin-bottom: rem(4);
    text-align: right;
  }

  &__sub {
    font-size: rem(13);
    color: #667085;
    text-align: right;
  }

  &__fields {
    flex: 1;
    overflow-y: auto;
    padding: rem(20) rem(28);
    display: flex;
    flex-direction: column;
    gap: rem(16);

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
    font-size: rem(13);
    font-weight: 600;
    color: #344054;
    text-align: right;
  }

  &__req {
    display: inline-flex;
    position: relative;
    top: -12%;
    align-items: center;
    &-icon {
      color: $color-accent-primary;
      flex-shrink: 0;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(14) rem(28) rem(18);
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
    transition: color 0.15s ease;
    &:hover {
      color: #344054;
    }
  }
}
</style>
