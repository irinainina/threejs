import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(75, aspect);
camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 1;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0ff0ff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const animation = () => {
  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(animation);
}
animation();