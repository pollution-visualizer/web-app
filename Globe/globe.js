// ------ Marker object ------------------------------------------------

function Marker(height, mcolor) {
    THREE.Object3D.call(this);

    var cyRadius = 0.02;

    var material = new THREE.MeshPhongMaterial({ color: mcolor });

    var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(cyRadius, cyRadius, height, 8, 1),
                                    material);
    cylinder.position.y = height * 0.5;
    cylinder.rotation.x = Math.PI;

   this.add(cylinder);
}

Marker.prototype = Object.create(THREE.Object3D.prototype);

// ------ Earth object -------------------------------------------------

function Earth(radius) {
    THREE.Object3D.call(this);

    this.userData.radius = radius;

    var geometry = new THREE.SphereBufferGeometry(radius, 64.0, 48.0);
    var material = new THREE.MeshPhongMaterial();
    //base material
    material.map = new THREE.TextureLoader().load('https://i.ibb.co/C1t582v/earthmap.jpg');    
    //bump texture
    material.bumpMap = new THREE.TextureLoader().load('https://i.ibb.co/X8SZhQg/earthbump1k.jpg');
    material.bumpScale = 0.09;
    //specular texture
    material.specularMap = new THREE.TextureLoader().load('https://i.ibb.co/grD9XjM/earthspec1k.jpg');
    material.specular =  new THREE.Color('grey');

    var globe = new THREE.Mesh(geometry, material);

    this.add(globe);
}

Earth.prototype = Object.create(THREE.Object3D.prototype);

Earth.prototype.createMarker = function (lat, lon, height, color) {
    var mcolor;
    switch(color) {
        case "red":
          mcolor = 0xF72628;
          break;
        case "yellow":
          mcolor = 0xF7DD26;
          break;
        case "green":
          mcolor = 0x48D747;
          break;
        default:
          mcolor = 0x48D747;
      }

    var marker = new Marker(height,mcolor);

    var latRad = lat * (Math.PI / 180);
    var lonRad = -lon * (Math.PI / 180);
    var r = this.userData.radius;

    marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lonRad) * r);
    marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);

    this.add(marker);
};

// ------ Three.js code ------------------------------------------------

var scene, camera, renderer;
var controls;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    camera.position.set(0.0, 1.5, 3.0);

    renderer = new THREE.WebGLRenderer({ antialias: true });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;
    controls.enablePan = false;

    var ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    var direcitonal = new THREE.DirectionalLight(0xffffff, 0.2);
    direcitonal.position.set(5.0, 2.0, 5.0).normalize();
    scene.add(direcitonal);

    //for the loading time of the texture
    var manager = createLoader(renderer.domElement, animate);
    var texLoader = new THREE.TextureLoader(manager).setCrossOrigin(true);
    var texture = texLoader.load('https://i.ibb.co/C1t582v/earthmap.jpg');

    var earth = new Earth(1.0);

    earth.createMarker(38.869038, -101.964359, 1, "red"); // USA
    earth.createMarker(22.774916, -102.586899, 0.5, "yellow"); // Mexico
    earth.createMarker(63.634485, 27.167221, 0.1, "green"); // Finlandia

    scene.add(earth);

    window.addEventListener('resize', onResize);
    onResize();

    document.body.appendChild(renderer.domElement);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}