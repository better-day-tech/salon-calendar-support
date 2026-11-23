(() => {
  const body = document.body;
  if (!body.classList.contains("home")) return;

  const setScrolled = () => {
    body.classList.toggle("scrolled", window.scrollY > 28);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  const examples = document.getElementById("poster-examples");
  const buttons = document.querySelector(".poster-buttons");
  if (!examples || !buttons) return;
  const previous = buttons.querySelector('[data-poster-step="-1"]');
  const next = buttons.querySelector('[data-poster-step="1"]');

  const update = () => {
    const maximum = examples.scrollWidth - examples.clientWidth;
    buttons.hidden = maximum <= 1;
    examples.tabIndex = maximum > 1 ? 0 : -1;
    previous.disabled = examples.scrollLeft <= 1;
    next.disabled = examples.scrollLeft >= maximum - 1;
  };
  const move = (direction) => {
    const first = examples.querySelector("figure");
    const gap = parseFloat(getComputedStyle(examples).columnGap) || 0;
    examples.scrollBy({ left: direction * (first.getBoundingClientRect().width + gap), behavior: "instant" });
    update();
  };
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  examples.addEventListener("keydown", (event) => {
    if (event.target !== examples || examples.tabIndex < 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home" || event.key === "End") {
      examples.scrollTo({ left: event.key === "Home" ? 0 : examples.scrollWidth, behavior: "instant" });
      update();
    } else {
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  });
  examples.addEventListener("scroll", update, { passive: true });
  new ResizeObserver(update).observe(examples);
  update();

})();
