// https://codepen.io/ilithya/pen/KKPejPK
//импорт библиотеки three.js
import * as THREE from 'three';
import { FontLoader } from './js/FontLoader.js';
import { TextGeometry } from './js/TextGeometry.js';

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

loaderText.load('./font/helvetiker_regular.typeface.json', (font) => {
  const geometry = new TextGeometry('Hello Three.js', {
    font: font,
    size: 2.5,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
  });
  geometry.center();

  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load('./font/1.png');
  const material = new THREE.MeshNormalMaterial();
  
  const text = new THREE.Mesh(geometry, material);

  text.position.x = 0;
  text.position.z = 0;
  text.position.y = 0;
  scene.add(text);

const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
const group = new THREE.Group();
for(let i = 0; i < 100; i++) {
  const mesh = new THREE.Mesh(boxGeometry, material);
  mesh.position.x = (Math.random() - 0.5) * 30;
  mesh.position.y = (Math.random() - 0.5) * 20;
  mesh.position.z = (Math.random() - 0.5) * 20;
  mesh.rotation.x = Math.random() * Math.PI;
  mesh.rotation.y = Math.random() * Math.PI;
  mesh.rotation.z = Math.random() * Math.PI;
  const scale = Math.random()
  mesh.scale.set(scale, scale, scale)

  mesh.matrixAutoUpdate = false;
	mesh.updateMatrix();

  group.add(mesh)
}
scene.add(group);

  function render() {
    text.rotation.y -= 0.005;
    group.rotation.y -= 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});
