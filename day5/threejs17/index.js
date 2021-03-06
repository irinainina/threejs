// https://stepik.org/lesson/582224/step/1?auth=login&unit=576958
// http://jsfiddle.net/Qn7cL/3/
// https://stackoverflow.com/questions/21120885/rotating-earth-around-sun

import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';
import data from './js/data.js';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( width, height );
renderer.setClearColor(0x000000, 0.8);
document.body.append( renderer.domElement );

let earthOrbitRadius = 120;
let earthOrbitAngle = 0;
let earthOrbitSpeed = 0.2;

let moonOrbitRadius = 15;
let moonOrbitAngle = 0;
let moonOrbitSpeed = 1.5;

const camera = new THREE.PerspectiveCamera( 45, aspect, 1, 4000 );
camera.position.z = 400;

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

controls.minDistance = 220;
controls.maxDistance = 2500;

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function () {
  controls.update();
});

// sun
const sunGeometry = new THREE.SphereGeometry( 50, 60, 30 );

const loader1 = new THREE.TextureLoader(); 
const sunMaterial = new THREE.MeshPhongMaterial({  
  emissive: 0x554411,
  map: loader1.load('./assets/img/sun.jpg'),
});

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.name = 'sun';
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
earthMesh.name = 'earth';
theEarthAndMoon.add(earthMesh);

// moon
const moonGeometry = new THREE.SphereGeometry( 2.5, 15, 15 );

const loader3 = new THREE.TextureLoader(); 
const moonMaterial = new THREE.MeshPhongMaterial({
  emissive: 0x000000,
  map: loader3.load('./assets/img/moon.jpg'),
});

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.name = 'moon';
theEarthAndMoon.add(moonMesh);

// information panel
let spaseObjectName;
let info;
function createPanel() {
  const panel = document.createElement('div');
  panel.classList.add('panel');
  const panelTitle = document.createElement('h1');
  panelTitle.textContent = 'Welcome to Universe';
  panel.append(panelTitle);
  spaseObjectName = document.createElement('h2');
  panel.append(spaseObjectName);
  info = document.createElement('p');
  info.innerHTML = data.info;
  panel.append(info);
  document.body.append(panel);
}
createPanel();

// click on spase object
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseDown( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children );
  if(intersects.length) {
    spaseObjectName.textContent = intersects[0].object.name;
    info.innerHTML = data[intersects[0].object.name];
  } else {
    spaseObjectName.textContent = '';
    info.innerHTML = data.info;
  }
	
}
window.addEventListener( 'mousedown', onMouseDown, false );


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



