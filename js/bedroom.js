let bedroomState = function(){

}

bedroomState.prototype.preload = function(){
	game.load.image("bedroom", "assets/bedroom_no_bed.png");
	game.load.image("head", "assets/Eye_Open.png")
	game.load.image("bed", "assets/bed.png");
	game.load.image("bedframe", "assets/bed_frame.png");
}

bedroomState.prototype.create = function(){
	
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 1000;	
	game.add.sprite(0,0,"bedroom");
	game.add.sprite(0,180,"bed");
	
	head = game.add.sprite(game.world.centerX, game.world.centerY, "head",bedroomState.endGame);
	head.scale.setTo(0.5,0.5);
	game.physics.p2.enable(head, true);
	
	game.add.sprite(0,180,"bedframe");
	
	this.terrainCollisionGroup = game.physics.p2.createCollisionGroup();

	
	bedroomState.addBedCollision(10, 610, 530, 750, this.terrainCollisionGroup, true);	
	
	let restartButton = game.add.button(1200, 40, "f",  bedroomState.resetButtonPress);
	
	let rectangle = game.add.graphics();
	restartButton.addChild(rectangle);
	rectangle.beginFill(0xFFFFFF);
	rectangle.drawRect(0, 0, 120, 40);
	rectangle.centerX = restartButton.width/2;
	rectangle.centerY = restartButton.height/2;
	
	let restartText = game.add.text(0, 0, "Restart");
	rectangle.addChild(restartText);
	restartText.centerX = rectangle.width/2;
	restartText.centerY = rectangle.height/2;

	this.timerText = game.add.text(50, 40, "Time: ");
	this.startTime = game.time.totalElapsedSeconds();
	
	// create physics body for mouse which we will use for dragging clicked bodies
    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);
        
    // attach pointer events
    game.input.onDown.add(this.click);
    game.input.onUp.add(this.release);
    game.input.addMoveCallback(this.move);

}

bedroomState.addBedCollision = function(x1, y1, x2, y2, collisionGroup, debug=false) {
	let bedC = game.add.sprite(x1, y1, "");
	game.physics.p2.enable(bedC);
	bedC.body.setRectangle(x2 - x1, y2 - y1, (x2 - x1)/2, (y2-y1)/2);
	bedC.body.debug = debug;
	bedC.body.static = true;
	bedC.body.setCollisionGroup(collisionGroup);
}

bedroomState.prototype.click = function(pointer) {

    let bodies = game.physics.p2.hitTest(pointer.position, [head]);
    
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    let physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
    if (bodies.length){
        let clickedBody = bodies[0];
        
        let localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);
        
        // use a revoluteContraint to attach mouseBody to the clicked body
        mouseConstraint = game.physics.p2.createRevoluteConstraint(mouseBody, [0, 0], clickedBody, [game.physics.p2.mpxi(localPointInBody[0]), game.physics.p2.mpxi(localPointInBody[1]) ]);
    }   

}

bedroomState.prototype.move = function(pointer) {

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

}


bedroomState.prototype.release = function(){

    // remove constraint from object's body
    game.physics.p2.removeConstraint(mouseConstraint);
}

bedroomState.prototype.update = function() {
	let elapsedTime = game.math.roundTo((game.time.totalElapsedSeconds() - this.startTime), -2);
	let timeString = "Time: " + elapsedTime;
	this.timerText.setText(timeString);
}

bedroomState.resetButtonPress = function(thingy, pointer, isDown) {
	if (isDown === true) {
		game.state.start("Bedroom");
	}
}

bedroomState.endGame = function(){

	
}
