if (window.bootstrap) {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
    new bootstrap.Tooltip(el);
  });
}

const navLinks = document.querySelectorAll('#navigation-bar .nav-link[href^="#"]');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const onScroll = () => {
  const fromTop = window.scrollY + 160;
  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= fromTop) current = section;
  }
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
