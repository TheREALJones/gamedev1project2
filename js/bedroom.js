let bedroomState = function(){

}

bedroomState.prototype.preload = function(){
	game.load.image("bedroom", "assets/bedroom_no_bed.png");
	game.load.image("bed", "assets/bed.png");
	game.load.image("bedframe", "assets/bed_frame.png");
	game.load.image("buttonController", "assets/controllerButton2.png");
	game.load.audio("stairTheme", "assets/music/stairtheme1.wav");
	game.load.image('plrrha', 'assets/Toby Philpott Pieces/R_hand.png');
	game.load.image('plrrla', 'assets/Toby Philpott Pieces/R_lower_arm.png');
	game.load.image('plrrua', 'assets/Toby Philpott Pieces/R_upper_arm.png');
	game.load.image('plrlha', 'assets/Toby Philpott Pieces/L_hand.png');
	game.load.image('plrlla', 'assets/Toby Philpott Pieces/L_lower_arm.png');
	game.load.image('plrlua', 'assets/Toby Philpott Pieces/L_upper_arm.png');
	game.load.image('plrhip', 'assets/Toby Philpott Pieces/hips.png');
	game.load.image('plrtrs', 'assets/Toby Philpott Pieces/Torso.png');
	game.load.image('plrub', 'assets/Toby Philpott Pieces/Upper_Body.png');
	game.load.image('plrlth', 'assets/Toby Philpott Pieces/L_upper_thigh.png');
	game.load.image('plrlll', 'assets/Toby Philpott Pieces/L_lower_leg.png');
	game.load.image('plrlft', 'assets/Toby Philpott Pieces/L_foot.png');
	game.load.image('plrrth', 'assets/Toby Philpott Pieces/R_upper_thigh.png');
	game.load.image('plrrll', 'assets/Toby Philpott Pieces/R_lower_leg.png');
	game.load.image('plrrft', 'assets/Toby Philpott Pieces/R_foot.png');

	game.load.image("head", "assets/Toby Philpott Pieces/Eye_Open.png");
	game.load.spritesheet("button", "assets/button_strip9.png", 128, 128);

	game.load.audio("bedroomTheme", "assets/music/bedtheme1.wav");
}

bedroomState.prototype.create = function(){
	
	game.sound.stopAll();
	let music = game.add.audio("bedroomTheme");
	music.loopFull(0.6);
	music.play();

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.world.setBounds(0,0,1500,750);
	game.physics.p2.gravity.y = 1000;	
	game.add.sprite(0,0,"bedroom");
	game.add.sprite(0,180,"bed");
	
	
	//DECLARE PLAYER
	this.player = new Player(0,0);
    // attach pointer events
    game.input.onDown.add((pointer)=> {
		//Add any other drag selectors to this.
		let bodies = game.physics.p2.hitTest(pointer.position, [this.player.rArmButton,this.player.lArmButton,this.player.rLegButton,this.player.lLegButton]);
		
		// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
		let physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    
		if (bodies.length){
			this.player.clickedBody = bodies[0];
			
			let localPointInBody = [0, 0];
			// this function takes physicsPos and coverts it to the body's local coordinate system
			this.player.clickedBody.toLocalFrame(localPointInBody, physicsPos);
			// use a revoluteContraint to attach mouseBody to the clicked body
			this.player.mouseConstraint = game.physics.p2.createLockConstraint(this.player.mouseBody, this.player.clickedBody);
		}   
	});
    game.input.onUp.add(()=>{
		// remove constraint from object's body
		game.physics.p2.removeConstraint(this.player.mouseConstraint);
		this.player.clickedBody = 1;
	});
    game.input.addMoveCallback((pointer)=>{
		// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
		this.player.mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
		this.player.mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);
	});
	//END OF PLAYER

	
	game.add.sprite(-5,180,"bedframe");
	//terrainCollisionGroup = game.physics.p2.createCollisionGroup();

	
	bedroomState.addBedCollision(10, 610, 530, 750, terrainCollisionGroup, true);	
	bedroomState.addBedCollision(0, 745, 1344, 750, terrainCollisionGroup, true); 
	
	
	let styleText = {font:'20px Arial', align: "center", fill: '#FFFFFF'};
	let restartButton = game.add.button(0, 530, "buttonController",  bedroomState.resetButtonPress);
	restartButton.scale.setTo (0.5,0.5);

	let restartText = game.add.text(95, 580, "Restart", styleText);

	let timerBG = game.add.image(0,400, "buttonController");
	timerBG.scale.setTo (0.5,0.5);

	this.timerText = game.add.text(70, 450, "Time: ", styleText);
	this.startTime = game.time.totalElapsedSeconds();
}

bedroomState.addBedCollision = function(x1, y1, x2, y2, collisionGroup, debug=false) {
	let bedC = game.add.sprite(x1, y1, "");
	game.physics.p2.enable(bedC);
	bedC.body.setRectangle(x2 - x1, y2 - y1, (x2 - x1)/2, (y2-y1)/2);
	bedC.body.debug = debug;
	bedC.body.static = true;
	bedC.body.setCollisionGroup(collisionGroup);
	bedC.body.collides([playerCollisionGroup]);
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
	this.player.update();
}

bedroomState.resetButtonPress = function(thingy, pointer, isDown) {
	if (isDown === true) {
		game.state.start("Bedroom");
	}
}

/* bedroomState.endGame = function(){
	if(player.x === game.world.centerX){
	game.state.start("Bedroom");
	}
	 */

