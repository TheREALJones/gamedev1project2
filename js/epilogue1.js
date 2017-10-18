let epilogueState1 = function(){

}
epilogueState1.prototype.create = function() {
	let warning = game.add.text(200, 200, "Or a car.", {font:'40px Arial', align: "center", fill: '#FFFFFF'});
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);

	warning.centerX = game.world.centerX;
	warning.centerY = game.world.centerY;
}


epilogueState1.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("Eplogue2");
	}
}
