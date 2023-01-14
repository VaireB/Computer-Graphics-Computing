
const scene = new THREE.Scene();
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth/2, cameraHeight/2, cameraHeight/-2, 0, 1000);
camera.position.set(120, 90, 130);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight); 

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

//Creating the wall
function createWall(){

	const wall = new THREE.Mesh( 
		new THREE.BoxGeometry(85, 25, 2.7),  
		new THREE.MeshLambertMaterial({color: 0x191970}) );
	return wall;

}

//Creating the Room
function createRoom(){

	const room = new THREE.Group();

	const rightWall = createWall();
	rightWall.position.set(0, 3.2, -42)
	room.add(rightWall);

	const leftWall = createWall();
	leftWall.rotation.y = 17.28;
	leftWall.position.set(-43.9, 2.5);
	room.add(leftWall);
	
	const floor = new THREE.Mesh( 
		new THREE.PlaneGeometry( 84, 86, 1, 1 ), 
		new THREE.MeshLambertMaterial( { color: 0xFFE5B4 } ) 
	);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 11;
	floor.position.y= -9.6;
	room.add(floor);

	return room;

}
const room = createRoom();
scene.add(room); 


// Create chair
function createChair(){

	const chair = new THREE.Group();

	const chairSeat = new THREE.Mesh(
		new THREE.BoxBufferGeometry (10, 2, 3),
		new THREE.MeshLambertMaterial({	color: 0x293042	})
	);
	chairSeat.position.y= -2.5;
	chair.add(chairSeat);

	const chairFront = new THREE.Mesh(
		new THREE.BoxBufferGeometry (2, 4, 2),
		new THREE.MeshLambertMaterial({	color: 0x293042	})
	);
	chairFront.position.set(0,0,-5.5);
	chair.add(chairFront);

	const chairWheel = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 4, 2, 3),
		new THREE.MeshLambertMaterial({	color: 0x293042	})
	);
	chairWheel.position.y = -8;
	chair.add(chairWheel);

	return chair;
}

//Creating the monitor
function createMonitor(){

	const monitor = new THREE.Group();
	const stand = new THREE.Mesh(
		new THREE.BoxBufferGeometry(2, 10),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	);
	monitor.add(stand);
	stand.position.y = -2;

	const foot = new THREE.Mesh(
		new THREE.BoxBufferGeometry(4, 2),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	);
	monitor.add(foot);
	foot.position.y = -5;

	const desktop = new THREE.Mesh(
		new THREE.BoxBufferGeometry(18, 9, 0.5),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	);
	desktop.position.set(0, 2, 1.5);
	monitor.add(desktop);

	const screen = new THREE.Mesh(
		new THREE.BoxBufferGeometry(15, 6, 0.5),
		new THREE.MeshLambertMaterial({ color: 0xffffff})
	);
	screen.position.set(0, 2, 1.55);
	monitor.add(screen);

	return monitor;	

}


//Creating the Workspace
function createWorkSpace() {
	const workSpace = new THREE.Group();
  
	const monitor = createMonitor();
	monitor.position.set(7, 12, -1);
	workSpace.add(monitor);

	const monitor2 = createMonitor();
	monitor2.position.set(-11, 12, -1);
	workSpace.add(monitor2);


	const keyboard = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 4, 3),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	  );
	workSpace.add(keyboard);
	keyboard.position.set(3, 3, 2);
  
	const desk = new THREE.Mesh(
	  new THREE.BoxBufferGeometry(42, 4, 8),
	  new THREE.MeshLambertMaterial({ color: 0x6F4E37  })
	);
	workSpace.add(desk);
	desk.position.y = 2;
	

	const deskSideLeft = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 8, 8),
		new THREE.MeshLambertMaterial({ color: 0x6F4E37 })
	);

	const deskSideRight = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 8, 8),
		new THREE.MeshLambertMaterial({ color: 0x6F4E37  })
	);
	
	workSpace.add(deskSideRight);
	deskSideRight.position.set(15, -2);

	workSpace.add(deskSideLeft);
	deskSideLeft.position.set(-15, -2);

	const chair = createChair();
	chair.position.set(3, 3.2, 8);
	workSpace.add(chair);
	
	return workSpace;
}
  
const workSpace = createWorkSpace();
workSpace.scale.x = 0.5;
workSpace.scale.y = 0.5;

workSpace.rotation.y = -17.29;
workSpace.position.set(-40, -7.0, 15);
scene.add(workSpace);
  

//Creating the lamp stand
function createLampStand (){

	const lampStand = new THREE.Group();

	const lampStandCylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 1, 2, 2, 30 ),
		new THREE.MeshBasicMaterial( {color: 0x1A1E2A} )
	);
	lampStandCylinder.position.y = -6;
	lampStand.add(lampStandCylinder)

	const lampPole = new THREE.Mesh(
		new THREE.BoxBufferGeometry(0.2, 8),
		new THREE.MeshLambertMaterial({color:0x1A1E2A})
	);
	lampPole.position.y = -2;
	lampStand.add(lampPole)

	return lampStand;
}

//Creating Lamp Design
function createlampDesign(){

	const geometry = new THREE.CylinderGeometry( 1.5, 1.6, 3, 30 );
	const material = new THREE.MeshToonMaterial( {color: 0xF8E972} );
	const lampDesign = new THREE.Mesh( geometry, material );
	lampDesign.position.y = 4;
	return lampDesign;
};

//Creating the Lamp
function createLamp(){
	const lamp = new THREE.Group();

	const lampStand = createLampStand();
	lamp.add(lampStand);

	const lampDesign = createlampDesign();
	lamp.add(lampDesign);

	const light = new THREE.PointLight( 0xffffff, 1, 100 );
	lamp.add(light);

	return lamp;
}
//Far Right Corner Lamp
const lamp = createLamp();
lamp.position.set(-40, -3, -38.9);
scene.add(lamp);

//Far Left Corner Lamp
const lamp2 = createLamp();
lamp2.position.set(-40, -3, 39.5);
scene.add(lamp2);

// ---------------- Bed ---------------- //
function createBed(){

	const bed = new THREE.Group();

	const headBoard = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 9),
		new THREE.MeshLambertMaterial({ color: 0x71797E })
	);
	bed.add(headBoard);
	headBoard.position.z = -10;

	const bedFrame = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 1, 21),
		new THREE.MeshLambertMaterial({ color: 0x71797E })
	);
	bedFrame.position.set(0, -3.6, 0);
	bed.add(bedFrame);

	const matress = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 4, 5),
		new THREE.MeshLambertMaterial({ color: 0xffffff })
	);
	matress.position.set(0 , -1, -7	);
	bed.add(matress);

	const blanket = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 4, 15),
		new THREE.MeshLambertMaterial({ color: 0x9FE2BF })
	);
	blanket.position.set(0, -1, 3)
	bed.add(blanket);

	const footBoard = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 6),
		new THREE.MeshLambertMaterial({ color: 0x71797E })
	);
	footBoard.position.set(0, -1, 11);
	bed.add(footBoard);
	
	return bed
}

const bed = createBed();
bed.scale.x = 1;
bed.rotation.y = -17.29;
bed.position.set(-26, -3, -5);
scene.add(bed);


// ---------------- Window ---------------- //

function createGlass(){
	const glassWindow = new THREE.Group();
	
	const glass = new THREE.Mesh(
		new THREE.BoxBufferGeometry(10, 10),
		new THREE.MeshLambertMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
	);
	glass.position.z = -0.6;
	glassWindow.add(glass);

	const light = new THREE.PointLight( 0xff0000, 1, 10 );
	glass.add(light);

	return glass;
};

function createWindow(){

	const window = new THREE.Group();

	const frameTop = new THREE.Mesh(
		new THREE.BoxBufferGeometry(10, 0.8),
		new THREE.MeshLambertMaterial({color:0x000000})
	);
	frameTop.position.set(0, 0, -0.5);
	window.add(frameTop);

	const frameDivider = new THREE.Mesh(
		new THREE.BoxBufferGeometry(0.4, 11),
		new THREE.MeshLambertMaterial({color:0x000000})
	);
	frameDivider.position.set(-0.3, -0.3);
	window.add(frameDivider);

	const glass = createGlass();
	window.add(glass);

	return window;
};

const leftWindow = createWindow();
leftWindow.rotation.y = -17.29;
leftWindow.position.set(-40, 8, -7);
scene.add(leftWindow);

const rightWindow = createWindow();
rightWindow.rotation.y = -6.3;
rightWindow.position.set(-5, 8, -40);
scene.add(rightWindow);



// ---------------- Miscellaneous ---------------- //


function createDesk(){

	const desk = new THREE.Group();
	const frame = new THREE.Mesh(
		new THREE.BoxBufferGeometry(7, 3, 10),
		new THREE.MeshLambertMaterial({ color: 0x664033 })
	);
	desk.add(frame);
	
	return desk;
}

//Render Scene
renderer.render(scene, camera);