let epilogueState4 = function(){

}

epilogueState4.prototype.preload = function() {
	game.load.audio("creditSong", "assets/music/creditssong.wav");
	game.load.image("endcard", "assets/gnome_final.png");
}

epilogueState4.prototype.create = function() {
	game.sound.stopAll();
	let music = game.add.audio("creditSong");
	music.loopFull(0.6);
	music.play();

	let endcard = game.add.image(0, 0, "endcard");
	endcard.scale.setTo(1, 1);
	endcard.centerX = game.world.centerX;
	endcard.centerY = game.world.centerY;

}


epilogueState4.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		game.state.start("TitleScreen");
	}
}
