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


function create() {
	
	
	game.world.setBounds(0,0,1344,750);
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 50;
	
	player = game.add.group();
	
	playerCollisionGroup = game.physics.p2.createCollisionGroup();
	terrainCollisionGroup = game.physics.p2.createCollisionGroup();
	
	setupPlayer();
	
	game.physics.p2.updateBoundsCollisionGroup();
}

function setupPlayer() {
	
	
	let torso = game.add.sprite(500,500,'plrtrs');
	let leftThigh = game.add.sprite(500,575,'plrlth');
	//let rightThigh = game.add.sprite(500,575,'plrrth');
	let leftLowerLeg = game.add.sprite(500,650,'plrlll');
	//let rightLowerLeg = game.add.sprite(500,650,'plrrll');
	let leftFoot = game.add.sprite(500,725,'plrlft');
	//let rightFoot = game.add.sprite(500,725,'plrrft');
	
	
	
	game.physics.p2.enable([torso,leftThigh,leftLowerLeg,leftFoot]);
	torso.anchor = {x:0.55,y:0.4};
	torso.body.setRectangle(120,100);
	torso.body.setCollisionGroup(playerCollisionGroup);
	torso.body.collides(terrainCollisionGroup);
	leftThigh.anchor = {x:0.55,y:0.45};
	leftThigh.body.setRectangle(80,250);
	leftThigh.body.setCollisionGroup(playerCollisionGroup);
	leftThigh.body.collides(terrainCollisionGroup);
	leftLowerLeg.anchor = {x:0.54,y:0.45};
	leftLowerLeg.body.setRectangle(80,250);
	leftLowerLeg.body.setCollisionGroup(playerCollisionGroup);
	leftLowerLeg.body.collides(terrainCollisionGroup);
	leftFoot.body.anchor = {x:0.57,y:0.5};
	leftFoot.body.setRectangle(160,50);
	leftFoot.body.setCollisionGroup(playerCollisionGroup);
	leftFoot.body.collides(terrainCollisionGroup);
	
	let leftHipJoint = game.physics.p2.createRevoluteConstraint(torso,[0,40],leftThigh,[0,-115]);
	leftHipJoint.setLimits(-PI/180,PI/180);
	
	let leftKneeJoint = game.physics.p2.createRevoluteConstraint(leftThigh,[0,115],leftLowerLeg,[0,-115]);
	leftKneeJoint.setLimits(-PI/180,PI/180);
	
	let leftAnkleJoint = game.physics.p2.createRevoluteConstraint(leftLowerLeg,[0,115],leftFoot,[60,-20]);
	leftAnkleJoint.setLimits(-PI/8,PI/8);
	
}

function update() {
	
}


	
