import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const inputLabel = 'C:/Users/leon/Desktop/ipsec/E01/标牌.png';
const outputPath = path.join(root, 'public/models/BWR_E01.glb');

const scene = new THREE.Scene();
scene.name = 'BWR_E01_Industrial_4G_CAT1_RTU';

const black = new THREE.MeshStandardMaterial({ color: 0x111216, roughness: 0.82, metalness: 0.08 });
const blackEdge = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.72, metalness: 0.18 });
const darkInset = new THREE.MeshStandardMaterial({ color: 0x020304, roughness: 0.92, metalness: 0.0 });
const silver = new THREE.MeshStandardMaterial({ color: 0x9ca0a3, roughness: 0.45, metalness: 0.72 });
const brass = new THREE.MeshStandardMaterial({ color: 0xb57a20, roughness: 0.32, metalness: 0.88 });
const insulator = new THREE.MeshStandardMaterial({ color: 0xe8e4d7, roughness: 0.56, metalness: 0.0 });
const green = new THREE.MeshStandardMaterial({ color: 0x2d9c50, emissive: 0x071d0e, roughness: 0.28, metalness: 0.12 });
const yellow = new THREE.MeshStandardMaterial({ color: 0xd5bd2a, emissive: 0x211b00, roughness: 0.3, metalness: 0.1 });
const screwMat = new THREE.MeshStandardMaterial({ color: 0x1a1b1e, roughness: 0.48, metalness: 0.48 });

function add(mesh, name, parent = scene) {
  mesh.name = name;
  parent.add(mesh);
  return mesh;
}

function box(name, size, position, material, options = {}) {
  const geometry = new THREE.BoxGeometry(...size);
  const mesh = add(new THREE.Mesh(geometry, material), name);
  mesh.position.set(...position);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  if (options.scale) mesh.scale.set(...options.scale);
  return mesh;
}

function roundedBox(name, size, position, material, bevel = 1.5) {
  const [w, d, h] = size;
  const r = Math.min(bevel, w / 4, d / 4);
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -d / 2);
  s.lineTo(w / 2 - r, -d / 2);
  s.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
  s.lineTo(w / 2, d / 2 - r);
  s.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2);
  s.lineTo(-w / 2 + r, d / 2);
  s.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r);
  s.lineTo(-w / 2, -d / 2 + r);
  s.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
  const geometry = new THREE.ExtrudeGeometry(s, {
    depth: h,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: Math.min(1.3, bevel),
    bevelThickness: Math.min(1.3, bevel),
    curveSegments: 4,
  });
  geometry.translate(0, 0, -h / 2);
  geometry.computeVertexNormals();
  const mesh = add(new THREE.Mesh(geometry, material), name);
  mesh.position.set(...position);
  return mesh;
}

function cylinder(name, radius, depth, position, material, options = {}) {
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, options.segments ?? 32);
  const mesh = add(new THREE.Mesh(geometry, material), name);
  mesh.position.set(...position);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  return mesh;
}

function torus(name, radius, tube, position, material, options = {}) {
  const geometry = new THREE.TorusGeometry(radius, tube, 10, 32);
  const mesh = add(new THREE.Mesh(geometry, material), name);
  mesh.position.set(...position);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  return mesh;
}

// Main enclosure. Dimensions are a proportional reconstruction from the supplied views.
const body = roundedBox('Enclosure_190x110x32mm', [190, 110, 32], [0, 0, 0], black, 3);

// Front/top label carrier and a few shallow edge details.
box('Top_Label_Recess', [180, 102, 0.7], [0, 0, 16.15], darkInset);

// Mounting ears on both long sides, with dark through-hole insets.
for (const side of [-1, 1]) {
  const x = side * 104.5;
  box(`MountingEar_${side < 0 ? 'Left' : 'Right'}`, [29, 72, 3.2], [x, 0, -1.0], black);
  // The supplied photos show two round holes and a central keyhole-like opening.
  for (const y of [-27, 27]) {
    cylinder(`MountHole_${side}_${y}`, 5.2, 0.35, [x, y, 0.8], darkInset);
  }
  cylinder(`MountKeyholeRound_${side}`, 6.2, 0.35, [x, 0, 0.8], darkInset);
  box(`MountKeyholeSlot_${side}`, [5.2, 16, 0.35], [x, 0, 0.8], darkInset);
}

// Four recessed Phillips screw heads on the side walls.
for (const side of [-1, 1]) {
  for (const z of [-10, 10]) {
    const x = side * 95.9;
    cylinder(`SideScrew_${side}_${z}`, 6.3, 1.4, [x, 0, z], screwMat, { rotation: [0, 0, Math.PI / 2] });
    box(`SideScrewSlotA_${side}_${z}`, [0.55, 7.0, 1.6], [x + side * 0.8, 0, z], darkInset, { rotation: [0, 0, Math.PI / 4] });
    box(`SideScrewSlotB_${side}_${z}`, [0.55, 7.0, 1.6], [x + side * 0.8, 0, z], darkInset, { rotation: [0, 0, -Math.PI / 4] });
  }
}

// Rear I/O face: the rear in the supplied photo is the long side of the enclosure (Y positive).
const rearY = 55.4;
// Two SMA antenna bulkheads.
for (const x of [-67, 67]) {
  cylinder(`RearSMA_${x}`, 7.0, 4.0, [x, rearY + 1.8, 5.5], brass, { rotation: [Math.PI / 2, 0, 0] });
  cylinder(`RearSMA_Insulator_${x}`, 4.1, 4.6, [x, rearY + 3.0, 5.5], insulator, { rotation: [Math.PI / 2, 0, 0] });
  cylinder(`RearSMA_Pin_${x}`, 1.0, 4.9, [x, rearY + 3.3, 5.5], brass, { rotation: [Math.PI / 2, 0, 0], segments: 20 });
  for (const yy of [1.0, 2.0, 3.0]) torus(`RearSMA_Thread_${x}_${yy}`, 6.0, 0.45, [x, rearY + yy, 5.5], brass, { rotation: [Math.PI / 2, 0, 0] });
}

// SD card slot.
box('Rear_SD_Slot', [22, 2.3, 3.2], [-42, rearY + 1.6, -7.5], darkInset, { });
box('Rear_SD_Lip', [23.5, 1.0, 1.1], [-42, rearY + 2.6, -6.2], blackEdge);

// USB-C port.
box('Rear_USBC_Bezel', [15, 3.0, 8.0], [-15, rearY + 1.9, -3.2], silver);
box('Rear_USBC_Opening', [11.5, 3.3, 4.5], [-15, rearY + 3.5, -3.1], darkInset);

// RJ45 port with metal bezel, dark cavity, and link/activity indicators.
box('Rear_RJ45_Bezel', [26, 4.0, 22], [18, rearY + 2.2, 0.0], silver);
box('Rear_RJ45_Opening', [21.5, 4.5, 16.5], [18, rearY + 4.0, 0.5], darkInset);
box('Rear_RJ45_GreenLED', [4.0, 0.5, 3.0], [11.0, rearY + 6.5, -5.0], green);
box('Rear_RJ45_YellowLED', [4.0, 0.5, 3.0], [25.0, rearY + 6.5, -5.0], yellow);

// Rear reset button and WPS/SIM card detail suggested by the photos.
cylinder('Rear_Reset_Button', 2.4, 2.5, [-31, rearY + 1.7, -10.0], brass, { rotation: [Math.PI / 2, 0, 0] });
box('Rear_WPS_Label', [25, 1.1, 6], [-57, rearY + 1.0, -10.0], blackEdge);

// Label texture: crop the white page margin with a rounded alpha mask, preserving white lettering/panel.
const labelRaw = await sharp(inputLabel).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { data, info } = labelRaw;
const alpha = Buffer.from(data);
const minX = 15, minY = 13, maxX = info.width - 26, maxY = info.height - 1, radius = 32;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    let inside = x >= minX && x <= maxX && y >= minY && y <= maxY;
    if (inside) {
      if (x < minX + radius && y < minY + radius) inside = ((x - (minX + radius)) ** 2 + (y - (minY + radius)) ** 2) <= radius ** 2;
      if (x > maxX - radius && y < minY + radius) inside = ((x - (maxX - radius)) ** 2 + (y - (minY + radius)) ** 2) <= radius ** 2;
      if (x < minX + radius && y > maxY - radius) inside = ((x - (minX + radius)) ** 2 + (y - (maxY - radius)) ** 2) <= radius ** 2;
      if (x > maxX - radius && y > maxY - radius) inside = ((x - (maxX - radius)) ** 2 + (y - (maxY - radius)) ** 2) <= radius ** 2;
    }
    if (!inside) alpha[(y * info.width + x) * 4 + 3] = 0;
  }
}
// GLTFExporter expects a browser canvas when it packs a texture. Provide the tiny
// canvas surface it needs while using sharp for the actual PNG encoding in Node.
const labelPng = await sharp(alpha, {
  raw: { width: info.width, height: info.height, channels: 4 },
}).png().toBuffer();
globalThis.ImageData = class ImageData {
  constructor(data, width, height) { this.data = data; this.width = width; this.height = height; }
};
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      if (this.onloadend) this.onloadend();
    });
  }
};
globalThis.document = {
  createElement(type) {
    if (type !== 'canvas') return {};
    const canvas = {
      width: info.width,
      height: info.height,
      getContext() {
        return {
          translate() {},
          scale() {},
          putImageData() {},
          drawImage() {},
        };
      },
      toBlob(callback, mimeType = 'image/png') {
        callback(new Blob([labelPng], { type: mimeType }));
      },
    };
    return canvas;
  },
};
const labelTexture = new THREE.DataTexture(alpha, info.width, info.height, THREE.RGBAFormat, THREE.UnsignedByteType);
labelTexture.colorSpace = THREE.SRGBColorSpace;
labelTexture.flipY = true;
labelTexture.needsUpdate = true;
const labelMaterial = new THREE.MeshStandardMaterial({
  map: labelTexture,
  transparent: true,
  alphaTest: 0.03,
  roughness: 0.72,
  metalness: 0.02,
  side: THREE.DoubleSide,
});
const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(178, 105.5), labelMaterial);
labelMesh.name = 'BWR_E01_Front_Label_Texture';
labelMesh.rotation.x = 0;
labelMesh.position.set(0, 0, 16.72);
scene.add(labelMesh);

// Small indicator lenses on the top label surface; the printed label remains the source of the text.
for (const y of [33, 16, -1, -18]) {
  cylinder(`Front_LED_${y}`, 3.0, 0.45, [83, y, 16.9], y === 33 ? new THREE.MeshStandardMaterial({ color: 0x782c2e, emissive: 0x130506, roughness: 0.25 }) : green);
}

// Add a few shallow seam lines to communicate the two-piece folded enclosure.
box('Top_Seam_Front', [176, 0.7, 0.6], [0, -51.5, 16.4], blackEdge);
box('Top_Seam_Rear', [176, 0.7, 0.6], [0, 51.5, 16.4], blackEdge);

// Export a single self-contained binary GLB.
const exporter = new GLTFExporter();
const glb = await new Promise((resolve, reject) => {
  exporter.parse(scene, resolve, reject, { binary: true, embedImages: true, maxTextureSize: 2048 });
});
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, Buffer.from(glb));
console.log(`Wrote ${outputPath} (${(glb.byteLength / 1024).toFixed(1)} KiB)`);
