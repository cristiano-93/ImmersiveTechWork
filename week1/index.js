const canvas = document.getElementById('canvas1');

const camera = new THREE.PerspectiveCamera(80, 1.33, 0.1, 10000);
// camera.position.y = 5;
// camera.position.z = 10;
// camera.rotation.x = THREE.Math.degToRad(10);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const scene = new THREE.Scene();

// red cube
const geom = new THREE.BoxGeometry(1, 1, 1);
const matRed = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const meshCube = new THREE.Mesh(geom, matRed);
meshCube.rotation.y = THREE.Math.degToRad(45);
meshCube.rotation.x = THREE.Math.degToRad(25);
meshCube.position.x = 0;
meshCube.position.z = -10;

//blue cube
const geomBlueCube = new THREE.BoxGeometry(1, 1, 1);
const matBlue = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const meshBlueCube = new THREE.Mesh(geomBlueCube, matBlue);

meshBlueCube.position.x = 5;


// green sphere
const geomSphere = new THREE.SphereGeometry(1, 32, 300);
const matGreen = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const meshSphere = new THREE.Mesh(geomSphere, matGreen);

meshSphere.position.z = -5

//yellow cone
const geomYellowCone = new THREE.ConeGeometry(1, 2, 64);
const matYellow = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const meshCone = new THREE.Mesh(geomYellowCone, matYellow);

meshCone.position.x = -5;

//magenta cylinder
const geomCylinder = new THREE.CylinderGeometry(1, 1, 2);
const matMagenta = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const meshCylinder = new THREE.Mesh(geomCylinder, matMagenta);

meshCylinder.position.z = 5;


//changing the background color
scene.background = new THREE.Color(0xD6D6D6);
scene.add(meshCylinder)
scene.add(meshCone);
scene.add(meshBlueCube);
scene.add(meshSphere);
scene.add(meshCube);
requestAnimationFrame(renderScene);

function renderScene() {
    requestAnimationFrame(renderScene);
    meshBlueCube.rotation.x += 0.01;
    meshBlueCube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
renderScene();

// //long way
// document.getElementById('xminus').addEventListener('click', e => {
//     camera.position.x--;
// });
// document.getElementById('xplus').addEventListener('click', e => {
//     camera.position.x++;
// });
// document.getElementById('yminus').addEventListener('click', e => {
//     camera.position.y--;
// });
// document.getElementById('yplus').addEventListener('click', e => {
//     camera.position.y++;
// });
// document.getElementById('zminus').addEventListener('click', e => {
//     camera.position.z--;
// });
// document.getElementById('zplus').addEventListener('click', e => {
//     camera.position.z++;
// });

//fast way
document.getElementById('xminus').addEventListener('click', changeCameraPos.bind(this, 1, 0, 0));
document.getElementById('xplus').addEventListener('click', changeCameraPos.bind(this, -1, 0, 0));
document.getElementById('yminus').addEventListener('click', changeCameraPos.bind(this, 0, 1, 0));
document.getElementById('yplus').addEventListener('click', changeCameraPos.bind(this, 0, -1, 0));
document.getElementById('zminus').addEventListener('click', changeCameraPos.bind(this, 0, 0, 1));
document.getElementById('zplus').addEventListener('click', changeCameraPos.bind(this, 0, 0, -1));

document.getElementById('rotateClockwise').addEventListener('click', e => {
    camera.rotation.y += THREE.Math.degToRad(10);
});
document.getElementById('rotateAntiClockwise').addEventListener('click', e => {
    camera.rotation.y -= THREE.Math.degToRad(10);
});

function changeCameraPos(dx, dy, dz) {
    camera.position.x += dx;
    camera.position.y += dy;
    camera.position.z += dz;
}