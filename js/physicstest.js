let testState = function() {
	
}

testState.prototype.preload = function() {
	game.load.image('plrrha', 'assets/Toby Philpott Pieces/R_hand.png');
	game.load.image('plrrla', 'assets/Toby Philpott Pieces/R_lower_arm.png');
	game.load.image('plrrua', 'assets/Toby Philpott Pieces/R_upper_arm.png');
	game.load.image('plrlha', 'assets/Toby Philpott Pieces/L_hand.png');
	game.load.image('plrlla', 'assets/Toby Philpott Pieces/L_lower_arm.png');
	game.load.image('plrlua', 'assets/Toby Philpott Pieces/L_upper_arm.png');
	game.load.image('plrhip', 'assets/Toby Philpott Pieces/hips.png');
	game.load.image('plrtrs', 'assets/Toby Philpott Pieces/Torso.png');
	game.load.image('plrub', 'assets/Toby Philpott Pieces/Upper_Body.png');
	game.load.image('plrlth', 'assets/Toby Philpott Pieces/L_upper_thigh.png');
	game.load.image('plrlll', 'assets/Toby Philpott Pieces/L_lower_leg.png');
	game.load.image('plrlft', 'assets/Toby Philpott Pieces/L_foot.png');
	game.load.image('plrrth', 'assets/Toby Philpott Pieces/R_upper_thigh.png');
	game.load.image('plrrll', 'assets/Toby Philpott Pieces/R_lower_leg.png');
	game.load.image('plrrft', 'assets/Toby Philpott Pieces/R_foot.png');
	
	
	game.load.image("stairs", "assets/stairs.png");
	game.load.image("head", "assets/Toby Philpott Pieces/Eye_Open.png");
	game.load.spritesheet("button", "assets/button_strip9.png", 128, 128);
}	

let player;

let playerCollisionGroup;
let terrainCollisionGroup;
let controlsCollisionGroup;

let upperbody;
let hips;

let leftHipJoint;
let leftKneeJoint;
let rightHipJoint;
let rightKneeJoint;
let leftShoulderJoint;
let leftElbowJoint;
let rightShoulderJoint;
let rightElbowJoint;

let qKey;
let wKey;
let oKey;
let pKey;
let eKey;
let rKey;
let uKey;
let iKey;
let dKey;
let fKey;

let rArmButton;
let lArmButton;
let rLegButton;
let lLegButton;
let mouseBody;
let mouseConstraint;

let clickedBody = 1;

testState.prototype.create = function() {
	
	
	
	game.world.setBounds(0,0,1344,750);
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 1000;
	game.physics.p2.friction = 8.0;
	
	playerCollisionGroup = game.physics.p2.createCollisionGroup();
	terrainCollisionGroup = game.physics.p2.createCollisionGroup();
	
	setupPlayer();
	
	game.physics.p2.updateBoundsCollisionGroup();
	
	controlsCollisionGroup = game.physics.p2.createCollisionGroup();
	
	qKey = game.input.keyboard.addKey(Phaser.KeyCode.Q);
	wKey = game.input.keyboard.addKey(Phaser.KeyCode.W);
	oKey = game.input.keyboard.addKey(Phaser.KeyCode.O);
	pKey = game.input.keyboard.addKey(Phaser.KeyCode.P);
	eKey = game.input.keyboard.addKey(Phaser.KeyCode.E);
	rKey = game.input.keyboard.addKey(Phaser.KeyCode.R);
	uKey = game.input.keyboard.addKey(Phaser.KeyCode.U);
	iKey = game.input.keyboard.addKey(Phaser.KeyCode.I);
	dKey = game.input.keyboard.addKey(Phaser.KeyCode.D);
	fKey = game.input.keyboard.addKey(Phaser.KeyCode.F);
	
	// Drag code	
	
	rArmButton = game.add.sprite(upperbody.position.x - 40, upperbody.position.y - 70, "button");
	rArmButton.scale.setTo(0.5,0.5);
	game.physics.p2.enable(rArmButton, false);
	rArmButton.body.mass = 0.001
	rArmButton.body.collides([]);
	rArmButton.body.setCollisionGroup(controlsCollisionGroup);
	
	lArmButton = game.add.sprite(upperbody.position.x - 20, upperbody.position.y -  80, "button");
	lArmButton.scale.setTo(0.5,0.5);
	game.physics.p2.enable(lArmButton, false);
	lArmButton.body.mass = 0.001;
	lArmButton.body.collides([]);
	lArmButton.body.setCollisionGroup(controlsCollisionGroup);
	
	rLegButton = game.add.sprite(hips.position.x - 10, hips.position.y, "button");
	rLegButton.scale.setTo(0.5,0.5);
	game.physics.p2.enable(rLegButton, false);
	rLegButton.body.mass = 0.001;
	rLegButton.body.collides([]);
	rLegButton.body.setCollisionGroup(controlsCollisionGroup);
	
	lLegButton = game.add.sprite(hips.position.x + 10, hips.position.y, "button");
	lLegButton.scale.setTo(0.5,0.5);
	game.physics.p2.enable(lLegButton, false);
	lLegButton.body.mass = 0.001;
	lLegButton.body.collides([]);
	lLegButton.body.setCollisionGroup(controlsCollisionGroup);
	
	// create physics body for mouse which we will use for dragging clicked bodies
    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);
        
    // attach pointer events
    game.input.onDown.add(this.click);
    game.input.onUp.add(this.release);
    game.input.addMoveCallback(this.move);
}

testState.prototype.click = function(pointer) {

	//Add any other drag selectors to this.
    let bodies = game.physics.p2.hitTest(pointer.position, [rArmButton,lArmButton,rLegButton,lLegButton]);
    
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    let physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
    if (bodies.length){
        clickedBody = bodies[0];
        
        let localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);
        // use a revoluteContraint to attach mouseBody to the clicked body
        mouseConstraint = game.physics.p2.createLockConstraint(mouseBody, clickedBody);
    }   

}

testState.prototype.move = function(pointer) {

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

}


testState.prototype.release = function(){

    // remove constraint from object's body
    game.physics.p2.removeConstraint(mouseConstraint);
	clickedBody = 1;
}

function setupPlayer() {
	player = new Player();
	upperbody = player.upperbody;
	hips = player.hips;
	leftHipJoint = player.leftHipJoint;
	leftKneeJoint = player.leftKneeJoint;
	rightHipJoint = player.rightHipJoint;
	rightKneeJoint = player.rightKneeJoint;
	leftShoulderJoint = player.leftShoulderJoint;
	leftElbowJoint = player.leftElbowJoint;
	rightShoulderJoint = player.rightShoulderJoint;
	rightElbowJoint = player.rightElbowJoint;
}

let leftKneeAngle = 0;
let leftThighAngle = 0;
let rightThighAngle = 0;
let rightKneeAngle = 0;
let leftShoulderAngle = 0;
let leftElbowAngle = 0;
let rightShoulderAngle = 0;
let rightElbowAngle = 0;
let rArmSelectConstraint = 1;
let lArmSelectConstraint = 1;
let rLegSelectConstraint = 1;
let lLegSelectConstraint = 1;

testState.prototype.update = function() {
	//Drag Arm test Code
	let rArmTheta;
	let rArmPsi;
	
	let rArmX = upperbody.position.x - rArmButton.position.x;
	let rArmYAbs = upperbody.position.y - rArmButton.position.y
	let rArmY = upperbody.position.y + (Math.cos(upperbody.angle/180*Math.PI))* (-50) - rArmButton.position.y;//-50 is offset of shoulder joing
	
	if(clickedBody === 1 && rArmSelectConstraint === 1)
	{	
		rArmSelectConstraint = game.physics.p2.createLockConstraint(upperbody,rArmButton,[rArmX,rArmYAbs],0);
	}
	
	if(clickedBody !== 1)
	{
		if(clickedBody.parent.sprite === rArmButton)
		{
			game.physics.p2.removeConstraint(rArmSelectConstraint);
			rArmSelectConstraint = 1;
		}
	}
	rArmTheta = 180/Math.PI * Math.atan2(rArmX,rArmY);
	
	let baseRArmAngl = rArmTheta - upperbody.angle - 90;
	
	let armLength = 90;
	
	let desiredLength = Math.sqrt(rArmX * rArmX + rArmY * rArmY);
	if( desiredLength < 2 * armLength)
		rArmPsi = 180/Math.PI * Math.acos(1 - (desiredLength*desiredLength)/(2*armLength * armLength));
	else
		rArmPsi = 180;
	
	let desiredRArmAngl = (-baseRArmAngl - (180 - rArmPsi) / 2);
	if(desiredRArmAngl > 45)
		rightShoulderAngle = 45;
	else if(desiredRArmAngl < -225)
		rightShoulderAngle = -225;
	else
		rightShoulderAngle = desiredRArmAngl;
	
	rightElbowAngle = -rArmPsi;
	
	let lArmTheta;
	let lArmPsi;
	
	let lArmX = upperbody.position.x - lArmButton.position.x;
	let lArmYAbs = upperbody.position.y - lArmButton.position.y
	let lArmY = upperbody.position.y + (Math.cos(upperbody.angle/180*Math.PI))* (-50) - lArmButton.position.y;//-50 is offset of shoulder joing
	
	if(clickedBody === 1 && lArmSelectConstraint === 1)
	{	
		lArmSelectConstraint = game.physics.p2.createLockConstraint(upperbody,lArmButton,[lArmX,lArmYAbs],0);
	}
	
	if(clickedBody !== 1)
	{
		if(clickedBody.parent.sprite === lArmButton)
		{
			game.physics.p2.removeConstraint(lArmSelectConstraint);
			lArmSelectConstraint = 1;
		}
	}
	lArmTheta = 180/Math.PI * Math.atan2(lArmX,lArmY);
	
	let baseLArmAngl = lArmTheta - upperbody.angle - 90;
	
	let lArmDesiredLength = Math.sqrt(lArmX * lArmX + lArmY * lArmY);
	if( lArmDesiredLength < 2 * armLength)
		lArmPsi = 180/Math.PI * Math.acos(1 - (lArmDesiredLength*lArmDesiredLength)/(2*armLength * armLength));
	else
		lArmPsi = 180;
	
	let desiredLArmAngl = (-baseLArmAngl - (180 - lArmPsi) / 2);
	if(desiredLArmAngl > 45)
		leftShoulderAngle = 45;
	else if(desiredLArmAngl < -225)
		leftShoulderAngle = -225;
	else
		leftShoulderAngle = desiredLArmAngl;
	
	leftElbowAngle = -lArmPsi;
	
	//
	
	let rLegTheta;
	let rLegPsi;
	
	let rLegX = hips.position.x - rLegButton.position.x;
	let rLegYAbs = hips.position.y - rLegButton.position.y
	let rLegY = hips.position.y + (Math.cos(hips.angle/180*Math.PI))* (20) - rLegButton.position.y;//-50 is offset of shoulder joing
	
	if(clickedBody === 1 && rLegSelectConstraint === 1)
	{	
		rLegSelectConstraint = game.physics.p2.createLockConstraint(hips,rLegButton,[rLegX,rLegYAbs],0);
	}
	
	if(clickedBody !== 1)
	{
		if(clickedBody.parent.sprite === rLegButton)
		{
			game.physics.p2.removeConstraint(rLegSelectConstraint);
			rLegSelectConstraint = 1;
		}
	}
	rLegTheta = 180/Math.PI * Math.atan2(rLegX,rLegY);
	
	let baseRLegAngl = rLegTheta - upperbody.angle - 90;
	
	let legLength = 90;
	
	let rLegDesiredLength = Math.sqrt(rLegX * rLegX + rLegY * rLegY);
	if( rLegDesiredLength < 2 * legLength)
		rLegPsi = 180/Math.PI * Math.acos(1 - (rLegDesiredLength*rLegDesiredLength)/(2*legLength * legLength));
	else
		rLegPsi = 180;
	
	let desiredRLegAngl = (-baseRLegAngl + (180 - rLegPsi) / 2);
	if(desiredRLegAngl > 45)
		rightThighAngle = 45;
	else if(desiredRLegAngl < -225)
		rightThighAngle = -225;
	else
		rightThighAngle = desiredRLegAngl;
	
	rightKneeAngle = rLegPsi;
	
	//
	
	let lLegTheta;
	let lLegPsi;
	
	let lLegX = hips.position.x - lLegButton.position.x;
	let lLegYAbs = hips.position.y - lLegButton.position.y
	let lLegY = hips.position.y + (Math.cos(hips.angle/180*Math.PI))* (20) - lLegButton.position.y;//-50 is offset of shoulder joing
	
	if(clickedBody === 1 && lLegSelectConstraint === 1)
	{	
		lLegSelectConstraint = game.physics.p2.createLockConstraint(hips,lLegButton,[lLegX,lLegYAbs],0);
	}
	
	if(clickedBody !== 1)
	{
		if(clickedBody.parent.sprite === lLegButton)
		{
			game.physics.p2.removeConstraint(lLegSelectConstraint);
			lLegSelectConstraint = 1;
		}
	}
	rLegTheta = 180/Math.PI * Math.atan2(lLegX,lLegY);
	
	let baseLLegAngl = rLegTheta - upperbody.angle - 90;
	
	let lLegDesiredLength = Math.sqrt(lLegX * lLegX + lLegY * lLegY);
	if( lLegDesiredLength < 2 * legLength)
		lLegPsi = 180/Math.PI * Math.acos(1 - (lLegDesiredLength*lLegDesiredLength)/(2*legLength * legLength));
	else
		lLegPsi = 180;
	
	let desiredLLegAngl = (-baseLLegAngl + (180 - lLegPsi) / 2);
	if(desiredLLegAngl > 45)
		leftThighAngle = 45;
	else if(desiredLLegAngl < -225)
		leftThighAngle = -225;
	else
		leftThighAngle = desiredLLegAngl;
	
	leftKneeAngle = lLegPsi;
		
	leftKneeJoint.setLimits((leftKneeAngle-1)*Math.PI/180,(leftKneeAngle+1)*Math.PI/180);
	leftHipJoint.setLimits((leftThighAngle-1)*Math.PI/180,(leftThighAngle+1)*Math.PI/180);
	rightKneeJoint.setLimits((rightKneeAngle-1)*Math.PI/180,(rightKneeAngle+1)*Math.PI/180);
	rightHipJoint.setLimits((rightThighAngle-1)*Math.PI/180,(rightThighAngle+1)*Math.PI/180);
	leftShoulderJoint.setLimits((leftShoulderAngle-1)*Math.PI/180,(leftShoulderAngle+1)*Math.PI/180);
	rightShoulderJoint.setLimits((rightShoulderAngle-1)*Math.PI/180,(rightShoulderAngle+1)*Math.PI/180);
	leftElbowJoint.setLimits((leftElbowAngle-1)*Math.PI/180,(leftElbowAngle+1)*Math.PI/180);
	rightElbowJoint.setLimits((rightElbowAngle-1)*Math.PI/180,(rightElbowAngle+1)*Math.PI/180);
}


	
