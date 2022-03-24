// https://github.com/edwinwebb/three-seed
//импорт библиотеки three.js
import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

//создание канваса, начальные настройки сцены, камеры и т.д.
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const point = new THREE.PointLight(0xffffff, 1, 10, 1);
const dir = new THREE.SpotLight(0xffffff, 0.8, 7, 0.8, 1, 1);
const ambi = new THREE.AmbientLight(0x404040, 0.66);
const hemi = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.15);

dir.position.set(5, 1, 2);
dir.target.position.set(0, 0, 0);

point.position.set(0, 1, 5);
point.intensity = 0.5;

scene.add(point, ambi, hemi, dir);

// OrbitControls
const renderCalls = [];
function render() {
  requestAnimationFrame(render);
  renderCalls.forEach((callback) => {
    callback();
  });
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minDistance = 6;
controls.maxDistance = 22;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function () {
  controls.update();
});

//загрузка модели цветка
const loaderFlower = new GLTFLoader();
loaderFlower.load('./model/Flower.glb', function (gltf) {
  scene.add(gltf.scene);

  function render() {
    gltf.scene.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});

//загрузка модели земли
const loaderLand = new GLTFLoader();
loaderLand.load('./model/Land.glb', function (gltf) {
  scene.add(gltf.scene);

  function render() {
    gltf.scene.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}
window.addEventListener('resize', onWindowResize);