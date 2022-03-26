// https://codepen.io/afonsopacifer/pen/mOPxKG

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, aspect, 1, 400 );
camera.position.z = 150;

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 0, 1 ).normalize();
scene.add(light);
 
// planet
let planetRadius = 40,
    planetWidthSegments = 20,
    planetHeightSegments = 20;

let planetMaterial = new THREE.MeshPhongMaterial( {} );
let loader = new THREE.ImageLoader();

loader.load( "./assets/img/earth.jpg", ( image ) => {
  let texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;
  
  planetMaterial.map = texture;
  planetMaterial.needsUpdate = true;
});

const planetGeometry = new THREE.SphereGeometry( planetRadius, planetWidthSegments, planetHeightSegments );

const planet = new THREE.Mesh( planetGeometry, planetMaterial );

// moon
let moonRadius = 12,
    moonWidthSegments = 10,
    moonHeightSegments =10;

let moonMaterial = new THREE.MeshPhongMaterial( {} );
let loader2 = new THREE.ImageLoader();

loader2.load( "./assets/img/moon.jpg", ( image ) => {
  let texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;
  
  moonMaterial.map = texture;
  moonMaterial.needsUpdate = true;
});

const moonGeometry = new THREE.SphereGeometry( moonRadius, moonWidthSegments, moonHeightSegments );

const moon = new THREE.Mesh( moonGeometry, moonMaterial );


scene.add( planet, moon );

// render
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( width, height );
document.body.append( renderer.domElement );

const render = () => {
  
  moon.position.set( -100, 20, -20 );

  requestAnimationFrame( render );
  planet.rotation.y += 0.004;
  moon.rotation.y -= 0.012;
  
  renderer.render( scene, camera );
  
};

render();