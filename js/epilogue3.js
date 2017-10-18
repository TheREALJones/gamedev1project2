let epilogueState3 = function(){

}
epilogueState3.prototype.create = function() {
	let warning = game.add.text(200, 200, "...operated by gnomes.", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);
	warning.centerX = game.world.centerX;
	warning.centerY = game.world.centerY;
}


epilogueState3.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		//game.state.start("Eplogue4");
	}
}
