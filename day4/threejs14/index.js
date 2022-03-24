// https://github.com/edwinwebb/three-seed
//импорт библиотеки three.js
import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.138.3/examples/jsm/loaders/GLTFLoader";

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

//создание канваса, начальные настройки сцены, камеры и т.д.
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, aspect, .1, 1000);
  camera.position.z = 21;

  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(width, height);
  document.body.append(renderer.domElement);

  const point = new THREE.PointLight(0xFFFFFF, 1, 10, 1);
  const dir = new THREE.SpotLight(0xFFFFFF, 0.8, 7, 0.8, 1, 1);
  const ambi = new THREE.AmbientLight( 0x404040 , 0.66);
  const hemi = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.15 )

  dir.position.set(5, 1, 2);
  dir.target.position.set(0,0,0);

  point.position.set(0, 1, 5);
  point.intensity = 0.5;

  scene.add(point, ambi, hemi, dir);
  


//загрузка модели цветка и установление её настроек
  const loaderFlower = new GLTFLoader();

  loaderFlower.load( './model/Flower.glb', function ( gltf ) {
  gltf.scene.position.set(0, 0, 15);
  gltf.scene.scale.set(0.8, 0.8, 0.8);

  gltf.scene.rotation.y = 1.5;
  gltf.scene.rotation.x = 0.4;

  scene.add( gltf.scene );

  function render() {
    gltf.scene.rotation.y += 0.002;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});

//загрузка модели земли и установление её настроек
const loaderLand = new GLTFLoader();

loaderLand.load( './model/Land.glb', function ( gltf ) {
gltf.scene.position.set(0, 0, 15);
gltf.scene.scale.set(0.8, 0.8, 0.8);

gltf.scene.rotation.y = 1.5;
gltf.scene.rotation.x = 0.4;

scene.add( gltf.scene );

function render() {
  gltf.scene.rotation.y += 0.002;
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