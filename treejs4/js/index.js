const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.append( renderer.domElement );

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 25;

function render() {
  requestAnimationFrame( render );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;      
  renderer.render( scene, camera );
}
render();