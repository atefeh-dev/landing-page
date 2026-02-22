<template>
  <div class="bm" :class="`bm--${theme}`" dir="ltr">
    <!-- ── Chrome bar ──────────────────────────────────────────── -->
    <div class="bm__chrome" aria-hidden="true">
      <!-- LEFT: traffic lights + sidebar + back/forward -->
      <div class="bm__left">
        <!-- Traffic lights -->
        <div class="bm__lights">
          <span class="bm__light bm__light--red"></span>
          <span class="bm__light bm__light--yellow"></span>
          <span class="bm__light bm__light--green"></span>
        </div>

        <!-- Sidebar toggle -->
        <svg
          class="bm__icon"
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="16"
            height="16"
            rx="3"
            stroke="currentColor"
            stroke-width="1.3"
          />
          <line
            x1="6"
            y1="1"
            x2="6"
            y2="17"
            stroke="currentColor"
            stroke-width="1.3"
          />
        </svg>

        <!-- Back -->
        <svg
          class="bm__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <!-- Forward (dimmed) -->
        <svg
          class="bm__icon bm__icon--dimmed"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- CENTER: shield + URL bar (truly centered via position:absolute) -->
      <div class="bm__center">
        <!-- Shield icon -->
        <svg
          class="bm__shield"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L4 6v6c0 5.25 4 9.74 8 11 4-1.26 8-5.75 8-11V6l-8-4z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <!-- URL pill -->
        <div class="bm__url">
          <!-- Lock icon -->
          <svg
            class="bm__url-lock"
            width="11"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
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
          <span class="bm__url-text">{{ url }}</span>
          <!-- Reload icon -->
          <svg
            class="bm__url-reload"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <!-- RIGHT: download + new tab + copy -->
      <div class="bm__right">
        <!-- Download -->
        <svg
          class="bm__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" fill="currentColor" />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="1.4"
            fill="none"
          />
        </svg>

        <!-- New tab / plus -->
        <svg
          class="bm__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>

        <!-- Copy / share -->
        <svg
          class="bm__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="9"
            y="9"
            width="11"
            height="13"
            rx="2"
            stroke="currentColor"
            stroke-width="1.4"
          />
          <path
            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1"
            stroke="currentColor"
            stroke-width="1.4"
          />
        </svg>
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
import { computed } from "vue";

const props = defineProps({
  url: { type: String, default: "zoonkan.com/template/NDA" },
  src: { type: String, default: "" },
  iframeTitle: { type: String, default: "نمایش زونکن" },
  height: { type: String, default: "520px" },
  // "light" | "dark"
  theme: { type: String, default: "light" },
});

const contentStyle = computed(() => ({
  height: props.height === "auto" ? "auto" : props.height,
}));
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;
@use "@/styles/global/tokens" as *;
@use "@/styles/global/mixins" as *;

// ── Token maps per theme ──────────────────────────────────────

// light theme (matches screenshot exactly)
$light-chrome-bg: #f0f0f0;
$light-chrome-border: #d0d0d0;
$light-icon-color: #3c3c3c;
$light-icon-dimmed: #b0b0b0;
$light-url-bg: #ffffff;
$light-url-border: #d8d8d8;
$light-url-text: #1a1a1a;
$light-url-sub: #6e6e6e;
$light-body-bg: #f5f5f5;

// dark theme
$dark-chrome-bg: #2c2c2e;
$dark-chrome-border: rgba(255, 255, 255, 0.08);
$dark-icon-color: rgba(255, 255, 255, 0.75);
$dark-icon-dimmed: rgba(255, 255, 255, 0.25);
$dark-url-bg: #1c1c1e;
$dark-url-border: rgba(255, 255, 255, 0.1);
$dark-url-text: rgba(255, 255, 255, 0.85);
$dark-url-sub: rgba(255, 255, 255, 0.45);
$dark-body-bg: #111111;

// ── Shell ─────────────────────────────────────────────────────

.bm {
  border-radius: rem(12);
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.12),
    0 rem(24) rem(60) rgba(0, 0, 0, 0.18),
    0 rem(4) rem(8) rgba(0, 0, 0, 0.08);

  &--light {
    background: $light-body-bg;
  }
  &--dark {
    background: $dark-body-bg;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06),
      0 rem(32) rem(80) rgba(0, 0, 0, 0.6);
  }

  // ── Chrome bar ───────────────────────────────────────────────

  &__chrome {
    position: relative;
    display: flex;
    align-items: center;
    height: rem(52);
    padding: 0 rem(16);
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  &--light &__chrome {
    background: $light-chrome-bg;
    border-bottom-color: $light-chrome-border;
  }
  &--dark &__chrome {
    background: $dark-chrome-bg;
    border-bottom-color: $dark-chrome-border;
  }

  // ── Left group ───────────────────────────────────────────────

  &__left {
    display: flex;
    align-items: center;
    gap: rem(10);
    flex-shrink: 0;
    z-index: 1;
  }

  // ── Traffic lights ───────────────────────────────────────────

  &__lights {
    display: flex;
    align-items: center;
    gap: rem(7);
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

  // ── Icons ────────────────────────────────────────────────────

  &__icon {
    flex-shrink: 0;
    display: block;

    &--dimmed {
      opacity: 0.35;
    }
  }

  &--light &__icon {
    color: $light-icon-color;
  }
  &--dark &__icon {
    color: $dark-icon-color;
  }

  // ── Shield ───────────────────────────────────────────────────

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

  // ── CENTER — absolutely positioned so URL is truly centered ──

  &__center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: rem(8);
    // Max width keeps it from colliding with left/right groups
    max-width: rem(440);
    width: 100%;
    justify-content: center;
  }

  // ── URL pill ─────────────────────────────────────────────────

  &__url {
    display: flex;
    align-items: center;
    gap: rem(6);
    padding: rem(5) rem(14);
    border-radius: rem(8);
    border-width: 1px;
    border-style: solid;
    min-width: rem(220);
    max-width: rem(360);
    justify-content: center;
  }

  &--light &__url {
    background: $light-url-bg;
    border-color: $light-url-border;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  }
  &--dark &__url {
    background: $dark-url-bg;
    border-color: $dark-url-border;
  }

  &__url-lock {
    flex-shrink: 0;
    opacity: 0.6;
  }
  &--light &__url-lock {
    color: $light-url-sub;
  }
  &--dark &__url-lock {
    color: $dark-url-sub;
  }

  &__url-text {
    font-size: rem(13);
    font-weight: 400;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    text-align: center;
  }
  &--light &__url-text {
    color: $light-url-text;
  }
  &--dark &__url-text {
    color: $dark-url-text;
  }

  &__url-reload {
    flex-shrink: 0;
    opacity: 0.5;
  }
  &--light &__url-reload {
    color: $light-url-sub;
  }
  &--dark &__url-reload {
    color: $dark-url-sub;
  }

  // ── Right group ──────────────────────────────────────────────

  &__right {
    display: flex;
    align-items: center;
    gap: rem(12);
    flex-shrink: 0;
    margin-left: auto;
    z-index: 1;
  }

  // ── Content body ─────────────────────────────────────────────

  &__body {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  &--light &__body {
    background: $light-body-bg;
  }
  &--dark &__body {
    background: $dark-body-bg;
  }

  &__iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
}

// ── Responsive ───────────────────────────────────────────────

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
    &__url {
      min-width: rem(160);
      padding: rem(4) rem(10);
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

@include respond-to(sm) {
  .bm {
    &__chrome {
      height: rem(40);
      padding: 0 rem(10);
    }
    &__right {
      display: none;
    }
    &__url {
      min-width: rem(130);
    }
    &__url-text {
      font-size: rem(11);
    }
    &__icon:not(.bm__icon) {
      width: rem(13);
      height: rem(13);
    }
  }
}
</style>
