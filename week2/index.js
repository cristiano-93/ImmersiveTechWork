const canvas = document.getElementById('canvas1');
canvas.focus();

const camera = new THREE.PerspectiveCamera(80, 1.33, 0.1, 10000);
// camera.position.y = 5;
// camera.position.z = 10;
// camera.rotation.x = THREE.Math.degToRad(10);
const distance = 0.1;

// W=87 A=65 S=83 D=68 Q=81 Z=90




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


//Scene Adds
scene.add(meshCylinder)
scene.add(meshCone);
scene.add(meshBlueCube);
scene.add(meshSphere);
scene.add(meshCube);
requestAnimationFrame(renderScene);

canvas.addEventListener("keydown", e => {
    currentKey = e.keyCode
});
canvas.addEventListener("keyup", e => {
    currentKey = 0
});




function renderScene() {
    requestAnimationFrame(renderScene);
    meshBlueCube.rotation.x += 0.005;
    meshBlueCube.rotation.y += 0.005;
    renderer.render(scene, camera);

    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    

    // KeyUp movement

    if (currentKey == 81) {
        console.log("Q has been pressed");
        camera.position.y += distance;
    }
    if (currentKey == 90) {
        console.log("Z has been pressed");
        camera.position.y -= distance;
    }
    if (currentKey == 88) {
        console.log("X has been pressed");
        camera.rotation.y += THREE.Math.degToRad(0.5);
    }
    if (currentKey == 67) {
        console.log("C has been pressed");
        camera.rotation.y -= THREE.Math.degToRad(0.5);
    }
    if (currentKey == 87) {
        console.log("W has been pressed");
        camera.position.x -= distance * Math.sin(camera.rotation.y);
        camera.position.z -= distance * Math.cos(camera.rotation.y);
    }
    if (currentKey == 83) {
        console.log("S has been pressed");
        camera.position.x += distance * Math.sin(camera.rotation.y);
        camera.position.z += distance * Math.cos(camera.rotation.y);
    }
    if (currentKey == 65) {
        console.log("A has been pressed");
        camera.position.x -= distance * Math.cos(camera.rotation.y);
    }
    if (currentKey == 68) {
        console.log("D has been pressed");
        camera.position.x += distance * Math.cos(camera.rotation.y);
    }
}
var currentKey;
let xOffset = 0;
var yOffset = 0;
let mouseDown = false;

canvas.addEventListener("mousedown", e => {
    xOffset = e.offsetX;
    mouseDown = true;
    console.log("mousedown");
    
});

// This arrow function will handle mouse movement
canvas.addEventListener("mousemove", e => {

    if(e.offsetX > xOffset && mouseDown){
        camera.rotation.y = camera.rotation.y - THREE.Math.degToRad(1);
    }
    else if(e.offsetX < xOffset && mouseDown){
        camera.rotation.y = camera.rotation.y + THREE.Math.degToRad(1);
    }    
});

// This arrow function will handle mouse release
canvas.addEventListener("mouseup", e => {
    mouseDown = false;
    xOffset = e.offsetX;
});
renderScene();