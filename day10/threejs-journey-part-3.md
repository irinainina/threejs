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
#### MeshPhysicalMaterial
- То же, что предыдущий, но добавляется эффект прозрачной эмали, которой покрыт материал
```js
const material = new THREE.MeshPhysicalMaterial();
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

### Загрузка текста и установление его настроек

```js
const loaderText = new FontLoader();

loaderText.load('./font/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Hello Three.js', {
    font: font,
    size: 2.5,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
  });
textGeometry.center();
const text = new THREE.Mesh(textGeometry, material);
scene.add(text);
```

## Свет

#### AmbientLight
AmbientLight равномерное освещение сцены.  
Первый параметр цвет, второй - интенсивность освещения  
```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```  
или  
```js
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);
```  
Направленный свет всегда используем в сочетании с AmbientLight, чтобы имитировать полутень на неосвещённой стороне  

#### DirectionalLight
Направленный свет, как если бы солнечные лучи шли параллельно  
Первый параметр цвет, второй - интенсивность освещения  
По умолчанию свет падает сверху. Чтобы изменить направление освещения используем свойство position.  
```js
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
```  

#### HemisphereLight
Похож на AmbientLight, но у неба и земли разный цвет  
Первый параметр - цвет неба, второй параметр - цвет земли, третий параметр — intensity  
```js
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
```

#### PointLight
Источник света бесконечно мал, свет распространяется равномерно во всех направлениях.  Первый параметр — color, второй параметр — intensity
```js
const pointLight = new THREE.PointLight(0xff9000, 0.5);
scene.add(pointLight);
```

По умолчанию интенсивность света не исчезает.  
Расстояние затухания и скорость затухания определяют свойства distance и decay  
Установить их можно в параметрах класса в качестве третьего и четвертого параметров или в свойствах экземпляра:
```js
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
```
или
```js
const pointLight = new THREE.PointLight(0xff9000, 0.5);
pointLight.distance = 10;
pointLight.decay = 2;
scene.add(pointLight);
```

Для направленных источников света можно увидеть направление света:
```js
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)
```

## Тени

Активируем карты теней в renderer:
```js
renderer.shadowMap.enabled = true;
```

Указываем, какой объект отбрасывает тень и на какой объект падает тень
```js
sphere.castShadow = true;
plane.receiveShadow = true;
```
Указываем, какой источник света создаёт тень
```js
directionalLight.castShadow = true;
```
### Улучшаем качество тени

Добавляем помощник
```js
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
```

Увеличиваем детализацию тени
```js
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
```

Ограничиваем дальность тени
```js
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
```

Ограничиваем отображение тени камерой
```js
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2
```

Размываем края тени
```js
directionalLight.shadow.radius = 10
```

Алгоритм карты теней

THREE.BasicShadowMap Очень производительный, но плохого качества  
THREE.PCFShadowMap Менее производительный, но с более гладкими краями - Значение по умолчанию  
THREE.PCFSoftShadowMap Менее производительный, но с более мягкими краями  
THREE.VSMShadowMap Меньше производительности, больше ограничений, могут быть неожиданные результаты  
```js
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```