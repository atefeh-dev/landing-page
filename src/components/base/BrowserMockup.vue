<template>
  <div class="bm" :class="`bm--${theme}`" dir="ltr">
    <!-- ── Chrome bar ──────────────────────────────────────────── -->
    <div class="bm__chrome">
      <!-- LEFT: traffic lights + sidebar + back/forward -->
      <div class="bm__left">
        <div class="bm__lights">
          <span class="bm__light bm__light--red"></span>
          <span class="bm__light bm__light--yellow"></span>
          <span class="bm__light bm__light--green"></span>
        </div>

        <SidebarIcon class="bm__icon bm__icon--sidebar" />

        <button
          class="bm__nav-btn"
          :disabled="!canGoBack"
          :class="{ 'bm__nav-btn--disabled': !canGoBack }"
          @click="goBack"
        >
          <BackIcon class="bm__icon bm__icon--back" />
        </button>

        <button
          class="bm__nav-btn"
          :disabled="!canGoForward"
          :class="{ 'bm__nav-btn--disabled': !canGoForward }"
          @click="goForward"
        >
          <ForwardIcon class="bm__icon bm__icon--forward" />
        </button>
      </div>

      <!-- CENTER: absolutely positioned — URL always truly centered -->
      <div class="bm__center">
        <ShieldIcon class="bm__shield" />

        <div class="bm__url">
          <div class="bm__url-inner">
            <LockIcon class="bm__url-lock" />
            <span class="bm__url-text">{{
              props.displayUrl || currentUrl
            }}</span>
          </div>

          <button class="bm__reload-btn" @click="reload">
            <ReloadIcon
              class="bm__url-reload"
              :class="{ 'bm__url-reload--spin': reloading }"
            />
          </button>
        </div>
      </div>

      <!-- RIGHT: download + new tab + copy -->
      <div class="bm__right">
        <DownloadIcon class="bm__icon" />
        <ShareIcon class="bm__icon" />
        <PlusIcon class="bm__icon" />
        <CopyIcon class="bm__icon" />
      </div>
    </div>

    <!-- ── Content area ────────────────────────────────────────── -->
    <div class="bm__body" :style="contentStyle">
      <slot>
        <iframe
          v-if="src"
          :src="src"
          :title="iframeTitle"
          loading="lazy"
          class="bm__iframe"
          sandbox="allow-scripts allow-same-origin"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import SidebarIcon from "@/assets/icons/icon-sidebar-toggle.svg?component";
import BackIcon from "@/assets/icons/icon-arrow-back.svg?component";
import ForwardIcon from "@/assets/icons/icon-arrow-forward.svg?component";
import ShieldIcon from "@/assets/icons/icon-security.svg?component";
import LockIcon from "@/assets/icons/icon-lock.svg?component";
import ReloadIcon from "@/assets/icons/icon-refresh.svg?component";
import DownloadIcon from "@/assets/icons/icon-download.svg?component";
import PlusIcon from "@/assets/icons/plus.svg?component";
import CopyIcon from "@/assets/icons/copy.svg?component";
import ShareIcon from "@/assets/icons/icon-share.svg?component";

const props = defineProps({
  url: { type: String, default: "zoonkan.com/template/NDA" },
  displayUrl: { type: String, default: "" },
  src: { type: String, default: "" },
  iframeTitle: { type: String, default: "نمایش زونکن" },
  height: { type: String, default: "520px" },
  theme: { type: String, default: "light" },
});

const emit = defineEmits(["navigate"]);

// ── History stack ─────────────────────────────────────────────────
const history = ref([props.url]);
const historyIdx = ref(0);
const reloading = ref(false);
let internalNav = false;

const currentUrl = computed(() => history.value[historyIdx.value]);
const canGoBack = computed(() => historyIdx.value > 0);
const canGoForward = computed(
  () => historyIdx.value < history.value.length - 1,
);

// When ContractFlow emits url-change → push to history
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl === currentUrl.value) return;
    history.value = history.value.slice(0, historyIdx.value + 1);
    history.value.push(newUrl);
    historyIdx.value = history.value.length - 1;
  },
);

function goBack() {
  if (!canGoBack.value) return;
  historyIdx.value--;
  internalNav = true;
  emit("navigate", currentUrl.value);
}

function goForward() {
  if (!canGoForward.value) return;
  historyIdx.value++;
  internalNav = true;
  emit("navigate", currentUrl.value);
}

async function reload() {
  reloading.value = true;
  await new Promise((r) => setTimeout(r, 600));
  reloading.value = false;
}

const contentStyle = computed(() => ({
  height: props.height === "auto" ? "auto" : props.height,
}));
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

$light-chrome-bg: #fff;
$light-chrome-border: #dbdbdb;
$light-icon-color: #737373;
$light-url-bg: #fff;
$light-url-border: #bfbfbf;
$light-url-text: #1b1b1b;
$light-url-sub: #6e6e6e;
$light-body-bg: #f2f2f2;

$url-text-size: rem(13);

$dark-chrome-bg: #2c2c2e;
$dark-chrome-border: rgba(255, 255, 255, 0.08);
$dark-icon-color: rgba(255, 255, 255, 0.75);
$dark-url-bg: #1c1c1e;
$dark-url-border: rgba(255, 255, 255, 0.1);
$dark-url-text: rgba(255, 255, 255, 0.85);
$dark-url-sub: rgba(255, 255, 255, 0.45);
$dark-body-bg: #111111;

.bm {
  border-radius: rem(12);
  overflow: hidden;

  &--light {
    background: $light-body-bg;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.12),
      0 rem(24) rem(60) rgba(0, 0, 0, 0.18),
      0 rem(4) rem(8) rgba(0, 0, 0, 0.08);
  }
  &--dark {
    background: $dark-body-bg;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06),
      0 rem(32) rem(80) rgba(0, 0, 0, 0.6);
  }

  &__chrome {
    position: relative;
    display: flex;
    align-items: center;
    height: rem(48);
    padding: rem(10) rem(17);
    border-bottom: 1px solid;
  }

  &--light &__chrome {
    background: $light-chrome-bg;
    border-bottom-color: $light-chrome-border;
  }
  &--dark &__chrome {
    background: $dark-chrome-bg;
    border-bottom-color: $dark-chrome-border;
  }

  &__left {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    z-index: 1;
    gap: rem(2);
  }

  &__lights {
    display: flex;
    align-items: center;
    gap: rem(8);
    margin-right: rem(12);
  }

  &__light {
    width: rem(13);
    height: rem(13);
    border-radius: $radius-full;
    flex-shrink: 0;
    &--red {
      background: #ff5f57;
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.2);
    }
    &--yellow {
      background: #ffbd2e;
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.2);
    }
    &--green {
      background: #28c840;
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.2);
    }
  }

  // ── Nav buttons (back / forward) ──────────────────────────────────
  &__nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: rem(12);
    border-radius: rem(4);
    cursor: pointer;
    line-height: 0;
    transition: opacity 0.15s ease;

    &--disabled {
      opacity: 0.3;
      cursor: default;
      pointer-events: none;
    }
    &:hover:not(&--disabled) {
      opacity: 0.65;
    }
  }

  &__icon {
    flex-shrink: 0;
    display: block;
    &--dimmed {
      opacity: 0.5;
      margin-left: rem(24);
    }
    &--sidebar {
      margin-left: rem(40);
    }
    &--back {
      margin-left: rem(24);
    }
  }
  &--light &__icon {
    color: $light-icon-color;
  }
  &--dark &__icon {
    color: $dark-icon-color;
  }

  &__shield {
    flex-shrink: 0;
    display: block;
  }
  &--light &__shield {
    color: $light-url-sub;
  }
  &--dark &__shield {
    color: $dark-url-sub;
  }

  // Truly centered via absolute positioning
  // pointer-events: none so it NEVER blocks left nav buttons underneath
  &__center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: rem(11);
    justify-content: center;
    z-index: 0;
    pointer-events: none;
  }

  // Restore pointer-events on interactive children only
  &__url {
    pointer-events: auto;
  }
  &__reload-btn {
    pointer-events: auto;
  }

  &__url {
    display: flex;
    align-items: center;
    width: rem(417);
    height: rem(28);
    padding: 0 rem(10);
    border-radius: rem(6);
    border: 1px solid;
  }
  &__url-inner {
    display: flex;
    align-items: center;
    gap: rem(4);
    flex: 1;
    min-width: 0;
    justify-content: center;
  }
  &--light &__url {
    background: $light-url-bg;
    border-color: $light-url-border;
  }
  &--dark &__url {
    background: $dark-url-bg;
    border-color: $dark-url-border;
  }

  &__url-lock {
    flex-shrink: 0;
  }

  &__reload-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-shrink: 0;
    line-height: 0;
    &:hover {
      opacity: 0.75;
    }
  }

  &__url-reload {
    flex-shrink: 0;
    opacity: 0.5;
    &--spin {
      animation: bm-spin 0.6s linear;
    }
  }

  &--light &__url-lock,
  &--light &__url-reload {
    color: $light-url-sub;
  }
  &--dark &__url-lock,
  &--dark &__url-reload {
    color: $dark-url-sub;
  }

  &--light &__url-text {
    color: $light-url-text;
    font-size: $url-text-size;
  }
  &--dark &__url-text {
    color: $dark-url-text;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: rem(18);
    flex-shrink: 0;
    margin-left: auto;
    z-index: 1;
  }

  &__url-text {
    font-size: rem(13);
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    line-height: 1;
    position: relative;
    top: 2px;
  }

  &__body {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-bottom-left-radius: rem(12);
    border-bottom-right-radius: rem(12);
  }
  &--light &__body {
    background: $light-body-bg;
  }
  &--dark &__body {
    background: $dark-body-bg;
  }

  &__iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
  }

  @keyframes bm-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

// ── Tablet ─────────────────────────────────────────────────────────
@include respond-to(md) {
  .bm {
    &__chrome {
      height: rem(44);
      padding: 0 rem(12);
    }
    &__lights {
      gap: rem(6);
      margin-right: rem(8);
    }
    &__light {
      width: rem(11);
      height: rem(11);
    }
    &__icon {
      &--sidebar {
        margin-left: rem(24);
      }
      &--back {
        margin-left: rem(16);
      }
      &--dimmed {
        margin-left: rem(16);
      }
    }
    &__url {
      width: rem(240);
    }
    &__url-text {
      font-size: rem(12);
    }
    &__right {
      gap: rem(8);
    }
    &__shield {
      display: none;
    }
  }
}

// ── Mobile ─────────────────────────────────────────────────────────
@include respond-to(sm) {
  .bm {
    &__chrome {
      height: rem(38);
      padding: 0 rem(10);
    }
    &__lights {
      gap: rem(5);
      margin-right: rem(6);
    }
    &__light {
      width: rem(9);
      height: rem(9);
    }
    &__icon--sidebar {
      display: none;
    }
    &__right {
      display: none;
    }
    &__shield {
      display: none;
    }
    &__nav-btn {
      display: none;
    }

    // URL bar fills space when right side is hidden
    &__center {
      position: static;
      transform: none;
      flex: 1;
      justify-content: flex-start;
      margin: 0 rem(8);
      gap: rem(6);
    }
    &__url {
      width: 100%;
      height: rem(24);
    }
    &__reload-btn {
      display: none;
    }
    &__url-text {
      font-size: rem(10);
    }
  }
}
</style>
