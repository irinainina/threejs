const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.append( renderer.domElement );

const geometry = new THREE.SphereGeometry(10, 32, 32);
const material = new THREE.MeshNormalMaterial({ wireframe: true });

var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 25;

function render() {
  requestAnimationFrame( render );
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;      
  renderer.render( scene, camera );
}
render();