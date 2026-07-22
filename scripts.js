const root = document.documentElement;
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const savedTheme = localStorage.getItem("portfolio-theme");
const savedContrast = localStorage.getItem("portfolio-contrast");
const savedLightness = localStorage.getItem("portfolio-lightness");
const darkModeControl = document.querySelector('[data-setting="dark-mode"]');
const lightnessControl = document.querySelector('[data-setting="lightness"]');
const contrastControl = document.querySelector('[data-setting="contrast"]');
const accessibilityPanels = [...document.querySelectorAll(".accessibility-panel")];
const accessibilityTriggers = [...document.querySelectorAll('[data-action="theme"], [data-action="contrast"]')];
let activeAccessibilityTrigger = null;

function clampSetting(value) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}

function setTheme(isDark, persist = true) {
  root.dataset.theme = isDark ? "dark" : "light";
  if (darkModeControl) darkModeControl.checked = isDark;
  if (persist) localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

function updateDisplaySettings(persist = true) {
  const lightness = clampSetting(Number(lightnessControl?.value || 0));
  const contrast = clampSetting(Number(contrastControl?.value || 0));

  root.style.setProperty("--display-brightness", String(1 + lightness * 0.004));
  root.style.setProperty("--display-contrast", String(1 + contrast * 0.0065));
  root.classList.toggle("display-adjusted", lightness > 0 || contrast > 0);

  if (contrast === 100) root.dataset.contrast = "high";
  else delete root.dataset.contrast;

  lightnessControl?.setAttribute("aria-valuetext", lightness === 0 ? "Normal" : `${lightness}% brighter`);
  contrastControl?.setAttribute("aria-valuetext", contrast === 0 ? "Normal" : `${contrast}% enhanced`);

  if (persist) {
    localStorage.setItem("portfolio-lightness", String(lightness));
    localStorage.setItem("portfolio-contrast", String(contrast));
  }
}

const initialLightness = clampSetting(Number(savedLightness));
const initialContrast = savedContrast === "high" ? 100 : clampSetting(Number(savedContrast));

if (lightnessControl) lightnessControl.value = String(initialLightness);
if (contrastControl) contrastControl.value = String(initialContrast);
setTheme(savedTheme !== "light", false);
updateDisplaySettings(false);

function setPanelTriggerState(panelId, expanded) {
  accessibilityTriggers
    .filter((button) => button.getAttribute("aria-controls") === panelId)
    .forEach((button) => {
      button.setAttribute("aria-expanded", String(expanded));
      const settingName = panelId === "brightness-panel" ? "brightness" : "contrast";
      button.setAttribute("aria-label", `${expanded ? "Close" : "Open"} ${settingName} settings`);
    });
}

function closeAccessibilityPanels(returnFocus = false) {
  const triggerToRestore = activeAccessibilityTrigger;
  accessibilityPanels.forEach((panel) => {
    panel.hidden = true;
    setPanelTriggerState(panel.id, false);
  });
  activeAccessibilityTrigger = null;
  if (returnFocus) triggerToRestore?.focus();
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
    link.addEventListener("click", () => {
      closeAccessibilityPanels();
      closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeAccessibilityPanels();
      closeMenu();
    }
  });
}

accessibilityTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    const shouldOpen = panel.hidden;
    closeAccessibilityPanels();
    if (!shouldOpen) return;

    panel.hidden = false;
    activeAccessibilityTrigger = button;
    setPanelTriggerState(panel.id, true);
    panel.querySelector("input")?.focus();
  });
});

darkModeControl?.addEventListener("change", () => setTheme(darkModeControl.checked));
lightnessControl?.addEventListener("input", () => updateDisplaySettings());
contrastControl?.addEventListener("input", () => updateDisplaySettings());

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const openPanel = accessibilityPanels.find((panel) => !panel.hidden);
  if (!openPanel) return;
  if (openPanel.contains(event.target) || event.target.closest(`[aria-controls="${openPanel.id}"]`)) return;
  closeAccessibilityPanels();
});

document.querySelectorAll(".pending-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

const copyEmailButton = document.querySelector("[data-copy-email]");

if (copyEmailButton) {
  const localPart = ["james", ".", "spiller"].join("");
  const domainPart = ["gmail", ".", "com"].join("");
  const addressSeparator = String.fromCharCode(64);
  const emailAddress = [localPart, addressSeparator, domainPart].join("");
  const copyEmailStatus = document.querySelector("[data-copy-email-status]");
  let copyResetTimer;

  async function copyEmailAddress() {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(emailAddress);
        return true;
      } catch {
        // Use the selection fallback when clipboard permission is unavailable.
      }
    }

    const temporaryField = document.createElement("textarea");
    temporaryField.value = emailAddress;
    temporaryField.setAttribute("readonly", "");
    temporaryField.style.position = "fixed";
    temporaryField.style.opacity = "0";
    document.body.appendChild(temporaryField);
    temporaryField.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    temporaryField.remove();
    return copied;
  }

  copyEmailButton?.addEventListener("click", async () => {
    const copied = await copyEmailAddress();
    const confirmation = copied ? "Email copied" : "Copy unavailable";

    copyEmailButton.textContent = confirmation;
    if (copyEmailStatus) copyEmailStatus.textContent = copied ? "Email address copied to clipboard" : "Email address could not be copied";

    window.clearTimeout(copyResetTimer);
    copyResetTimer = window.setTimeout(() => {
      copyEmailButton.textContent = "Copy email address";
      if (copyEmailStatus) copyEmailStatus.textContent = "";
    }, 2400);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (accessibilityPanels.some((panel) => !panel.hidden)) {
    event.preventDefault();
    closeAccessibilityPanels(true);
  } else {
    closeMenu();
  }
});

const imageDialog = document.querySelector(".case-study-lightbox");
const imageDialogImage = imageDialog?.querySelector(".case-study-lightbox-image");
const imageDialogClose = imageDialog?.querySelector(".case-study-lightbox-close");

if (imageDialog && imageDialogImage && typeof imageDialog.showModal === "function") {
  document.querySelectorAll(".case-study-expandable").forEach((link) => {
    link.addEventListener("click", (event) => {
      const previewImage = link.querySelector("img");
      event.preventDefault();
      imageDialogImage.src = link.href;
      imageDialogImage.alt = previewImage?.alt || "Expanded case-study image";
      imageDialog.classList.toggle("case-study-lightbox-fit-height", link.dataset.lightboxFit === "height");
      imageDialog.classList.toggle("case-study-lightbox-fit-flow-height", link.dataset.lightboxFit === "flow-height");
      imageDialog.showModal();
      document.body.classList.add("lightbox-open");
    });
  });

  imageDialogClose?.addEventListener("click", () => imageDialog.close());

  imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageDialog.open) imageDialog.close();
  });

  imageDialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    imageDialog.classList.remove("case-study-lightbox-fit-height");
    imageDialog.classList.remove("case-study-lightbox-fit-flow-height");
    imageDialogImage.removeAttribute("src");
    imageDialogImage.alt = "";
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
