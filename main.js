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
const ambientLight = new THREE.AmbientLight(0xf2e0cf, 0.5);
const directionalLight = new THREE.DirectionalLight(0xf2e0cf, 1);
directionalLight.position.set(10, 0, 0);
scene.add(ambientLight, directionalLight);

// Group for tetrahedra
const stellatedOctahedron = createStellatedOctahedron();
stellatedOctahedron.position.set(5, 10, -15);
scene.add(stellatedOctahedron);

// Group for octahedra compound
const octahedronCompound = createOctahedronCompound();
octahedronCompound.position.set(8, -10, -20);
scene.add(octahedronCompound);

// Group for cube and octahedron compound
const cubeOctahedronCompound = createCubeOctahedronCompound();
cubeOctahedronCompound.position.set(0, 0, 0);
scene.add(cubeOctahedronCompound);

// Camera position
camera.position.z = 15;

// Animation
function animate() {
  requestAnimationFrame(animate);

  stellatedOctahedron.rotation.x += 0.001;
  stellatedOctahedron.rotation.y += 0.001;

  octahedronCompound.rotation.x += 0.001;
  octahedronCompound.rotation.y += 0.001;

  cubeOctahedronCompound.rotation.x += 0.001;
  cubeOctahedronCompound.rotation.y += 0.001;

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
