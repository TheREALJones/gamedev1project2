let introState2 = function(){

}
introState2.prototype.create = function() {
	let warning = game.add.text(200, 200, "Either way, Tobi found it especially hard to get out of bed,\nand he really had to get to work.", {font:'40px Arial', align: "center", fill: '#FFFFFF'});
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);

	warning.centerX = game.world.centerX;
	warning.centerY = game.world.centerY;
}


introState2.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("Bedroom");
	}
}
