/*##############################################################################
# Agents
# Code that determines actor behavior
##############################################################################*/
AGENT.PLAYER_ONE = {};
AGENT.PLAYER_ONE.new = function(actor){
	var pone = {
		actor: actor,
		keyPresses: {}
	};
	for(let i in KEY_PRESSES_USED){
    	let key = KEY_PRESSES_USED[i];
    	pone.keyPresses[key] = false;
  	}

	pone.update = function (){
		// TODO: move code currently in GAME.mouseDown here to break tight coupling
		let atr = pone.actor;
		let aId = atr.entityId;
		if(INPUT.key(INPUT.KEYS.K_LEFT_SHIFT)){
			atr.sprint();
		}
		let x_movement = 0;
	    let y_movement = 0;
	    let k_w = INPUT.key(INPUT.KEYS.K_W) ? 1 : 0;
	    let k_s = INPUT.key(INPUT.KEYS.K_S) ? 1 : 0;
	    let k_a = INPUT.key(INPUT.KEYS.K_A) ? 1 : 0;
	    let k_d = INPUT.key(INPUT.KEYS.K_D) ? 1 : 0;

	    // Net inputs
	    let x = k_d - k_a;
	    let z = k_w - k_s; // Invert

	    if(x == 0 && z == 0){
	    	if(atr.moving){
	    		atr.moving = false;	
	    	}
	    }
	    else{
	    	if(x < 0){
	    		atr.move(DIRECTIONS.west);
	    	}
	    	else if(x > 0){
	    		atr.move(DIRECTIONS.east);
	    	}
	    	if(z < 0){
	    		atr.move(DIRECTIONS.south);
	    	}
	    	else if(z > 0){
	    		atr.move(DIRECTIONS.north);
	    	}
	    }
	    let inRange = atr.cursorInRange();
	    if(INPUT.keyPress(INPUT.KEYS.K_M)){
	    	SCENE.setActiveScene(SCENE.SCENES.WORLDMAP);
	    }
	    if(INPUT.keyPress(INPUT.KEYS.K_SPACE) || (inRange && INPUT.mouseClick(INPUT.LEFT_CLICK))){
    		atr.attack();	    	
	    }
	    if(INPUT.keyPress(INPUT.KEYS.K_E)){
    		atr.interact();	    	
	    }
	    if(inRange && INPUT.mouseClick(INPUT.RIGHT_CLICK)){
	    	let point = INPUT.getMousePosition();
	    	point.x = GRAPHICS.downScale(point.x);
    		point.y = GRAPHICS.downScale(point.y);
	    	let worldPoint = GRAPHICS.getWorldPoint(point);
	    	atr.interactAtPoint(worldPoint);
	    }
	};
	return pone;
};

// Randomly wanders and pauses
AGENT.SIMPLE_ENEMY = {};
AGENT.SIMPLE_ENEMY.new = function(actor){
	let se = {
		nextDirectionChange: Date.now(),
		direction: DIRECTIONS.none,
		actor: actor
	};
	se.direction = UTILITY.randRange(DIRECTIONS.none, DIRECTIONS.east);
	se.nextDirectionChange = Date.now() + (1000 * UTILITY.randRange(1, 3)); 
	se.update = function(){
		if(Date.now() > se.nextDirectionChange){
			se.direction = UTILITY.randRange(DIRECTIONS.north, DIRECTIONS.east);
			se.nextDirectionChange = Date.now() + (1000 * UTILITY.randRange(1, 5));
		}
		if(se.direction != DIRECTIONS.none){
			se.actor.move(se.direction);
		}
	};
	return se;
};
