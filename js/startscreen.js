let startState = function(){

}
startState.prototype.create = function() {
	let warning = game.add.text(200, 200, "This game is a work of ficton\ndeveloped by 5 incredibly tired college students.\nAny relation to any puppeteers real or imaginary\nis completely on you bud.", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8500, Phaser.Easing.Linear.None, true);

	warning.centerX = game.world.centerX;
	warning.centerY = game.world.centerY;
}



startState.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("TitleScreen");
	}
}
