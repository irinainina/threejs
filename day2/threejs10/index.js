// https://stepik.org/lesson/582223/step/1?auth=login&unit=576957

function main() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
  camera.position.z = 120;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xC0C0C0);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  const objects = [];
  const spreadX = 28;
  const spreadY = 20;

  function addObject(x, y, obj) {
    obj.position.x = x * spreadX;
    obj.position.y = y * spreadY;

    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  function addLineGeometry(x, y, geometry) {
    const material = new THREE.LineBasicMaterial({color: 0x000000});
    const mesh = new THREE.LineSegments(geometry, material);
    addObject(x, y, mesh);
  }

  // куб
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    addSolidGeometry(-2, 1.5, new THREE.BoxBufferGeometry(width, height, depth));
  }

  // Первый ряд
  // круг
  {
    const radius = 7;
    const segments = 24;
    addSolidGeometry(-1, 1.5, new THREE.CircleBufferGeometry(radius, segments));
  }

  // конус
  {
    const radius = 6;
    const height = 8;
    const segments = 16;
    addSolidGeometry(0, 1.5, new THREE.ConeBufferGeometry(radius, height, segments));
  }

  // цилиндр
  {
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 8;
    const radialSegments = 12;
    addSolidGeometry(1, 1.5, new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments));
  }
 
  // додекаедр
  {
    const radius = 7;
    addSolidGeometry(2, 1.5, new THREE.DodecahedronBufferGeometry(radius));
  }
  
  // Второй ряд
  // сердечко
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2,
    };

    addSolidGeometry(-2, 0.5, new THREE.ExtrudeBufferGeometry(shape, extrudeSettings));
  }

  // икосаедр
  {
    const radius = 7;
    addSolidGeometry(-1, 0.5, new THREE.IcosahedronBufferGeometry(radius));
  }

  // абажур для лампы
  {
    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
    }
    addSolidGeometry(0, 0.5, new THREE.LatheBufferGeometry(points));
  }

  // октаедр
  {
    const radius = 7;
    addSolidGeometry(1, 0.5, new THREE.OctahedronBufferGeometry(radius));
  }

  // квадрат
  {
    const width = 9;
    const height = 9;
    const widthSegments = 2;
    const heightSegments = 2;
    addSolidGeometry(2, 0.5, new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments));
  }

  // Третий ряд
  // многогранник
  {
    const verticesOfCube = [
        -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
        -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
    ];
    const indicesOfFaces = [
        2, 1, 0,    0, 3, 2,
        0, 4, 7,    7, 3, 0,
        0, 1, 5,    5, 4, 0,
        1, 2, 6,    6, 5, 1,
        2, 3, 7,    7, 6, 2,
        4, 5, 6,    6, 7, 4,
    ];
    const radius = 7;
    const detail = 2;
    addSolidGeometry(-2, -0.5, new THREE.PolyhedronBufferGeometry(verticesOfCube, indicesOfFaces, radius, detail));
  }

  // кольцо
  {
    const innerRadius = 2;
    const outerRadius = 7;
    const segments = 18;
    addSolidGeometry(-1, -0.5, new THREE.RingBufferGeometry(innerRadius, outerRadius, segments));
  }

  // плоское сердечко
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    addSolidGeometry(0, -0.5, new THREE.ShapeBufferGeometry(shape));
  }

  // многогранник
  {
    const radius = 7;
    const widthSegments = 12;
    const heightSegments = 8;
    addSolidGeometry(1, -0.5, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments));
  }

  // пирамида
  {
    const radius = 7;
    addSolidGeometry(2, -0.5, new THREE.TetrahedronBufferGeometry(radius));
  }  

  // Четвёртый ряд
  // тор
  {
    const radius = 5;
    const tubeRadius = 2;
    const radialSegments = 8;
    const tubularSegments = 24;
    addSolidGeometry(-2, -1.5, new THREE.TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments));
  }

  // морской узел
  {
    const radius = 3.5;
    const tube = 1.5;
    const radialSegments = 8;
    const tubularSegments = 64;
    const p = 2;
    const q = 3;
    addSolidGeometry(-1, -1.5, new THREE.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q));
  }

  // загогулина
  {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }
      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }
    
    const path = new CustomSinCurve(4);
    const tubularSegments = 20;
    const radius = 1;
    const radialSegments = 8;
    const closed = false;
    addSolidGeometry(0, -1.5, new THREE.TubeBufferGeometry(path, tubularSegments, radius, radialSegments, closed));
  }

  // куб пустотелый
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    const thresholdAngle = 15;
    addLineGeometry(1, -1.5, new THREE.EdgesGeometry(
        new THREE.BoxBufferGeometry(width, height, depth),
        thresholdAngle));
  }

  // куб пустотелый
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    addLineGeometry(2, -1.5, new THREE.WireframeGeometry(new THREE.BoxBufferGeometry(width, height, depth)));
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    objects.forEach((obj, ndx) => {
      const speed = .1 + ndx * .05;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();