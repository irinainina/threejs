// Create the scene
var scene = new THREE.Scene();

// Create the camera
var width = window.innerWidth;
var height = window.innerHeight;
var aspect = width / height;
var camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
camera.position.set(0,0,100);

// Create the renderer
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Create a shape
var geometry = new THREE.BoxBufferGeometry(10,10,10);
var boxCount = 1000;

for (var i = 0; i < boxCount; i++) {
  var material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
  var shape = new THREE.Mesh(geometry, material);
  var px = Math.random() * 100 - 50,
      py = Math.random() * 100 - 50,
      pz = Math.random() * 100 - 50;
  var rx = Math.random() * Math.PI * 2,
      ry = Math.random() * Math.PI * 2,
      rz = Math.random() * Math.PI * 2;
  var sx = Math.random() * .5,
      sy = Math.random() * .5,
      sz = Math.random() * .5;
  shape.position.set(px,py,pz);
  shape.rotation.set(rx,ry,rz);
  shape.scale.set(sx,sy,sz);
  
  scene.add(shape);
}

var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.y = 10;
scene.add(light);

var light2 = new THREE.DirectionalLight(0xffffff, .5);
light2.position.set(-10,-10,10);
scene.add(light2);

function animate() {
  requestAnimationFrame(animate);
  
  scene.rotation.y += .01;
  
  renderer.render(scene, camera);
}
animate();

function onWindowResize() {
  var newWidth = window.innerWidth,
      newHeight = window.innerHeight,
      newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}

window.addEventListener('resize', onWindowResize);