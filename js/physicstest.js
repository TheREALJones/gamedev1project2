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
	game.load.image("head", "assets/Toby Philpott Pieces/Eye_Open.png")
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

let mouseBody;
let mouseConstraint;

testState.prototype.create = function() {
	
	
	game.world.setBounds(0,0,1344,750);
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 240;
	game.physics.p2.friction = 8.0;
	
	
	player = game.add.group();
	
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
	
	head = game.add.sprite(game.world.centerX, game.world.centerY, "head");
	head.scale.setTo(0.5,0.5);
	
	game.physics.p2.enable(head, false);
	
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
    let bodies = game.physics.p2.hitTest(pointer.position, [head]);
    
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    let physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
    if (bodies.length){
        let clickedBody = bodies[0];
        
        let localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);
        
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

}

function setupPlayer() {
	
	let leftUpperArm = game.add.sprite(500,450,'plrlua');
	player.add(leftUpperArm);
	let leftLowerArm = game.add.sprite(500,500,'plrlla');
	player.add(leftLowerArm);
	let leftHand = game.add.sprite(500,550,'plrlha');
	player.add(leftHand);
	upperbody = game.add.sprite(500,400,'plrub');
	player.add(upperbody);
	hips = game.add.sprite(500,500,'plrhip');
	player.add(hips);
	let torso = game.add.sprite(500,450,'plrtrs');
	player.add(torso);
	let leftThigh = game.add.sprite(500,575,'plrlth');
	player.add(leftThigh);
	let rightThigh = game.add.sprite(500,575,'plrrth');
	player.add(rightThigh);
	let leftLowerLeg = game.add.sprite(500,650,'plrlll');
	player.add(leftLowerLeg);
	let rightLowerLeg = game.add.sprite(500,650,'plrrll');
	player.add(rightLowerLeg);
	let leftFoot = game.add.sprite(500,725,'plrlft');
	player.add(leftFoot);
	let rightFoot = game.add.sprite(500,725,'plrrft');
	player.add(rightFoot);
	let rightUpperArm = game.add.sprite(500,450,'plrrua');
	player.add(rightUpperArm);
	let rightLowerArm = game.add.sprite(500,500,'plrrla');
	player.add(rightLowerArm);
	let rightHand = game.add.sprite(500,550,'plrrha');
	player.add(rightHand);
	
	
	let i;
	for(i = 0; i < player.length; i++)
	{
		player.children[i].scale.setTo(0.5,0.5);
	}
	
	game.physics.p2.enable([upperbody,hips,torso,leftThigh,leftLowerLeg,leftFoot,rightThigh,rightLowerLeg,rightFoot,leftUpperArm,leftLowerArm,leftHand,rightUpperArm,rightLowerArm,rightHand]);
	leftUpperArm.anchor = {x:0.55,y:0.5};
	leftUpperArm.body.setRectangle(40,95);
	leftLowerArm.anchor = {x:0.55,y:0.5};
	leftLowerArm.body.setRectangle(40,95);
	leftHand.anchor = {x:0.55,y:0.5};
	leftHand.body.setRectangle(40,80);
	rightUpperArm.anchor = {x:0.55,y:0.5};
	rightUpperArm.body.setRectangle(40,95);
	rightLowerArm.anchor = {x:0.55,y:0.5};
	rightLowerArm.body.setRectangle(40,95);
	rightHand.anchor = {x:0.55,y:0.5};
	rightHand.body.setRectangle(40,80);
	upperbody.anchor = {x:0.55,y:.47};
	upperbody.body.setRectangle(75,100);
	hips.anchor = {x:0.55,y:0.43};
	hips.body.setRectangle(75,75);
	torso.anchor = {x:0.55,y:0.4};
	torso.body.setRectangle(60,50);
	leftThigh.anchor = {x:0.55,y:0.45};
	leftThigh.body.setRectangle(40,125);
	leftLowerLeg.anchor = {x:0.54,y:0.45};
	leftLowerLeg.body.setRectangle(40,125);
	leftFoot.body.anchor = {x:0.57,y:0.5};
	leftFoot.body.setRectangle(80,25);
	rightThigh.anchor = {x:0.55,y:0.45};
	rightThigh.body.setRectangle(40,125);
	rightLowerLeg.anchor = {x:0.54,y:0.45};
	rightLowerLeg.body.setRectangle(40,125);
	rightFoot.body.anchor = {x:0.57,y:0.5};
	rightFoot.body.setRectangle(80,25);
	
	for(i = 0; i < player.length; i++)
	{
		player.children[i].body.setCollisionGroup(playerCollisionGroup);
		player.children[i].body.collides(terrainCollisionGroup);
	}
	
	torso.body.kinematic = true;
	
	game.physics.p2.createLockConstraint(upperbody,torso,[0,-50],0);
	
	game.physics.p2.createLockConstraint(torso,hips,[0,-40],0);
	
	leftHipJoint = game.physics.p2.createRevoluteConstraint(hips,[0,20],leftThigh,[0,-55]);
	leftHipJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	rightHipJoint = game.physics.p2.createRevoluteConstraint(hips,[0,20],rightThigh,[0,-55]);
	rightHipJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	leftKneeJoint = game.physics.p2.createRevoluteConstraint(leftThigh,[0,55],leftLowerLeg,[0,-55]);
	leftKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	rightKneeJoint = game.physics.p2.createRevoluteConstraint(rightThigh,[0,55],rightLowerLeg,[0,-55]);
	rightKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	let leftAnkleJoint = game.physics.p2.createRevoluteConstraint(leftLowerLeg,[0,55],leftFoot,[-10,-5]);
	leftAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
	
	let rightAnkleJoint = game.physics.p2.createRevoluteConstraint(rightLowerLeg,[0,55],rightFoot,[-10,-5]);
	rightAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
	
	leftShoulderJoint = game.physics.p2.createRevoluteConstraint(upperbody,[0,-45],leftUpperArm,[0,-45]);
	leftShoulderJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	leftElbowJoint = game.physics.p2.createRevoluteConstraint(leftUpperArm,[0,45],leftLowerArm,[0,-45]);
	leftElbowJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	let leftWristJoint = game.physics.p2.createRevoluteConstraint(leftLowerArm,[0,45],leftHand,[0,-15]);
	leftWristJoint.setLimits(-Math.PI/2,Math.PI/2);
	
	rightShoulderJoint = game.physics.p2.createRevoluteConstraint(upperbody,[0,-45],rightUpperArm,[0,-45]);
	rightShoulderJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	rightElbowJoint = game.physics.p2.createRevoluteConstraint(rightUpperArm,[0,45],rightLowerArm,[0,-45]);
	rightElbowJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	let rightWristJoint = game.physics.p2.createRevoluteConstraint(rightLowerArm,[0,45],rightHand,[0,-15]);
	rightWristJoint.setLimits(-Math.PI/2,Math.PI/2);
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
	
	let rArmX = upperbody.position.x - head.position.x;
	let rArmY = upperbody.position.y - head.position.y;
	
	rArmTheta = 180/Math.PI * Math.atan2(rArmX,rArmY);
	
	let baseRArmAngl = rArmTheta - upperbody.angle - 90;
	
	let armLength = 90;
	
	let desiredLength = Math.sqrt(rArmX * rArmX + rArmY * rArmY);
	if( desiredLength < 2 * armLength)
		rArmPsi = 180/Math.PI * Math.acos(1 - (desiredLength*desiredLength)/(2*armLength * armLength));
	else
		rArmPsi = 180;
	
	let desiredRArmAngl = (baseRArmAngl + (180 - rArmPsi) / 2);
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


	
