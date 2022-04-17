//импорт библиотеки three.js
import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.updateProjectionMatrix();
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5);
pointLight.distance = 10;
pointLight.decay = 2;
pointLight.position.z = 1;
scene.add(pointLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.5)
// scene.add(hemisphereLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5)
// scene.add(directionalLightHelper)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5)
// scene.add(pointLightHelper)

const material = new THREE.MeshPhysicalMaterial();
material.roughness = .4;

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 32),
  material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

const gui = new dat.GUI();
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
gui.add(pointLight, 'intensity').min(0).max(1).step(0.001);
gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);

function render() {
  sphere.rotation.y = 0.1;
  cube.rotation.y = 0.1;
  torus.rotation.y = 0.1;

  sphere.rotation.x = 0.15;
  cube.rotation.x = 0.15;
  torus.rotation.x = 0.15;

  // Update controls
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
