let stairtoStairState = function(){

}

stairtoStairState.prototype.preload = function() {
	game.load.audio("speedUp", "assets/music/speedup.wav");
}

stairtoStairState.prototype.create = function() {
	game.sound.stopAll();
	let music = game.add.audio("speedUp");
	music.loopFull(0.6);
	music.play();

	let warning = game.add.text(200, 200, "It was then that Tobi realized\nthat he had left his car keys in the bedroom...", {font:'40px Arial', align: "center", fill: '#FFFFFF'});
	game.add.tween(warning).to( { alpha: 0 }, 7000, Phaser.Easing.Linear.None, true);

	warning.centerX = game.world.centerX;
	warning.centerY = game.world.centerY;
}


stairtoStairState.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("StairstoStairScreen1");
	}
}
