# three.js Journey Part-2
https://coursehunters.online/t/threejs-journey-part-2

## Изменение размера экрана
```js
function resize () {
  // Update sizes
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  // Update camera
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
}
window.addEventListener('resize', resize);
```

## Полноэкранный режим
```js
function fullscreen() {
  if(!document.fullscreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
      document.exitFullscreen()
  }
}
window.addEventListener('dblclick', fullscreen)
```

## Dat.GUI – настройки проекта
установить  
`npm install dat.gui`  
импортировать  
`import * as dat from 'dat.gui'`  
подключение  
`const gui = new dat.GUI();`  

### Типы настроек
-	Диапазон — для чисел с минимальным и максимальным значением
-	Цвет — для цветов с различными форматами.
-	Текст — для простых текстов.
-	Флажок — для логических значений ( true или false)
-	Select — для выбора из списка значений
-	Кнопка — для запуска функций
-	Папка — чтобы упорядочить панель, если у вас слишком много элементов.

#### добавление настройки с диапазоном значений
`gui.add(mesh.position, 'y', -3, 3, 0.1);`

#### добавление настройки с флажком
`gui.add(material, 'wireframe');`

####  добавление настройки с цветом
в начале кода после импорта библиотек добавляем объект parameters  
```js
const parameters = {
  color: 0xff0000,
};
```
указываем настройку
```js
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});
```

При желании можно заменить строку
```js
const material = new THREE.MeshBasicMaterial({ color: 0x0ff0ff });
```
на
```js
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
```
добавление настройки с функцией
```js
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
};
gui.add(parameters, 'spin');
```

#### Настройки панели настроек
- скрыть/отобразить панель можно кликом по кнопке H (англ)
- чтобы панель была скрыта с самого начала, пишем после ее создания  
```js
gui.hide();
```
- чтобы панель была свёрнута с самого начала, пишем после ее создания
```js
const gui = new dat.GUI({ closed: true });
```
- указать ширину панели
```js
const gui = new dat.GUI({ width: 400 });
```

## Текстуры
```js
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/door/alpha.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
```

картинки с текстурами можно или импортировать
```js
import imageSource1 from '../static/door.jpg';
```
или сложить в папку static и указывать путь к ней с первой косой чертой но без указания папки static (проверить как будет работать на гитхабе)
```js
const imageSource = '/door.jpg';
```

- повторить текстуру
```js
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 2;
texture.repeat.y = 3;
```

- сместить текстуру
```js
texture3.offset.x = 0.5;
texture3.offset.y = 0.5;
```

- повернуть текстуру
```js
texture.rotation = Math.PI * 0.25;
texture.center.x = 0.5;
texture.center.y = 0.5;
```

### Фильтр минимизации
Фильтр минимизации используем когда текстура слишком велика для поверхности
```js
texture.minFilter = THREE.NearestFilter;
```
Если картинка с текстурой слишком мала испольуем magFilter
```js
texture.magFilter = THREE.NearestFilter 
```
ширина и высота вашей текстуры должны быть степенью 2  
Например: 512x512, 1024x1024 или 512x2048 
