<template>
  <section class="section section--tweets" id="testimonials">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge">✨نظرات کاربران</span>
        <div class="section__title-wrapper">
          <svg class="section__title-image" viewBox="0 0 48 48" fill="none">
            <path
              d="M34 8H14a4 4 0 00-4 4v16a4 4 0 004 4h4l6 6 6-6h4a4 4 0 004-4V12a4 4 0 00-4-4z"
              stroke="#fcc015"
              stroke-width="2"
            />
            <path
              d="M18 18h12M18 23h8"
              stroke="#fcc015"
              stroke-width="2"
              opacity="0.5"
              stroke-linecap="round"
            />
          </svg>
          <h2 class="section__title">درباره مدیریت اسناد چه می‌گویند؟</h2>
        </div>
        <p class="section__subtitle">
          نظرات متخصصانی که اهمیت قراردادنویسی و مستندسازی را درک می‌کنند.
        </p>
      </div>

      <div class="tweets-carousel">
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
              <div class="tweet-card__avatar">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="24" :fill="tweet.avatarColor" />
                  <text
                    x="24"
                    y="30"
                    text-anchor="middle"
                    fill="#0a0a0a"
                    font-size="20"
                    font-weight="700"
                  >
                    {{ tweet.avatarLetter }}
                  </text>
                </svg>
              </div>
              <div class="tweet-card__author">
                <span class="tweet-card__name">{{ tweet.name }}</span>
                <span class="tweet-card__handle">{{ tweet.handle }}</span>
              </div>
              <div class="tweet-card__platform">
                <svg
                  width="20"
                  height="20"
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
              <div class="tweet-card__actions">
                <span class="tweet-card__action">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M17 2h4v4M3 22L21 4M7 22h-4v-4" />
                  </svg>
                  {{ tweet.retweets }}
                </span>
                <span class="tweet-card__action">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
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
    <TestimonialQuote />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import TestimonialQuote from "./TestimonialQuote.vue";

const tweets = [
  {
    name: "فرهاد هستم",
    handle: "@farhadex",
    avatarLetter: "ف",
    avatarColor: "#fcc015",
    text: "وقتی دارین قرارداد طراحی وب میبندین از همون اول همه چیز رو واضح مشخص کنین",
    date: "10:32 AM - 1 Jan 2012",
    retweets: 0,
    likes: 0,
  },
  {
    name: "شهاب جوانمردی",
    handle: "@vagheanke",
    avatarLetter: "ش",
    avatarColor: "#1434cb",
    text: "هر وقت بدون قرارداد کاری انجام دادید، پیش فرض‌تون این باشه که قراره رایگان تموم بشه",
    date: "7:36 AM - 21 Apr 2018",
    retweets: 23,
    likes: 421,
  },
  {
    name: "یک دوست",
    handle: "@yekdoost",
    avatarLetter: "ی",
    avatarColor: "#44936d",
    text: "هرکاری که خارج از قرارداد در یک محیط کاری انجام بشه بدون استثنا به سوتفاهم بین کارفرما و کارمند در آینده منجر میشه",
    date: "3:15 PM - 8 Mar 2020",
    retweets: 0,
    likes: 5,
  },
  {
    name: "سارا احمدی",
    handle: "@sara_ahmadi",
    avatarLetter: "س",
    avatarColor: "#2d8ff0",
    text: "یه قرارداد خوب باید هم حق کارفرما رو حفظ کنه هم حق مجری رو. مستندسازی درست یعنی آرامش خاطر دو طرف.",
    date: "11:20 AM - 15 Jun 2021",
    retweets: 8,
    likes: 34,
  },
  {
    name: "علی رضایی",
    handle: "@ali_rezaei_dev",
    avatarLetter: "ع",
    avatarColor: "#fcc015",
    text: "تو پروژه‌های فریلنسری، مهم‌ترین چیزی که یاد گرفتم این بود: همه چیز رو مکتوب کن. حافظه آدما ضعیفه ولی اسناد می‌مونن.",
    date: "9:45 PM - 3 Nov 2022",
    retweets: 15,
    likes: 89,
  },
  {
    name: "مینا کریمی",
    handle: "@mina_karimi",
    avatarLetter: "م",
    avatarColor: "#1434cb",
    text: "مشکل اصلی فریلنسرها نبود مهارت نیست، نبود مستندسازی درسته. وقتی همه چیز مکتوب باشه، اختلافات به حداقل می‌رسه.",
    date: "2:30 PM - 22 Sep 2023",
    retweets: 31,
    likes: 156,
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
  intervalId = setInterval(nextSlide, 3000);
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
  background-color: $color-bg-primary;
  overflow: hidden;
}

.tweets-carousel {
  margin-top: $spacing-xl;

  &__track {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 320px;
    perspective: 1000px;
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: $spacing-xs;
    margin-top: $spacing-lg;
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
  width: 420px;
  max-width: 90vw;
  background: linear-gradient(
    135deg,
    $color-bg-elevated 0%,
    $color-bg-tertiary 100%
  );
  border: 1px solid $color-border-subtle;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.85) translateX(0);
  pointer-events: none;

  // Use-case card hover effect (gradient border + lift + shadow)
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: $radius-lg;
    padding: 1px;
    background: linear-gradient(
      135deg,
      $color-accent-primary 0%,
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: $transition-base;
  }

  &--active {
    opacity: 1;
    transform: scale(1) translateX(0);
    z-index: 3;
    pointer-events: auto;

    &:hover {
      border-color: $color-border-strong;
      background: linear-gradient(
        135deg,
        $color-bg-elevated 0%,
        $color-bg-secondary 100%
      );
      transform: scale(1) translateY(-2px);
      box-shadow: $shadow-md;

      &::before {
        opacity: 0.3;
      }
    }
  }

  &--prev {
    opacity: 0.4;
    transform: scale(0.88) translateX(110%);
    z-index: 2;
    filter: blur(1px);
  }

  &--next {
    opacity: 0.4;
    transform: scale(0.88) translateX(-110%);
    z-index: 2;
    filter: blur(1px);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid $color-border-medium;
  }

  &__author {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  &__name {
    font-weight: 700;
    font-size: 1rem;
    color: $color-text-primary;
    line-height: 1.3;
  }

  &__handle {
    font-size: 0.875rem;
    color: $color-text-tertiary;
    direction: ltr;
    text-align: right;
  }

  &__platform {
    color: $color-text-muted;
    flex-shrink: 0;
    transition: $transition-base;
  }

  &:hover &__platform {
    color: $color-text-secondary;
  }

  &__text {
    font-size: 1.05rem;
    line-height: 1.8;
    color: $color-text-secondary;
    margin-bottom: $spacing-md;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $spacing-sm;
    border-top: 1px solid $color-border-subtle;
  }

  &__date {
    font-size: 0.8rem;
    color: $color-info;
    direction: ltr;
  }

  &__actions {
    display: flex;
    gap: $spacing-md;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    color: $color-text-muted;
    transition: $transition-base;

    &:hover {
      color: $color-text-secondary;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .tweet-card {
    width: 340px;

    &--prev,
    &--next {
      opacity: 0;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .tweet-card {
    width: 300px;
  }

  .tweets-carousel__track {
    min-height: 280px;
  }
}
</style>
