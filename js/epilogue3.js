let epilogueState3 = function(){

}
epilogueState3.prototype.create = function() {
	let warning = game.add.text(200, 200, "Operated by gnomes.", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}


epilogueState3.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		//game.state.start("Eplogue4");
	}
}
