let introState1 = function(){

}
introState1.prototype.create = function() {
	let warning = game.add.text(200, 200, "Or had he been a puppet the whole time?", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}


introState1.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("IntroScreen2");
	}
}
