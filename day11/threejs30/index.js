import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';

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

const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;

const positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
  colors[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)
); // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.1;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.vertexColors = true;

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./textures/particles/2.png');
particlesMaterial.map = particleTexture;

particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;

particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

function render() {
  controls.update();
  const elapsedTime = clock.getElapsedTime();
  particles.rotation.y = elapsedTime * 0.2;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
