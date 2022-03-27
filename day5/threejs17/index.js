// https://stepik.org/lesson/582224/step/1?auth=login&unit=576958
// http://jsfiddle.net/Qn7cL/3/
// https://stackoverflow.com/questions/21120885/rotating-earth-around-sun

import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( width, height );
document.body.append( renderer.domElement );

let earthOrbitRadius = 120;
let earthOrbitAngle = 0;
let earthOrbitSpeed = 0.2;

let moonOrbitRadius = 15;
let moonOrbitAngle = 0;
let moonOrbitSpeed = 1.5;

const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 1000 );
camera.position.z = 300;

const scene = new THREE.Scene();

// light
const lightAmbient = new THREE.AmbientLight(0xffffff, .25);
scene.add(lightAmbient);

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( .25, 0, 1 ).normalize();
scene.add(light);

// OrbitControls
const renderCalls = [];
const controls = new OrbitControls(camera, renderer.domElement);

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

controls.minDistance = 200;
controls.maxDistance = 700;

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function () {
  controls.update();
});

// sun
const sunGeometry = new THREE.SphereGeometry( 50, 60, 60 );

const loader1 = new THREE.TextureLoader(); 
const sunMaterial = new THREE.MeshPhongMaterial({  
  emissive: 0x554411,
  map: loader1.load('./assets/img/sun.jpg'),
});

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.z = -50;
scene.add(sunMesh);

//this is the object that will have its position changed to orbit around the sun    
const theEarthAndMoon = new THREE.Object3D();
theEarthAndMoon.rotation.z = 23.439281 * Math.PI / 180; //tilt of earth in radians;
scene.add(theEarthAndMoon);

// earth
const earthGeometry = new THREE.SphereGeometry( 8, 20, 20 );

const loader2 = new THREE.TextureLoader(); 
const earthMaterial = new THREE.MeshPhongMaterial({
  emissive: 0x112244,  
  map: loader2.load('./assets/img/earth.jpg'),
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
// earthMesh.position.x = 20;
theEarthAndMoon.add(earthMesh);

// moon
const moonGeometry = new THREE.SphereGeometry( 2.5, 20, 20 );

const loader3 = new THREE.TextureLoader(); 
const moonMaterial = new THREE.MeshPhongMaterial({
  emissive: 0x000000,
  map: loader3.load('./assets/img/moon.jpg'),
});

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
// moonMesh.position.x = 4;
theEarthAndMoon.add(moonMesh);

function render() {
  sunMesh.rotation.y += 0.003;
  earthMesh.rotation.y += 0.04;
  moonMesh.rotation.y += 0.003;
//run the earth's orbit around the Sun
  earthOrbitAngle += earthOrbitSpeed; 
  let radians = earthOrbitAngle * Math.PI / 180;
    
  theEarthAndMoon.position.x = Math.cos(radians) * earthOrbitRadius;
  theEarthAndMoon.position.z = Math.sin(radians) * earthOrbitRadius;
    
  //run the Moon's orbit around the Earth
  moonOrbitAngle += moonOrbitSpeed; 
  let moonRadians = moonOrbitAngle * Math.PI / 180;
    
  moonMesh.position.x = Math.cos(moonRadians) * moonOrbitRadius;
  moonMesh.position.z = Math.sin(moonRadians) * moonOrbitRadius;
  
  renderCalls.forEach((callback) => {
    callback();
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}
window.addEventListener('resize', onWindowResize);