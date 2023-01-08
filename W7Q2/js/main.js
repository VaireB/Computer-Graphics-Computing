const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera();
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color(0x000000);
renderer.setSize(800, 800);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry( 0.7, 0.3) ;
const material = new THREE.MeshBasicMaterial( { color: 0x63ff78, side: THREE.DoubleSide} );
const dvd = new THREE.Mesh( geometry, material );
scene.add(dvd);

let xspeed = 0.005;
let yspeed = 0.005;
let dvdBounce = 10;

//Default position of shape
dvd.position.x = 0;
dvd.position.y = 0;
dvd.position.z = 0;

//Randomize starting solor
randomColors(dvd);

//Randomize the colors
function randomColors()
{
    r = Math.random(256);
    g = Math.random(256);
    b = Math.random(256);
    dvd.material.color.setRGB(r,g,b);
    
}


//decrease the size of the shape
function dvdSize()
{
    dvd.scale.x -= 0.2;
    dvd.scale.y -= 0.2;
}

//Decreases the number of bounces by 2
function dvdBounceLeft()
{
    dvdBounce -= 2;
    console.log("DVD BOUNCES LEFT: " + dvdBounce);
}

//Stops the movement after 5 bounces
function stop() 
{
    xspeed = 0;
    yspeed = 0;
}

camera.position.z = 1;


function animate() {
	requestAnimationFrame( animate );

    dvd.position.x += xspeed
    dvd.position.y += yspeed

    if(dvd.position.x > 0.73)
        {xspeed *= -1; randomColors(dvd); dvdSize(); dvdBounceLeft();}
    else if(dvd.position.x < -0.8)
        {xspeed *= -1; randomColors(dvd); dvdSize(); dvdBounceLeft();}
    else if(dvd.position.y > 0.85)
        {yspeed *= -1; randomColors(dvd); dvdSize(); dvdBounceLeft();}
    else if(dvd.position.y < -0.90)
        {yspeed *= -1; randomColors(dvd); dvdSize(); dvdBounceLeft();}
    else if(dvdBounce <= 0)
        {dvd.visible = false; stop();}

renderer.render( scene, camera );
}
animate();