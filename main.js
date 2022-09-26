import './style.css'
import './space.png'
import './mouse.png'
import './moon.jpg'
import './galaxy.png'
import './earth.jpg'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}


Array(200).fill().forEach(addStar);



const spaceTexture = new THREE.TextureLoader().load('space.png');
scene.background = spaceTexture;

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.8,40,40),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)

scene.add(moon);
moon.rotateX(0.3)
moon.position.z = -18;
moon.position.x  = 8;



// Earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,40,40),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
)

scene.add(earth);
earth.rotateX(0.3)
earth.position.z = -15;
earth.position.x  = 0;



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.y += 0.05;
  //moon.rotation.y += 0.075;
  //moon.rotation.z += 0.05;

  if (t>-300) {
    if (Math.sign((t * 0.1) * -1)==1) {
      camera.position.z = ((t * 0.1) * -1);
    }
    if (t>1) {
      camera.position.z = 0;
    }
  }
  console.log(t)
  console.log(camera.position);
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate);

  /*torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //controls.update()
*/
  renderer.render(scene, camera);
}



camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;

animate()