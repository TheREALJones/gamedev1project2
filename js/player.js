// Javascript classes are a lie, but the lie is better than the truth.
class Player extends Phaser.Group {
	// Must be called after assets are loaded.
	// There's probably a better way to do this, 
	// but that can be said about many things including Javascript itself.
	constructor(x, y) {
		super(game);
		
		game.world.setBounds(0,0,1344,750);
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 400;
		game.physics.p2.friction = 8.0;
		
		playerCollisionGroup = game.physics.p2.createCollisionGroup();
		terrainCollisionGroup = game.physics.p2.createCollisionGroup();
		controlsCollisionGroup = game.physics.p2.createCollisionGroup();
		
		let leftUpperArm = game.add.sprite(500,450,'plrlua');
		this.add(leftUpperArm);
		let leftLowerArm = game.add.sprite(500,500,'plrlla');
		this.add(leftLowerArm);
		let leftHand = game.add.sprite(500,550,'plrlha');
		this.add(leftHand);
		let leftFoot = game.add.sprite(500,725,'plrlft');
		this.add(leftFoot);
		let leftThigh = game.add.sprite(500,575,'plrlth');
		this.add(leftThigh);
		let leftLowerLeg = game.add.sprite(500,650,'plrlll');
		this.add(leftLowerLeg);
		this.hips = game.add.sprite(500,500,'plrhip');
		this.add(this.hips);
		let torso = game.add.sprite(500,450,'plrtrs');
		this.add(torso);
		let headHead = game.add.sprite(500, 350, 'head');
		this.add(headHead);
		this.upperbody = game.add.sprite(500,400,'plrub');
		this.add(this.upperbody);
		let rightFoot = game.add.sprite(500,725,'plrrft');
		this.add(rightFoot);
		let rightThigh = game.add.sprite(500,575,'plrrth');
		this.add(rightThigh);
		let rightLowerLeg = game.add.sprite(500,650,'plrrll');
		this.add(rightLowerLeg);
		let rightUpperArm = game.add.sprite(500,450,'plrrua');
		this.add(rightUpperArm);
		let rightLowerArm = game.add.sprite(500,500,'plrrla');
		this.add(rightLowerArm);
		let rightHand = game.add.sprite(500,550,'plrrha');
		this.add(rightHand);
		
		let jointForce = 1000;
		
		
		let i;
		for(i = 0; i < this.length; i++)
		{
			this.children[i].scale.setTo(0.5,0.5);
		}
		
		game.physics.p2.enable([headHead, this.upperbody,this.hips,torso,leftThigh,leftLowerLeg,leftFoot,rightThigh,rightLowerLeg,rightFoot,leftUpperArm,leftLowerArm,leftHand,rightUpperArm,rightLowerArm,rightHand]);
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
		this.upperbody.anchor = {x:0.55,y:.47};
		this.upperbody.body.setRectangle(75,100);
		this.hips.anchor = {x:0.55,y:0.43};
		this.hips.body.setRectangle(75,75);
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
		headHead.anchor = {x:0.55,y:0.45};
		headHead.body.setRectangle(90, 125);
		
		for(i = 0; i < this.length; i++)
		{
			this.children[i].body.setCollisionGroup(playerCollisionGroup);
			this.children[i].body.collides(terrainCollisionGroup);
		}
		
		game.physics.p2.createLockConstraint(this.upperbody,torso,[0,-50],0);
		game.physics.p2.createLockConstraint(this.upperbody,headHead,[0,80],0);
		game.physics.p2.createLockConstraint(torso,this.hips,[0,-40],0);
		
		this.leftHipJoint = game.physics.p2.createRevoluteConstraint(this.hips,[0,20],leftThigh,[0,-55],jointForce);
		this.leftHipJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.rightHipJoint = game.physics.p2.createRevoluteConstraint(this.hips,[0,20],rightThigh,[0,-55],jointForce);
		this.rightHipJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.leftKneeJoint = game.physics.p2.createRevoluteConstraint(leftThigh,[0,55],leftLowerLeg,[0,-55],jointForce);
		this.leftKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.rightKneeJoint = game.physics.p2.createRevoluteConstraint(rightThigh,[0,55],rightLowerLeg,[0,-55],jointForce);
		this.rightKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		let leftAnkleJoint = game.physics.p2.createRevoluteConstraint(leftLowerLeg,[0,55],leftFoot,[5,-18],jointForce);
		leftAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
		
		let rightAnkleJoint = game.physics.p2.createRevoluteConstraint(rightLowerLeg,[0,55],rightFoot,[5,-18],jointForce);
		rightAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
		
		this.leftShoulderJoint = game.physics.p2.createRevoluteConstraint(this.upperbody,[0,-45],leftUpperArm,[0,-45],jointForce);
		this.leftShoulderJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.leftElbowJoint = game.physics.p2.createRevoluteConstraint(leftUpperArm,[0,45],leftLowerArm,[0,-45],jointForce);
		this.leftElbowJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		let leftWristJoint = game.physics.p2.createRevoluteConstraint(leftLowerArm,[0,45],leftHand,[0,-15],jointForce);
		leftWristJoint.setLimits(-Math.PI/2,Math.PI/2);
		
		this.rightShoulderJoint = game.physics.p2.createRevoluteConstraint(this.upperbody,[0,-45],rightUpperArm,[0,-45],jointForce);
		this.rightShoulderJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.rightElbowJoint = game.physics.p2.createRevoluteConstraint(rightUpperArm,[0,45],rightLowerArm,[0,-45],jointForce);
		this.rightElbowJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		let rightWristJoint = game.physics.p2.createRevoluteConstraint(rightLowerArm,[0,45],rightHand,[0,-15],jointForce);
		rightWristJoint.setLimits(-Math.PI/2,Math.PI/2);
		
		this.rArmButton = game.add.sprite(this.upperbody.position.x - 40, this.upperbody.position.y - 70, "button");
		this.rArmButton.scale.setTo(0.4,0.4);
		game.physics.p2.enable(this.rArmButton, false);
		this.rArmButton.body.mass = 0.001
		this.rArmButton.body.collides([]);
		this.rArmButton.body.setCollisionGroup(controlsCollisionGroup);
		
		this.lArmButton = game.add.sprite(this.upperbody.position.x - 20, this.upperbody.position.y -  80, "button");
		this.lArmButton.scale.setTo(0.5,0.5);
		game.physics.p2.enable(this.lArmButton, false);
		this.lArmButton.body.mass = 0.001;
		this.lArmButton.body.collides([]);
		this.lArmButton.body.setCollisionGroup(controlsCollisionGroup);
		
		this.rLegButton = game.add.sprite(this.hips.position.x - 10, this.hips.position.y, "button");
		this.rLegButton.scale.setTo(0.5,0.5);
		game.physics.p2.enable(this.rLegButton, false);
		this.rLegButton.body.mass = 0.001;
		this.rLegButton.body.collides([]);
		this.rLegButton.body.setCollisionGroup(controlsCollisionGroup);
		
		this.lLegButton = game.add.sprite(this.hips.position.x + 10, this.hips.position.y, "button");
		this.lLegButton.scale.setTo(0.5,0.5);
		game.physics.p2.enable(this.lLegButton, false);
		this.lLegButton.body.mass = 0.001;
		this.lLegButton.body.collides([]);
		this.lLegButton.body.setCollisionGroup(controlsCollisionGroup);
		
		this.x = x;
		this.y = y;
		
		game.physics.p2.updateBoundsCollisionGroup();
	}
}