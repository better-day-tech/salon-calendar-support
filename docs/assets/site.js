(() => {
  const body = document.body;
  if (!body.classList.contains("home")) return;

  const setScrolled = () => {
    body.classList.toggle("scrolled", window.scrollY > 28);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });
})();
