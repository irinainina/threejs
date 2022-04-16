# three.js Journey Part-1
https://coursehunters.online/t/threejs-journey-part-1

## 4 свойства для преобразования объектов
- position (для перемещения объекта)
- scale (чтобы изменить размер объекта)
- rotation (чтобы повернуть объект)
- quaternion (чтобы повернуть объект, решает проблему порядка осей вращения)

### position

```
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
```
или
```
mesh.position.set(0.7, - 0.6, 1)
```

`mesh.position.length()` – длина вектора  
`mesh.position.distanceTo(camera.position)` – расстояние до чего-нибудь  
`mesh.position.normalize()` – длина вектора уменьшилась до 1 с сохранением направления

### Добавить оси координат
```
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```

### scale
```
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5
```

### rotation
`rotation.y` – карусель  
`rotation.x` - колесо  
`rotation.z` – пропеллер самолёта в котором сидишь

`mesh.rotation.y = Math.PI * 2` – полный оборот (ничего не изменилось)  
`mesh.rotation.x = Math.PI * 0.25` – восьмая часть полного оборота  

Вращение применяется в следующем порядке: x, y, а затем z. Это может привести к странному поведению, когда одна ось больше не действует из-за предыдущих

Свойство quaternion также выражает вращение, решает проблему порядка.

### Посмотри на это!
Объект автоматически повернет свою -z ось в сторону указанной цели.
```
camera.lookAt(new THREE.Vector3(0, - 1, 0));
camera.lookAt(mesh.position)
```

### Создание групп
```
const group = new THREE.Group()
scene.add(group)
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube)
```

### Анимации
```
const animation = () => {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}
animation()
```

### GSAP - GreenSock Animation Platform
устанавливаем  
`npm install gsap`  
подключаем  
`import gsap from 'gsap'`

### Камера
Камера смотрит на объект при перемещении объекта
```
camera.lookAt(mesh.position);
```

Камера смотрит на объект при перемещении камеры  
```
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / width - 0.5;
    cursor.y = - (event.clientY / height - 0.5);
})
const animation = () => {
  camera.position.x = cursor.x;
  camera.position.y = cursor.y;
  renderer.render(scene, camera);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}
animation();
```

Полный поворот камеры вокруг объекта
```
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / width - 0.5;
    cursor.y = - (event.clientY / height - 0.5);
})

const animation = () => {
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  camera.position.y = cursor.y * 3
  camera.lookAt(mesh.position)
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}
animation();
```

### OrbitControls
импорт  
`import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';`  
подключение  
`const controls = new OrbitControls(camera, canvas);`  
Обновление внутри функции с анимацией
```
const animation = () => {
  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(animation);
};
animation();
```