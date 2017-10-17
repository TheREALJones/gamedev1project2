// Javascript classes are a lie, but the lie is better than the truth.
class Player extends Phaser.Group {
	// Must be called after assets are loaded.
	// There's probably a better way to do this, 
	// but that can be said about many things including Javascript itself.
	constructor() {
		super(game);
		let leftUpperArm = game.add.sprite(500,450,'plrlua');
		this.add(leftUpperArm);
		let leftLowerArm = game.add.sprite(500,500,'plrlla');
		this.add(leftLowerArm);
		let leftHand = game.add.sprite(500,550,'plrlha');
		this.add(leftHand);
		this.upperbody = game.add.sprite(500,400,'plrub');
		this.add(this.upperbody);
		this.hips = game.add.sprite(500,500,'plrhip');
		this.add(this.hips);
		let torso = game.add.sprite(500,450,'plrtrs');
		this.add(torso);
		let leftThigh = game.add.sprite(500,575,'plrlth');
		this.add(leftThigh);
		let rightThigh = game.add.sprite(500,575,'plrrth');
		this.add(rightThigh);
		let leftLowerLeg = game.add.sprite(500,650,'plrlll');
		this.add(leftLowerLeg);
		let rightLowerLeg = game.add.sprite(500,650,'plrrll');
		this.add(rightLowerLeg);
		let leftFoot = game.add.sprite(500,725,'plrlft');
		this.add(leftFoot);
		let rightFoot = game.add.sprite(500,725,'plrrft');
		this.add(rightFoot);
		let rightUpperArm = game.add.sprite(500,450,'plrrua');
		this.add(rightUpperArm);
		let rightLowerArm = game.add.sprite(500,500,'plrrla');
		this.add(rightLowerArm);
		let rightHand = game.add.sprite(500,550,'plrrha');
		this.add(rightHand);
		
		
		let i;
		for(i = 0; i < this.length; i++)
		{
			this.children[i].scale.setTo(0.5,0.5);
		}
		
		game.physics.p2.enable([this.upperbody,this.hips,torso,leftThigh,leftLowerLeg,leftFoot,rightThigh,rightLowerLeg,rightFoot,leftUpperArm,leftLowerArm,leftHand,rightUpperArm,rightLowerArm,rightHand]);
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
		
		for(i = 0; i < this.length; i++)
		{
			this.children[i].body.setCollisionGroup(playerCollisionGroup);
			this.children[i].body.collides(terrainCollisionGroup);
		}
		
		torso.body.kinematic = true;
		
		game.physics.p2.createLockConstraint(this.upperbody,torso,[0,-50],0);
		
		game.physics.p2.createLockConstraint(torso,this.hips,[0,-40],0);
		
		this.leftHipJoint = game.physics.p2.createRevoluteConstraint(this.hips,[0,20],leftThigh,[0,-55]);
		this.leftHipJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.rightHipJoint = game.physics.p2.createRevoluteConstraint(this.hips,[0,20],rightThigh,[0,-55]);
		this.rightHipJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.leftKneeJoint = game.physics.p2.createRevoluteConstraint(leftThigh,[0,55],leftLowerLeg,[0,-55]);
		this.leftKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.rightKneeJoint = game.physics.p2.createRevoluteConstraint(rightThigh,[0,55],rightLowerLeg,[0,-55]);
		this.rightKneeJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		let leftAnkleJoint = game.physics.p2.createRevoluteConstraint(leftLowerLeg,[0,55],leftFoot,[-10,-5]);
		leftAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
		
		let rightAnkleJoint = game.physics.p2.createRevoluteConstraint(rightLowerLeg,[0,55],rightFoot,[-10,-5]);
		rightAnkleJoint.setLimits(-Math.PI/8,Math.PI/8);
		
		this.leftShoulderJoint = game.physics.p2.createRevoluteConstraint(this.upperbody,[0,-45],leftUpperArm,[0,-45]);
		this.leftShoulderJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.leftElbowJoint = game.physics.p2.createRevoluteConstraint(leftUpperArm,[0,45],leftLowerArm,[0,-45]);
		this.leftElbowJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		let leftWristJoint = game.physics.p2.createRevoluteConstraint(leftLowerArm,[0,45],leftHand,[0,-15]);
		leftWristJoint.setLimits(-Math.PI/2,Math.PI/2);
		
		this.rightShoulderJoint = game.physics.p2.createRevoluteConstraint(this.upperbody,[0,-45],rightUpperArm,[0,-45]);
		this.rightShoulderJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		this.rightElbowJoint = game.physics.p2.createRevoluteConstraint(rightUpperArm,[0,45],rightLowerArm,[0,-45]);
		this.rightElbowJoint.setLimits(-Math.PI/180,Math.PI/180);
		
		let rightWristJoint = game.physics.p2.createRevoluteConstraint(rightLowerArm,[0,45],rightHand,[0,-15]);
		rightWristJoint.setLimits(-Math.PI/2,Math.PI/2);
	}
}