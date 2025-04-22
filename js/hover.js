const refButton = document.getElementById('ref-button');

refButton.addEventListener('click', () => {
  const container = document.querySelector(".hover-reveal-container");
  if (!container) return;

  container.classList.toggle("hover-enabled");
  initHoverReveal();
});


function initHoverReveal() {
  const container = document.querySelector(".hover-reveal-container");
  if (!container) return;

  const wrapper = container.querySelector(".hover-wrapper");
  const overlay = container.querySelector(".hover-overlay");

  // Only activate hover effect if 'hover-enabled' class is present
  wrapper.onmousemove = (e) => {
    if (!container.classList.contains("hover-enabled")) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    overlay.style.clipPath = `circle(60px at ${x}px ${y}px)`;
  };

  wrapper.onmouseleave = () => {
    overlay.style.clipPath = `circle(0px at 50% 50%)`;
  };
}
