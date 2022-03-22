//импорт библиотеки three.js
import * as THREE from 'three';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight('blueviolet', 10);
light.position.set(-2, 0, 20);
scene.add(light);

//загрузка текста и установление его настроек
const loaderText = new FontLoader();

loaderText.load('helvetiker_regular.typeface.json', function (font) {
  const geometry = new TextGeometry('three.js', {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  const material = new THREE.MeshPhongMaterial({
    color: 'royalblue',
    shininess: 1,
  });
  const textHate = new THREE.Mesh(geometry, material);

  textHate.position.x = 0;
  textHate.position.z = 18;
  textHate.position.y = 0;
  scene.add(textHate);

  function render() {
    textHate.position.x -= 0.001;
    textHate.rotation.y -= 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});
