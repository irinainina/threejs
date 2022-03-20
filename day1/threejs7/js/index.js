const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.append( renderer.domElement );

const spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
scene.add(spotLight);
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set( -200, -200, -200);
scene.add(spotLight2);

const geometry = new THREE.TorusGeometry( 6, 2, 16, 100 );
const material = new THREE.MeshPhongMaterial({ color: 0xdaa520, specular: 0xbcbcbc });

const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 25;

function render() {
  requestAnimationFrame( render );
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;      
  renderer.render( scene, camera );
}
render();