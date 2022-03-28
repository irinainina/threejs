// https://github.com/Izura1419/my-vaporwave
// https://habr.com/ru/post/542698/

import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, aspect, .1, 100);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const light = new THREE.DirectionalLight(0xe09ee8, 10);
light.position.set(-2, 0, 5);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xe09ee8, 10);
light2.position.set(2, 0, -5);
scene.add(light2);

const loader = new GLTFLoader();
loader.load('./model/scene.gltf', (data) => {
    const object = data.scene;
    object.position.set(0, -2.5, 0);
    scene.add(object);

    function render() {
      requestAnimationFrame( render );
      object.rotation.y += 0.01;
      controls.update();
      renderer.render( scene, camera );
    }
    render();
  }
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minDistance = 4.5;
controls.maxDistance = 20;

controls.minPolarAngle = Math.PI / 3; // radians
controls.maxPolarAngle = Math.PI / 1.5; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}
window.addEventListener('resize', onWindowResize);