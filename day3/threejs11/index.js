//импорт библиотеки three.js
import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.138.3/examples/jsm/loaders/GLTFLoader";

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

//создание канваса, начальные настройки сцены, камеры и т.д.
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, aspect, .1, 1000);
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(width, height);
  document.body.append(renderer.domElement);

  const light = new THREE.DirectionalLight('blueviolet', 10);
  light.position.set(-2, 0, 20);
  scene.add(light);

//загрузка модели и установление её настроек
  const loader = new GLTFLoader();

  loader.load( './model/scene.gltf', function ( gltf ) {
  gltf.scene.position.set(0, -2, 15);
  gltf.scene.scale.set(0.8, 0.8, 0.8);

  gltf.scene.rotation.y = 1.5;
  gltf.scene.rotation.x = 0.4;

  scene.add( gltf.scene );

  function render() {
    gltf.scene.rotation.y += 0.02;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});