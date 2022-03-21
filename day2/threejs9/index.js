const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, aspect, 1, 500 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

const material = new THREE.LineBasicMaterial( {
	color: 0xfff000,
	linewidth: 7,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
} );

const geometry = new THREE.BufferGeometry(-10, 0, 10);
const vertices = new Float32Array( [
  -10, 0, 0,
  0, 10, 0,
  10, 0, 0
  ] );
  
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const line = new THREE.Line(geometry, material);
scene.add( line );

camera.position.z = 50;

renderer.render(scene, camera);