let testState = function() {
	
}

testState.prototype.preload = function() {
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
	
	
	game.load.image("stairs", "assets/stairs.png");
	game.load.image("head", "assets/Toby Philpott Pieces/Eye_Open.png");
	game.load.spritesheet("button", "assets/button_strip9.png", 128, 128);
}	

let playerCollisionGroup;
let terrainCollisionGroup;
let controlsCollisionGroup;

/* let upperbody;
let hips;

let leftHipJoint;
let leftKneeJoint;
let rightHipJoint;
let rightKneeJoint;
let leftShoulderJoint;
let leftElbowJoint;
let rightShoulderJoint;
let rightElbowJoint;

let qKey;
let wKey;
let oKey;
let pKey;
let eKey;
let rKey;
let uKey;
let iKey;
let dKey;
let fKey;

let rArmButton;
let lArmButton;
let rLegButton;
let lLegButton;
let mouseBody;
let mouseConstraint;

let clickedBody = 1; */

testState.prototype.create = function() {
	
	
	this.player = new Player(0,0);
	
	
	
	
	/* qKey = game.input.keyboard.addKey(Phaser.KeyCode.Q);
	wKey = game.input.keyboard.addKey(Phaser.KeyCode.W);
	oKey = game.input.keyboard.addKey(Phaser.KeyCode.O);
	pKey = game.input.keyboard.addKey(Phaser.KeyCode.P);
	eKey = game.input.keyboard.addKey(Phaser.KeyCode.E);
	rKey = game.input.keyboard.addKey(Phaser.KeyCode.R);
	uKey = game.input.keyboard.addKey(Phaser.KeyCode.U);
	iKey = game.input.keyboard.addKey(Phaser.KeyCode.I);
	dKey = game.input.keyboard.addKey(Phaser.KeyCode.D);
	fKey = game.input.keyboard.addKey(Phaser.KeyCode.F); */
	
	// Drag code	
	
	
	
	
        
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
}

testState.prototype.click = function(pointer) {

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

}

testState.prototype.move = function(pointer) {

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    this.player.mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    this.player.mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

}


testState.prototype.release = function(){

    // remove constraint from object's body
    game.physics.p2.removeConstraint(this.player.mouseConstraint);
	this.player.clickedBody = 1;
}

testState.setupPlayer = function() {
	
}

// let leftKneeAngle = 0;
// let leftThighAngle = 0;
// let rightThighAngle = 0;
// let rightKneeAngle = 0;
// let leftShoulderAngle = 0;
// let leftElbowAngle = 0;
// let rightShoulderAngle = 0;
// let rightElbowAngle = 0;
// let rArmSelectConstraint = 1;
// let lArmSelectConstraint = 1;
// let rLegSelectConstraint = 1;
// let lLegSelectConstraint = 1;

testState.prototype.update = function() {
	this.player.update();
}


	
