let stairtoStairState1 = function(){

}
stairtoStairState1.prototype.create = function() {
	let warning = game.add.text(200, 200, "Upstairs... Backwards...", {font:'40px Arial', align: "center", fill: '#FFFFFF'});
	game.add.tween(warning).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);

	warning.centerX = game.world.centerX;
	warning.centerY = game.world.centerY;
}


stairtoStairState1.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("Stairs2");
	}
}
