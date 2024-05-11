import './style.css'
import spaceImg from './media/space.jpg'
import './media/mouse.png'
import moonImg from './media/moon.jpg'
import earthImg from './media/earth.jpg'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


function toast(txt) {
  Toastify({
    text: txt,
    className: "toast"
  }).showToast();
}



const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}


Array(400).fill().forEach(addStar);



const spaceTexture = new THREE.TextureLoader().load(spaceImg);
scene.background = spaceTexture;

// Moon

const moonTexture = new THREE.TextureLoader().load(moonImg);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.6,40,40),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)

scene.add(moon);
moon.position.z = +2;
moon.position.x  = -3;



// Earth

const earthTexture = new THREE.TextureLoader().load(earthImg);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,40,40),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
)

scene.add(earth);
earth.rotateX(0.3)
earth.position.z = -10;
earth.position.x  = 0;


var lastScrollTop = 0;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  if (st > lastScrollTop){
     // downscroll code
    earth.rotation.y += 0.05;
  } else {
     // upscroll code
    earth.rotation.y -= 0.05;
  }
  moon.position.x = (st * 0.03)-6
  if (moon.position.x>7.5) {
    moon.position.x=7.5

    moon.position.z=(moon.position.x)
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  //moon.rotation.y += 0.075;
  //moon.rotation.z += 0.05;

  if (t>-800) {
    if (Math.sign((t * 0.1) * -1)==1) {
      camera.position.z = ((t * 0.1) * -1);
    }
    if (t>1) {
      camera.position.z = 0;
    }
  } else {
    //camera.position.z = ((-300 * 0.1) * -1);
    camera.position.z = ((-800 * 0.1) * -1)
  }
  //console.log(t)
  //console.log(camera.position);

  // Blur BG
  const amountToBlur = (window.scrollY - (window.innerHeight - 200))

  if (amountToBlur>0) {
    document.getElementById("bg").style.filter = `blur(${amountToBlur / 50}px)`
  } else {
    document.getElementById("bg").style.filter = `blur(0px)`
  }
}

document.body.onscroll = moveCamera

function reportWindowSize() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  moveCamera()
}

window.onresize = reportWindowSize;


function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.001;
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


window.addEventListener('load', function () {
  document.getElementById("load").style.display="none"
  document.getElementById("main").style.display="block"
  document.getElementById("bg").style.opacity="100%"
  document.body.style.cursor="auto"
})


animate()