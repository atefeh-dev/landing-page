<template>
  <div class="st" ref="rootEl">
    <div class="st__header">
      <h2 class="st__title">انتخاب قالب قرارداد</h2>
      <p class="st__sub">یکی از قالب‌های استاندارد را انتخاب کنید.</p>
    </div>

    <div class="st__list">
      <button
        v-for="(t, i) in templates"
        :key="t.id"
        class="st__item"
        :class="{
          'st__item--active': selected === t.id,
          'st__item--luring': luringIndex === i && selected !== t.id,
          'st__item--claimed': claimedIndex === i,
        }"
        @click="onSelect(t.id, i)"
      >
        <div class="st__item-info">
          <span class="st__item-name">{{ t.name }}</span>
          <span class="st__item-meta">
            <span class="st__badge"> توسط زونکن </span>
            <span class="st__dot">|</span>
            <img
              src="@/assets/icons/verified-tick.svg?url"
              alt=""
              class="hero__icon hero__icon--9"
            />
            <span>استاندارد</span>
          </span>
        </div>
        <div class="st__item-icon">
          <img
            src="@/assets/icons/file-type.svg?url"
            alt=""
            class="hero__icon hero__icon--9"
          />
        </div>
      </button>
    </div>

    <BaseButton
      variant="primary"
      size="lg"
      class="st__cta"
      :class="{
        'st__cta--locked': !selected,
        'st__cta--ready': selected && !ctaClicked,
      }"
      :disabled="!selected"
      @click="onCta"
    >
      <span>ادامه</span>
    </BaseButton>

    <!-- Ghost cursor — drifts toward first card, then toward button -->
    <Transition name="st-cursor">
      <div v-if="showCursor" class="st__cursor" :style="cursorStyle">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 2L16 9.5L9.5 11L7 17L4 2Z"
            fill="white"
            stroke="#1a1a1a"
            stroke-width="1.2"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
const emit = defineEmits(["next"]);

const selected = ref(null);
const luringIndex = ref(-1);
const claimedIndex = ref(-1);
const ctaClicked = ref(false);
const rootEl = ref(null);
const firstClick = ref(false);

const templates = [
  { id: "NDA", name: "توافق‌نامه عدم افشای اطلاعات یکطرفه (NDA)" },
  { id: "collab", name: "قرارداد همکاری پروژه‌ای" },
  { id: "mou", name: "تفاهم‌نامه همکاری" },
];

// ── Ghost cursor ──────────────────────────────────────────────────
const showCursor = ref(false);
const cursorPos = ref({ x: 82, y: 10 });

// Phase 1: drift toward first card
const cardKeyframes = [
  { x: 82, y: 10 },
  { x: 68, y: 30 },
  { x: 55, y: 36 },
];
// Phase 2: after selection, drift toward CTA button
const ctaKeyframes = [
  { x: 55, y: 36 },
  { x: 50, y: 72 },
  { x: 50, y: 82 },
];

let cursorFrame = 0;
let cursorTimer = null;
let cursorPhase = "card"; // "card" | "cta"

function animateCursor(frames) {
  if (cursorFrame >= frames.length) return;
  cursorPos.value = frames[cursorFrame];
  cursorFrame++;
  cursorTimer = setTimeout(() => animateCursor(frames), 400);
}

const cursorStyle = computed(() => ({
  left: `${cursorPos.value.x}%`,
  top: `${cursorPos.value.y}%`,
}));

// ── Lure sequence ─────────────────────────────────────────────────
let lureTimer = null;

function startLure() {
  showCursor.value = true;
  cursorFrame = 0;
  cursorPhase = "card";
  animateCursor(cardKeyframes);

  // Card glows as cursor arrives
  lureTimer = setTimeout(() => {
    luringIndex.value = 0;

    // Fade back — incomplete
    lureTimer = setTimeout(() => {
      luringIndex.value = -1;
      showCursor.value = false;

      // Repeat once, starting closer
      lureTimer = setTimeout(() => {
        if (!firstClick.value) {
          showCursor.value = true;
          cursorFrame = 1;
          animateCursor(cardKeyframes);
          lureTimer = setTimeout(() => {
            luringIndex.value = 0;
          }, 450);
        }
      }, 1100);
    }, 1500);
  }, 1050);
}

let ctaCursorTimer = null;

function stopLure() {
  clearTimeout(cursorTimer);
  clearTimeout(lureTimer);
  clearTimeout(ctaCursorTimer);
  luringIndex.value = -1;
  showCursor.value = false;
}

// ── CTA cursor loop ───────────────────────────────────────────────
// After card selected, cursor drifts to button, lingers, fades, repeats
function startCtaCursor() {
  if (ctaClicked.value) return;
  showCursor.value = true;
  cursorFrame = 0;
  animateCursor(ctaKeyframes);

  // Linger on button → fade → pause → repeat
  ctaCursorTimer = setTimeout(() => {
    showCursor.value = false;
    ctaCursorTimer = setTimeout(() => {
      if (!ctaClicked.value) startCtaCursor();
    }, 900);
  }, 1800);
}

// ── Interactions ──────────────────────────────────────────────────
function onSelect(id, i) {
  stopLure();
  if (!firstClick.value) {
    firstClick.value = true;
    claimedIndex.value = i;
    setTimeout(() => {
      claimedIndex.value = -1;
    }, 600);
  }
  selected.value = id;

  // After card selected: cursor drifts to CTA button, then loops
  setTimeout(() => {
    startCtaCursor();
  }, 350);
}

function onCta() {
  stopLure(); // clears ctaCursorTimer too
  ctaClicked.value = true;
  emit("next", selected.value);
}

// ── IntersectionObserver ──────────────────────────────────────────
let observer = null;
onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && !firstClick.value) startLure();
      else stopLure();
    },
    { threshold: 0.6 },
  );
  if (rootEl.value) observer.observe(rootEl.value);
});
onUnmounted(() => {
  stopLure();
  observer?.disconnect();
});
</script>

<style lang="scss" scoped>
@use "@/styles/global/functions" as *;

$color-text-name: #414651;
$color-text-badge: #535862;
$color-dot: #d5d7da;
$box-shadow: 0 1px 2px 0 #d0d5dd;

.st {
  display: flex;
  flex-direction: column;
  width: rem(408);
  max-width: calc(100% - rem(32));
  background: #fff;
  direction: rtl;
  border-radius: rem(16);
  padding: rem(32) rem(28);
  box-shadow: $box-shadow;
  position: relative; // for ghost cursor

  &__header {
    margin-bottom: rem(20);
    text-align: center;
  }

  &__title {
    font-size: rem(18);
    font-weight: 700;
    color: #101828;
    margin-bottom: rem(4);
  }

  &__sub {
    font-size: rem(14);
    color: #667085;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: rem(10);
    margin-bottom: rem(20);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-sm;
    flex-direction: row-reverse;
    gap: rem(12);
    border-radius: rem(12);
    border: 2px solid $color-border-card;
    background: #fff;
    cursor: pointer;
    transition:
      border-color 0.15s ease,
      background 0.15s ease,
      transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.18s ease;
    text-align: right;
    width: 100%;

    &:hover {
      border: 2px solid $color-accent-primary;
    }

    &--active {
      border: 2px solid $color-accent-primary;
    }

    // Almost-selected glow — cursor has arrived, brain sees incomplete action
    &--luring {
      border: 2px solid $color-accent-primary;
      box-shadow: 0 0 0 4px rgba(252, 192, 21, 0.22);
      animation: st-lure-pulse 1.1s ease-in-out infinite;
    }

    // Spring + glow burst on first click
    &--claimed {
      animation: st-claim 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
  }

  &__item-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: rem(4);
  }

  &__item-name {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-name;
  }

  &__item-meta {
    display: flex;
    align-items: center;
    gap: rem(6);
    color: $color-text-badge;
    font-size: $font-size-sm;
    font-weight: $font-weight-regular;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: rem(3);
  }

  &__dot {
    color: $color-dot;
  }

  &__item-icon {
    flex-shrink: 0;
    opacity: 0.7;
  }

  // ── CTA ──────────────────────────────────────────────────────────
  &__cta {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(6);
    transition:
      opacity 0.2s ease,
      background 0.2s ease,
      transform 0.15s ease;

    // Locked: visible but clearly inactive — user sees the goal
    &--locked {
      opacity: 0.38 !important;
      pointer-events: none;
    }

    // Ready: springs in + arrow nudges to guide eye
    &--ready {
      animation: st-cta-ready 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
  }

  // ── Ghost cursor ─────────────────────────────────────────────────
  &__cursor {
    position: absolute;
    pointer-events: none;
    z-index: 20;
    transition:
      left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.22));
  }
}

// ── Keyframes ─────────────────────────────────────────────────────

@keyframes st-lure-pulse {
  0% {
    box-shadow: 0 0 0 4px rgba(252, 192, 21, 0.22);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(252, 192, 21, 0.34);
  }
  100% {
    box-shadow: 0 0 0 4px rgba(252, 192, 21, 0.22);
  }
}

@keyframes st-claim {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.15);
  }
  40% {
    transform: scale(1.03);
    box-shadow: 0 0 0 10px rgba(252, 192, 21, 0.32);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 3px rgba(252, 192, 21, 0.15);
  }
}

@keyframes st-cta-ready {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

.st-cursor-enter-active {
  transition: opacity 0.28s ease;
}
.st-cursor-leave-active {
  transition: opacity 0.22s ease;
}
.st-cursor-enter-from,
.st-cursor-leave-to {
  opacity: 0;
}
</style>
