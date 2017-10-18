let stairState = function() {

}

stairState.prototype.preload = function() {
	game.load.image("stairs", "assets/stairs.png");
	game.load.image("buttonController", "assets/controllerButton2.png");
	game.load.audio("stairTheme", "assets/music/stairtheme1.wav");
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

	this.terrainCollisionGroup = game.physics.p2.createCollisionGroup();

	stairState.addStep(0, 358, 283, 750, this.terrainCollisionGroup);
	stairState.addStep(283, 411, 377, 750, this.terrainCollisionGroup);
	stairState.addStep(377, 464, 471, 750, this.terrainCollisionGroup);
	stairState.addStep(471, 518, 565, 750, this.terrainCollisionGroup);
	stairState.addStep(565, 571, 660, 750, this.terrainCollisionGroup);
	stairState.addStep(660, 625, 1150, 750, this.terrainCollisionGroup);
	stairState.addStep(1150, 679, 1245, 750, this.terrainCollisionGroup);
	stairState.addStep(1245, 732, 1334, 750, this.terrainCollisionGroup);

	let restartButton = game.add.button(1130, 0, "buttonController",  stairState.resetButtonPress);
	restartButton.scale.setTo (0.4,0.4);

	let restartText = game.add.text(1200, 40, "Restart", {font:'20px Arial', align: "center", fill: '#FFFFFF'});

	this.timerText = game.add.text(50, 40, "Time: ");
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
