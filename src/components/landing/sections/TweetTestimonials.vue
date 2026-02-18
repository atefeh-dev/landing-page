<template>
  <section class="section section--tweets" id="experiences" ref="sectionRef">
    <!-- Header — inside container for proper padding -->
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge" v-bind="slideDown()">تجربه‌ها</span>
        <div class="section__title-wrapper" v-bind="reveal(1)">
          <h2 class="section__title">
            سوءتفاهم و کاغذبازی‌های بی‌پایان یک الگوست، و ما با
            <span class="highlight">زونکن</span>
            راه‌حلش رو ساختیم.
          </h2>
        </div>
      </div>
    </div>

    <!-- Scroller — direct child of section, full viewport width -->
    <div class="tweet-scroller" v-bind="reveal(2)">
      <!-- Row 1 — scrolls left -->
      <div class="tweet-scroller__row">
        <div
          class="tweet-scroller__track"
          @mouseenter="pauseTrack($event)"
          @mouseleave="resumeTrack($event)"
        >
          <div
            v-for="(tweet, index) in [...row1Tweets, ...row1Tweets]"
            :key="`row1-${index}`"
            class="tweet-card"
          >
            <div class="tweet-card__header">
              <img
                :src="tweet.avatar"
                :alt="tweet.name"
                class="tweet-card__avatar"
              />
              <div class="tweet-card__author">
                <div class="tweet-card__name-row">
                  <span class="tweet-card__name">{{ tweet.name }}</span>
                  <svg
                    class="tweet-card__verified"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.0 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                    />
                  </svg>
                </div>
                <span class="tweet-card__handle">{{ tweet.handle }}</span>
              </div>
            </div>
            <p class="tweet-card__text">{{ tweet.text }}</p>
          </div>
        </div>
      </div>

      <!-- Row 2 — scrolls right -->
      <div class="tweet-scroller__row">
        <div
          class="tweet-scroller__track tweet-scroller__track--reverse"
          @mouseenter="pauseTrack($event)"
          @mouseleave="resumeTrack($event)"
        >
          <div
            v-for="(tweet, index) in [...row2Tweets, ...row2Tweets]"
            :key="`row2-${index}`"
            class="tweet-card"
          >
            <div class="tweet-card__header">
              <img
                :src="tweet.avatar"
                :alt="tweet.name"
                class="tweet-card__avatar"
              />
              <div class="tweet-card__author">
                <div class="tweet-card__name-row">
                  <span class="tweet-card__name">{{ tweet.name }}</span>
                  <svg
                    class="tweet-card__verified"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.0 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                    />
                  </svg>
                </div>
                <span class="tweet-card__handle">{{ tweet.handle }}</span>
              </div>
            </div>
            <p class="tweet-card__text">{{ tweet.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Conclusion — back inside container for proper padding -->
    <div class="section__container">
      <p class="section__conclusion" v-bind="reveal(4)">
        ما برای توسعه‌ی <span class="highlight">زونکن</span>
        از نیازهای واقعی الهام می‌گیریم.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import Avatar1 from "@/assets/images/avatars/avatar1.png";
import Avatar2 from "@/assets/images/avatars/avatar2.png";
import Avatar3 from "@/assets/images/avatars/avatar3.png";
import Avatar4 from "@/assets/images/avatars/avatar4.png";

const sectionRef = ref(null);
const { reveal, slideDown } = useScrollAnimation(sectionRef);

function pauseTrack(e) {
  e.currentTarget.style.animationPlayState = "paused";
}
function resumeTrack(e) {
  e.currentTarget.style.animationPlayState = "running";
}

const row1Tweets = [
  {
    name: "فرهاد هستم",
    handle: "@farhadex",
    avatar: Avatar1,
    text: "وقتی دارین قرارداد طراحی وب میبندین از همون اول همه چیز رو واضح مشخص کنین",
  },
  {
    name: "شهاب جوانمردی",
    handle: "@vagheanke",
    avatar: Avatar2,
    text: "هر وقت بدون قرارداد کاری انجام دادید، پیش فرض‌تون این باشه که قراره رایگان تموم بشه",
  },
  {
    name: "یک دوست",
    handle: "@yekdoost",
    avatar: Avatar3,
    text: "هرکاری که خارج از قرارداد انجام بشه بدون استثنا به سوتفاهم منجر میشه",
  },
  {
    name: "رضا محمدی",
    handle: "@reza_dev",
    avatar: Avatar4,
    text: "فکر می‌کردم قرارداد فقط برای پروژه‌های بزرگ لازمه، اشتباه بزرگی بود",
  },
  {
    name: "نیلوفر کریمی",
    handle: "@niloofar_k",
    avatar: Avatar1,
    text: "وقتی همه چیز مکتوب نباشه، هر طرف یه چیزی یادش میاد",
  },
  {
    name: "امیر حسینی",
    handle: "@amir_hosseini",
    avatar: Avatar2,
    text: "یه قرارداد ساده از صدتا توافق شفاهی بهتره",
  },
  {
    name: "پریسا احمدی",
    handle: "@parisa_a",
    avatar: Avatar3,
    text: "یه ایمیل ساده می‌تونه جلوی انقدر دردسر رو بگیره",
  },
  {
    name: "مهدی رضایی",
    handle: "@mahdi_rez",
    avatar: Avatar4,
    text: "مستندسازی درست نصف مشکلات رو حل می‌کنه",
  },
  {
    name: "سمیرا موسوی",
    handle: "@samira_m",
    avatar: Avatar1,
    text: "اولین باری که بدون قرارداد کار کردم، چقدر پشیمون شدم",
  },
  {
    name: "علیرضا کریمی",
    handle: "@alireza_k",
    avatar: Avatar2,
    text: "حتی با دوستان صمیمی هم باید همه چیز روی کاغذ بیاری",
  },
];

const row2Tweets = [
  {
    name: "سارا احمدی",
    handle: "@sara_ahmadi",
    avatar: Avatar4,
    text: "قرارداد خوب باید حق کارفرما و مجری رو حفظ کنه",
  },
  {
    name: "علی رضایی",
    handle: "@ali_rezaei",
    avatar: Avatar1,
    text: "همه چیز رو مکتوب کن، حافظه آدما ضعیفه",
  },
  {
    name: "مینا کریمی",
    handle: "@mina_karimi",
    avatar: Avatar2,
    text: "مشکل اصلی نبود مستندسازیه، نه نبود مهارت",
  },
  {
    name: "محمد رستمی",
    handle: "@mohammad_dev",
    avatar: Avatar3,
    text: "اسناد مکتوب مهم‌ترین ابزار کاری من شدن",
  },
  {
    name: "زهرا موسوی",
    handle: "@zahra_m",
    avatar: Avatar4,
    text: "قرارداد یعنی احترام به وقت و حق هر دو طرف",
  },
  {
    name: "حسین اکبری",
    handle: "@hosein_akbari",
    avatar: Avatar1,
    text: "با دوستان نزدیک هم باید مکتوب باشه",
  },
  {
    name: "فاطمه نوری",
    handle: "@fatemeh_n",
    avatar: Avatar2,
    text: "قرارداد ساده جلوی هزاران ساعت بحث رو می‌گیره",
  },
  {
    name: "کامران صادقی",
    handle: "@kamran_s",
    avatar: Avatar3,
    text: "وقتی مشخصه، کسی نمی‌تونه بگه یادم نیست",
  },
  {
    name: "ندا حسینی",
    handle: "@neda_h",
    avatar: Avatar4,
    text: "مستندسازی یعنی صداقت در کار",
  },
  {
    name: "بهزاد مرادی",
    handle: "@behzad_m",
    avatar: Avatar1,
    text: "سند مکتوب از هزارتا قول شفاهی بهتره",
  },
];
</script>

<style lang="scss" scoped>
// ── Section modifier ───────────────────────────────────────────

.section--tweets {
  background: #0a0a0a;
  overflow: hidden; // prevent animated tracks from blowing out page width

  // The tweet section title is a long sentence — needs smaller clamp floor
  .section__title {
    font-size: clamp(1.125rem, 3.5vw, 2.1rem);
    line-height: 1.4;
    margin-bottom: $spacing-xl;
  }
}

// ── Scroller block ─────────────────────────────────────────────

.tweet-scroller {
  position: relative;
  margin-bottom: $spacing-3xl;
  width: 100%;
  overflow: hidden;

  // Fade edges
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 340px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      90deg,
      #0a0a0a 0%,
      #0a0a0a 15%,
      rgba(10, 10, 10, 0.85) 40%,
      rgba(10, 10, 10, 0.3) 75%,
      transparent 100%
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(10, 10, 10, 0.3) 25%,
      rgba(10, 10, 10, 0.85) 60%,
      #0a0a0a 85%,
      #0a0a0a 100%
    );
  }

  // ── Row ────────────────────────────────────────────────────

  &__row {
    overflow: hidden;
    margin-bottom: $spacing-lg;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // ── Scrolling track ────────────────────────────────────────

  &__track {
    display: flex;
    gap: $spacing-md;
    width: fit-content;
    animation: scrollLeft 70s linear infinite;

    &--reverse {
      animation: scrollRight 70s linear infinite;
    }
  }
}

// ── Tweet card block ───────────────────────────────────────────

.tweet-card {
  flex: 0 0 360px;
  width: 360px;
  background: #111111;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: $color-accent-primary;
    background: rgba(252, 192, 21, 0.05);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(252, 192, 21, 0.5);

    .tweet-card__avatar {
      border-color: $color-accent-primary;
    }
  }

  // ── Header ─────────────────────────────────────────────────

  &__header {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.875rem;
  }

  // ── Avatar ─────────────────────────────────────────────────

  &__avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: border-color 0.3s ease;
  }

  // ── Author info ────────────────────────────────────────────

  &__author {
    flex: 1;
    min-width: 0;
  }

  &__name-row {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.25rem;
  }

  &__name {
    font-weight: 700;
    font-size: 0.9375rem;
    color: #fff;
  }

  &__verified {
    color: #1d9bf0;
    flex-shrink: 0;
  }

  &__handle {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    direction: ltr;
  }

  // ── Tweet text ─────────────────────────────────────────────

  &__text {
    font-size: 0.9375rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
  }
}

// ── Keyframes ──────────────────────────────────────────────────

@keyframes scrollLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50%);
  }
}

@keyframes scrollRight {
  from {
    transform: translateX(50%);
  }
  to {
    transform: translateX(0);
  }
}

// ── Responsive ─────────────────────────────────────────────────

@media (max-width: $breakpoint-lg) {
  .tweet-scroller::before,
  .tweet-scroller::after {
    width: 220px;
  }

  .tweet-card {
    flex: 0 0 320px;
    width: 320px;
  }
}

@media (max-width: $breakpoint-md) {
  .tweet-scroller::before,
  .tweet-scroller::after {
    width: 140px;
  }

  .tweet-card {
    flex: 0 0 260px;
    width: 260px;
    padding: 1rem;
  }
}

@media (max-width: $breakpoint-sm) {
  .tweet-scroller {
    &::before,
    &::after {
      width: 60px;
    }

    &__row {
      margin-bottom: $spacing-sm;
    }

    &__track {
      gap: 0.75rem;
      animation-duration: 45s;
    }
  }

  .tweet-card {
    flex: 0 0 220px;
    width: 220px;
    padding: 0.875rem;
    border-radius: $radius-md;

    &__avatar {
      width: 34px;
      height: 34px;
    }
    &__name {
      font-size: 0.8125rem;
    }
    &__handle {
      font-size: 0.75rem;
    }
    &__text {
      font-size: 0.8125rem;
      line-height: 1.4;
    }
  }
}

@media (max-width: 375px) {
  .tweet-card {
    flex: 0 0 200px;
    width: 200px;
    padding: 0.75rem;
  }
}
</style>
