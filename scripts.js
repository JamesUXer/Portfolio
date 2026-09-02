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

const displayPalettes = {
  dark: {
    "--bg": { base: "#1d1d1d", contrast: "#000000" },
    "--text": { base: "#f7f7f5", contrast: "#ffffff" },
    "--soft-text": { base: "#d0d0cd", contrast: "#ffffff" },
    "--muted-text": { base: "#9c9c99", contrast: "#ffffff" },
    "--panel": { base: "#ffffff", contrast: "#ffffff" },
    "--panel-text": { base: "#1d1d1d", contrast: "#000000" },
    "--line": { base: "#4d4d4a", contrast: "#ffffff" },
    "--accent": { base: "#f0c8f6", contrast: "#ff9fff" },
    "--focus": { base: "#f49cff", contrast: "#ffff00" },
    "--colour-support-primary": { base: "#71d1c8", contrast: "#a9fff6" },
    "--colour-support-secondary": { base: "#f2ad3d", contrast: "#ffd166" },
    "--surface-supporting": { base: "#12383a", contrast: "#000000" },
    "--text-on-support-primary": { base: "#071c20", contrast: "#000000" },
    "--stage-discover-ink": { base: "#81d584", contrast: "#ffffff" },
    "--stage-discover-bright": { base: "#81d584", contrast: "#ffffff" },
    "--stage-discover-soft": { base: "#2f3e30", contrast: "#000000" },
    "--stage-define-ink": { base: "#71d1c8", contrast: "#ffffff" },
    "--stage-define-bright": { base: "#71d1c8", contrast: "#ffffff" },
    "--stage-define-soft": { base: "#2c3d3c", contrast: "#000000" },
    "--stage-develop-ink": { base: "#f2ad3d", contrast: "#ffffff" },
    "--stage-develop-bright": { base: "#f2ad3d", contrast: "#ffffff" },
    "--stage-develop-soft": { base: "#433723", contrast: "#000000" },
    "--stage-outcome-ink": { base: "#fea18a", contrast: "#ffffff" },
    "--stage-outcome-bright": { base: "#fea18a", contrast: "#ffffff" },
    "--stage-outcome-soft": { base: "#463531", contrast: "#000000" },
  },
  light: {
    "--bg": { base: "#f5f5f1", contrast: "#ffffff" },
    "--text": { base: "#1d1d1d", contrast: "#000000" },
    "--soft-text": { base: "#30302f", contrast: "#000000" },
    "--muted-text": { base: "#5f5f5c", contrast: "#000000" },
    "--panel": { base: "#ffffff", contrast: "#ffffff" },
    "--panel-text": { base: "#1d1d1d", contrast: "#000000" },
    "--line": { base: "#b9b9b4", contrast: "#000000" },
    "--accent": { base: "#8e3f9c", contrast: "#5e006c" },
    "--focus": { base: "#861e99", contrast: "#43004d" },
    "--colour-support-primary": { base: "#006b76", contrast: "#004650" },
    "--colour-support-secondary": { base: "#a85600", contrast: "#713200" },
    "--surface-supporting": { base: "#e7f3f1", contrast: "#ffffff" },
    "--text-on-support-primary": { base: "#ffffff", contrast: "#ffffff" },
    "--stage-discover-ink": { base: "#157123", contrast: "#000000" },
    "--stage-discover-bright": { base: "#81d584", contrast: "#ffffff" },
    "--stage-discover-soft": { base: "#deefdb", contrast: "#ffffff" },
    "--stage-define-ink": { base: "#006b76", contrast: "#000000" },
    "--stage-define-bright": { base: "#71d1c8", contrast: "#ffffff" },
    "--stage-define-soft": { base: "#dbeee9", contrast: "#ffffff" },
    "--stage-develop-ink": { base: "#a85600", contrast: "#000000" },
    "--stage-develop-bright": { base: "#f2ad3d", contrast: "#ffffff" },
    "--stage-develop-soft": { base: "#f4e7cd", contrast: "#ffffff" },
    "--stage-outcome-ink": { base: "#95402b", contrast: "#000000" },
    "--stage-outcome-bright": { base: "#fea18a", contrast: "#ffffff" },
    "--stage-outcome-soft": { base: "#f7e4dc", contrast: "#ffffff" },
  },
};

function clampSetting(value) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16));
}

function mixColor(from, to, amount) {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const channels = start.map((channel, index) => Math.round(channel + (end[index] - channel) * amount));
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function setTheme(isDark, persist = true) {
  root.dataset.theme = isDark ? "dark" : "light";
  if (darkModeControl) darkModeControl.checked = isDark;
  if (persist) localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  updateDisplaySettings(false);
}

function updateDisplaySettings(persist = true) {
  const lightness = clampSetting(Number(lightnessControl?.value || 0));
  const contrast = clampSetting(Number(contrastControl?.value || 0));

  const palette = displayPalettes[root.dataset.theme === "light" ? "light" : "dark"];
  const contrastAmount = contrast / 100;
  const lightnessAmount = (lightness / 100) * 0.3;

  Object.entries(palette).forEach(([property, colors]) => {
    const contrastedColor = mixColor(colors.base, colors.contrast, contrastAmount);
    const adjustedColor = mixColor(contrastedColor, "#ffffff", lightnessAmount);
    root.style.setProperty(property, adjustedColor);
  });

  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", root.style.getPropertyValue("--bg"));

  lightnessControl?.setAttribute("aria-valuetext", lightness === 0 ? "Normal" : `${lightness}% brighter`);
  contrastControl?.setAttribute("aria-valuetext", contrast === 0 ? "Normal" : `${contrast}% higher contrast`);

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

function closeMenu(returnFocus = false) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
  if (returnFocus) menuButton.focus();
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

document.querySelectorAll(".project-card-interactive[data-project-href], .progress-card-interactive[data-project-href]").forEach((card) => {
  card.addEventListener("click", (event) => {
    const clickedElement = event.target instanceof Element ? event.target : null;
    const clickedInteractiveElement = clickedElement?.closest(
      "a, button, input, textarea, select, label"
    );

    if (
      event.defaultPrevented ||
      clickedInteractiveElement ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    window.location.assign(card.dataset.projectHref);
  });

  card.addEventListener("keydown", (event) => {
    if (event.target !== card || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    window.location.assign(card.dataset.projectHref);
  });
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
    closeMenu(true);
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

async function initHeroSheen() {
  const artwork = document.querySelector(".hero-artwork");
  const sheenLayer = document.querySelector(".hero-sheen-layer");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!artwork || !sheenLayer || reducedMotion.matches) return;

  // Prototype controls: appearance is in styles.css; interaction timing and reach live here.
  const settings = {
    vectorAsset: "assets/images/hero-artwork-traced.svg",
    sourceWidth: 669,
    sourceHeight: 399,
    openingDuration: 8600,
    openingStagger: 700,
    openingOpacity: 0.56,
    openingSegmentLength: 86,
    openingSensitivity: 52,
    openingBandBoundaries: [205, 285],
    hoverSpeed: 182,
    hoverMinDuration: 900,
    hoverMaxDuration: 2200,
    hoverPreferredCircuitLength: 300,
    hoverMaximumCircuitLength: 460,
    hoverCircuitRadius: 86,
    hoverCandidateLimit: 6,
    hoverDistancePenalty: 1.8,
    hoverBeamWidth: 100,
    hoverMaximumCircuitEdges: 52,
    hoverSensitivity: 22,
    hoverCooldown: 300,
    hoverResetDistance: 42,
    hoverSegmentLength: 36,
    sampleSpacing: 5,
    junctionTolerance: 4.2,
    junctionSampleSpacing: 2.5,
    minimumGraphEdgeLength: 2.5,
    circuitPointSpacing: 3.5,
  };
  const openingAnchors = [
    { x: 110, y: 145 },
    { x: 280, y: 160 },
    { x: 280, y: 234 },
    { x: 180, y: 275 },
    { x: 170, y: 315 },
    { x: 298, y: 310 },
    { x: 365, y: 288 },
    { x: 418, y: 235 },
    { x: 500, y: 280 },
    { x: 515, y: 115 },
    { x: 570, y: 190 },
    { x: 110, y: 260 },
  ];
  const svgNamespace = "http://www.w3.org/2000/svg";
  const activeAnimations = new Set();
  let pointerEnabled = false;

  function trackAnimation(animation) {
    activeAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => activeAnimations.delete(animation));
    return animation;
  }

  function stopMotion() {
    pointerEnabled = false;
    activeAnimations.forEach((animation) => animation.cancel());
    activeAnimations.clear();
    sheenLayer.querySelectorAll(".hero-sheen-pass").forEach((pass) => pass.remove());
  }

  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) stopMotion();
  });

  let response;
  try {
    response = await fetch(settings.vectorAsset);
    if (!response.ok) return;
  } catch {
    return;
  }

  const parsedSvg = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
  if (parsedSvg.querySelector("parsererror")) return;

  const vector = document.importNode(parsedSvg.documentElement, true);
  vector.classList.add("hero-sheen-vector");
  vector.setAttribute("aria-hidden", "true");
  vector.setAttribute("focusable", "false");
  const circuitGroup = document.createElementNS(svgNamespace, "g");
  circuitGroup.classList.add("hero-sheen-circuits");
  const passGroup = document.createElementNS(svgNamespace, "g");
  passGroup.classList.add("hero-sheen-passes");
  vector.append(circuitGroup, passGroup);
  sheenLayer.replaceChildren(vector);

  const paths = [...vector.querySelectorAll("#hero-traced-lines path")]
    .map((path) => {
      try {
        return { path, id: path.id, length: path.getTotalLength() };
      } catch {
        return null;
      }
    })
    .filter((entry) => entry && entry.length >= 5);

  if (!paths.length || reducedMotion.matches) return;

  const splitLengthsByEntry = new Map(paths.map((entry) => [entry, [0, entry.length]]));
  const junctionGrid = new Map();
  const gridSize = settings.junctionSampleSpacing;

  function gridKey(column, row) {
    return `${column}:${row}`;
  }

  function addJunctionSample(sample) {
    const column = Math.floor(sample.x / gridSize);
    const row = Math.floor(sample.y / gridSize);
    const key = gridKey(column, row);
    if (!junctionGrid.has(key)) junctionGrid.set(key, []);
    junctionGrid.get(key).push(sample);
  }

  function refinePathProjection(entry, sampleLength, x, y, spacing = settings.junctionSampleSpacing) {
    let start = Math.max(0, sampleLength - spacing * 1.5);
    let end = Math.min(entry.length, sampleLength + spacing * 1.5);

    for (let iteration = 0; iteration < 8; iteration += 1) {
      const firstLength = start + (end - start) / 3;
      const secondLength = end - (end - start) / 3;
      const firstPoint = entry.path.getPointAtLength(firstLength);
      const secondPoint = entry.path.getPointAtLength(secondLength);
      const firstDistance = Math.hypot(firstPoint.x - x, firstPoint.y - y);
      const secondDistance = Math.hypot(secondPoint.x - x, secondPoint.y - y);
      if (firstDistance <= secondDistance) end = secondLength;
      else start = firstLength;
    }

    const length = (start + end) / 2;
    const point = entry.path.getPointAtLength(length);
    return { length, x: point.x, y: point.y, distance: Math.hypot(point.x - x, point.y - y) };
  }

  paths.forEach((entry) => {
    const divisions = Math.max(1, Math.ceil(entry.length / settings.junctionSampleSpacing));
    for (let index = 0; index <= divisions; index += 1) {
      const length = (entry.length * index) / divisions;
      const point = entry.path.getPointAtLength(length);
      addJunctionSample({ entry, length, x: point.x, y: point.y });
    }
  });

  const searchCells = Math.ceil(settings.junctionTolerance / gridSize) + 1;
  // Spokes often meet a ring mid-path, so project nearby endpoints onto that path as graph junctions.
  paths.forEach((owner) => {
    [0, owner.length].forEach((endpointLength) => {
      const endpoint = owner.path.getPointAtLength(endpointLength);
      const column = Math.floor(endpoint.x / gridSize);
      const row = Math.floor(endpoint.y / gridSize);
      const nearestByEntry = new Map();

      for (let columnOffset = -searchCells; columnOffset <= searchCells; columnOffset += 1) {
        for (let rowOffset = -searchCells; rowOffset <= searchCells; rowOffset += 1) {
          const nearby = junctionGrid.get(gridKey(column + columnOffset, row + rowOffset)) ?? [];
          nearby.forEach((sample) => {
            if (sample.entry === owner) return;
            const distance = Math.hypot(sample.x - endpoint.x, sample.y - endpoint.y);
            const current = nearestByEntry.get(sample.entry);
            if (!current || distance < current.distance) nearestByEntry.set(sample.entry, { sample, distance });
          });
        }
      }

      nearestByEntry.forEach(({ sample, distance }) => {
        if (distance > settings.junctionTolerance + settings.junctionSampleSpacing) return;
        const projection = refinePathProjection(sample.entry, sample.length, endpoint.x, endpoint.y);
        if (projection.distance <= settings.junctionTolerance) {
          splitLengthsByEntry.get(sample.entry).push(projection.length);
        }
      });
    });
  });

  const graphNodes = [];
  const graphEdges = [];

  function findOrCreateNode(point) {
    const existing = graphNodes.find(
      (node) => Math.hypot(node.x - point.x, node.y - point.y) <= settings.junctionTolerance
    );
    if (existing) {
      existing.x = (existing.x * existing.count + point.x) / (existing.count + 1);
      existing.y = (existing.y * existing.count + point.y) / (existing.count + 1);
      existing.count += 1;
      return existing.index;
    }

    const index = graphNodes.length;
    graphNodes.push({ index, x: point.x, y: point.y, count: 1, edges: [] });
    return index;
  }

  paths.forEach((entry) => {
    const rawLengths = splitLengthsByEntry.get(entry).sort((first, second) => first - second);
    const splitLengths = [0];
    rawLengths.forEach((length) => {
      if (length <= settings.minimumGraphEdgeLength || length >= entry.length - settings.minimumGraphEdgeLength) return;
      if (length - splitLengths.at(-1) >= settings.minimumGraphEdgeLength) splitLengths.push(length);
    });
    splitLengths.push(entry.length);

    for (let index = 1; index < splitLengths.length; index += 1) {
      const startLength = splitLengths[index - 1];
      const endLength = splitLengths[index];
      const startPoint = entry.path.getPointAtLength(startLength);
      const endPoint = entry.path.getPointAtLength(endLength);
      const startNode = findOrCreateNode(startPoint);
      const endNode = findOrCreateNode(endPoint);
      const edge = {
        index: graphEdges.length,
        entry,
        startLength,
        endLength,
        length: endLength - startLength,
        startNode,
        endNode,
      };
      graphEdges.push(edge);
      graphNodes[startNode].edges.push(edge.index);
      if (endNode !== startNode) graphNodes[endNode].edges.push(edge.index);
    }
  });

  const discoveredAt = Array(graphNodes.length).fill(-1);
  const lowLink = Array(graphNodes.length).fill(-1);
  const bridgeEdges = new Set();
  let graphTime = 0;

  function markBridges(nodeIndex, parentEdge = -1) {
    discoveredAt[nodeIndex] = graphTime;
    lowLink[nodeIndex] = graphTime;
    graphTime += 1;

    graphNodes[nodeIndex].edges.forEach((edgeIndex) => {
      if (edgeIndex === parentEdge) return;
      const edge = graphEdges[edgeIndex];
      const nextNode = edge.startNode === nodeIndex ? edge.endNode : edge.startNode;
      if (nextNode === nodeIndex) return;

      if (discoveredAt[nextNode] === -1) {
        markBridges(nextNode, edgeIndex);
        lowLink[nodeIndex] = Math.min(lowLink[nodeIndex], lowLink[nextNode]);
        if (lowLink[nextNode] > discoveredAt[nodeIndex]) bridgeEdges.add(edgeIndex);
        return;
      }

      lowLink[nodeIndex] = Math.min(lowLink[nodeIndex], discoveredAt[nextNode]);
    });
  }

  graphNodes.forEach((node) => {
    if (discoveredAt[node.index] === -1) markBridges(node.index);
  });

  // A segment can only take part in a forward loop when removing it does not break its network.
  const circuitEdges = graphEdges.filter((edge) => !bridgeEdges.has(edge.index));
  const circuitSamples = circuitEdges.flatMap((edge) => {
    const divisions = Math.max(1, Math.ceil(edge.length / settings.sampleSpacing));
    return Array.from({ length: divisions + 1 }, (_, index) => {
      const length = edge.startLength + (edge.length * index) / divisions;
      const point = edge.entry.path.getPointAtLength(length);
      return { edge, entry: edge.entry, length, x: point.x, y: point.y };
    });
  });
  const circuitRouteCache = new Map();
  let circuitId = 0;

  function playSheen(entry, options = {}) {
    const isCircuit = options.circuit === true;
    const segmentLimit = isCircuit ? 0.45 : 0.72;
    const segmentLength = Math.min(options.segmentLength ?? settings.hoverSegmentLength, entry.length * segmentLimit);
    const maximumStart = Math.max(0, entry.length - segmentLength);
    const start = isCircuit ? 0 : Math.max(0, Math.min(maximumStart, options.start ?? 0));
    const end = isCircuit ? entry.length : Math.max(0, Math.min(maximumStart, options.end ?? maximumStart));
    const duration = options.duration ?? settings.hoverMinDuration;
    const delay = options.delay ?? 0;
    const opacity = options.opacity ?? 1;
    const dashGap = isCircuit ? Math.max(1, entry.length - segmentLength) : entry.length + segmentLength;
    const pass = document.createElementNS(svgNamespace, "g");
    pass.classList.add("hero-sheen-pass");
    if (options.passClass) pass.classList.add(options.passClass);

    ["hero-sheen-glow", "hero-sheen-refraction", "hero-sheen-core"].forEach((className) => {
      const stroke = document.createElementNS(svgNamespace, "use");
      stroke.classList.add(className);
      stroke.setAttribute("href", `#${entry.id}`);
      stroke.setAttribute("stroke-dasharray", `${segmentLength} ${dashGap}`);
      stroke.setAttribute("stroke-dashoffset", `${-start}`);
      pass.append(stroke);
      trackAnimation(
        stroke.animate(
          [{ strokeDashoffset: `${-start}` }, { strokeDashoffset: `${-end}` }],
          {
            duration,
            delay,
            easing:
              options.easing ??
              (isCircuit ? "cubic-bezier(0.45, 0, 0.55, 1)" : "cubic-bezier(0.22, 0.61, 0.36, 1)"),
            fill: "both",
          }
        )
      );
    });

    passGroup.append(pass);
    const opacityAnimation = trackAnimation(
      pass.animate(
        isCircuit
          ? [
              { opacity: 0, offset: 0 },
              { opacity, offset: 0.1 },
              { opacity: opacity * 0.96, offset: 0.78 },
              { opacity: opacity * 0.72, offset: 0.9 },
              { opacity: 0, offset: 1 },
            ]
          : [
              { opacity: 0, offset: 0 },
              { opacity, offset: 0.16 },
              { opacity: opacity * 0.82, offset: 0.72 },
              { opacity: 0, offset: 1 },
            ],
        { duration, delay, easing: options.opacityEasing ?? "ease-out", fill: "both" }
      )
    );

    return opacityAnimation.finished.catch(() => {}).then(() => pass.remove());
  }

  function refineNearest(sample, x, y) {
    let start = Math.max(sample.edge.startLength, sample.length - settings.sampleSpacing * 1.5);
    let end = Math.min(sample.edge.endLength, sample.length + settings.sampleSpacing * 1.5);

    for (let iteration = 0; iteration < 8; iteration += 1) {
      const firstLength = start + (end - start) / 3;
      const secondLength = end - (end - start) / 3;
      const firstPoint = sample.entry.path.getPointAtLength(firstLength);
      const secondPoint = sample.entry.path.getPointAtLength(secondLength);
      const firstDistance = Math.hypot(firstPoint.x - x, firstPoint.y - y);
      const secondDistance = Math.hypot(secondPoint.x - x, secondPoint.y - y);

      if (firstDistance <= secondDistance) end = secondLength;
      else start = firstLength;
    }

    const length = (start + end) / 2;
    const point = sample.entry.path.getPointAtLength(length);
    return {
      edge: sample.edge,
      entry: sample.entry,
      length,
      x: point.x,
      y: point.y,
      distance: Math.hypot(point.x - x, point.y - y),
    };
  }

  function nearestCircuitPoints(x, y, sensitivity) {
    const nearestByEdge = new Map();
    for (const sample of circuitSamples) {
      const distance = Math.hypot(sample.x - x, sample.y - y);
      if (distance > sensitivity + settings.sampleSpacing) continue;
      const current = nearestByEdge.get(sample.edge);
      if (!current || distance < current.distance) nearestByEdge.set(sample.edge, { sample, distance });
    }

    return [...nearestByEdge.values()]
      .map(({ sample }) => refineNearest(sample, x, y))
      .filter((nearest) => nearest.distance <= sensitivity)
      .sort((first, second) => first.distance - second.distance);
  }

  function createTraversal(edge, fromNode, toNode) {
    return {
      edge,
      forward: edge.startNode === edge.endNode || (edge.startNode === fromNode && edge.endNode === toNode),
    };
  }

  function edgeIsLocal(edge, origin) {
    const lengths = [edge.startLength, (edge.startLength + edge.endLength) / 2, edge.endLength];
    return lengths.every((length) => {
      const point = edge.entry.path.getPointAtLength(length);
      return Math.hypot(point.x - origin.x, point.y - origin.y) <= settings.hoverCircuitRadius;
    });
  }

  function circuitLengthScore(length) {
    if (length <= settings.hoverPreferredCircuitLength) return length;
    return settings.hoverPreferredCircuitLength - (length - settings.hoverPreferredCircuitLength) * 0.2;
  }

  function shortestAlternateSegments(edge, origin) {
    if (edge.startNode === edge.endNode) return { segments: [], length: 0 };

    const distances = Array(graphNodes.length).fill(Number.POSITIVE_INFINITY);
    const previous = Array(graphNodes.length).fill(null);
    const visited = new Set();
    distances[edge.endNode] = 0;

    while (visited.size < graphNodes.length) {
      let currentNode = -1;
      let currentDistance = Number.POSITIVE_INFINITY;
      distances.forEach((distance, nodeIndex) => {
        if (!visited.has(nodeIndex) && distance < currentDistance) {
          currentNode = nodeIndex;
          currentDistance = distance;
        }
      });
      if (currentNode === -1 || currentDistance > settings.hoverMaximumCircuitLength) break;
      if (currentNode === edge.startNode) break;
      visited.add(currentNode);

      graphNodes[currentNode].edges.forEach((candidateIndex) => {
        if (candidateIndex === edge.index || bridgeEdges.has(candidateIndex)) return;
        const candidate = graphEdges[candidateIndex];
        if (!edgeIsLocal(candidate, origin)) return;
        const nextNode = candidate.startNode === currentNode ? candidate.endNode : candidate.startNode;
        if (nextNode === currentNode || visited.has(nextNode)) return;
        const nextDistance = currentDistance + candidate.length;
        if (nextDistance >= distances[nextNode]) return;
        distances[nextNode] = nextDistance;
        previous[nextNode] = { edge: candidate, fromNode: currentNode };
      });
    }

    if (!Number.isFinite(distances[edge.startNode])) return null;

    const segments = [];
    let cursor = edge.startNode;
    while (cursor !== edge.endNode) {
      const step = previous[cursor];
      if (!step) return null;
      segments.push(createTraversal(step.edge, step.fromNode, cursor));
      cursor = step.fromNode;
    }
    segments.reverse();
    return { segments, length: distances[edge.startNode] };
  }

  function preferredCircuitRoute(edge) {
    if (circuitRouteCache.has(edge.index)) return circuitRouteCache.get(edge.index);
    if (edge.startNode === edge.endNode) {
      const route = { segments: [{ edge, forward: true }], length: edge.length };
      circuitRouteCache.set(edge.index, route);
      return route;
    }

    const origin = edge.entry.path.getPointAtLength((edge.startLength + edge.endLength) / 2);
    const targetNode = edge.startNode;
    const maximumAlternateLength = settings.hoverMaximumCircuitLength - edge.length;
    let states = [
      {
        node: edge.endNode,
        length: 0,
        segments: [],
        usedEdges: new Set([edge.index]),
        usedNodes: new Set([edge.endNode]),
      },
    ];
    let bestCompletion = null;

    for (let depth = 0; depth < settings.hoverMaximumCircuitEdges && states.length; depth += 1) {
      const nextStates = [];
      states.forEach((state) => {
        graphNodes[state.node].edges.forEach((candidateIndex) => {
          if (state.usedEdges.has(candidateIndex) || bridgeEdges.has(candidateIndex)) return;
          const candidate = graphEdges[candidateIndex];
          if (!edgeIsLocal(candidate, origin)) return;
          const nextNode = candidate.startNode === state.node ? candidate.endNode : candidate.startNode;
          if (nextNode === state.node || (nextNode !== targetNode && state.usedNodes.has(nextNode))) return;

          const length = state.length + candidate.length;
          if (length > maximumAlternateLength) return;
          const segments = [...state.segments, createTraversal(candidate, state.node, nextNode)];

          if (nextNode === targetNode) {
            const totalLength = edge.length + length;
            const score = circuitLengthScore(totalLength);
            if (!bestCompletion || score > bestCompletion.score) {
              bestCompletion = { segments, length, totalLength, score };
            }
            return;
          }

          const usedEdges = new Set(state.usedEdges);
          usedEdges.add(candidateIndex);
          const usedNodes = new Set(state.usedNodes);
          usedNodes.add(nextNode);
          nextStates.push({ node: nextNode, length, segments, usedEdges, usedNodes });
        });
      });

      nextStates.sort((first, second) => {
        const firstNode = graphNodes[first.node];
        const secondNode = graphNodes[second.node];
        const firstScore =
          first.length - Math.hypot(firstNode.x - graphNodes[targetNode].x, firstNode.y - graphNodes[targetNode].y) * 1.15;
        const secondScore =
          second.length - Math.hypot(secondNode.x - graphNodes[targetNode].x, secondNode.y - graphNodes[targetNode].y) * 1.15;
        return secondScore - firstScore;
      });
      states = nextStates.slice(0, settings.hoverBeamWidth);
    }

    const alternate = bestCompletion ?? shortestAlternateSegments(edge, origin);
    if (!alternate) {
      circuitRouteCache.set(edge.index, null);
      return null;
    }

    const route = {
      segments: [{ edge, forward: true }, ...alternate.segments],
      length: edge.length + alternate.length,
    };
    circuitRouteCache.set(edge.index, route);
    return route;
  }

  function createCircuitEntry(nearest) {
    const edge = nearest.edge;
    const routePlan = preferredCircuitRoute(edge);
    if (!routePlan || routePlan.length > settings.hoverMaximumCircuitLength) return null;

    const points = [];
    const appendRange = (entry, start, end) => {
      const distance = Math.abs(end - start);
      const divisions = Math.max(1, Math.ceil(distance / settings.circuitPointSpacing));
      for (let index = 0; index <= divisions; index += 1) {
        const length = start + ((end - start) * index) / divisions;
        const point = entry.path.getPointAtLength(length);
        const previousPoint = points.at(-1);
        if (!previousPoint || Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y) > 0.08) {
          points.push({ x: point.x, y: point.y });
        }
      }
    };

    const movingForward = edge.endLength - nearest.length >= nearest.length - edge.startLength;
    const route = movingForward
      ? routePlan.segments
      : [...routePlan.segments].reverse().map((segment) => ({ edge: segment.edge, forward: !segment.forward }));
    const selectedIndex = route.findIndex((segment) => segment.edge === edge);
    if (selectedIndex === -1) return null;
    const selected = route[selectedIndex];
    const selectedStart = selected.forward ? edge.startLength : edge.endLength;
    const selectedEnd = selected.forward ? edge.endLength : edge.startLength;
    appendRange(edge.entry, nearest.length, selectedEnd);
    [...route.slice(selectedIndex + 1), ...route.slice(0, selectedIndex)].forEach((segment) => {
      appendRange(
        segment.edge.entry,
        segment.forward ? segment.edge.startLength : segment.edge.endLength,
        segment.forward ? segment.edge.endLength : segment.edge.startLength
      );
    });
    appendRange(edge.entry, selectedStart, nearest.length);

    if (points.length < 3) return null;
    circuitId += 1;
    const path = document.createElementNS(svgNamespace, "path");
    path.id = `hero-circuit-${circuitId}`;
    path.setAttribute("fill", "none");
    path.setAttribute(
      "d",
      `${points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ")} Z`
    );
    circuitGroup.append(path);
    const length = path.getTotalLength();
    if (length > settings.hoverMaximumCircuitLength * 1.12) {
      path.remove();
      return null;
    }
    return {
      path,
      id: path.id,
      length,
      nearest,
      edgeIndexes: [...new Set(route.map((segment) => segment.edge.index))],
    };
  }

  function selectCircuitEntry(candidates, distancePenalty = settings.hoverDistancePenalty) {
    const options = candidates
      .slice(0, settings.hoverCandidateLimit)
      .map((nearest) => createCircuitEntry(nearest))
      .filter(Boolean)
      .map((entry) => ({
        entry,
        score: circuitLengthScore(entry.length) - entry.nearest.distance * distancePenalty,
      }))
      .sort((first, second) => second.score - first.score);
    const selected = options[0];
    options.slice(1).forEach(({ entry }) => entry.path.remove());
    return selected?.entry ?? null;
  }

  function playPointerCircuit(candidates) {
    const selected = selectCircuitEntry(candidates);
    if (!selected) return null;

    const duration = Math.max(
      settings.hoverMinDuration,
      Math.min(settings.hoverMaxDuration, (selected.length / settings.hoverSpeed) * 1000)
    );
    return {
      nearest: selected.nearest,
      finished: playSheen(selected, {
        circuit: true,
        duration,
        segmentLength: settings.hoverSegmentLength,
      }).finally(() => selected.path.remove()),
    };
  }

  function createOpeningCircuits() {
    const selected = [];
    const coveredEdges = new Set();
    openingAnchors.forEach((anchor) => {
      const nearest = nearestCircuitPoints(anchor.x, anchor.y, settings.openingSensitivity);
      const entry = selectCircuitEntry(nearest, 1.1);
      if (!entry) return;
      const overlap = entry.edgeIndexes.filter((edgeIndex) => coveredEdges.has(edgeIndex)).length;
      if (overlap > entry.edgeIndexes.length * 0.5) {
        entry.path.remove();
        return;
      }

      entry.edgeIndexes.forEach((edgeIndex) => coveredEdges.add(edgeIndex));
      selected.push(entry);
    });

    return selected;
  }

  function graphComponentIndexes() {
    const componentByNode = Array(graphNodes.length).fill(-1);
    let componentIndex = 0;
    graphNodes.forEach((node) => {
      if (componentByNode[node.index] !== -1) return;
      const stack = [node.index];
      componentByNode[node.index] = componentIndex;
      while (stack.length) {
        const nodeIndex = stack.pop();
        graphNodes[nodeIndex].edges.forEach((edgeIndex) => {
          const edge = graphEdges[edgeIndex];
          const nextNode = edge.startNode === nodeIndex ? edge.endNode : edge.startNode;
          if (componentByNode[nextNode] !== -1) return;
          componentByNode[nextNode] = componentIndex;
          stack.push(nextNode);
        });
      }
      componentIndex += 1;
    });
    return componentByNode;
  }

  function shortestConnector(fromNearest, toNearest) {
    const distances = Array(graphNodes.length).fill(Number.POSITIVE_INFINITY);
    const previous = Array(graphNodes.length).fill(null);
    const visited = new Set();
    const fromEdge = fromNearest.edge;
    const toEdge = toNearest.edge;
    const sources = [
      {
        node: fromEdge.startNode,
        distance: fromNearest.length - fromEdge.startLength,
        sourceLength: fromEdge.startLength,
      },
      {
        node: fromEdge.endNode,
        distance: fromEdge.endLength - fromNearest.length,
        sourceLength: fromEdge.endLength,
      },
    ];
    sources.forEach((source) => {
      if (source.distance >= distances[source.node]) return;
      distances[source.node] = source.distance;
      previous[source.node] = { sourceLength: source.sourceLength };
    });

    while (visited.size < graphNodes.length) {
      let currentNode = -1;
      let currentDistance = Number.POSITIVE_INFINITY;
      distances.forEach((distance, nodeIndex) => {
        if (!visited.has(nodeIndex) && distance < currentDistance) {
          currentNode = nodeIndex;
          currentDistance = distance;
        }
      });
      if (currentNode === -1) break;
      visited.add(currentNode);

      graphNodes[currentNode].edges.forEach((edgeIndex) => {
        const edge = graphEdges[edgeIndex];
        const nextNode = edge.startNode === currentNode ? edge.endNode : edge.startNode;
        if (nextNode === currentNode || visited.has(nextNode)) return;
        const nextDistance = currentDistance + edge.length;
        if (nextDistance >= distances[nextNode]) return;
        distances[nextNode] = nextDistance;
        previous[nextNode] = { edge, fromNode: currentNode };
      });
    }

    const targets = [
      {
        node: toEdge.startNode,
        distance: toNearest.length - toEdge.startLength,
        targetLength: toEdge.startLength,
      },
      {
        node: toEdge.endNode,
        distance: toEdge.endLength - toNearest.length,
        targetLength: toEdge.endLength,
      },
    ]
      .map((target) => ({ ...target, total: distances[target.node] + target.distance }))
      .filter((target) => Number.isFinite(target.total))
      .sort((first, second) => first.total - second.total);
    if (!targets.length) return null;

    const target = targets[0];
    const traversals = [];
    let cursor = target.node;
    while (previous[cursor]?.edge) {
      const step = previous[cursor];
      traversals.push(createTraversal(step.edge, step.fromNode, cursor));
      cursor = step.fromNode;
    }
    const source = previous[cursor];
    if (!source) return null;
    traversals.reverse();

    return {
      length: target.total,
      segments: [
        { entry: fromEdge.entry, start: fromNearest.length, end: source.sourceLength },
        ...traversals.map((traversal) => ({
          entry: traversal.edge.entry,
          start: traversal.forward ? traversal.edge.startLength : traversal.edge.endLength,
          end: traversal.forward ? traversal.edge.endLength : traversal.edge.startLength,
        })),
        { entry: toEdge.entry, start: target.targetLength, end: toNearest.length },
      ],
    };
  }

  function largestConnectedCircuitGroup(circuits, componentByNode) {
    const groups = new Map();
    circuits.forEach((entry) => {
      const component = componentByNode[entry.nearest.edge.startNode];
      if (!groups.has(component)) groups.set(component, []);
      groups.get(component).push(entry);
    });
    return (
      [...groups.values()].sort((first, second) => {
        if (first.length !== second.length) return second.length - first.length;
        return (
          second.reduce((sum, entry) => sum + entry.length, 0) -
          first.reduce((sum, entry) => sum + entry.length, 0)
        );
      })[0] ?? []
    );
  }

  function buildOpeningFlowEntry(circuits, bandIndex) {
    if (!circuits.length) return null;
    const candidates = [...circuits].sort(
      (first, second) => first.nearest.x - second.nearest.x || first.nearest.y - second.nearest.y
    );
    const ordered = [candidates.shift()];
    const connectors = [];
    candidates.forEach((candidate) => {
      const connector = shortestConnector(ordered.at(-1).nearest, candidate.nearest);
      if (!connector) {
        candidate.path.remove();
        return;
      }
      connectors.push(connector);
      ordered.push(candidate);
    });

    const points = [];
    const appendPoint = (point) => {
      const previousPoint = points.at(-1);
      if (!previousPoint || Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y) > 0.08) {
        points.push({ x: point.x, y: point.y });
      }
    };
    const appendRange = (entry, start, end) => {
      const distance = Math.abs(end - start);
      const divisions = Math.max(1, Math.ceil(distance / settings.circuitPointSpacing));
      for (let index = 0; index <= divisions; index += 1) {
        const length = start + ((end - start) * index) / divisions;
        appendPoint(entry.path.getPointAtLength(length));
      }
    };
    appendRange(ordered[0], 0, ordered[0].length);
    for (let index = 1; index < ordered.length; index += 1) {
      connectors[index - 1].segments.forEach((segment) => appendRange(segment.entry, segment.start, segment.end));
      appendRange(ordered[index], 0, ordered[index].length);
    }
    ordered.forEach((entry) => entry.path.remove());
    if (points.length < 3) return null;

    const path = document.createElementNS(svgNamespace, "path");
    path.id = `hero-opening-flow-${bandIndex + 1}`;
    path.setAttribute("fill", "none");
    path.setAttribute("data-band", `${bandIndex}`);
    path.setAttribute("data-circuit-count", `${ordered.length}`);
    path.setAttribute("data-direction", "left-to-right");
    path.setAttribute(
      "d",
      points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ")
    );
    circuitGroup.append(path);
    return { path, id: path.id, length: path.getTotalLength(), bandIndex };
  }

  function createOpeningFlowEntries() {
    const openingCircuits = createOpeningCircuits();
    const componentByNode = graphComponentIndexes();
    const bands = [[], [], []];
    openingCircuits.forEach((entry) => {
      const bandIndex = entry.nearest.y < settings.openingBandBoundaries[0]
        ? 0
        : entry.nearest.y < settings.openingBandBoundaries[1]
          ? 1
          : 2;
      bands[bandIndex].push(entry);
    });
    const selectedGroups = bands.map((band) => largestConnectedCircuitGroup(band, componentByNode));
    const selectedCircuits = new Set(selectedGroups.flat());
    openingCircuits.filter((entry) => !selectedCircuits.has(entry)).forEach((entry) => entry.path.remove());
    return selectedGroups
      .map((group, bandIndex) => buildOpeningFlowEntry(group, bandIndex))
      .filter(Boolean);
  }

  function playOpeningFlows() {
    const openingFlows = createOpeningFlowEntries();
    return Promise.all(
      openingFlows.map((openingFlow, index) =>
        playSheen(openingFlow, {
          circuit: true,
          duration: settings.openingDuration,
          delay: index * settings.openingStagger,
          opacity: settings.openingOpacity,
          segmentLength: settings.openingSegmentLength,
          passClass: "hero-sheen-opening-pass",
          easing: "cubic-bezier(0.37, 0, 0.63, 1)",
          opacityEasing: "cubic-bezier(0.33, 1, 0.68, 1)",
        }).finally(() => openingFlow.path.remove())
      )
    );
  }

  const image = new Image();
  image.src = "assets/images/hero-artwork-transparent.png";
  const imageReady = image.decode ? image.decode().catch(() => {}) : Promise.resolve();
  const visibilityReady = new Promise((resolve) => {
    if (!window.IntersectionObserver) {
      resolve();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        resolve();
      },
      { threshold: 0.15 }
    );
    observer.observe(artwork);
  });

  await Promise.all([imageReady, visibilityReady]);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  if (reducedMotion.matches) return;

  await playOpeningFlows();

  pointerEnabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let cooldownUntil = 0;
  let pointerPassActive = false;
  let hoverArmed = true;
  let lastTriggerPoint = null;
  let pendingPointer = null;
  let pointerFrame = 0;

  function processPointer() {
    pointerFrame = 0;
    if (!pointerEnabled || !pendingPointer || reducedMotion.matches) return;

    const event = pendingPointer;
    const bounds = artwork.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const padding = settings.hoverSensitivity;
    if (
      event.clientX < bounds.left - padding ||
      event.clientX > bounds.right + padding ||
      event.clientY < bounds.top - padding ||
      event.clientY > bounds.bottom + padding
    ) {
      hoverArmed = true;
      return;
    }

    if (pointerPassActive || performance.now() < cooldownUntil) return;

    const x = ((event.clientX - bounds.left) / bounds.width) * settings.sourceWidth;
    const y = ((event.clientY - bounds.top) / bounds.height) * settings.sourceHeight;
    const sourceSensitivity = settings.hoverSensitivity * (settings.sourceWidth / bounds.width);
    const nearestCandidates = nearestCircuitPoints(x, y, sourceSensitivity);
    const nearest = nearestCandidates[0];

    if (!nearest) {
      hoverArmed = true;
      return;
    }

    const movedFarEnough =
      !lastTriggerPoint ||
      Math.hypot(nearest.x - lastTriggerPoint.x, nearest.y - lastTriggerPoint.y) >= settings.hoverResetDistance;
    if (!hoverArmed && !movedFarEnough) return;
    const pointerCircuit = playPointerCircuit(nearestCandidates);
    if (!pointerCircuit) return;

    pointerPassActive = true;
    hoverArmed = false;
    lastTriggerPoint = pointerCircuit.nearest;
    pointerCircuit.finished.finally(() => {
      pointerPassActive = false;
      cooldownUntil = performance.now() + settings.hoverCooldown;
    });
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      pendingPointer = { clientX: event.clientX, clientY: event.clientY };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(processPointer);
    },
    { passive: true }
  );
}

initHeroSheen();
