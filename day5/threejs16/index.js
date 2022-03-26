// https://stepik.org/lesson/582224/step/1?auth=login&unit=576958

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( width, height );
document.body.append( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 400 );
camera.position.z = 40;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( .25, 0, 1 ).normalize();
scene.add(light);

const objects = [];

// sun
const sunGeometry = new THREE.SphereGeometry( 8, 40, 40 );
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
scene.add(sunMesh);
objects.push(sunMesh);

// earth
const earthGeometry = new THREE.SphereGeometry( 2, 20, 20 );
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
earthMesh.position.x = 20;
sunMesh.add(earthMesh);
objects.push(earthMesh);

// moon
const moonGeometry = new THREE.SphereGeometry( .5, 20, 20 );
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
moonMesh.position.x = 4;
earthMesh.add(moonMesh);
objects.push(moonMesh);

function render() {
  
  objects.forEach((obj) => {
    obj.rotation.y += 0.01;
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