/*##############################################################################
# Agentss
# Code that controls actors
##############################################################################*/
var Agents = {};

Agents.PLAYER_ONE = function(actor){
	var pone = {
		actor: actor
	};

	pone.move = function (){
		let atr = pone.actor;
		let x_movement = 0;
	    let y_movement = 0;
	    if(INPUT.key(INPUT.KEYS.K_W)){
	      y_movement -= atr.speed;
	    }
	    if(INPUT.key(INPUT.KEYS.K_S)){
	      y_movement += atr.speed;
	    }
	    if(INPUT.key(INPUT.KEYS.K_A)){
	      x_movement -= atr.speed;
	    }
	    if(INPUT.key(INPUT.KEYS.K_D)){
	      x_movement += atr.speed;
	    }
	    atr.x += x_movement;
	    atr.y += y_movement;
	    if(x_movement == 0 && y_movement == 0){
	      atr.spriteManager.event(Actor.EVENTS.STOP);
	    }
	    else{
	      atr.spriteManager.event(Actor.EVENTS.MOVE);
	    }
	    if(x_movement > 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_EAST);
	    }
	    else if(x_movement < 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_WEST);
	    }
	    if(y_movement > 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_SOUTH);
	    }
	    else if(y_movement < 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_NORTH);
	    }

	};
	return pone;
}

Agents.ENEMY = function(actor){
	var enemy = {
		actor: actor
	};

	enemy.move = function (){
		let atr = enemy.actor;
		
		let x_movement = 0;
	    let y_movement = 0;
	    if(GAME.walker){
	    	let wkr = GAME.walker;
	    	if(atr.x < wkr.x){
	    		x_movement = 1;
	    	}
	    	else if(atr.x > wkr.x){
	    		x_movement = -1;
	    	}
	    	if(atr.y < wkr.y){
	    		y_movement = 1;
	    	}
	    	else if(atr.y > wkr.y){
	    		y_movement = -1;
	    	}
	    }

	    if(x_movement == 0 && y_movement == 0){
	      atr.spriteManager.event(Actor.EVENTS.STOP);
	    }
	    else{
	      atr.spriteManager.event(Actor.EVENTS.MOVE);
	    }
	    if(x_movement > 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_EAST);
	    }
	    else if(x_movement < 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_WEST);
	    }
	    if(y_movement > 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_SOUTH);
	    }
	    else if(y_movement < 0){
	      atr.spriteManager.event(Actor.EVENTS.FACE_NORTH);
	    }


	    atr.x += atr.speed * 0.5 * x_movement;
	    atr.y += atr.speed * 0.5 * y_movement;
	};
	return enemy;
}