<template>
  <section class="section section--tweets" id="experiences" ref="sectionRef">
    <div class="section__container">
      <div class="section__header section__header--center">
        <span class="section__badge" v-bind="slideDown()">تجربه‌ها</span>
        <div class="section__title-wrapper" v-bind="reveal(1)">
          <!--
            WHY: section__title--wide modifier replaces the scoped
            override of .section__title font-size that was inside
            section--tweets. Overriding a global element from inside
            a modifier breaks the single source of truth. A modifier
            on the element itself is the correct BEM pattern.
          -->
          <h2 class="section__title section__title--wide">
            سوءتفاهم و کاغذبازی‌های بی‌پایان یک الگوست، و ما با
            <span class="highlight">زونکن</span>
            راه‌حلش رو ساختیم.
          </h2>
        </div>
      </div>
    </div>

    <div class="tweet-scroller" v-bind="reveal(2)">
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
            <TweetCard :tweet="tweet" />
          </div>
        </div>
      </div>

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
            <TweetCard :tweet="tweet" />
          </div>
        </div>
      </div>
    </div>

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
import TweetCard from "@/components/landing/cards/TweetCard.vue";
import Avatar1 from "@/assets/images/avatars/avatar1.png";
import Avatar2 from "@/assets/images/avatars/avatar2.png";
import Avatar3 from "@/assets/images/avatars/avatar3.png";
import Avatar4 from "@/assets/images/avatars/avatar4.png";

// TweetCard is extracted to its own component:
// - Eliminates the 90-line SVG verified badge duplication
// - Makes each row's v-for loop clean and readable
// - See: @/components/landing/cards/TweetCard.vue

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
// ─────────────────────────────────────────────────────────────
// TweetTestimonials
// WHY notes:
// - section__title--wide added as a BEM modifier on section__title
//   instead of overriding font-size from inside section--tweets.
//   Overriding global elements from section modifiers breaks the
//   single source of truth and creates specificity surprises.
// - Keyframes (scroll-left / scroll-right) moved to main.scss
//   so they are defined once globally — scoped @keyframes in Vue
//   are duplicated in the CSS output for every component instance.
// - respond-to() mixin replaces raw @media.
// ─────────────────────────────────────────────────────────────

// ── Section modifier ───────────────────────────────────────────

.section--tweets {
  background: $color-bg-primary;
  overflow: hidden;
}

// ── Title width modifier ───────────────────────────────────────
// WHY: Instead of overriding .section__title from inside the
// section modifier (creates implicit coupling), we use an explicit
// BEM modifier on the element itself.

// Note: section__title is defined globally, this modifier is a
// legitimate extension. In the global main.scss you can add:
// .section__title--wide { font-size: clamp(1.125rem, 3.5vw, 2.1rem); line-height: 1.4; }
// For scoped styles in Vue the override below achieves the same.
:deep(.section__title--wide) {
  font-size: clamp(1.125rem, 3.5vw, 2.1rem);
  line-height: 1.4;
  margin-bottom: $spacing-xl;
}

// ── Scroller block ─────────────────────────────────────────────

.tweet-scroller {
  position: relative;
  margin-bottom: $spacing-3xl;
  width: 100%;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: rem(340);
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    // WHY gradient: solid color would hard-clip the cards.
    // Gradient creates a smooth fade-out so cards dissolve into the
    // background at both edges — gives the infinite scroll illusion depth.
    background: linear-gradient(
      to right,
      $color-bg-primary 0%,
      $color-bg-primary 20%,
      rgba(10, 10, 10, 0.7) 60%,
      transparent 100%
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      $color-bg-primary 0%,
      $color-bg-primary 20%,
      rgba(10, 10, 10, 0.7) 60%,
      transparent 100%
    );
  }

  &__row {
    overflow: hidden;
    margin-bottom: $spacing-lg;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // WHY: scroll-track mixin from _mixins.scss replaces the
  // duplicated display:flex / width:fit-content / animation block.
  &__track {
    @include scroll-track(left, 70s);
    gap: $spacing-md;

    &--reverse {
      animation-name: scroll-right;
    }
  }
}

// ── Tweet card wrapper ─────────────────────────────────────────
// WHY: Only sizing, border and hover styles live here.
// Inner layout (avatar, name, text) lives in TweetCard.vue.
// This keeps layout concerns (grid sizing) separate from
// presentational concerns (card content).

.tweet-card {
  flex: 0 0 rem(360);
  width: rem(360);
  background: $color-bg-secondary;
  border: 2px solid $color-border-strong;
  border-radius: $radius-lg;
  padding: rem(20);
  cursor: pointer;
  transition:
    border-color #{$transition-duration-fast} #{$transition-easing-standard},
    background-color #{$transition-duration-fast} #{$transition-easing-standard},
    box-shadow #{$transition-duration-fast} #{$transition-easing-standard};

  &:hover {
    border-color: $color-accent-primary;
    background: $color-accent-subtle;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(252, 192, 21, 0.5);

    // WHY :deep — TweetCard__avatar is inside a child component's
    // scoped styles. :deep() allows the parent hover to reach it.
    :deep(.tweet-card__avatar) {
      border-color: $color-accent-primary;
    }
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(lg) {
  .tweet-scroller::before,
  .tweet-scroller::after {
    width: rem(220);
  }

  .tweet-card {
    flex: 0 0 rem(320);
    width: rem(320);
  }
}

@include respond-to(md) {
  .tweet-scroller::before,
  .tweet-scroller::after {
    width: rem(140);
  }

  .tweet-card {
    flex: 0 0 rem(260);
    width: rem(260);
    padding: rem(16);
  }
}

@include respond-to(sm) {
  .tweet-scroller {
    &::before,
    &::after {
      width: rem(60);
    }

    &__row {
      margin-bottom: $spacing-sm;
    }

    &__track {
      gap: rem(12);
      animation-duration: 45s;
    }
  }

  .tweet-card {
    flex: 0 0 rem(220);
    width: rem(220);
    padding: rem(14);
    border-radius: $radius-md;
    // Inner element sizes (avatar, text) handled in TweetCard.vue
  }
}

@media (max-width: 375px) {
  .tweet-card {
    flex: 0 0 200px;
    width: rem(200);
    padding: 0.75rem;
  }
}
</style>
