// https://stepik.org/lesson/582226/step/1?auth=login&unit=576960

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 400 );
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( width, height );
document.body.append( renderer.domElement );

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 0, 1 ).normalize();
scene.add(light);
 
const cubes = [];  //просто массив, который мы можем использовать для вращения кубов
const loader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({
    map: loader.load('./assets/img/img1.png'),
    transparent: true,
    side: THREE.DoubleSide,
  });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const render = () => { 
  requestAnimationFrame( render );
  cube.rotation.y += 0.01;  
  cube.rotation.x += 0.01;
  renderer.render( scene, camera );  
};

render();

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}
window.addEventListener('resize', onWindowResize);