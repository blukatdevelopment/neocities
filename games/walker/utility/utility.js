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


UTILITY.formatHealth = function(health){
    return Math.trunc(health/4);
}

UTILITY.formatDamage = function(damage){
    let sign = "-";
    let wholeNumber = Math.trunc(damage/4);
    if(wholeNumber < 0){
        wholeNumber *= -1;
    }
    let prefix = "" + wholeNumber;

    let remainder = damage % 4;
    if(remainder < 0){
        remainder *= -1;
    }
    
    let suffix = "";
    if(remainder == 1){
        suffix = ".25";
    }
    if(remainder == 2){
        suffix = ".5";
    }
    if(remainder == 3){
        suffix = ".75";
    }
    return sign + "" + prefix + "" + suffix;
}

// Print to screen for active scene when possible.
UTILITY.debugMessage = function(message){
    SCENE.debugMessage(message);
};
// Queue a notification when possible.
UTILITY.notification = function(message){
    SCENE.notification(message);
}

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
