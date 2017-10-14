let game = new Phaser.Game(1344, 750, Phaser.AUTO, 'phaser-example', { preload: preload,create: create, update: update });
	
function preload() {
	game.load.image('plrtrs', 'assets/Toby Philpott Pieces/Torso.png');
	game.load.image('plrub', 'assets/Toby Philpott Pieces/Upper_Body.png');
	game.load.image('plrlth', 'assets/Toby Philpott Pieces/L_upper_thigh.png');
	game.load.image('plrlll', 'assets/Toby Philpott Pieces/L_lower_leg.png');
	game.load.image('plrlft', 'assets/Toby Philpott Pieces/L_foot.png');
	game.load.image('plrrth', 'assets/Toby Philpott Pieces/R_upper_thigh.png');
	game.load.image('plrrll', 'assets/Toby Philpott Pieces/R_lower_leg.png');
	game.load.image('plrrft', 'assets/Toby Philpott Pieces/R_foot.png');
}	

let player;

let playerCollisionGroup;
let terrainCollisionGroup;

let leftHipJoint;
let leftKneeJoint;
let rightHipJoint;
let rightKneeJoint;

let qKey;
let wKey;
let oKey;
let pKey;


function create() {
	
	
	game.world.setBounds(0,0,1344,750);
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 100;
	
	player = game.add.group();
	
	playerCollisionGroup = game.physics.p2.createCollisionGroup();
	terrainCollisionGroup = game.physics.p2.createCollisionGroup();
	
	setupPlayer();
	
	game.physics.p2.updateBoundsCollisionGroup();
	
	qKey = game.input.keyboard.addKey(Phaser.KeyCode.Q);
	wKey = game.input.keyboard.addKey(Phaser.KeyCode.W);
	oKey = game.input.keyboard.addKey(Phaser.KeyCode.O);
	pKey = game.input.keyboard.addKey(Phaser.KeyCode.P);
}

function setupPlayer() {
	
	
	let torso = game.add.sprite(500,500,'plrtrs');
	torso.scale.setTo(0.5,0.5);
	let leftThigh = game.add.sprite(500,575,'plrlth');
	leftThigh.scale.setTo(0.5,0.5);
	let rightThigh = game.add.sprite(500,575,'plrrth');
	rightThigh.scale.setTo(0.5,0.5);
	let leftLowerLeg = game.add.sprite(500,650,'plrlll');
	leftLowerLeg.scale.setTo(0.5,0.5);
	let rightLowerLeg = game.add.sprite(500,650,'plrrll');
	rightLowerLeg.scale.setTo(0.5,0.5);
	let leftFoot = game.add.sprite(500,725,'plrlft');
	leftFoot.scale.setTo(0.5,0.5);
	let rightFoot = game.add.sprite(500,725,'plrrft');
	rightFoot.scale.setTo(0.5,0.5);
	
	
	
	
	
	game.physics.p2.enable([torso,leftThigh,leftLowerLeg,leftFoot,rightThigh,rightLowerLeg,rightFoot]);
	torso.anchor = {x:0.55,y:0.4};
	torso.body.setRectangle(60,50);
	torso.body.setCollisionGroup(playerCollisionGroup);
	torso.body.collides(terrainCollisionGroup);
	leftThigh.anchor = {x:0.55,y:0.45};
	leftThigh.body.setRectangle(40,125);
	leftThigh.body.setCollisionGroup(playerCollisionGroup);
	leftThigh.body.collides(terrainCollisionGroup);
	leftLowerLeg.anchor = {x:0.54,y:0.45};
	leftLowerLeg.body.setRectangle(40,125);
	leftLowerLeg.body.setCollisionGroup(playerCollisionGroup);
	leftLowerLeg.body.collides(terrainCollisionGroup);
	leftFoot.body.anchor = {x:0.57,y:0.5};
	leftFoot.body.setRectangle(80,25);
	leftFoot.body.setCollisionGroup(playerCollisionGroup);
	leftFoot.body.collides(terrainCollisionGroup);
	rightThigh.anchor = {x:0.55,y:0.45};
	rightThigh.body.setRectangle(40,125);
	rightThigh.body.setCollisionGroup(playerCollisionGroup);
	rightThigh.body.collides(terrainCollisionGroup);
	rightLowerLeg.anchor = {x:0.54,y:0.45};
	rightLowerLeg.body.setRectangle(40,125);
	rightLowerLeg.body.setCollisionGroup(playerCollisionGroup);
	rightLowerLeg.body.collides(terrainCollisionGroup);
	rightFoot.body.anchor = {x:0.57,y:0.5};
	rightFoot.body.setRectangle(80,25);
	rightFoot.body.setCollisionGroup(playerCollisionGroup);
	rightFoot.body.collides(terrainCollisionGroup);
	
	leftHipJoint = game.physics.p2.createRevoluteConstraint(torso,[0,20],leftThigh,[0,-55]);
	leftHipJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	rightHipJoint = game.physics.p2.createRevoluteConstraint(torso,[0,20],rightThigh,[0,-55]);
	rightHipJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	leftKneeJoint = game.physics.p2.createRevoluteConstraint(leftThigh,[0,55],leftLowerLeg,[0,-55]);
	leftKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	rightKneeJoint = game.physics.p2.createRevoluteConstraint(rightThigh,[0,55],rightLowerLeg,[0,-55]);
	rightKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
	
	let leftAnkleJoint = game.physics.p2.createRevoluteConstraint(leftLowerLeg,[0,55],leftFoot,[-30,-5]);
	leftAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
	
	let rightAnkleJoint = game.physics.p2.createRevoluteConstraint(rightLowerLeg,[0,55],rightFoot,[-30,-5]);
	rightAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
	
}

let leftKneeAngle = 0;
let leftThighAngle = 0;
let rightThighAngle = 0;
let rightKneeAngle = 0;

function update() {
	if(wKey.isDown)
	{
		if(leftKneeAngle < 90)
			leftKneeAngle++;
	}
	else
		if(leftKneeAngle > 0)
			leftKneeAngle--;
		
	if(qKey.isDown)
	{
		if(rightKneeAngle < 90)
			rightKneeAngle++;
	}
	else
		if(rightKneeAngle > 0)
			rightKneeAngle--;
		
	if(pKey.isDown)
	{
		if(leftThighAngle > -90)
			leftThighAngle--;
	}
	else
		if(leftThighAngle < 0)
			leftThighAngle++;
		
	if(oKey.isDown)
	{
		if(rightThighAngle > -90)
			rightThighAngle--;
	}
	else
		if(rightThighAngle < 0)
			rightThighAngle++;
		
	leftKneeJoint.setLimits((leftKneeAngle-1)*Math.PI/180,(leftKneeAngle+1)*Math.PI/180);
	leftHipJoint.setLimits((leftThighAngle-1)*Math.PI/180,(leftThighAngle+1)*Math.PI/180);
	rightKneeJoint.setLimits((rightKneeAngle-1)*Math.PI/180,(rightKneeAngle+1)*Math.PI/180);
	rightHipJoint.setLimits((rightThighAngle-1)*Math.PI/180,(rightThighAngle+1)*Math.PI/180);
}


	
