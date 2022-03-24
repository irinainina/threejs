// https://youtu.be/vCCGZeuseqc

const body = document.querySelector('body');
const canvas = document.createElement('canvas');
body.append(canvas);

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

canvas.width = width;
canvas.height = height;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x000000);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
camera.position.set(0, 0, 1000);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const geometry = new THREE.SphereGeometry(200, 12, 12);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.render(scene, camera);

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}
window.addEventListener('resize', onWindowResize);