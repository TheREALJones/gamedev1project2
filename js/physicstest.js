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

let button;
let mouseBody;
let mouseConstraint;

testState.prototype.create = function() {
	
	
	game.world.setBounds(0,0,1344,750);
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 240;
	game.physics.p2.friction = 8.0;
	
	playerCollisionGroup = game.physics.p2.createCollisionGroup();
	terrainCollisionGroup = game.physics.p2.createCollisionGroup();
	
	setupPlayer();
	
	game.physics.p2.updateBoundsCollisionGroup();
	
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
	
	button = game.add.sprite(game.world.centerX, game.world.centerY, "button");
	button.scale.setTo(0.5,0.5);
	
	game.physics.p2.enable(button, false);
	button.body.kinematic = true;
	
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
    let bodies = game.physics.p2.hitTest(pointer.position, [button]);
    
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    let physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
    if (bodies.length){
        let clickedBody = bodies[0];
        
        let localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);
        button.body.dynamic = true;
        // use a revoluteContraint to attach mouseBody to the clicked body
        mouseConstraint = game.physics.p2.createRevoluteConstraint(mouseBody, [0, 0], clickedBody, [game.physics.p2.mpxi(localPointInBody[0]), game.physics.p2.mpxi(localPointInBody[1]) ]);
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
	button.body.setZeroVelocity();
	button.body.kinematic = true;

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

testState.prototype.update = function() {
	//Drag Arm test Code
	let rArmTheta;
	let rArmPsi;
	
	let rArmX = upperbody.position.x - button.position.x;
	let rArmY = upperbody.position.y + (Math.cos(upperbody.angle/180*Math.PI))* (-50) - button.position.y;
	
	rArmTheta = 180/Math.PI * Math.atan2(rArmX,rArmY);
	
	let baseRArmAngl = rArmTheta - upperbody.angle - 90;
	
	let armLength = 90;
	
	let desiredLength = Math.sqrt(rArmX * rArmX + rArmY * rArmY);
	if( desiredLength < 2 * armLength)
		rArmPsi = 180/Math.PI * Math.acos(1 - (desiredLength*desiredLength)/(2*armLength * armLength));
	else
		rArmPsi = 180;
	
	let desiredRArmAngl = (-180 - baseRArmAngl + (180 - rArmPsi) / 2);
	if(desiredRArmAngl > 45)
		rightShoulderAngle = 45;
	else if(desiredRArmAngl < -225)
		rightShoulderAngle = -225;
	else
		rightShoulderAngle = desiredRArmAngl;
	
	rightElbowAngle = rArmPsi;
	
	if(wKey.isDown)
	{
		if(leftKneeAngle < 135)
			leftKneeAngle++;
	}
	else
		if(leftKneeAngle > 0)
			leftKneeAngle--;
		
	if(qKey.isDown)
	{
		if(rightKneeAngle < 135)
			rightKneeAngle++;
	}
	else
		if(rightKneeAngle > 0)
			rightKneeAngle--;
		
	if(pKey.isDown)
	{
		if(leftThighAngle > -135)
			leftThighAngle--;
	}
	else
		if(leftThighAngle < 0)
			leftThighAngle++;
		
	if(oKey.isDown)
	{
		if(rightThighAngle > -135)
			rightThighAngle--;
	}
	else
		if(rightThighAngle < 0)
			rightThighAngle++;
		
	if(dKey.isDown)
	{
		if(leftShoulderAngle < 45)
			leftShoulderAngle++;
	}
	else if(fKey.isDown)
	{
		if(leftShoulderAngle > -225)
			leftShoulderAngle--;
	}
		
	if(iKey.isDown)
	{
		if(leftElbowAngle > -135)
			leftElbowAngle--;
	}
	else
		if(leftElbowAngle < 0)
			leftElbowAngle++;
		
	leftKneeJoint.setLimits((leftKneeAngle-1)*Math.PI/180,(leftKneeAngle+1)*Math.PI/180);
	leftHipJoint.setLimits((leftThighAngle-1)*Math.PI/180,(leftThighAngle+1)*Math.PI/180);
	rightKneeJoint.setLimits((rightKneeAngle-1)*Math.PI/180,(rightKneeAngle+1)*Math.PI/180);
	rightHipJoint.setLimits((rightThighAngle-1)*Math.PI/180,(rightThighAngle+1)*Math.PI/180);
	leftShoulderJoint.setLimits((leftShoulderAngle-1)*Math.PI/180,(leftShoulderAngle+1)*Math.PI/180);
	rightShoulderJoint.setLimits((rightShoulderAngle-1)*Math.PI/180,(rightShoulderAngle+1)*Math.PI/180);
	leftElbowJoint.setLimits((leftElbowAngle-1)*Math.PI/180,(leftElbowAngle+1)*Math.PI/180);
	rightElbowJoint.setLimits((rightElbowAngle-1)*Math.PI/180,(rightElbowAngle+1)*Math.PI/180);
}


	
