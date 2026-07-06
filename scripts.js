const root = document.documentElement;
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const savedTheme = localStorage.getItem("portfolio-theme");
const savedContrast = localStorage.getItem("portfolio-contrast");

if (savedTheme === "light") {
  root.dataset.theme = "light";
}

if (savedContrast === "high") {
  root.dataset.contrast = "high";
}

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mobileMenu.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

document.querySelectorAll('[data-action="theme"]').forEach((button) => {
  button.addEventListener("click", () => {
    const isLight = root.dataset.theme === "light";
    root.dataset.theme = isLight ? "dark" : "light";
    localStorage.setItem("portfolio-theme", isLight ? "dark" : "light");
  });
});

document.querySelectorAll('[data-action="contrast"]').forEach((button) => {
  button.addEventListener("click", () => {
    const isHighContrast = root.dataset.contrast === "high";
    if (isHighContrast) {
      delete root.dataset.contrast;
      localStorage.removeItem("portfolio-contrast");
    } else {
      root.dataset.contrast = "high";
      localStorage.setItem("portfolio-contrast", "high");
    }
  });
});

document.querySelectorAll(".pending-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
