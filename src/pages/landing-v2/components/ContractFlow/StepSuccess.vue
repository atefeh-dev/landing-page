<template>
  <div class="ss">
    <div class="ss__check">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="#DCFAE6" />
        <path
          d="M8.5 14L12 17.5L19.5 10"
          stroke="#17B26A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <h2 class="ss__title">{{ templateName }} شما آماده است.</h2>
    <p class="ss__sub">
      نسخه نهایی قرارداد به نشانی ایمیل شما ارسال شد.<br />
      ممکن است دریافت ایمیل چند دقیقه زمان ببرد.
    </p>

    <div class="ss__pdfs">
      <div
        v-for="(item, i) in pdfItems"
        :key="i"
        class="ss__pdf"
        :class="`ss__pdf--${i}`"
      >
        <svg width="36" height="44" viewBox="0 0 40 48" fill="none">
          <rect
            x="1"
            y="1"
            width="38"
            height="46"
            rx="5"
            :fill="item.fill"
            :stroke="item.stroke"
            stroke-width="1"
          />
          <path
            d="M10 16H30M10 22H30M10 28H22"
            :stroke="item.text"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <span class="ss__pdf-label">PDF</span>
      </div>
    </div>

    <button class="ss__cta" @click="$emit('close')">بستن</button>
  </div>
</template>

<script setup>
const props = defineProps({ templateId: { type: String, default: "NDA" } });
defineEmits(["close"]);

const names = { NDA: "قالب NDA", collab: "قرارداد همکاری", mou: "تفاهم‌نامه" };
const templateName = names[props.templateId] ?? "قرارداد";

const pdfItems = [
  { fill: "#FFF1F0", stroke: "#FECDCA", text: "#F97066" },
  { fill: "#FFF1F0", stroke: "#FECDCA", text: "#F97066" },
  { fill: "#EF4444", stroke: "#F97066", text: "#fff" },
  { fill: "#FFF1F0", stroke: "#FECDCA", text: "#F97066" },
  { fill: "#FFF1F0", stroke: "#FECDCA", text: "#F97066" },
];
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

.ss {
  background: #fff;
  border-radius: rem(16);
  padding: rem(32) rem(28) rem(28);
  direction: rtl;
  text-align: center;
  width: rem(400);
  max-width: 100%;
  box-shadow: 0 rem(4) rem(24) rgba(0, 0, 0, 0.08);

  &__check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: rem(52);
    height: rem(52);
    border-radius: 50%;
    background: #dcfae6;
    margin-bottom: rem(14);
  }

  &__title {
    font-size: rem(16);
    font-weight: 700;
    color: #101828;
    margin-bottom: rem(8);
  }

  &__sub {
    font-size: rem(13);
    color: #667085;
    line-height: 1.7;
    margin-bottom: rem(20);
  }

  &__pdfs {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: rem(24);
    height: rem(56);
    position: relative;
  }

  &__pdf {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(3);
    position: absolute;

    &--0 {
      transform: translateX(rem(64)) rotate(-12deg) scale(0.82);
      opacity: 0.55;
    }
    &--1 {
      transform: translateX(rem(32)) rotate(-6deg) scale(0.9);
      opacity: 0.72;
    }
    &--2 {
      transform: translateY(rem(-6)) scale(1.05);
      z-index: 1;
      opacity: 1;
    }
    &--3 {
      transform: translateX(rem(-32)) rotate(6deg) scale(0.9);
      opacity: 0.72;
    }
    &--4 {
      transform: translateX(rem(-64)) rotate(12deg) scale(0.82);
      opacity: 0.55;
    }
  }

  &__pdf-label {
    font-size: rem(8);
    font-weight: 700;
    color: #98a2b3;
    letter-spacing: 0.05em;
  }

  &__cta {
    width: 100%;
    padding: rem(11) rem(20);
    border-radius: rem(8);
    border: 1.5px solid #e4e7ec;
    background: #fff;
    color: #344054;
    font-size: rem(14);
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;
    &:hover {
      background: #f9fafb;
      border-color: #d0d5dd;
    }
  }
}
</style>
