let stairState = function() {

}

stairState.prototype.preload = function() {
	game.load.image("stairs", "assets/stairs.png");
	game.load.image("buttonController", "assets/controllerButton2.png");
	game.load.audio("stairTheme", "assets/music/stairtheme1.wav");
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

stairState.prototype.create = function() {
	game.sound.stopAll();
	let music = game.add.audio("stairTheme");
	music.loopFull(0.6);
	music.play();

	game.add.image(0, 0, "stairs");
	game.world.setBounds(0,0,1344,750);
	game.physics.startSystem(Phaser.Physics.P2JS);

	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 100;

	let steps = game.add.group();
	steps.enableBody = true;

	//DECLARE PLAYER
	this.player = new Player(10,-50);
	// attach pointer events
    game.input.onDown.add((pointer)=> {
		//Add any other drag selectors to this.
		let bodies = game.physics.p2.hitTest(pointer.position, [this.player.rArmButton,this.player.lArmButton,this.player.rLegButton,this.player.lLegButton]);
		
		// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
		let physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
		if (bodies.length){
			this.player.clickedBody = bodies[0];
			
			let localPointInBody = [0, 0];
			// this function takes physicsPos and coverts it to the body's local coordinate system
			this.player.clickedBody.toLocalFrame(localPointInBody, physicsPos);
			// use a revoluteContraint to attach mouseBody to the clicked body
			this.player.mouseConstraint = game.physics.p2.createLockConstraint(this.player.mouseBody, this.player.clickedBody);
		}   
	});
    game.input.onUp.add(()=>{
		// remove constraint from object's body
		game.physics.p2.removeConstraint(this.player.mouseConstraint);
		this.player.clickedBody = 1;
	});
    game.input.addMoveCallback((pointer)=>{
		// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
		this.player.mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
		this.player.mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);
	});
	//END OF PLAYER
	
	
	stairState.addStep(0, 358, 283, 750, terrainCollisionGroup);
	stairState.addStep(283, 411, 377, 750, terrainCollisionGroup);
	stairState.addStep(377, 464, 471, 750, terrainCollisionGroup);
	stairState.addStep(471, 518, 565, 750, terrainCollisionGroup);
	stairState.addStep(565, 571, 660, 750, terrainCollisionGroup);
	stairState.addStep(660, 625, 1150, 750, terrainCollisionGroup);
	stairState.addStep(1150, 679, 1245, 750, terrainCollisionGroup);
	stairState.addStep(1245, 732, 1334, 750, terrainCollisionGroup);

	let styleText = {font:'20px Arial', align: "center", fill: '#FFFFFF'};
	let restartButton = game.add.button(0, 530, "buttonController",  stairState.resetButtonPress);
	restartButton.scale.setTo (0.5,0.5);

	let restartText = game.add.text(95, 580, "Restart", styleText);

	let timerBG = game.add.image(0,400, "buttonController");
	timerBG.scale.setTo (0.5,0.5);

	this.timerText = game.add.text(70, 450, "Time: ", styleText);
	this.startTime = game.time.totalElapsedSeconds();
	
}

// x1, y1 is the upper left corner of the rectangle.
// x2, y2 is the lower right corner of the rectangle.
stairState.addStep = function(x1, y1, x2, y2, collisionGroup, debug=false) {
	let step = game.add.sprite(x1, y1, "");
	game.physics.p2.enable(step);
	step.body.setRectangle(x2 - x1, y2 - y1, (x2 - x1)/2, (y2-y1)/2);
	step.body.debug = debug;
	step.body.static = true;
	step.body.setCollisionGroup(collisionGroup);
	step.body.collides([playerCollisionGroup]);
}

stairState.prototype.update = function() {
	let elapsedTime = game.math.roundTo((game.time.totalElapsedSeconds() - this.startTime), -2);
	let timeString = "Time: " + elapsedTime;
	this.timerText.setText(timeString);
	this.player.update();
	
	if (this.player.upperbody.x >= 1200) {
		game.state.start("StairtoStairScreen");
	}
}

stairState.resetButtonPress = function(thingy, pointer, isDown) {
	if (isDown === true) {
		game.state.start("Stairs");
	}
}

