let stairtoStairState1 = function(){

}
stairtoStairState1.prototype.create = function() {
	let warning = game.add.text(200, 200, "Upstairs...", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}


stairtoStairState1.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		//game.state.start("Stairs2");
	}
}
