/*##############################################################################
# Agents
# Code that determines actor behavior
##############################################################################*/
var AGENT = {};

AGENT.PLAYER_ONE = {};
AGENT.PLAYER_ONE.new = function(actor){
	var pone = {
		actor: actor
	};

	pone.update = function (){
		let atr = pone.actor;
		let aId = atr.entityId;
		let speed = pone.actor.speed;
		let x_movement = 0;
	    let y_movement = 0;
	    // Key inputs weighted by speed
	    let k_w = INPUT.key(INPUT.KEYS.K_W) ? speed : 0;
	    let k_s = INPUT.key(INPUT.KEYS.K_S) ? speed : 0;
	    let k_a = INPUT.key(INPUT.KEYS.K_A) ? speed : 0;
	    let k_d = INPUT.key(INPUT.KEYS.K_D) ? speed : 0;

	    // Net inputs
	    let x = k_d - k_a;
	    let z = k_w - k_s; // Invert

	    if(x == 0 && z == 0){
	    	if(atr.moving){
	    		atr.moving = false;	
	    	}
	    	
	    }
	    else{
	    	UTILITY.addActorEvent(aId, EVENTS.move);
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
	};
	return pone;
}