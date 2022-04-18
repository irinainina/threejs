import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.z = 4;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const particlesGeometry = new THREE.SphereBufferGeometry(1, 64, 32);
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.02;
particlesMaterial.sizeAttenuation = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
