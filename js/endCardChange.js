let goodEndState = function() {

}

goodEndState.prototype.preload = function() {
    game.load.image('endCardBg', 'assets/gnome_nognomes.png');
    game.load.image('uiBottom', 'assets/uiBottom.png');
    game.load.spritesheet('ui', 'assets/ui_strip6.png',172,128,6);
    game.load.spritesheet('topGnome', 'assets/topGnome_strip11.png',155,193,11);
    game.load.spritesheet('bottomGnome', 'assets/gnomeBottom_strip7.png',170,151,7);
}

let endCard;

goodEndState.prototype.create = function() {

    let endCard = game.add.image(0,0, 'endCardBg');

    let uiSprite = game.add.sprite (595,93, 'ui');
    uiSprite.alpha = 0.2;
    let walk = uiSprite.animations.add('walk');
    uiSprite.animations.play('walk',10,true);

    let topGnomeSprite = game.add.sprite(520,85,'topGnome');
    walk = topGnomeSprite.animations.add('walk');
    topGnomeSprite.animations.play('walk',5,true);

    let bottomGnomeSprite = game.add.sprite(562,455,'bottomGnome');
    walk = bottomGnomeSprite.animations.add('walk');
    bottomGnomeSprite.animations.play ('walk',5,true);

    let uiBottomGraphic = game.add.image(562,504, 'uiBottom');
    uiBottomGraphic.alpha = 0.3;
}

endState.prototype.update = function() {

}
