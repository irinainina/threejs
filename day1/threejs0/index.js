// https://codepen.io/tutsplus/full/bxYVGz
// Create the scene
const scene = new THREE.Scene();

// Create the camera
const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;
const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
camera.position.set(0, 0, 100);

// Create the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
document.body.append(renderer.domElement);

// Create a shape
const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
const boxCount = 500;

for (let i = 0; i < boxCount; i++) {
  const material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
  const shape = new THREE.Mesh(geometry, material);
  const px = Math.random() * 100 - 50,
      py = Math.random() * 100 - 50,
      pz = Math.random() * 100 - 50;
  const rx = Math.random() * Math.PI * 2,
      ry = Math.random() * Math.PI * 2,
      rz = Math.random() * Math.PI * 2;
  const sx = Math.random() * .5,
      sy = Math.random() * .5,
      sz = Math.random() * .5;
  shape.position.set(px, py, pz);
  shape.rotation.set(rx, ry, rz);
  shape.scale.set(sx, sy, sz);
  
  scene.add(shape);
}

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.y = 10;
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, .5);
light2.position.set(-10,-10,10);
scene.add(light2);

function animate() {
  requestAnimationFrame(animate);
  
  scene.rotation.y += .01;
  
  renderer.render(scene, camera);
}
animate();

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}

window.addEventListener('resize', onWindowResize);