import * as THREE from 'three';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  (2 * window.innerWidth) / 3 / ((7 * window.innerHeight) / 8),
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize((2 * window.innerWidth) / 3, (7 * window.innerHeight) / 8);
document.getElementById('app').appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xf2e0cf, 10);
directionalLight.position.set(100, 0, 0);
scene.add(ambientLight, directionalLight);

// Group for tetrahedra
const stellatedOctahedron = createStellatedOctahedron();
stellatedOctahedron.position.set(8, 20, -20);
scene.add(stellatedOctahedron);

// Group for octahedra compound
const octahedronCompound = createOctahedronCompound();
octahedronCompound.position.set(8, -10, -20);
scene.add(octahedronCompound);

// Group for cube and octahedron compound
const cubeOctahedronCompound = createCubeOctahedronCompound();
cubeOctahedronCompound.position.set(-18, 24, -30);
scene.add(cubeOctahedronCompound);

const stellatedOctahedron2 = createStellatedOctahedron();
stellatedOctahedron2.position.set(-40, -65, -90);
scene.add(stellatedOctahedron2);

// Group for cube
const cube = createCube();
cube.position.set(-3, 80, -100);
scene.add(cube);

const cube2 = createCube();
cube2.position.set(-10, -100, -130);
scene.add(cube2);

const cube3 = createCube();
cube3.position.set(90, 100, -160);
scene.add(cube3);

const icosahedron = createIcosahedron();
icosahedron.position.set(-7, 22, -30);
scene.add(icosahedron);

const icosahedron2 = createIcosahedron();
icosahedron2.position.set(-30, -10, -60);
scene.add(icosahedron2);

const dodecahedron = createDodecahedron();
dodecahedron.position.set(3, -22, -25);
scene.add(dodecahedron);

// Camera position
camera.position.z = 15;

// Animation
function animate() {
  requestAnimationFrame(animate);
  const movementSpeed = 0.01;

  stellatedOctahedron.rotation.x += movementSpeed;
  stellatedOctahedron.rotation.y += movementSpeed;

  octahedronCompound.rotation.x += movementSpeed;
  octahedronCompound.rotation.y += movementSpeed;

  cubeOctahedronCompound.rotation.x += movementSpeed;
  cubeOctahedronCompound.rotation.y += movementSpeed;

  stellatedOctahedron2.rotation.x += movementSpeed;
  stellatedOctahedron2.rotation.y += movementSpeed;

  cube.rotation.x += movementSpeed;
  cube.rotation.y += movementSpeed;

  cube2.rotation.x += movementSpeed;
  cube2.rotation.y += movementSpeed;

  cube3.rotation.x += movementSpeed;
  cube3.rotation.y += movementSpeed;

  icosahedron.rotation.x += movementSpeed;
  icosahedron.rotation.y += movementSpeed;

  icosahedron2.rotation.x += movementSpeed;
  icosahedron2.rotation.y += movementSpeed;

  dodecahedron.rotation.x += movementSpeed;
  dodecahedron.rotation.y += movementSpeed;

  renderer.render(scene, camera);
}

animate();

// Functions to create geometries
function createStellatedOctahedron() {
  const group = new THREE.Group();
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(5);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  for (let i = 0; i < 2; i++) {
    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, material);
    group.add(tetrahedron);
    if (i === 1) tetrahedron.rotateX(Math.PI / 2);
  }

  return group;
}

function createOctahedronCompound() {
  const group = new THREE.Group();
  const octahedronRadius = 5;
  const octahedronGeometry = new THREE.OctahedronGeometry(octahedronRadius);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const axes = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 1),
  ];

  for (let i = 0; i < 3; i++) {
    const octahedron = new THREE.Mesh(octahedronGeometry, material);
    octahedron.rotateOnWorldAxis(axes[i], Math.PI / 4);
    group.add(octahedron);
  }

  return group;
}

// compund of cube and octahedron
function createCubeOctahedronCompound() {
  const group = new THREE.Group();
  const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  const octahedronGeometry = new THREE.OctahedronGeometry(5);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const cube = new THREE.Mesh(cubeGeometry, material);
  const octahedron = new THREE.Mesh(octahedronGeometry, material);

  group.add(cube, octahedron);

  return group;
}

function createCube() {
  const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(cubeGeometry, material);

  return cube;
}

function createOctahedron() {
  const octahedronGeometry = new THREE.OctahedronGeometry(5);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const octahedron = new THREE.Mesh(octahedronGeometry, material);

  return octahedron;
}

function createTetrahedron() {
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(5);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const tetrahedron = new THREE.Mesh(tetrahedronGeometry, material);

  return tetrahedron;
}

function createIcosahedron() {
  const icosahedronGeometry = new THREE.IcosahedronGeometry(3);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const icosahedron = new THREE.Mesh(icosahedronGeometry, material);

  return icosahedron;
}

function createDodecahedron() {
  const dodecahedronGeometry = new THREE.DodecahedronGeometry(3);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const dodecahedron = new THREE.Mesh(dodecahedronGeometry, material);

  return dodecahedron;
}
