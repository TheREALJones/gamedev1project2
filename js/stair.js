let stairState = function() {
	
}

stairState.prototype.preload = function() {
	game.load.image("stairs", "assets/stairs.png");
}

stairState.prototype.create = function() {
	game.add.image(0, 0, "stairs");
	
	game.world.setBounds(0,0,1344,750);
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.y = 100;

	let steps = game.add.group();
	steps.enableBody = true;
	
	this.terrainCollisionGroup = game.physics.p2.createCollisionGroup();
	
	stairState.addStep(0, 358, 283, 750, this.terrainCollisionGroup);
	stairState.addStep(283, 411, 377, 750, this.terrainCollisionGroup);
	stairState.addStep(377, 464, 471, 750, this.terrainCollisionGroup);
	stairState.addStep(471, 518, 565, 750, this.terrainCollisionGroup);
	stairState.addStep(565, 571, 660, 750, this.terrainCollisionGroup);
	stairState.addStep(660, 625, 1150, 750, this.terrainCollisionGroup);
	stairState.addStep(1150, 679, 1245, 750, this.terrainCollisionGroup);
	stairState.addStep(1245, 732, 1334, 750, this.terrainCollisionGroup);
	
	let restartButton = game.add.button(1200, 40, "f",  stairState.resetButtonPress);
	
	let rectangle = game.add.graphics();
	restartButton.addChild(rectangle);
	rectangle.beginFill(0xFFFFFF);
	rectangle.drawRect(0, 0, 120, 40);
	rectangle.centerX = restartButton.width/2;
	rectangle.centerY = restartButton.height/2;
	
	let restartText = game.add.text(0, 0, "Restart");
	rectangle.addChild(restartText);
	restartText.centerX = rectangle.width/2;
	restartText.centerY = rectangle.height/2;

	this.timerText = game.add.text(50, 40, "Time: ");
	this.startTime = game.time.totalElapsedSeconds();
}

// x1, y1 is the upper left corner of the rectangle.
// x2, y2 is the lower right corner of the rectangle.
stairState.addStep = function(x1, y1, x2, y2, collisionGroup) {
	let step = game.add.sprite(x1, y1, "");
	game.physics.p2.enable(step);
	step.body.setRectangle(x2 - x1, y2 - y1, (x2 - x1)/2, (y2-y1)/2);
	//step.body.debug = true;
	step.body.static = true;
	step.body.setCollisionGroup(collisionGroup);
}

stairState.prototype.update = function() {
	let elapsedTime = game.math.roundTo((game.time.totalElapsedSeconds() - this.startTime), -2);
	let timeString = "Time: " + elapsedTime;
	this.timerText.setText(timeString);
}

stairState.resetButtonPress = function(thingy, pointer, isDown) {
	if (isDown === true) {
		game.state.start("Stairs");
	}
}