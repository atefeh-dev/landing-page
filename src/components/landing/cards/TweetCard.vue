<template>
  <article class="tweet-card__inner">
    <header class="tweet-card__header">
      <img
        class="tweet-card__avatar"
        :src="tweet.avatar"
        :alt="tweet.name"
        loading="lazy"
      />

      <div class="tweet-card__author">
        <div class="tweet-card__name-row">
          <span class="tweet-card__name">{{ tweet.name }}</span>

          <!-- Verified badge — inline SVG kept in component, not duplicated per row -->
          <svg
            class="tweet-card__verified"
            aria-label="تأیید شده"
            viewBox="0 0 22 22"
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.232-.636.277-1.327.13-1.99-.146-.662-.479-1.267-.955-1.743-.476-.477-1.08-.81-1.743-.956-.663-.146-1.354-.1-1.99.131-.273-.587-.704-1.086-1.245-1.44S9.917 1.504 9.27 1.486c-.646.018-1.275.215-1.816.57-.54.354-.972.852-1.246 1.438-.635-.231-1.326-.277-1.99-.13-.662.146-1.268.48-1.743.955-.477.476-.81 1.08-.956 1.743-.146.663-.1 1.354.131 1.99-.587.274-1.086.705-1.44 1.246-.356.54-.552 1.17-.57 1.817.018.647.215 1.276.57 1.817.355.54.853.972 1.44 1.245-.231.636-.277 1.327-.13 1.99.146.662.478 1.267.955 1.743.476.476 1.08.81 1.743.955.663.147 1.354.101 1.99-.13.273.587.704 1.086 1.245 1.44.54.354 1.17.551 1.816.569.647-.018 1.276-.215 1.817-.57.54-.354.972-.852 1.245-1.44.636.232 1.327.277 1.99.131.663-.146 1.268-.48 1.744-.955.477-.476.81-1.082.955-1.744.146-.663.1-1.354-.13-1.99.585-.274 1.083-.705 1.438-1.245.354-.54.552-1.17.57-1.816zm-9.217 3.83l-3.48-3.48 1.414-1.414 2.066 2.065 4.064-4.064 1.414 1.414-5.478 5.48z"
              fill="currentColor"
            />
          </svg>
        </div>

        <span class="tweet-card__handle" dir="ltr">{{ tweet.handle }}</span>
      </div>
    </header>

    <p class="tweet-card__text">{{ tweet.text }}</p>
  </article>
</template>

<script setup>
defineProps({
  tweet: {
    type: Object,
    required: true,
    // Shape: { name: String, handle: String, avatar: String, text: String }
  },
});
</script>

<style lang="scss" scoped>
// ─────────────────────────────────────────────────────────────
// TweetCard
// WHY a separate component:
// The verified badge SVG (90 lines) was duplicated in both
// row1 and row2 of TweetTestimonials. Extracting to a component
// eliminates that duplication and makes TweetTestimonials's
// template clean and declarative.
// ─────────────────────────────────────────────────────────────

.tweet-card {
  &__inner {
    // No extra wrapper styles needed — .tweet-card on the parent
    // div in TweetTestimonials handles all sizing and borders.
    // This component is purely structural.
    display: contents;
  }

  &__header {
    display: flex;
    gap: rem(12);
    margin-bottom: rem(14);
  }

  &__avatar {
    width: rem(42);
    height: rem(42);
    border-radius: $radius-full;
    object-fit: cover;
    border: 2px solid $color-border-strong;
    transition: border-color #{$transition-duration-fast}
      #{$transition-easing-standard};
    flex-shrink: 0;
  }

  &__author {
    flex: 1;
    min-width: 0;
  }

  &__name-row {
    display: flex;
    align-items: center;
    gap: rem(6);
    margin-bottom: rem(4);
  }

  &__name {
    font-weight: $font-weight-bold;
    font-size: rem(15);
    color: $color-text-primary;
  }

  &__verified {
    color: #1d9bf0;
    flex-shrink: 0;
  }

  &__handle {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__text {
    font-size: rem(15);
    line-height: 1.5;
    color: $color-text-secondary;
  }
}

// ── Responsive ─────────────────────────────────────────────────

@include respond-to(sm) {
  .tweet-card {
    &__avatar {
      width: rem(34);
      height: rem(34);
    }
    &__name {
      font-size: rem(13);
    }
    &__handle {
      font-size: rem(12);
    }
    &__text {
      font-size: rem(13);
      line-height: 1.4;
    }
  }
}
</style>
