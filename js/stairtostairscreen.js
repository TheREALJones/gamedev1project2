let stairtoStairState = function(){

}
stairtoStairState.prototype.create = function() {
	let warning = game.add.text(200, 200, "It was then that Tobi realized\nthat he had left his car keys in his bedroom.", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}


stairtoStairState.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("StairstoStairScreen1");
	}
}
