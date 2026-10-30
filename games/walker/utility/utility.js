/*##############################################################################
# Util
##############################################################################*/

UTILITY.clamp = function(value, min, max){
    if(value < min){
        return min;
    }
    if(value > max){
        return max;
    }
    return value;
}


UTILITY.Interaction = {};
UTILITY.Interaction.new = function(initiator){
    let interaction = {
        initiator: initiator
    };
    return interaction;
};

// Print to screen for active scene when possible.
UTILITY.debugMessage = function(message){
    SCENE.debugMessage(message);
};

// Console output wrapper
UTILITY.log = function(sender, message, context){
	if(SETTINGS._logLevel == 0){
		// Log level 0, do nothing
		return;
	}
	else if(SETTINGS._logLevel == 1){
		// Level 1: basic info
		console.log(`${sender}, ${message}`);
	}
	else{
		// Level 2+: include context
		let contextString = JSON.stringify(context);
		console.log(`${sender}, ${message}, ${contextString}`);
	}
}

// Returns the number of frames that have passed since the last scene update cycle
UTILITY.framesAdvanced = function(){
	return MAIN.FRAMES_TO_ADVANCE;
}

UTILITY.getNextEntityId = function(){
    let id = MAIN.nextEntityId;
    MAIN.nextEntityId++;
    return id;
}

UTILITY.getActorConfig = function(name){
    for(actor of SETTINGS.actorList){
        if(name == actor.name){
            return actor;
        }
    }
    return null;
}

UTILITY.delayExecute = function(frames, funct){
    let execution = {
        frames: frames,
        onExecute: funct
    };
    MAIN.DELAYED_EXECUTIONS.push(execution);
};
