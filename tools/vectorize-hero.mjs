import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const sourcePath = join(projectRoot, "assets/images/hero-artwork-transparent.png");
const outputPath = join(projectRoot, "assets/images/hero-artwork-traced.svg");

const settings = {
  alphaThreshold: 28,
  simplifyTolerance: 0.7,
  minimumLength: 5,
  maximumThinningPasses: 64,
};

const directions = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const aboveDistance = Math.abs(estimate - above);
  const upperLeftDistance = Math.abs(estimate - upperLeft);

  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left;
  if (aboveDistance <= upperLeftDistance) return above;
  return upperLeft;
}

function decodeRgbaPng(path) {
  const png = readFileSync(path);
  const signature = "89504e470d0a1a0a";
  if (png.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("The hero source is not a valid PNG file.");
  }

  let offset = 8;
  let width;
  let height;
  let bitDepth;
  let colourType;
  let interlace;
  const compressedParts = [];

  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    offset += length + 12;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colourType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") {
      compressedParts.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  if (!width || !height || bitDepth !== 8 || colourType !== 6 || interlace !== 0) {
    throw new Error(
      `Expected a non-interlaced 8-bit RGBA PNG; received ${width}×${height}, depth ${bitDepth}, colour type ${colourType}, interlace ${interlace}.`
    );
  }

  const bytesPerPixel = 4;
  const rowLength = width * bytesPerPixel;
  const inflated = inflateSync(Buffer.concat(compressedParts));
  const pixels = new Uint8Array(width * height * bytesPerPixel);
  let sourceOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = inflated[sourceOffset];
    sourceOffset += 1;
    const rowOffset = y * rowLength;

    for (let x = 0; x < rowLength; x += 1) {
      const raw = inflated[sourceOffset + x];
      const left = x >= bytesPerPixel ? pixels[rowOffset + x - bytesPerPixel] : 0;
      const above = y > 0 ? pixels[rowOffset + x - rowLength] : 0;
      const upperLeft = y > 0 && x >= bytesPerPixel ? pixels[rowOffset + x - rowLength - bytesPerPixel] : 0;
      let value;

      switch (filter) {
        case 0:
          value = raw;
          break;
        case 1:
          value = raw + left;
          break;
        case 2:
          value = raw + above;
          break;
        case 3:
          value = raw + Math.floor((left + above) / 2);
          break;
        case 4:
          value = raw + paeth(left, above, upperLeft);
          break;
        default:
          throw new Error(`Unsupported PNG row filter ${filter}.`);
      }

      pixels[rowOffset + x] = value & 255;
    }

    sourceOffset += rowLength;
  }

  return { width, height, pixels };
}

function createAlphaMask({ width, height, pixels }) {
  const mask = new Uint8Array(width * height);
  for (let index = 0; index < mask.length; index += 1) {
    mask[index] = pixels[index * 4 + 3] > settings.alphaThreshold ? 1 : 0;
  }
  return mask;
}

function skeletonize(mask, width, height) {
  const pixels = mask.slice();
  let changed = true;
  let pass = 0;

  while (changed && pass < settings.maximumThinningPasses) {
    changed = false;
    pass += 1;

    for (let phase = 0; phase < 2; phase += 1) {
      const removals = [];

      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
          const index = y * width + x;
          if (!pixels[index]) continue;

          const neighbours = [
            pixels[index - width],
            pixels[index - width + 1],
            pixels[index + 1],
            pixels[index + width + 1],
            pixels[index + width],
            pixels[index + width - 1],
            pixels[index - 1],
            pixels[index - width - 1],
          ];
          const count = neighbours.reduce((total, pixel) => total + pixel, 0);
          if (count < 2 || count > 6) continue;

          let transitions = 0;
          for (let neighbour = 0; neighbour < neighbours.length; neighbour += 1) {
            if (!neighbours[neighbour] && neighbours[(neighbour + 1) % neighbours.length]) transitions += 1;
          }
          if (transitions !== 1) continue;

          const [north, , east, , south, , west] = neighbours;
          const firstCondition = phase === 0 ? north * east * south : north * east * west;
          const secondCondition = phase === 0 ? east * south * west : north * south * west;
          if (firstCondition === 0 && secondCondition === 0) removals.push(index);
        }
      }

      if (removals.length) changed = true;
      removals.forEach((index) => {
        pixels[index] = 0;
      });
    }
  }

  return pixels;
}

function getNeighbours(index, skeleton, width, height) {
  const x = index % width;
  const y = Math.floor(index / width);
  const neighbours = [];

  for (const [xOffset, yOffset] of directions) {
    const nextX = x + xOffset;
    const nextY = y + yOffset;
    if (nextX < 0 || nextY < 0 || nextX >= width || nextY >= height) continue;
    const nextIndex = nextY * width + nextX;
    if (!skeleton[nextIndex]) continue;

    // Do not add a diagonal shortcut when the same pixels are already joined
    // orthogonally. Those shortcuts turn ordinary corners into false junctions.
    if (
      xOffset !== 0 &&
      yOffset !== 0 &&
      (skeleton[y * width + nextX] || skeleton[nextY * width + x])
    ) {
      continue;
    }

    neighbours.push(nextIndex);
  }

  return neighbours;
}

function edgeKey(first, second) {
  return first < second ? `${first}:${second}` : `${second}:${first}`;
}

function traceGraph(skeleton, width, height) {
  const neighbourCache = new Map();
  const visitedEdges = new Set();
  const routes = [];

  const neighboursFor = (index) => {
    if (!neighbourCache.has(index)) {
      neighbourCache.set(index, getNeighbours(index, skeleton, width, height));
    }
    return neighbourCache.get(index);
  };

  const follow = (start, firstStep) => {
    const route = [start];
    let previous = start;
    let current = firstStep;
    visitedEdges.add(edgeKey(previous, current));

    while (true) {
      route.push(current);
      const currentNeighbours = neighboursFor(current);
      if (current !== start && currentNeighbours.length !== 2) break;

      const next = currentNeighbours.find(
        (candidate) => candidate !== previous && !visitedEdges.has(edgeKey(current, candidate))
      );
      if (next === undefined) break;

      previous = current;
      current = next;
      visitedEdges.add(edgeKey(previous, current));
      if (current === start) {
        route.push(start);
        break;
      }
    }

    return route;
  };

  for (let index = 0; index < skeleton.length; index += 1) {
    if (!skeleton[index]) continue;
    const neighbours = neighboursFor(index);
    if (neighbours.length === 2) continue;

    for (const neighbour of neighbours) {
      if (visitedEdges.has(edgeKey(index, neighbour))) continue;
      routes.push(follow(index, neighbour));
    }
  }

  // Closed loops have no endpoint or junction, so collect their remaining edges separately.
  for (let index = 0; index < skeleton.length; index += 1) {
    if (!skeleton[index]) continue;
    for (const neighbour of neighboursFor(index)) {
      if (!visitedEdges.has(edgeKey(index, neighbour))) routes.push(follow(index, neighbour));
    }
  }

  return routes.map((route) =>
    route.map((index) => ({ x: index % width, y: Math.floor(index / width) }))
  );
}

function pointToSegmentDistance(point, start, end) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  if (deltaX === 0 && deltaY === 0) return Math.hypot(point.x - start.x, point.y - start.y);

  const position = Math.max(
    0,
    Math.min(1, ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / (deltaX ** 2 + deltaY ** 2))
  );
  return Math.hypot(point.x - (start.x + position * deltaX), point.y - (start.y + position * deltaY));
}

function simplifyOpen(points, tolerance) {
  if (points.length <= 2) return points;
  let furthestDistance = 0;
  let furthestIndex = 0;

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = pointToSegmentDistance(points[index], points[0], points[points.length - 1]);
    if (distance > furthestDistance) {
      furthestDistance = distance;
      furthestIndex = index;
    }
  }

  if (furthestDistance <= tolerance) return [points[0], points[points.length - 1]];
  const before = simplifyOpen(points.slice(0, furthestIndex + 1), tolerance);
  const after = simplifyOpen(points.slice(furthestIndex), tolerance);
  return before.slice(0, -1).concat(after);
}

function simplifyRoute(points) {
  const closed = points.length > 3 && points[0].x === points.at(-1).x && points[0].y === points.at(-1).y;
  if (!closed) return simplifyOpen(points, settings.simplifyTolerance);

  const ring = points.slice(0, -1);
  let furthestIndex = 1;
  let furthestDistance = 0;
  for (let index = 1; index < ring.length; index += 1) {
    const distance = Math.hypot(ring[index].x - ring[0].x, ring[index].y - ring[0].y);
    if (distance > furthestDistance) {
      furthestDistance = distance;
      furthestIndex = index;
    }
  }

  const firstArc = simplifyOpen(ring.slice(0, furthestIndex + 1), settings.simplifyTolerance);
  const secondArc = simplifyOpen(ring.slice(furthestIndex).concat(ring[0]), settings.simplifyTolerance);
  return firstArc.slice(0, -1).concat(secondArc);
}

function routeLength(points) {
  let length = 0;
  for (let index = 1; index < points.length; index += 1) {
    length += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
  }
  return length;
}

function boundsFor(points) {
  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);
  return {
    x: Math.min(...xValues),
    y: Math.min(...yValues),
    width: Math.max(...xValues) - Math.min(...xValues),
    height: Math.max(...yValues) - Math.min(...yValues),
  };
}

function pathData(points) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");
}

function formatNumber(value) {
  return Number(value.toFixed(2));
}

const decoded = decodeRgbaPng(sourcePath);
const mask = createAlphaMask(decoded);
const skeleton = skeletonize(mask, decoded.width, decoded.height);
const paths = traceGraph(skeleton, decoded.width, decoded.height)
  .map(simplifyRoute)
  .map((points) => ({ points, length: routeLength(points), bounds: boundsFor(points) }))
  .filter((route) => route.points.length > 1 && route.length >= settings.minimumLength)
  .sort((first, second) => second.length - first.length)
  .map((route, index) => ({ ...route, id: `hero-trace-${String(index + 1).padStart(3, "0")}` }));

const svg = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${decoded.width} ${decoded.height}" role="presentation" aria-hidden="true">`,
  `  <!-- Generated locally from hero-artwork-transparent.png. Alpha threshold: ${settings.alphaThreshold}; simplification: ${settings.simplifyTolerance}px. -->`,
  '  <g id="hero-traced-lines" fill="none">',
  ...paths.map(
    ({ id, points, length, bounds }) =>
      `    <path id="${id}" data-length="${formatNumber(length)}" data-bounds="${formatNumber(bounds.x)} ${formatNumber(bounds.y)} ${formatNumber(bounds.width)} ${formatNumber(bounds.height)}" d="${pathData(points)}" />`
  ),
  "  </g>",
  "</svg>",
  "",
].join("\n");

writeFileSync(outputPath, svg);

const activePixels = mask.reduce((total, pixel) => total + pixel, 0);
const skeletonPixels = skeleton.reduce((total, pixel) => total + pixel, 0);
console.log(`Created ${outputPath}`);
console.log(`Source: ${decoded.width}×${decoded.height}; opaque pixels: ${activePixels}; skeleton pixels: ${skeletonPixels}`);
console.log(`Paths: ${paths.length}; total traced length: ${formatNumber(paths.reduce((total, path) => total + path.length, 0))}px`);
console.log("Longest paths:");
paths.slice(0, 12).forEach(({ id, length, bounds }) => {
  console.log(
    `  ${id}: ${formatNumber(length)}px; bounds ${formatNumber(bounds.x)},${formatNumber(bounds.y)} ${formatNumber(bounds.width)}×${formatNumber(bounds.height)}`
  );
});
