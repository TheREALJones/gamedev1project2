let titleState = function() {

}

titleState.prototype.preload = function() {
	game.load.image("title", "assets/Toby Philpott manipulated.png");
}

titleState.prototype.create = function() {
	let title = game.add.image(0, 0, "title");
	title.scale.setTo(750/1025, 750/1025);
	title.centerX = game.world.centerX;
	title.centerY = game.world.centerY;
	
	let startButton = game.add.button(450, 40, "f",  titleState.buttonPressed);
	
	let rectangle = game.add.graphics();
	startButton.addChild(rectangle);
	rectangle.beginFill(0xFFFFFF);
	rectangle.drawRect(0, 0, 100, 40);
	rectangle.centerX = startButton.width/2;
	rectangle.centerY = startButton.height/2;
	
	let startText = game.add.text(0, 0, "Start");
	rectangle.addChild(startText);
	startText.centerX = rectangle.width/2;
	startText.centerY = rectangle.height/2;
	
	let debugButton = game.add.button(450, 90, "f",  titleState.debugPressed);
	rectangle = game.add.graphics();
	debugButton.addChild(rectangle);
	rectangle.beginFill(0xEEEEEE);
	rectangle.drawRect(0, 0, 100, 40);
	rectangle.centerX = debugButton.width/2;
	rectangle.centerY = debugButton.height/2;
	
	let debugText = game.add.text(0, 0, "Test");
	rectangle.addChild(debugText);
	startText.centerX = rectangle.width/2;
	startText.centerY = rectangle.height/2;
	
	let dragButton = game.add.button(450, 140, "f",  titleState.dragPressed);
	rectangle = game.add.graphics();
	dragButton.addChild(rectangle);
	rectangle.beginFill(0xEEEEEE);
	rectangle.drawRect(0, 0, 100, 40);
	rectangle.centerX = dragButton.width/2;
	rectangle.centerY = dragButton.height/2;
	
	let dragText = game.add.text(0, 0, "Drag Test");
	rectangle.addChild(dragText);
	startText.centerX = rectangle.width/2;
	startText.centerY = rectangle.height/2;
}

titleState.prototype.update = function() {
	
}

titleState.buttonPressed = function(thingy, pointer, isOver) {
	if (isOver === true) {
		game.state.start("Stairs");
	}
}

titleState.debugPressed = function(thingy, pointer, isOver) {
	if (isOver === true) {
		game.state.start("PhysicsTest");
	}
}

titleState.dragPressed = function(thingy, pointer, isOver) {
	if (isOver === true) {
		game.state.start("DragTest");
	}
}