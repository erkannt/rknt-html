import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.120.1/build/three.module.js";
import { STLLoader } from "https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/controls/OrbitControls.js";

initViewersFor("viewer");

function initViewersFor(classname) {
  var models = document.getElementsByClassName(classname);
  for (var i = 0; i < models.length; i++) {
    initViewer(models[i], models[i].getAttribute("data-src"));
  }
}

function initViewer(container, modelPath) {
  let camera, cameraTarget, scene, renderer, controls;
  camera = new THREE.PerspectiveCamera(
    70,
    container.clientWidth / container.clientHeight,
    1,
    1000
  );

  cameraTarget = new THREE.Vector3(0, -0.25, 0);

  scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 1.5));

  const loader = new STLLoader();
  loader.load(modelPath, function (geometry) {
    // add the mesh
    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 100,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(-Math.PI / 2, 0, 0);
    scene.add(mesh);

    // Move mesh to middle of scene
    var middle = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(middle);
    mesh.geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z)
    );

    // Position camera
    var largestDimension = Math.max(
      geometry.boundingBox.max.x,
      geometry.boundingBox.max.y,
      geometry.boundingBox.max.z
    );
    camera.position.z = largestDimension * 2.5;
  });

  // create renderer in size of container elem
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const downloadLink = document.createElement("a");
  downloadLink.href = `${modelPath}`;
  downloadLink.innerText = `${modelPath}`;
  container.appendChild(downloadLink);

  // set up controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.6;
  controls.dampingFactor = 1;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 6;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
