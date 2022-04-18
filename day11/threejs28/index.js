import * as THREE from 'three';
import { OrbitControls } from './js/OrbitControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';
const gui = new dat.GUI({ closed: true });

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();

const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
renderer.setClearColor('#262837');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.2);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.2);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  './textures/door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load(
  './textures/door/metalness.jpg'
);
const doorRoughnessTexture = textureLoader.load(
  './textures/door/roughness.jpg'
);

const bricksColorTexture = textureLoader.load('./textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load(
  './textures/bricks/ambientOcclusion.jpg'
);
const bricksNormalTexture = textureLoader.load('./textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load(
  './textures/bricks/roughness.jpg'
);

const grassColorTexture = textureLoader.load('./textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load(
  './textures/grass/ambientOcclusion.jpg'
);
const grassNormalTexture = textureLoader.load('./textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load(
  './textures/grass/roughness.jpg'
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

// Objects
const house = new THREE.Group();
scene.add(house);

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.25;
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

const bushGeometry = new THREE.SphereBufferGeometry(1, 32, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 40; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4.5;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.castShadow = true;

  grave.position.set(x, 0.3, z);

  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
scene.add(ghost3);

const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
floor.receiveShadow = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const gltfLoader = new GLTFLoader();
const tree = await gltfLoader.loadAsync('./models/tree.gltf');
const fence = await gltfLoader.loadAsync('./models/fence.gltf');

const frontFences = new THREE.Group();
for (let i = 0; i !== 8; i++) {
  const newFence = fence.scene.clone();
  newFence.position.z = 7.5;
  newFence.position.x = -7 + i * 2;
  frontFences.add(newFence);
}

const backFences = new THREE.Group();
for (let i = 0; i !== 8; i++) {
  const newFence = fence.scene.clone();
  newFence.position.z = -7.5;
  newFence.position.x = -7 + i * 2;
  backFences.add(newFence);
}

const leftFences = new THREE.Group();
for (let i = 0; i !== 7; i++) {
  const newFence = fence.scene.clone();
  newFence.position.x = -8;
  newFence.position.z = -6 + i * 2;
  newFence.rotation.y = 1.5708;
  leftFences.add(newFence);
}

const rightFences = new THREE.Group();
for (let i = 0; i !== 7; i++) {
  const newFence = fence.scene.clone();
  newFence.position.x = 8;
  newFence.position.z = -6 + i * 2;
  newFence.rotation.y = 1.5708;
  rightFences.add(newFence);
}

scene.add(frontFences, backFences, leftFences, rightFences);

const tree1 = tree.scene.clone();
tree1.position.x = -6;
tree1.position.z = 5;
tree1.rotation.y = 36;
tree1.children[0].castShadow = true;

const tree2 = tree.scene.clone();
tree2.position.x = -7;
tree2.position.z = -6;
tree2.rotation.y = 36;
tree2.children[0].castShadow = true;

const tree3 = tree.scene.clone();
tree3.position.x = 7;
tree3.position.z = -2;
tree3.rotation.y = 160;
tree3.children[0].castShadow = true;

const tree4 = tree.scene.clone();
tree4.position.x = 4;
tree4.position.z = -5;
tree4.rotation.y = 280;
tree4.children[0].castShadow = true;

scene.add(tree1, tree2, tree3, tree4);

function resize() {
  // Update sizes
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  // Update camera
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
}
window.addEventListener('resize', resize);

const clock = new THREE.Clock();

function render() {
  const elapsedTime = clock.getElapsedTime();

  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
