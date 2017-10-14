let stairState = function() {
	
}

stairState.prototype.preload = function() {
	game.load.image("stairs", "assets/stairs.png");
}

stairState.prototype.create = function() {
	game.add.image(0, 0, "stairs");
	
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

stairState.prototype.update = function() {
	let elapsedTime = (game.time.totalElapsedSeconds() - this.startTime);
	let timeString = "Time: " + elapsedTime;
	this.timerText.setText(timeString);
}

stairState.resetButtonPress = function(thingy, pointer, isDown) {
	if (isDown === true) {
		game.state.start("Stairs");
	}
}