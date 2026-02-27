<template>
  <div class="ss">
    <!-- Inlined SVG so CSS can target the paths directly -->
    <div class="ss__check">
      <svg
        class="ss__check-svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          class="ss__check-bg"
          d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
          fill="#DCFAE6"
        />
        <path
          class="ss__check-circle"
          d="M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z"
          stroke="#079455"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
        <path
          class="ss__check-mark"
          d="M19.5 24L22.5 27L28.5 21"
          stroke="#079455"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
      </svg>
    </div>

    <h2 class="ss__title">{{ templateName }} شما آماده است.</h2>
    <p class="ss__sub">
      نسخه نهایی قرارداد به نشانی ایمیل شما ارسال شد.<br />
      ممکن است دریافت ایمیل چند دقیقه زمان ببرد.
    </p>

    <div class="ss__pdfs">
      <GroupPDFIcon />
    </div>

    <BaseButton
      variant="secondary"
      size="lg"
      class="ss__cta"
      @click="$emit('close')"
    >
      بستن
    </BaseButton>
  </div>
</template>

<script setup>
import GroupPDFIcon from "@/assets/icons/group-pdf.svg";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({ templateId: { type: String, default: "NDA" } });
defineEmits(["close"]);

const names = { NDA: "قالب NDA", collab: "قرارداد همکاری", mou: "تفاهم‌نامه" };
const templateName = names[props.templateId] ?? "قرارداد";
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;

// ── Card ──────────────────────────────────────────────────────────
.ss {
  background: #fff;
  border-radius: rem(16);
  padding: rem(32) rem(28) rem(28);
  direction: rtl;
  text-align: center;
  width: rem(400);
  max-width: 100%;
  box-shadow: 0 rem(4) rem(24) rgba(0, 0, 0, 0.08);
}

// ── Check icon wrapper — spring pop ──────────────────────────────
.ss__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: rem(16);
  opacity: 0;
  animation: ss-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0s forwards;
}

// ── Circle draws itself ───────────────────────────────────────────
.ss__check-circle {
  stroke-dasharray: 64; // circumference of r=10 circle ≈ 62.8
  stroke-dashoffset: 64;
  animation: ss-draw 0.5s ease-out 0.2s forwards;
}

// ── Checkmark draws after circle ─────────────────────────────────
.ss__check-mark {
  stroke-dasharray: 13; // sqrt(18)+sqrt(72) ≈ 12.7
  stroke-dashoffset: 13;
  animation: ss-draw 0.3s ease-out 0.6s forwards;
}

// ── Title ─────────────────────────────────────────────────────────
.ss__title {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: #181d27;
  margin-bottom: rem(8);
  opacity: 0;
  animation: ss-rise 0.4s ease 0.35s forwards;
}

// ── Subtitle ──────────────────────────────────────────────────────
.ss__sub {
  font-size: $font-size-sm;
  color: #535862;
  line-height: 1.7;
  margin-bottom: rem(20);
  opacity: 0;
  animation: ss-rise 0.4s ease 0.45s forwards;
}

// ── PDF group ─────────────────────────────────────────────────────
.ss__pdfs {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: rem(30);
  margin-bottom: rem(30);
  position: relative;
  opacity: 0;
  animation: ss-rise 0.4s ease 0.55s forwards;
}

// ── Close button ──────────────────────────────────────────────────
.ss__cta {
  width: 100%;
  opacity: 0;
  animation: ss-rise 0.4s ease 0.65s forwards;
}

// ── Keyframes ─────────────────────────────────────────────────────
@keyframes ss-pop {
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ss-rise {
  0% {
    opacity: 0;
    transform: translateY(rem(10));
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ss-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@media (max-width: 600px) {
  .ss {
    padding: rem(24) rem(16) rem(20);
    &__title {
      font-size: rem(15);
    }
    &__sub {
      font-size: rem(12);
    }
    &__pdfs {
      margin-top: rem(24);
      margin-bottom: rem(16);
    }
  }
}

@media (max-width: 600px) {
  .ss {
    padding: rem(24) rem(16) rem(18);
    width: 100%;
    &__title {
      font-size: rem(14);
    }
    &__sub {
      font-size: rem(12);
    }
    &__pdfs {
      margin-top: rem(20);
      margin-bottom: rem(20);
    }
  }
}
</style>
