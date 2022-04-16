import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'dat.gui';

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
};

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const textureLoader = new THREE.TextureLoader();

const texture1 = textureLoader.load('/textures/door/alpha.jpg');
const texture2 = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const texture3 = textureLoader.load('/textures/checkerboard-8x8.png');
const texture4 = textureLoader.load('/textures/door/height.jpg');
const texture5 = textureLoader.load('/textures/door/metalness.jpg');
const texture6 = textureLoader.load('/textures/door/normal.jpg');
const texture7 = textureLoader.load('/textures/door/roughness.jpg');

texture3.magFilter = THREE.NearestFilter;

const camera = new THREE.PerspectiveCamera(75, aspect);
camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 1;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture3, transparent: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const animation = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
};
animation();

function resize() {
  // Update sizes
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  // Update camera
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
}
window.addEventListener('resize', resize);

function fullscreen() {
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
window.addEventListener('dblclick', fullscreen);

const gui = new dat.GUI();

gui.add(mesh.position, 'y', -3, 3, 0.1);
gui.add(mesh.position, 'x', -3, 3, 0.1);

gui.add(material, 'wireframe');

gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, 'spin');


