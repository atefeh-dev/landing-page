<template>
  <div class="st">
    <div class="st__header">
      <h2 class="st__title">انتخاب قالب قرارداد</h2>
      <p class="st__sub">یکی از قالب‌های استاندارد را انتخاب کنید.</p>
    </div>

    <div class="st__list">
      <button
        v-for="t in templates"
        :key="t.id"
        class="st__item"
        :class="{ 'st__item--active': selected === t.id }"
        @click="selected = t.id"
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

    <!-- <button
      class="st__cta"
      :disabled="!selected"
      @click="$emit('next', selected)"
    >
      ادامه
    </button> -->
    <BaseButton
      variant="primary"
      size="lg"
      :loading="isSubmitting"
      :disabled="succeeded"
      class="ef__btn"
      @click="$emit('next', selected)"
    >
      <span> ادامه</span>
    </BaseButton>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
defineEmits(["next"]);

const selected = ref("NDA");
const templates = [
  { id: "NDA", name: "توافق‌نامه عدم افشای اطلاعات یکطرفه (NDA)" },
  { id: "collab", name: "قرارداد همکاری پروژه‌ای" },
  { id: "mou", name: "تفاهم‌نامه همکاری" },
];
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
      background 0.15s ease;
    text-align: right;
    width: 100%;

    &:hover {
      border: 2px solid $color-accent-primary;
      // background: #fffbeb;
    }
    &--active {
      border: 2px solid $color-accent-primary;
      // background: #fffbeb;
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

  &__cta {
    width: 100%;
    padding: rem(13) rem(20);
    border-radius: rem(10);
    border: none;
    background: #fcc015;
    color: #101828;
    font-size: rem(15);
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
