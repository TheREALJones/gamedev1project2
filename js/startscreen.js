let startState = function(){

}
startState.prototype.create = function() {
	let warning = game.add.text(200, 200, "This game is a work of ficton\n\ndeveloped by 5 incredibly tired college students.\n\nAny relation to any puppeteers real or imaginary\n\nis completely on you bud.", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}



startState.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("TitleScreen");
	}
}
