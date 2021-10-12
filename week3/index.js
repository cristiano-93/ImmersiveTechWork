const canvas = document.getElementById('canvas1');
canvas.focus();

const camera = new THREE.PerspectiveCamera(80, 1.33, 0.1, 10000);
// camera.position.y = 5;
// camera.position.z = 10;
camera.position.y = 1;
const distance = 0.1;

// W=87 A=65 S=83 D=68 Q=81 Z=90


const renderer = new THREE.WebGLRenderer({canvas: canvas});
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();


// green sphere
const geomSphere = new THREE.SphereGeometry(1, 32, 300);
const matGreen = new THREE.MeshPhongMaterial({color: 0x00ff00, shininess: 60});
const meshSphere = new THREE.Mesh(geomSphere, matGreen);

meshSphere.position.z = -5
meshSphere.castShadow = true;


// red cube
const geom = new THREE.BoxGeometry(1, 1, 1);
const matRed = new THREE.MeshLambertMaterial({color: 0xff0000});

const meshCube = new THREE.Mesh(geom, matRed);
meshCube.rotation.y = THREE.Math.degToRad(45);
meshCube.rotation.x = THREE.Math.degToRad(25);
meshCube.position.x = 0;
meshCube.position.z = -10;

meshCube.castShadow = true;

// blue cube
const geomBlueCube = new THREE.BoxGeometry(1, 1, 1);
const matBlue = new THREE.MeshLambertMaterial({color: 0x0000ff});
const meshBlueCube = new THREE.Mesh(geomBlueCube, matBlue);

meshBlueCube.position.x = 5;
meshBlueCube.castShadow = true;


// yellow cone
const geomYellowCone = new THREE.ConeGeometry(1, 2, 64);
const matYellow = new THREE.MeshLambertMaterial({color: 0xffff00});
const meshCone = new THREE.Mesh(geomYellowCone, matYellow);

meshCone.position.x = -5;
meshCone.castShadow = true;

// magenta cylinder
const geomCylinder = new THREE.CylinderGeometry(1, 1, 2);
const matMagenta = new THREE.MeshLambertMaterial({color: 0xff00ff});
const meshCylinder = new THREE.Mesh(geomCylinder, matMagenta);

meshCylinder.position.z = 5;
meshCylinder.castShadow = true;

// adding lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
ambientLight.castShadow = true;


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 100, 0); // X, Y, Z
directionalLight.castShadow = true;

const spotLight = new THREE.SpotLight(0xffffff, 1.0);
spotLight.position.set(10, 10, -10);
spotLight.target.position.set(0, 0, -5);
spotLight.castShadow = true;

// adding a Plane

const planeGeom = new THREE.PlaneGeometry(100, 100);
const planeMat = new THREE.MeshLambertMaterial({color: 0x00ff00});
const planeMesh = new THREE.Mesh(planeGeom, planeMat);

planeMesh.rotation.x = Math.PI * -0.5;
planeMesh.position.y = -1.5;
planeMesh.receiveShadow = true;

// adding plane texture

loader.load('texture.png', texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(64, 64);
    const textureMat = new THREE.MeshLambertMaterial({map: texture});
    const textureMesh = new THREE.Mesh(planeGeom, textureMat);
    textureMesh.rotation.x = Math.PI * -0.5;
    textureMesh.position.y = -1.5;
    textureMesh.receiveShadow = true;
    scene.add(textureMesh);
})


// changing the background color
scene.background = new THREE.Color(0xD6D6D6);


// Scene Adds
scene.add(meshCylinder)
scene.add(meshCone);
scene.add(meshBlueCube);
scene.add(meshSphere);
scene.add(meshCube);


// scene.add(ambientLight);
// scene.add(directionalLight);
// scene.add(spotLight);
// scene.add(planeMesh);
requestAnimationFrame(renderScene);

canvas.addEventListener("keydown", e => {
    currentKey = e.keyCode
});
canvas.addEventListener("keyup", e => {
    currentKey = 0
});


function renderScene() {
    requestAnimationFrame(renderScene);
    meshBlueCube.rotation.x += 0.003;
    meshBlueCube.rotation.y += 0.003;
    renderer.render(scene, camera);
    renderer.shadowMap.enabled = true;

    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }


    // KeyUp movement

    // if (currentKey == 81) {
    //     console.log("Q has been pressed");
    //     camera.position.y += distance;
    // }
    if (currentKey == 81) {
        console.log("Q has been pressed");
        camera.position.y += distance;
    } else if (currentKey == 90) {
        console.log("Z has been pressed");
        if (camera.position.y > 0.1) {
            camera.position.y -= distance;
        };
    } else if (currentKey == 88) {
        console.log("X has been pressed");
        camera.rotation.y += THREE.Math.degToRad(0.5);
    } else if (currentKey == 67) {
        console.log("C has been pressed");
        camera.rotation.y -= THREE.Math.degToRad(0.5);
    } else if (currentKey == 87) {
        console.log("W has been pressed");
        camera.position.x -= distance * Math.sin(camera.rotation.y);
        camera.position.z -= distance * Math.cos(camera.rotation.y);
    } else if (currentKey == 83) {
        console.log("S has been pressed");
        camera.position.x += distance * Math.sin(camera.rotation.y);
        camera.position.z += distance * Math.cos(camera.rotation.y);
    } else if (currentKey == 65) {
        console.log("A has been pressed");
        camera.position.x -= distance * Math.cos(camera.rotation.y);
    } else if (currentKey == 68) {
        console.log("D has been pressed");
        camera.position.x += distance * Math.cos(camera.rotation.y);
    } else if (currentKey == 48) {
        console.log("0 has been pressed");
        scene.remove(ambientLight);
    } else if (currentKey == 49) {
        console.log("1 has been pressed");
        scene.add(ambientLight);
    } else if (currentKey == 50) {
        console.log("2 has been pressed");
        scene.remove(directionalLight);
    } else if (currentKey == 51) {
        console.log("3 has been pressed");
        scene.add(directionalLight);
    } else if (currentKey == 52) {
        console.log("4 has been pressed");
        scene.remove(spotLight);
    } else if (currentKey == 53) {
        console.log("5 has been pressed");
        scene.add(spotLight);
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

    if (e.offsetX > xOffset && mouseDown) {
        camera.rotation.y = camera.rotation.y - THREE.Math.degToRad(1);
    } else if (e.offsetX<xOffset && mouseDown){
        camera.rotation.y = camera.rotation.y + THREE.Math.degToRad(1);
    }    
});

// This arrow function will handle mouse release
canvas.addEventListener("mouseup", e => {
        mouseDown = false;
        xOffset = e.offsetX;
    }) 

        renderScene();
