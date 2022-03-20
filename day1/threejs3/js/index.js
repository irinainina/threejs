const body = document.querySelector('body');
const canvas = document.createElement('canvas');
body.append(canvas);

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

canvas.width = width;
canvas.height = height;

const ball = {
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
}

const gui = new dat.GUI();
gui.add(ball, 'rotationX').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'rotationY').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'rotationZ').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'positionX').min(-5).max(5).step(0.1);
gui.add(ball, 'positionY').min(-5).max(5).step(0.1);
gui.add(ball, 'positionZ').min(-5).max(5).step(0.1);

var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setClearColor(0x000000);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
camera.position.set(0, 0, 1000);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

var geometry = new THREE.SphereGeometry(200, 12, 12);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
for(var i = 0; i < geometry.faces.length; i++) {
  geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())
}

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function loop() {
  mesh.position.x += ball.positionX;
  mesh.position.y += ball.positionY;
  mesh.position.z += ball.positionZ;
  mesh.rotation.x += ball.rotationX;
  mesh.rotation.y += ball.rotationY;
  mesh.rotation.z += ball.rotationZ;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
loop();