let gameplayState = function(){

}

gameplayState.prototype.preload = function(){

}

let mouseBody;
let mouseConstraint;

gameplayState.prototype.create = function(){
	
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 1000;
	
	game.add.sprite(0,0,"stairs");

	head = game.add.sprite(game.world.centerX, game.world.centerY, "head");
	head.scale.setTo(0.5,0.5);

	game.physics.p2.enable(head, false);

	// create physics body for mouse which we will use for dragging clicked bodies
    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);
        
    // attach pointer events
    game.input.onDown.add(this.click);
    game.input.onUp.add(this.release);
    game.input.addMoveCallback(this.move);

}

gameplayState.prototype.click = function(pointer) {

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

gameplayState.prototype.release = function(){

    // remove constraint from object's body
    game.physics.p2.removeConstraint(mouseConstraint);

}

gameplayState.prototype.move = function(pointer) {

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

}

gameplayState.prototype.update = function(){

}

gameplayState.prototype.render = function(){

}


