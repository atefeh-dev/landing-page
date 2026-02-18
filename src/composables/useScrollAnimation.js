import { ref, onMounted, onBeforeUnmount } from "vue";

/**
 * useScrollAnimation
 *
 * Returns helpers that bind [data-animate] and [data-delay] attributes
 * to elements. When the section enters the viewport, adds .is-visible
 * to each observed element.
 *
 * Usage in template:
 *   <span v-bind="slideDown(1)">badge</span>
 *   <h2  v-bind="reveal(2)">title</h2>
 *
 * CSS in main.scss drives the actual animation via:
 *   [data-animate].is-visible { opacity: 1; transform: none; }
 */
export function useScrollAnimation(sectionRef, threshold = 0.15) {
  const isVisible = ref(false);
  let observer = null;
  const elements = new Set();

  function observeElement(el) {
    if (!el) return;
    elements.add(el);
    if (isVisible.value) {
      el.classList.add("is-visible");
    }
  }

  /**
   * Returns attrs object for a fade-up element.
   * @param {number} [delay] - stagger index (1–6)
   */
  function reveal(delay) {
    return {
      "data-animate": "fade-up",
      ...(delay ? { "data-delay": String(delay) } : {}),
    };
  }

  /**
   * Returns attrs object for a slide-down element.
   * @param {number} [delay] - stagger index (1–6)
   */
  function slideDown(delay) {
    return {
      "data-animate": "slide-down",
      ...(delay ? { "data-delay": String(delay) } : {}),
    };
  }

  onMounted(() => {
    if (!sectionRef.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;

          // Animate all elements inside the section that have data-animate
          sectionRef.value
            .querySelectorAll("[data-animate]")
            .forEach((el) => el.classList.add("is-visible"));

          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(sectionRef.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return { reveal, slideDown, isVisible };
}
