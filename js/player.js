// Javascript classes are a lie, but the lie is better than the truth.
class Player extends Phaser.Group {
	// Must be called after assets are loaded.
	// There's probably a better way to do this, 
	// but that can be said about many things including Javascript itself.
	constructor(x, y) {
		super(game);
		
		this.leftKneeAngle = 0;
		this.leftThighAngle = 0;
		this.rightThighAngle = 0;
		this.rightKneeAngle = 0;
		this.leftShoulderAngle = 0;
		this.leftElbowAngle = 0;
		this.rightShoulderAngle = 0;
		this.rightElbowAngle = 0;
		this.rArmSelectConstraint = 1;
		this.lArmSelectConstraint = 1;
		this.rLegSelectConstraint = 1;
		this.lLegSelectConstraint = 1;
		
		game.world.setBounds(0,0,1344,750);
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 400;
		game.physics.p2.friction = 8.0;
		
		playerCollisionGroup = game.physics.p2.createCollisionGroup();
		terrainCollisionGroup = game.physics.p2.createCollisionGroup();
		controlsCollisionGroup = game.physics.p2.createCollisionGroup();
		
		this.clickedBody = 1;
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
		
		// create physics body for mouse which we will use for dragging clicked bodies
		this.mouseBody = new p2.Body();
		game.physics.p2.world.addBody(this.mouseBody);
	}
	
	click(pointer) {
		//Add any other drag selectors to this.
		let bodies = game.physics.p2.hitTest(pointer.position, [this.rArmButton,this.lArmButton,this.rLegButton,this.lLegButton]);
    
		// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
		let physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
		if (bodies.length) {
			clickedBody = bodies[0];
			
			let localPointInBody = [0, 0];
			// this function takes physicsPos and coverts it to the body's local coordinate system
			clickedBody.toLocalFrame(localPointInBody, physicsPos);
			// use a revoluteContraint to attach mouseBody to the clicked body
			this.mouseConstraint = game.physics.p2.createLockConstraint(mouseBody, clickedBody);
		} 
	}
	
	move(pointer) {
		// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
		this.mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
		this.mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);
	}
	
	release(pointer) {
		// remove constraint from object's body
		game.physics.p2.removeConstraint(this.mouseConstraint);
		this.clickedBody = 1;
	}
	
	update() {
		//Drag Arm test Code
		let rArmTheta;
		let rArmPsi;
		
		let rArmX = this.upperbody.position.x - this.rArmButton.position.x;
		let rArmYAbs = this.upperbody.position.y - this.rArmButton.position.y
		let rArmY = this.upperbody.position.y + (Math.cos(this.upperbody.angle/180*Math.PI))* (-50) - this.rArmButton.position.y;//-50 is offset of shoulder joing
		
		if(this.clickedBody === 1 && this.rArmSelectConstraint === 1)
		{	
			let offset = [rArmX, rArmYAbs];
			this.upperbody.body.toLocalFrame(offset, [rArmX, rArmYAbs]);
			//offset = [offset[0] * Math.cos(upperbody.angle/180*Math.PI) - offset[1] * Math.sin(upperbody.angle/180*Math.PI), 
			//		  offset[0] * Math.sin(upperbody.angle/180*Math.PI) + offset[1] * Math.cos(upperbody.angle/180*Math.PI)];
			this.rArmSelectConstraint = game.physics.p2.createLockConstraint(this.upperbody,this.rArmButton,offset);
		}
		
		if(this.clickedBody !== 1)
		{
			if(this.clickedBody.parent.sprite === this.rArmButton)
			{
				game.physics.p2.removeConstraint(this.rArmSelectConstraint);
				this.rArmSelectConstraint = 1;
			}
		}
		rArmTheta = 180/Math.PI * Math.atan2(rArmX,rArmY);
		
		let baseRArmAngl = rArmTheta - this.upperbody.angle - 90;
		
		let armLength = 90;
		
		let desiredLength = Math.sqrt(rArmX * rArmX + rArmY * rArmY);
		if( desiredLength < 2 * armLength)
			rArmPsi = 180/Math.PI * Math.acos(1 - (desiredLength*desiredLength)/(2*armLength * armLength));
		else
			rArmPsi = 180;
		
		let desiredRArmAngl = (-baseRArmAngl - (180 - rArmPsi) / 2);
		if(desiredRArmAngl > 45)
			this.rightShoulderAngle = 45;
		else if(desiredRArmAngl < -225)
			this.rightShoulderAngle = -225;
		else
			this.rightShoulderAngle = desiredRArmAngl;
		
		this.rightElbowAngle = -rArmPsi;
		
		let lArmTheta;
		let lArmPsi;
		
		let lArmX = this.upperbody.position.x - this.lArmButton.position.x;
		let lArmYAbs = this.upperbody.position.y - this.lArmButton.position.y
		let lArmY = this.upperbody.position.y + (Math.cos(this.upperbody.angle/180*Math.PI))* (-50) - this.lArmButton.position.y;//-50 is offset of shoulder joing
		
		if(this.clickedBody === 1 && this.lArmSelectConstraint === 1)
		{	
			let offset = [lArmX, lArmYAbs];
			this.upperbody.body.toLocalFrame(offset, [lArmX, lArmYAbs]);
			//offset = [offset[0] * Math.cos(upperbody.angle/180*Math.PI) - offset[1] * Math.sin(upperbody.angle/180*Math.PI), 
			//		  offset[0] * Math.sin(upperbody.angle/180*Math.PI) + offset[1] * Math.cos(upperbody.angle/180*Math.PI)];
			this.lArmSelectConstraint = game.physics.p2.createLockConstraint(this.upperbody,this.lArmButton,offset);
		}
		
		if(this.clickedBody !== 1)
		{
			if(this.clickedBody.parent.sprite === this.lArmButton)
			{
				game.physics.p2.removeConstraint(this.lArmSelectConstraint);
				this.lArmSelectConstraint = 1;
			}
		}
		lArmTheta = 180/Math.PI * Math.atan2(lArmX,lArmY);
		
		let baseLArmAngl = lArmTheta - this.upperbody.angle - 90;
		
		let lArmDesiredLength = Math.sqrt(lArmX * lArmX + lArmY * lArmY);
		if( lArmDesiredLength < 2 * armLength)
			lArmPsi = 180/Math.PI * Math.acos(1 - (lArmDesiredLength*lArmDesiredLength)/(2*armLength * armLength));
		else
			lArmPsi = 180;
		
		let desiredLArmAngl = (-baseLArmAngl - (180 - lArmPsi) / 2);
		if(desiredLArmAngl > 45)
			this.leftShoulderAngle = 45;
		else if(desiredLArmAngl < -225)
			this.leftShoulderAngle = -225;
		else
			this.leftShoulderAngle = desiredLArmAngl;
		
		this.leftElbowAngle = -lArmPsi;
		
		//
		
		let rLegTheta;
		let rLegPsi;
		
		let rLegX = this.hips.position.x - this.rLegButton.position.x;
		let rLegYAbs = this.hips.position.y - this.rLegButton.position.y
		let rLegY = this.hips.position.y + (Math.cos(this.hips.angle/180*Math.PI))* (20) - this.rLegButton.position.y;//-50 is offset of shoulder joing
		
		if(this.clickedBody === 1 && this.rLegSelectConstraint === 1)
		{	
			let offset = [rLegX, rLegYAbs];
			this.hips.body.toLocalFrame(offset, [rLegX, rLegYAbs]);
			//offset = [offset[0] * Math.cos(hips.angle/180*Math.PI) - offset[1] * Math.sin(hips.angle/180*Math.PI), 
			//		  offset[0] * Math.sin(hips.angle/180*Math.PI) + offset[1] * Math.cos(hips.angle/180*Math.PI)];
			this.rLegSelectConstraint = game.physics.p2.createLockConstraint(this.hips,this.rLegButton,offset);
		}
		
		if(this.clickedBody !== 1)
		{
			if(this.clickedBody.parent.sprite === this.rLegButton)
			{
				game.physics.p2.removeConstraint(this.rLegSelectConstraint);
				this.rLegSelectConstraint = 1;
			}
		}
		rLegTheta = 180/Math.PI * Math.atan2(rLegX,rLegY);
		
		let baseRLegAngl = rLegTheta - this.hips.angle - 90;
		
		let legLength = 90;
		
		let rLegDesiredLength = Math.sqrt(rLegX * rLegX + rLegY * rLegY);
		if( rLegDesiredLength < 2 * legLength)
			rLegPsi = 180/Math.PI * Math.acos(1 - (rLegDesiredLength*rLegDesiredLength)/(2*legLength * legLength));
		else
			rLegPsi = 180;
		
		let desiredRLegAngl = (-baseRLegAngl + (180 - rLegPsi) / 2);
		if(desiredRLegAngl > 45)
			this.rightThighAngle = 45;
		else if(desiredRLegAngl < -225)
			this.rightThighAngle = -225;
		else
			this.rightThighAngle = desiredRLegAngl;
		
		this.rightKneeAngle = rLegPsi;
		
		//
		
		let lLegTheta;
		let lLegPsi;
		
		let lLegX = this.hips.position.x - this.lLegButton.position.x;
		let lLegYAbs = this.hips.position.y - this.lLegButton.position.y
		let lLegY = this.hips.position.y + (Math.cos(this.hips.angle/180*Math.PI))* (20) - this.lLegButton.position.y;//-50 is offset of shoulder joing
		
		if(this.clickedBody === 1 && this.lLegSelectConstraint === 1)
		{	
			let offset = [lLegX, lLegYAbs];
			this.hips.body.toLocalFrame(offset, [lLegX, lLegYAbs]);
			//offset = [offset[0] * Math.cos(hips.angle/180*Math.PI) - offset[1] * Math.sin(hips.angle/180*Math.PI), 
			//		  offset[0] * Math.sin(hips.angle/180*Math.PI) + offset[1] * Math.cos(hips.angle/180*Math.PI)];
			this.lLegSelectConstraint = game.physics.p2.createLockConstraint(this.hips,this.lLegButton,offset);
		}
		
		if(this.clickedBody !== 1)
		{
			if(this.clickedBody.parent.sprite === this.lLegButton)
			{
				game.physics.p2.removeConstraint(this.lLegSelectConstraint);
				this.lLegSelectConstraint = 1;
			}
		}
		rLegTheta = 180/Math.PI * Math.atan2(lLegX,lLegY);
		
		let baseLLegAngl = rLegTheta - this.hips.angle - 90;
		
		let lLegDesiredLength = Math.sqrt(lLegX * lLegX + lLegY * lLegY);
		if( lLegDesiredLength < 2 * legLength)
			lLegPsi = 180/Math.PI * Math.acos(1 - (lLegDesiredLength*lLegDesiredLength)/(2*legLength * legLength));
		else
			lLegPsi = 180;
		
		let desiredLLegAngl = (-baseLLegAngl + (180 - lLegPsi) / 2);
		if(desiredLLegAngl > 45)
			this.leftThighAngle = 45;
		else if(desiredLLegAngl < -225)
			this.leftThighAngle = -225;
		else
			this.leftThighAngle = desiredLLegAngl;
		
		this.leftKneeAngle = lLegPsi;
			
		this.leftKneeJoint.setLimits((this.leftKneeAngle-1)*Math.PI/180,(this.leftKneeAngle+1)*Math.PI/180);
		this.leftHipJoint.setLimits((this.leftThighAngle-1)*Math.PI/180,(this.leftThighAngle+1)*Math.PI/180);
		this.rightKneeJoint.setLimits((this.rightKneeAngle-1)*Math.PI/180,(this.rightKneeAngle+1)*Math.PI/180);
		this.rightHipJoint.setLimits((this.rightThighAngle-1)*Math.PI/180,(this.rightThighAngle+1)*Math.PI/180);
		this.leftShoulderJoint.setLimits((this.leftShoulderAngle-1)*Math.PI/180,(this.leftShoulderAngle+1)*Math.PI/180);
		this.rightShoulderJoint.setLimits((this.rightShoulderAngle-1)*Math.PI/180,(this.rightShoulderAngle+1)*Math.PI/180);
		this.leftElbowJoint.setLimits((this.leftElbowAngle-1)*Math.PI/180,(this.leftElbowAngle+1)*Math.PI/180);
		this.rightElbowJoint.setLimits((this.rightElbowAngle-1)*Math.PI/180,(this.rightElbowAngle+1)*Math.PI/180);
	}
}