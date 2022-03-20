const body = document.querySelector('body');
const canvas = document.createElement('canvas');
body.append(canvas);

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

canvas.width = width;
canvas.height = height;

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
  // mesh.position.x += 1;
  mesh.rotation.y += Math.PI / 500;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
loop();