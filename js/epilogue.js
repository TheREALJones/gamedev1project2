let epilogueState = function(){

}
epilogueState.prototype.create = function() {
	let warning = game.add.text(200, 200, "As Tobi reentered his room,\nhe realized that he didn't have car keys.", {font:'40px Arial', align: "center", fill: '#FFFFFF'});
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);

	warning.centerX = game.world.centerX;
	warning.centerY = game.world.centerY;
}


epilogueState.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("Epilogue1");
	}
}
