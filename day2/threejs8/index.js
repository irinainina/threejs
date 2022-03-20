const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const option = {
  rotationX: 0,
  rotationY: 0,
}

const gui = new dat.GUI();
gui.add(option, 'rotationX').min(-0.1).max(0.1).step(0.001);
gui.add(option, 'rotationY').min(-0.1).max(0.1).step(0.001);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const torusGeometry = new THREE.TorusGeometry( 1, .3, 16, 32 );

const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

const cube = new THREE.Mesh( boxGeometry, material );
cube.position.x = 6
scene.add( cube );

const sphere = new THREE.Mesh( sphereGeometry, material );
sphere.position.x = 0
scene.add( sphere );

const torus = new THREE.Mesh( torusGeometry, material );
torus.position.x = -6
scene.add( torus );

camera.position.z = 10;

function animate() {
	requestAnimationFrame( animate );

  cube.rotation.x += option.rotationX;
	cube.rotation.y += option.rotationY;
  sphere.rotation.x += option.rotationX;
	sphere.rotation.y += option.rotationY;
  torus.rotation.x += option.rotationX;
	torus.rotation.y += option.rotationY;

	renderer.render( scene, camera );
}
animate();