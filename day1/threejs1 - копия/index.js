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
camera.position.set(0, 0, 100);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const geometry = new THREE.BoxGeometry(20, 12, 12);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// https://github.com/jeromeetienne/threex.domevents
var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
domEvents.addEventListener(cube, 'mousedown', onDocumentMouseDown, false);

function onDocumentMouseDown(event){
    if (event.target == cube)
        console.log('1111')
}

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