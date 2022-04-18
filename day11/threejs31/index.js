import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';
const gui = new dat.GUI();

let geometry = null;
let material = null;
let points = null;

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const parameters = {
  count: 10000,
  size: 0.01,
};

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 3;
    positions[i3 + 1] = (Math.random() - 0.5) * 3;
    positions[i3 + 2] = (Math.random() - 0.5) * 3;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
};
generateGalaxy();

gui
  .add(parameters, 'count')
  .min(100)
  .max(100000)
  .step(100)
  .onChange(generateGalaxy);
gui
  .add(parameters, 'size')
  .min(0.001)
  .max(0.02)
  .step(0.001)
  .onChange(generateGalaxy);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
