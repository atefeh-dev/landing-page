import { ref, onMounted, onBeforeUnmount } from "vue";

export function useScrollAnimation(elementRef, threshold = 0.3) {
  const isVisible = ref(false);
  let observer = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (elementRef.value) observer.observe(elementRef.value);
  });

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
  });

  /**
   * Returns class object for a fade-up animation element.
   * @param {number} delay - delay index (1–6). 0 = no delay.
   */
  function reveal(delay = 0) {
    return {
      "animate-fade-up": true,
      [`animate-delay-${delay}`]: delay > 0,
      "in-view": isVisible.value,
    };
  }

  /**
   * Returns class object for a slide-down animation element (used on badges).
   * @param {number} delay - delay index (1–6). 0 = no delay.
   */
  function slideDown(delay = 0) {
    return {
      "animate-slide-down": true,
      [`animate-delay-${delay}`]: delay > 0,
      "in-view": isVisible.value,
    };
  }

  return { isVisible, reveal, slideDown };
}
