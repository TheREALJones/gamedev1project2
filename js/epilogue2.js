let epilogueState2 = function(){

}
epilogueState2.prototype.create = function() {
	let warning = game.add.text(200, 200, "Because he was a puppet.", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}


epilogueState2.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("Eplogue3");
	}
}
