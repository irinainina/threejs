# three.js Journey Part-3
https://coursehunters.online/t/threejs-journey-part-3

## Материалы
- цвет материала
```js
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
```
или так
```js
material.color = new THREE.Color(0xff0000);
```
цвет можно задать в любом формате:
```js
material.color = new THREE.Color('#ff0000');
material.color = new THREE.Color('#f00');
material.color = new THREE.Color('red');
material.color = new THREE.Color('rgb(255, 0, 0)');
```

- текстура

```js
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/door.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
```
или так
```js
material.map = texture;
```

текстуру и цвет можно комбинировать

```js
const material = new THREE.MeshBasicMaterial({ map: texture, color: 0x00ff00 });
```

- показать сетку

```js
material.wireframe = true;
```

- добавить прозрачность

```js
material.transparent = true;
material.opacity = 0.5;
```

- какая сторона материала видна
лицевая - `THREE.FrontSide`, обратная - `THREE.BackSide`, обе - `THREE.DoubleSide` 
```js
material.side = THREE.DoubleSide;
``` 

### вид материала

#### MeshNormalMaterial
- приятный фиолетовый, голубоватый, зеленоватый цвет
```js
const material = new THREE.MeshNormalMaterial();
``` 
- отобразить грани
```js
material.flatShading = true;
```

#### MeshMatcapMaterial
- великолепно выглядит, будучи очень производительным
- скачать текстуру https://observablehq.com/@makio135/matcaps?ui=classic
- https://github.com/nidorx/matcaps

```js
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
```

#### MeshDepthMaterial
окрасит геометрию в белый цвет, если она близка к near значению камеры, и в черный, если она близка к far значению камеры:
```js
const material = new THREE.MeshDepthMaterial() 
```

## Свет
#### AmbientLight
- Равномерный рассеянный свет
```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

#### PointLight 
- точечный свет
```js
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight) 
```

#### MeshLambertMaterial 
- Реагирует на свет, без света не отображается
```js
const material = new THREE.MeshLambertMaterial() 
```

#### MeshPhongMaterial 
- Похож на предыдущий, дополнительно может создавать блики, можно указать яркость и цвет блика
```js
const material = new THREE.MeshPhongMaterial()
material.shininess = 100
material.specular = new THREE.Color(0x1188ff)
```

#### MeshStandardMaterial
- Высокая реалистичность, но и высокая ресурсоёмкость
```js
const material = new THREE.MeshStandardMaterial()
```

- roughness - шерховатость материала
- metalness - металличность материала
```js
material.metalness = 0.45
material.roughness = 0.65
```

## Карта окружающей среды
Объект отображает окружение
```js
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/1/px.jpg',
  '/textures/environmentMaps/1/nx.jpg',
  '/textures/environmentMaps/1/py.jpg',
  '/textures/environmentMaps/1/ny.jpg',
  '/textures/environmentMaps/1/pz.jpg',
  '/textures/environmentMaps/1/nz.jpg'
])
material.envMap = environmentMapTexture
```

#### создать карту
- скачиваем картинку в высоком качестве https://polyhaven.com/hdris 
- преобразуем в карту из 6 картинок https://matheowis.github.io/HDRI-to-CubeMap/ 

## 3D-текст
- Файлы шрифта https://github.com/mrdoob/three.js/tree/dev/examples/fonts
- Конвертер http://gero3.github.io/facetype.js/

- Шрифт для использования можно импортировать
```js
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
```

Или положить в /static/ папку
