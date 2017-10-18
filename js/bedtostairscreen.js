let bedtoStairState = function(){

}
bedtoStairState.prototype.create = function() {
	let warning = game.add.text(200, 200, "All Tobi had to do was get down the stairs\nand into his car.", {font:'40px Arial', align: "center", fill: '#FFFFFF'});
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}


bedtoStairState.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("Stairs");
	}
}
