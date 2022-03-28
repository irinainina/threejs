// https://stepik.org/lesson/582229/step/1?auth=login&unit=576963

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.append(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

const loader = new THREE.TextureLoader();

const planeSize = 40;

const texture = loader.load('./assets/img/checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
planeMat.color.setRGB(1.5, 1.5, 1.5);
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -0.5;
scene.add(mesh);

const shadowTexture = loader.load('./assets/img/roundshadow.png');
const sphereShadowBases = [];
{
  const sphereRadius = 1;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions
  );

  const planeSize = 1;
  const shadowGeo = new THREE.PlaneGeometry(planeSize, planeSize);

  const numSpheres = 15;
  for (let i = 0; i < numSpheres; ++i) {
    // сделайте основу для тени и сферы. поэтому они двигаются вместе.
    const base = new THREE.Object3D();
    scene.add(base);

    // добавляем тень к базе
    // Примечание: мы создаем новый материал для каждой сферы, чтобы мы могли установить прозрачность материала этой сферы отдельно.
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true, // чтобы мы могли видеть землю
      depthWrite: false, // поэтому нам не нужно сортировать
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = 0.001; // так что мы немного над землей
    shadowMesh.rotation.x = Math.PI * -0.5;
    const shadowSize = sphereRadius * 4;
    shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
    base.add(shadowMesh);

    // добавить сферу к основе
    const u = i / numSpheres;
    const sphereMat = new THREE.MeshPhongMaterial();
    sphereMat.color.setHSL(u, 1, 0.75);
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(0, sphereRadius + 2, 0);
    base.add(sphereMesh);

    // запомните все 3 плюс положение y
    sphereShadowBases.push({
      base,
      sphereMesh,
      shadowMesh,
      y: sphereMesh.position.y,
    });
  }
}

const skyColor = 0xb1e1ff; // светло-синий
const groundColor = 0xb97a20; // коричневато-оранжевый
const intensity1 = 0.25;
const light1 = new THREE.HemisphereLight(skyColor, groundColor, intensity1);
scene.add(light1);

const color = 0xffffff;
const intensity2 = 0.75;
const light2 = new THREE.DirectionalLight(color, intensity2);
light2.position.set(0, 10, 5);
light2.target.position.set(-5, 0, 0);
scene.add(light2);
scene.add(light2.target);

function render(time) {
  time *= 0.001; //конвертировать в секунды

  sphereShadowBases.forEach((sphereShadowBase, ndx) => {
    const { base, sphereMesh, shadowMesh, y } = sphereShadowBase;

    //u - это значение, которое изменяется от 0 до 1, когда мы перебираем сферы
    const u = ndx / sphereShadowBases.length;

    // вычислить позицию для этой базы. Это переместит и сферу, и ее тень.
    const speed = time * 0.2;
    const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : -1);
    const radius = Math.sin(speed - ndx) * 10;
    base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

    // yOff - это значение от 0 до 1.
    const yOff = Math.abs(Math.sin(time * 2 + ndx));
    //перемещать сферу вверх и вниз
    sphereMesh.position.y = y + THREE.MathUtils.lerp(-2, 2, yOff);
    // исчезать тени по мере того, как сфера поднимается
    shadowMesh.material.opacity = THREE.MathUtils.lerp(1, 0.25, yOff);
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

render(1);

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  camera.aspect = newAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}
window.addEventListener('resize', onWindowResize);