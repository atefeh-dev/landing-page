import { onMounted, onBeforeUnmount, ref } from "vue";

export function useScrollAnimation(elementRef) {
  const isVisible = ref(false);
  let observer = null;

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            // Stop observing after the animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(elementRef.value);
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    isVisible,
  };
}
