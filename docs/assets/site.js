(() => {
  const body = document.body;
  if (!body.classList.contains("home")) return;

  const setScrolled = () => {
    body.classList.toggle("scrolled", window.scrollY > 28);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  const modeSteps = Array.from(document.querySelectorAll("[data-mode-step]"));
  if (!modeSteps.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        body.dataset.activeMode = visible.target.dataset.modeStep;
      }
    },
    {
      root: null,
      rootMargin: "-30% 0px -35% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  modeSteps.forEach((step) => observer.observe(step));
})();
