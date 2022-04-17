# three.js Journey Part-4
https://coursehunters.online/t/threejs-journey-part-4

## Добавить туман

Первый параметр — это color, второй параметр — near (на каком расстоянии от камеры начинается туман), а третий параметр — far (на каком расстоянии от камеры туман будет полностью непрозрачным).

```js
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;
// изменить цвет renderer, использовать тот же цвет, что и туман
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
renderer.setClearColor('#262837');
```
