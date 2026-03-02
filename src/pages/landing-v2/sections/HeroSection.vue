<template>
  <section class="hero" ref="sectionRef">
    <div class="hero__icons" aria-hidden="true">
      <img
        src="@/assets/images/landing/float-icon-1.svg?url"
        alt=""
        class="hero__icon hero__icon--1"
      />
      <img
        src="@/assets/images/landing/float-icon-2.svg?url"
        alt=""
        class="hero__icon hero__icon--2"
      />
      <img
        src="@/assets/images/landing/float-icon-3.svg?url"
        alt=""
        class="hero__icon hero__icon--3"
      />
      <img
        src="@/assets/images/landing/float-icon-4.svg?url"
        alt=""
        class="hero__icon hero__icon--4"
      />
      <img
        src="@/assets/images/landing/float-icon-5.svg?url"
        alt=""
        class="hero__icon hero__icon--5"
      />
      <img
        src="@/assets/images/landing/float-icon-6.svg?url"
        alt=""
        class="hero__icon hero__icon--6"
      />
      <img
        src="@/assets/images/landing/float-icon-7.svg?url"
        alt=""
        class="hero__icon hero__icon--7"
      />
      <img
        src="@/assets/images/landing/float-icon-8.svg?url"
        alt=""
        class="hero__icon hero__icon--8"
      />
      <img
        src="@/assets/images/landing/float-icon-9.svg?url"
        alt=""
        class="hero__icon hero__icon--9"
      />
      <img
        src="@/assets/images/landing/float-icon-10.svg?url"
        alt=""
        class="hero__icon hero__icon--10"
      />
    </div>

    <div class="lv2-container">
      <div class="hero__content">
        <div class="hero__badge" v-bind="anim(1)">
          <span class="hero__badge-pill">
            <img
              src="@/assets/ui/green-dot.svg?url"
              alt=""
              aria-hidden="true"
              class="hero__badge-dot"
            />
            <span>چه خبر؟</span>
          </span>
          <span>از امروز لیست انتظار باز است</span>
        </div>

        <h1 class="hero__title" v-bind="anim(2)">
          قراردادهای خود را <span class="lv2-highlight">دقیق</span> و<br />
          <span class="lv2-highlight"> بدون ابهام </span>
          تنظیم کنید.
        </h1>

        <p class="hero__description" v-bind="anim(3)">
          در <span class="lv2-highlight">زونکن</span> به قالب‌های استاندارد
          حقوقی دسترسی دارید، اطلاعات موردنیاز را وارد می‌کنید<br />
          و قرارداد شما در یک مسیر مشخص و شفاف تنظیم می‌شود.
        </p>

        <div class="hero__form" v-bind="anim(4)">
          <EmailForm
            button-text="پیوستن به لیست انتظار"
            note="دسترسی عمومی در مرحله‌ی رونمایی فعال می‌شود.<br>
در حال حاضر، استفاده از <span class='lv2-highlight'>زونکن</span> از طریق دعوتنامه انجام می‌شود."
          />
        </div>
      </div>
    </div>

    <!-- Demo browser -->
    <div class="hero__demo-wrap">
      <div class="hero__demo" ref="demoRef" v-bind="anim(6)">
        <div class="hero__demo-label">
          <span>قرارداد شما، مرحله به مرحله</span>
          <img
            src="@/assets/images/landing/approval.svg?url"
            class="hero__demo-icon"
            alt=""
            aria-hidden="true"
          />
        </div>
        <BrowserMockup
          :url="historyUrl"
          :display-url="displayUrl"
          theme="light"
          height="41rem"
          @navigate="onBrowserNavigate"
        >
          <ContractFlow ref="contractFlowRef" @url-change="onUrlChange" />
        </BrowserMockup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import EmailForm from "../components/EmailForm.vue";
import BrowserMockup from "@/components/base/BrowserMockup.vue";
import ContractFlow from "../components/ContractFlow/ContractFlow.vue";

const sectionRef = ref(null);
const { reveal } = useScrollAnimation(sectionRef, 0);
function anim(n) {
  return reveal(n);
}

const historyUrl = ref("zoonkan.com/templates/");
const displayUrl = ref("");
const contractFlowRef = ref(null);
const demoRef = ref(null);

let typeTimer = null;
function typeUrl(target) {
  clearTimeout(typeTimer);
  displayUrl.value = "";
  let i = 0;
  const tick = () => {
    displayUrl.value = target.slice(0, i);
    i++;
    if (i <= target.length) {
      typeTimer = setTimeout(tick, 38 + Math.random() * 22);
    }
  };
  typeTimer = setTimeout(tick, 300);
}

function onUrlChange(url) {
  historyUrl.value = url;
  typeUrl(url);
}

function onBrowserNavigate(url) {
  clearTimeout(typeTimer);
  displayUrl.value = url;
  historyUrl.value = url;
  contractFlowRef.value?.navigateTo?.(url);
}

let hasTyped = false;

onMounted(() => {
  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && !hasTyped) {
        hasTyped = true;
        typeUrl(historyUrl.value);
      }
    },
    { threshold: 0.1 },
  );
  if (demoRef.value) obs.observe(demoRef.value);
  onUnmounted(() => obs.disconnect());
});
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

.hero {
  padding-top: rem(145);
  background: $color-bg-primary;
  position: relative;
  overflow: clip;

  &__icons {
    position: absolute;
    inset: 0;
    max-width: rem(1400);
    margin-left: auto;
    margin-right: auto;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  &__icon {
    position: absolute;
    --sz: 60px;
    width: var(--sz);
    height: var(--sz);
    animation: lv2-float 18s infinite ease-in-out;

    &--1 {
      top: 12%;
      left: 11%;
      animation-duration: 30s;
      animation-delay: -4s;
    }
    &--2 {
      top: 25%;
      left: 7%;
      animation-duration: 38s;
      animation-delay: -16s;
    }
    &--3 {
      top: 18%;
      left: 17%;
      animation-duration: 32s;
      animation-delay: -28s;
    }
    &--4 {
      top: 9%;
      left: 22%;
      animation-duration: 42s;
      animation-delay: -10s;
    }
    &--5 {
      top: 9%;
      right: 20%;
      animation-duration: 34s;
      animation-delay: -22s;
    }
    &--6 {
      top: 19%;
      right: 18%;
      animation-duration: 44s;
      animation-delay: -34s;
      --rotation: -14deg;
    }
    &--7 {
      top: 29%;
      right: 22%;
      animation-duration: 36s;
      animation-delay: -6s;
    }
    &--8 {
      top: 13%;
      right: 9%;
      animation-duration: 48s;
      animation-delay: -40s;
      --rotation: -18deg;
    }
    &--9 {
      top: 26%;
      right: 8%;
      animation-duration: 28s;
      animation-delay: -14s;
      --rotation: 16deg;
    }
    &--10 {
      top: 29%;
      left: 21%;
      animation-duration: 32s;
      animation-delay: -26s;
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: rem(760);
    margin: 0 auto;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: rem(8);
    padding: rem(10);
    border: 1px solid $color-border-primary;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    margin-bottom: $spacing-lg;
  }

  &__badge-pill {
    display: inline-flex;
    align-items: center;
    gap: rem(6);
    padding: rem(6) rem(12);
    color: $color-text-secondary;
    border: 1px solid $color-border-primary;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
  }

  &__badge-dot {
    width: rem(10);
    height: rem(10);
    display: block;
    animation: badge-pulse 2.2s ease-in-out infinite;
  }

  &__title {
    font-size: clamp(rem(36), 6vw, rem(64));
    font-weight: $font-weight-bold;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
  }

  &__description {
    font-size: $font-size-lg;
    line-height: 1.8;
    color: $color-text-secondary;
    margin-bottom: rem(28);
  }

  &__note {
    font-size: $font-size-sm;
    color: $color-text-tertiary;
    margin-top: rem(14);
  }

  &__demo-wrap {
    position: relative;
    margin-top: rem(55);
  }

  &__demo {
    position: sticky;
    top: rem(60);
    z-index: 1;
    width: 100%;
    transform-origin: 50% 0%;
    will-change: transform;

    /* stylelint-disable property-no-unknown */
    max-width: 90vw;
    margin-left: auto;
    margin-right: auto;

    /* stylelint-disable property-no-unknown */
    animation: demo-scale linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
    /* stylelint-enable property-no-unknown */

    :deep(.bm) {
      /* stylelint-disable property-no-unknown */
      animation: demo-radius linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
      /* stylelint-enable property-no-unknown */
    }
  }

  &__demo-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8);
    direction: rtl;
    font-size: $font-size-3xl;
    font-weight: $font-weight-semibold;
    margin-bottom: rem(10);
    color: #fff;
  }

  &__demo-icon {
    height: rem(50);
    width: auto;
    flex-shrink: 0;
    display: block;
  }
}

@include respond-to(lg) {
  .hero {
    &__icon {
      --sz: 54px;
    }
  }
}

@include respond-to(md) {
  .hero {
    padding-top: rem(100);
    &__demo {
      margin-top: $spacing-2xl;
      max-width: 100%;
    }
    &__demo-label {
      font-size: $font-size-xl;
    }
    &__demo-icon {
      height: rem(38);
    }
    &__icons {
      display: none;
    }
  }
}

@include respond-to(sm) {
  .hero {
    padding-top: rem(90);
    padding-bottom: rem(10);

    &__content {
      max-width: 100%;
      margin-top: rem(30);
    }
    &__title {
      font-size: clamp(rem(28), 8vw, rem(44));
    }
    &__description {
      font-size: $font-size-md;
    }
    &__demo {
      margin-top: $spacing-xl;
      max-width: 100%;
    }
    &__demo-label {
      font-size: $font-size-md;
    }
    &__demo-icon {
      height: rem(28);
    }
  }
}

@keyframes demo-scale {
  0% {
    transform: scale(0.78);
  }
  40% {
    transform: scale(1);
  }
  60% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.78);
  }
}

@keyframes demo-radius {
  0% {
    border-radius: rem(20);
  }
  40% {
    border-radius: rem(20);
  }
  60% {
    border-radius: rem(20);
  }
  100% {
    border-radius: rem(20);
  }
}

@keyframes badge-pulse {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(23, 178, 106, 0.4));
  }
  50% {
    transform: scale(1.15);
    filter: drop-shadow(0 0 6px rgba(23, 178, 106, 0.6));
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(23, 178, 106, 0.4));
  }
}
</style>
