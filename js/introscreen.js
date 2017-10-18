let introState = function(){

}
introState.prototype.create = function() {
	let warning = game.add.text(200, 200, "One morning, Tobi Philpot, famous puppeteer, woke up\nand realized that he had become a puppet", {font:'40px Arial', align: "center", fill: '#FFFFFF'})
	game.add.tween(warning).to( { alpha: 0 }, 8000, Phaser.Easing.Linear.None, true);
}


introState.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("IntroScreen1");
	}
}
