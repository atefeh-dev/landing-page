<template>
  <section class="section section--tweets" id="experiences" ref="sectionRef">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge" :class="{ 'in-view': isVisible }"
          >مشکلات از زبان افراد در فضای مجازی
        </span>
        <div class="section__title-wrapper" :class="{ 'in-view': isVisible }">
          <h2 class="section__title" :class="{ 'in-view': isVisible }">
            ما برای توسعه‌ی
            <span class="highlight">زونکن</span>
            از نیازهای واقعی الهام می‌گیریم.
          </h2>
        </div>
      </div>

      <div class="tweets-carousel" :class="{ 'in-view': isVisible }">
        <div class="tweets-carousel__track">
          <div
            v-for="(tweet, index) in tweets"
            :key="index"
            class="tweet-card"
            :class="{
              'tweet-card--active': index === activeIndex,
              'tweet-card--prev': index === prevIndex,
              'tweet-card--next': index === nextIndex,
            }"
          >
            <div class="tweet-card__header">
              <img
                :src="tweet.avatar"
                :alt="tweet.name"
                class="tweet-card__avatar"
              />
              <div class="tweet-card__author">
                <div class="tweet-card__name-wrapper">
                  <span class="tweet-card__name">{{ tweet.name }}</span>
                  <svg
                    class="tweet-card__verified"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                    />
                  </svg>
                </div>
                <span class="tweet-card__handle">{{ tweet.handle }}</span>
              </div>
              <div class="tweet-card__platform">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </div>
            </div>

            <p class="tweet-card__text">{{ tweet.text }}</p>

            <div class="tweet-card__footer">
              <span class="tweet-card__date">{{ tweet.date }}</span>
              <div class="tweet-card__stats">
                <span class="tweet-card__stat">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"
                    />
                  </svg>
                  {{ tweet.retweets }}
                </span>
                <span class="tweet-card__stat tweet-card__stat--likes">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    />
                  </svg>
                  {{ tweet.likes }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="tweets-carousel__dots">
          <button
            v-for="(_, index) in tweets"
            :key="index"
            class="tweets-carousel__dot"
            :class="{ 'tweets-carousel__dot--active': index === activeIndex }"
            @click="goTo(index)"
            :aria-label="'رفتن به نظر ' + (index + 1)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";
import Avatar3 from "../assets/avatar3.png";
import Avatar4 from "../assets/avatar4.png";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const sectionRef = ref(null);
const { isVisible } = useScrollAnimation(sectionRef);

const tweets = [
  {
    name: "فرهاد هستم",
    handle: "@farhadex",
    avatar: Avatar1,
    text: "وقتی دارین قرارداد طراحی وب میبندین از همون اول همه چیز رو واضح مشخص کنین",
    date: "10:32 AM · 1 Jan 2012",
    retweets: 12,
    likes: 45,
  },
  {
    name: "شهاب جوانمردی",
    handle: "@vagheanke",
    avatar: Avatar2,
    text: "هر وقت بدون قرارداد کاری انجام دادید، پیش فرض‌تون این باشه که قراره رایگان تموم بشه",
    date: "7:36 AM · 21 Apr 2018",
    retweets: 23,
    likes: 421,
  },
  {
    name: "یک دوست",
    handle: "@yekdoost",
    avatar: Avatar3,
    text: "هرکاری که خارج از قرارداد در یک محیط کاری انجام بشه بدون استثنا به سوتفاهم بین کارفرما و کارمند در آینده منجر میشه",
    date: "3:15 PM · 8 Mar 2020",
    retweets: 7,
    likes: 89,
  },
  {
    name: "سارا احمدی",
    handle: "@sara_ahmadi",
    avatar: Avatar4,
    text: "یه قرارداد خوب باید هم حق کارفرما رو حفظ کنه هم حق مجری رو. مستندسازی درست یعنی آرامش خاطر دو طرف.",
    date: "11:20 AM · 15 Jun 2021",
    retweets: 8,
    likes: 134,
  },
  {
    name: "علی رضایی",
    handle: "@ali_rezaei_dev",
    avatar: Avatar1,
    text: "تو پروژه‌های فریلنسری، مهم‌ترین چیزی که یاد گرفتم این بود: همه چیز رو مکتوب کن. حافظه آدما ضعیفه ولی اسناد می‌مونن.",
    date: "9:45 PM · 3 Nov 2022",
    retweets: 15,
    likes: 289,
  },
  {
    name: "مینا کریمی",
    handle: "@mina_karimi",
    avatar: Avatar2,
    text: "مشکل اصلی فریلنسرها نبود مهارت نیست، نبود مستندسازی درسته. وقتی همه چیز مکتوب باشه، اختلافات به حداقل می‌رسه.",
    date: "2:30 PM · 22 Sep 2023",
    retweets: 31,
    likes: 456,
  },
];

const activeIndex = ref(0);
let intervalId = null;

const prevIndex = computed(() => {
  return (activeIndex.value - 1 + tweets.length) % tweets.length;
});

const nextIndex = computed(() => {
  return (activeIndex.value + 1) % tweets.length;
});

function goTo(index) {
  activeIndex.value = index;
  resetInterval();
}

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % tweets.length;
}

function resetInterval() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(nextSlide, 4000);
}

onMounted(() => {
  resetInterval();
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style lang="scss" scoped>
.section--tweets {
  background-color: #0a0a0a;
  overflow: hidden;
}

.tweets-carousel {
  margin-top: $spacing-xl;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;

  &.in-view {
    animation: fadeInUp 0.6s ease-out 0.2s forwards;
  }

  &__track {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 380px;
    perspective: 1200px;
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: $spacing-xs;
    margin-top: $spacing-xl;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid $color-border-medium;
    background: transparent;
    cursor: pointer;
    transition: $transition-base;
    padding: 0;

    &--active {
      background: $color-accent-primary;
      border-color: $color-accent-primary;
      transform: scale(1.2);
    }

    &:hover:not(&--active) {
      border-color: $color-border-strong;
      background: $color-bg-elevated;
    }
  }
}

.tweet-card {
  position: absolute;
  width: 500px;
  max-width: 90vw;
  background: $color-bg-secondary;
  border: 1px solid $color-border-medium;
  border-radius: $radius-xl;
  padding: $spacing-lg;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.85) translateX(0);
  pointer-events: none;
  box-shadow: $shadow-md;

  &--active {
    opacity: 1;
    transform: scale(1) translateX(0);
    z-index: 3;
    pointer-events: auto;

    &:hover {
      border-color: $color-border-strong;
      background: rgba(255, 255, 255, 0.03);
      transform: scale(1.02) translateY(-4px);
      box-shadow: $shadow-lg;
    }
  }

  &--prev {
    opacity: 0.3;
    transform: scale(0.88) translateX(120%);
    z-index: 2;
    filter: blur(2px);
  }

  &--next {
    opacity: 0.3;
    transform: scale(0.88) translateX(-120%);
    z-index: 2;
    filter: blur(2px);
  }

  &__header {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
    object-fit: cover;
    border: 2px solid $color-border-medium;
  }

  &__author {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: 0.125rem;
  }

  &__name-wrapper {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__name {
    font-weight: 700;
    font-size: 0.9375rem;
    color: $color-text-primary;
    line-height: 1.3;
  }

  &__verified {
    color: #1d9bf0;
    flex-shrink: 0;
  }

  &__handle {
    font-size: 0.9375rem;
    color: $color-text-tertiary;
    direction: ltr;
    text-align: right;
  }

  &__platform {
    color: $color-text-muted;
    flex-shrink: 0;
    margin-top: 0.25rem;
    transition: $transition-base;
  }

  &:hover &__platform {
    color: $color-text-secondary;
  }

  &__text {
    font-size: 1.0625rem;
    line-height: 1.6;
    color: $color-text-primary;
    margin-bottom: $spacing-lg;
    font-weight: 400;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__date {
    font-size: 0.9375rem;
    color: $color-text-tertiary;
    direction: ltr;
    text-align: right;
  }

  &__stats {
    display: flex;
    gap: $spacing-lg;
    padding-top: $spacing-sm;
    border-top: 1px solid $color-border-subtle;
  }

  &__stat {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: $color-text-tertiary;
    transition: $transition-base;
    font-weight: 600;

    svg {
      opacity: 0.7;
    }

    &:hover {
      color: #00ba7c;

      svg {
        opacity: 1;
      }
    }

    &--likes {
      &:hover {
        color: #f91880;
      }
    }
  }
}

// Tablet
@media (max-width: $breakpoint-lg) {
  .tweets-carousel__track {
    min-height: 360px;
  }

  .tweet-card {
    width: 450px;
    padding: $spacing-md $spacing-lg;

    &--prev,
    &--next {
      opacity: 0.2;
      transform: scale(0.85) translateX(110%);
    }

    &--next {
      transform: scale(0.85) translateX(-110%);
    }
  }
}

// Tablet Portrait
@media (max-width: $breakpoint-md) {
  .tweets-carousel__track {
    min-height: 340px;
  }

  .tweet-card {
    width: 400px;

    &--prev,
    &--next {
      opacity: 0;
    }

    &__text {
      font-size: 1rem;
    }
  }
}

// Mobile
@media (max-width: $breakpoint-sm) {
  .tweets-carousel {
    margin-top: $spacing-xl;

    &__track {
      min-height: 320px;
    }

    &__dots {
      margin-top: $spacing-md;
    }
  }

  .tweet-card {
    width: 340px;
    padding: $spacing-md;

    &__avatar {
      width: 40px;
      height: 40px;
    }

    &__name {
      font-size: 0.875rem;
    }

    &__handle {
      font-size: 0.8125rem;
    }

    &__verified {
      width: 16px;
      height: 16px;
    }

    &__platform svg {
      width: 16px;
      height: 16px;
    }

    &__text {
      font-size: 0.9375rem;
      margin-bottom: $spacing-md;
    }

    &__date {
      font-size: 0.8125rem;
    }

    &__stats {
      gap: $spacing-md;
    }

    &__stat {
      font-size: 0.8125rem;
      gap: 0.375rem;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
}

// Extra small mobile
@media (max-width: 375px) {
  .tweet-card {
    width: 300px;
    padding: $spacing-sm $spacing-md;

    &__text {
      font-size: 0.875rem;
    }

    &__stats {
      gap: $spacing-sm;
    }
  }
}
</style>
