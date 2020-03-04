
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 945, window.innerWidth / window.innerHeight, 0.1, 1000 );

let stars, starGeo;

//textures
var textureSky = new THREE.TextureLoader().load('textures/dessert.jpg')
var textureLightning = new THREE.TextureLoader().load('textures/lightning.jpg')

//material

//geometry 

//lighting

//lighting inside
const color = 0xFFFFFF;
var pointLight = new THREE.PointLight( 0xFFFFFF, 2, 100 );
pointLight.position.set( 0, 0, 0 );
pointLight.needsUpdate = true;
scene.add(pointLight);

//

//Shapes

//rain

starGeo = new THREE.Geometry();
  for(let i=0;i<6000;i++) {
    star = new THREE.Vector3(
      Math.random() * 600-300,
      Math.random() * 600-300,
      Math.random() * 600-300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
  }
  
  let sprite = new THREE.TextureLoader().load( 'textures/rain.png' );

  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
  });
  
  stars = new THREE.Points(starGeo,starMaterial);

//

scene.add(stars);

//model load
var loader = new THREE.GLTFLoader();
loader.load( 'models/scene.gltf', function ( gltf ) {
  //manipulate models here
   model = gltf.scene;

   model.rotation.x = 3;

  scene.add(model);
  
}, undefined, function ( error ) {
	console.error( error );
} );

//
//

//Backgrounds
scene.background = (textureSky);

// cam position
camera.position.z = 10;
camera.position.x = 5;
camera.position.y = -5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
controls = new THREE.OrbitControls( camera,renderer.domElement);

//

// 


let LightInterval = 0;

function Lightning(){
  LightInterval += 1;

if(LightInterval > 100){
  LightInterval = 0;
}

if(LightInterval > 50){
  scene.background = (textureSky);
  pointLight.color.setHex( 0x808080);
}
else{
  scene.background = (textureLightning);
  pointLight.color.setHex( 0xFFFFFF );
}
};


//
function animate() {

   requestAnimationFrame( animate );

  starGeo.vertices.forEach(p => {
    p.velocity += p.acceleration
    p.z -= p.velocity;
    
    if (p.z < -200) {
      p.z = 200;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  stars.rotation.x = 1;


//

Lightning();

//
  

//

   renderer.render( scene, camera );

}



animate();

