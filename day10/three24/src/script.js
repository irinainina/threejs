import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('/door.jpg');

const camera = new THREE.PerspectiveCamera(75, aspect);
camera.position.z = 3;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight) 

// const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
// material.wireframe = true;
// material.transparent = true
// material.opacity = 0.3

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const textureLoader = new THREE.TextureLoader();
// const matcapTexture = textureLoader.load('/textures/matcaps/1.png');

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/1/px.jpg',
  '/textures/environmentMaps/1/nx.jpg',
  '/textures/environmentMaps/1/py.jpg',
  '/textures/environmentMaps/1/ny.jpg',
  '/textures/environmentMaps/1/pz.jpg',
  '/textures/environmentMaps/1/nz.jpg'
])
material.envMap = environmentMapTexture

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(.5, 32, 16),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus);

const controls = new OrbitControls(camera, renderer.domElement);

const animation = () => {
  renderer.render(scene, camera);
  controls.update();
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