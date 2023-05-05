import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const init = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 500);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const textures = new THREE.TextureLoader().load("/earth.jpg");

  const ballGeometry = new THREE.SphereGeometry(100, 64, 32);
  const ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures });
  const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  const controls = new OrbitControls(camera, renderer.domElement);

  const animate = () => {
    pointLight.position.set(
      200 * Math.sin(Date.now() / 500),
      200 * Math.sin(Date.now() / 1000),
      200 * Math.cos(Date.now() / 500)
    );
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  const onWindowResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", function () {
    onWindowResize();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  animate();
};

window.addEventListener("load", function () {
  init();
});
