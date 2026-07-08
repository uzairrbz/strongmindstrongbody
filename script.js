const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const revealTargets = document.querySelectorAll(
  [
    ".intro",
    ".mission-band",
    ".image-story .section-heading",
    ".image-card",
    ".service-card",
    ".method .section-heading",
    ".method-grid article",
    ".transformation-band",
    ".recipe-card",
    ".consultation-panel",
    ".review-card",
    ".instagram",
    ".contact-panel",
  ].join(",")
);

if (window.lucide) {
  window.lucide.createIcons();
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

revealTargets.forEach((target, index) => {
  target.classList.add("reveal");
  target.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});

const revealVisibleTargets = () => {
  const triggerPoint = window.innerHeight * 0.88;

  revealTargets.forEach((target) => {
    if (target.classList.contains("is-visible")) {
      return;
    }

    if (target.getBoundingClientRect().top < triggerPoint) {
      target.classList.add("is-visible");
    }
  });
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
  revealVisibleTargets();
  window.addEventListener("scroll", revealVisibleTargets, { passive: true });
  window.addEventListener("resize", revealVisibleTargets);
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

window.addEventListener("load", () => {
  window.instgrm?.Embeds?.process();
});
