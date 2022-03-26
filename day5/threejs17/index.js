// https://stepik.org/lesson/582224/step/1?auth=login&unit=576958
// http://jsfiddle.net/Qn7cL/3/
// https://stackoverflow.com/questions/21120885/rotating-earth-around-sun

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( width, height );
document.body.append( renderer.domElement );

let earthOrbitRadius = 120;
let earthOrbitAngle = 0;
let earthOrbitSpeed = 0.5;

let moonOrbitRadius = 15;
let moonOrbitAngle = 0;
let moonOrbitSpeed = 4;

const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 1000 );
camera.position.z = 200;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( .25, 0, 1 ).normalize();
scene.add(light);

// sun
const sunGeometry = new THREE.SphereGeometry( 40, 40, 40 );
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0x554411 });

const loaderSun = new THREE.ImageLoader();
loaderSun.load( "./assets/img/sun.jpg", ( image ) => {
  let texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;

  sunMaterial.map = texture;
  sunMaterial.needsUpdate = true;
});

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.z = -40;
scene.add(sunMesh);

//this is the object that will have its position changed to orbit around the sun    
const theEarthAndMoon = new THREE.Object3D();
theEarthAndMoon.rotation.z = 23.439281 * Math.PI / 180; //tilt of earth in radians;
scene.add(theEarthAndMoon);

// earth
const earthGeometry = new THREE.SphereGeometry( 8, 20, 20 );
const earthMaterial = new THREE.MeshPhongMaterial({ emissive: 0x112244 });

const loaderEart = new THREE.ImageLoader();
loaderEart.load( "./assets/img/earth.jpg", ( image ) => {
  let texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;

  earthMaterial.map = texture;
  earthMaterial.needsUpdate = true;
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
// earthMesh.position.x = 20;
theEarthAndMoon.add(earthMesh);

// moon
const moonGeometry = new THREE.SphereGeometry( 2.5, 20, 20 );
const moonMaterial = new THREE.MeshPhongMaterial({ });

const loaderMoon = new THREE.ImageLoader();
loaderMoon.load( "./assets/img/moon.jpg", ( image ) => {
  let texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;

  moonMaterial.map = texture;
  moonMaterial.needsUpdate = true;
});

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
// moonMesh.position.x = 4;
theEarthAndMoon.add(moonMesh);

function render() {
  sunMesh.rotation.y += 0.005;
  earthMesh.rotation.y += 0.05;
  moonMesh.rotation.y += 0.005;
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