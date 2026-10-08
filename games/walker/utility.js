/*##############################################################################
# Util
##############################################################################*/
var UTILITY = {}
UTILITY.randRange = function(min, max){
  return Math.random() * (max - min) + min;
}

UTILITY.isInsideBox = function(topLeft, bottomRight, point){
  var inX = point.x < bottomRight.x && point.x > topLeft.x;
  var inY = point.y < bottomRight.y && point.y > topLeft.y;
  return inX && inY;
}

var VECTOR2 = {};
VECTOR2.new = function(x, y){
    let v2 = {
        x: x,
        y: y
    };
    v2.toString = function(){
        return "{" + v2.x + ", " + v2.y + "}";
    };
    return v2;
};
var VECTOR3 = {};
VECTOR3.new = function(x, y, z){
    let v3 = {
        x: x,
        y: y,
        z: z
    };
    v3.toString = function(){
        return "{" + v3.x + ", " + v3.y + ", " + v3.z + "}";
    };
    return v3;
};


// Output wrapper
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


UTILITY.Event = {};
UTILITY.Event.new = function(eventType, entityID, event, context){
  let evt = {
    age: 0,
    eventId: UTILITY.getNextEventId(),
    eventType: eventType,
    entityID: entityID,
    event: event,
    context: context
  };
  return evt;
}

// Removes events from two loops
UTILITY.prune_events = function(){
  let prune_list = [];
  for(let event of MAIN.EVENT_BUS){
    event.age++;
    if(event.age > 2){
      prune_list.push(event.eventId);
    }
  }
  for(let i in prune_list){
    UTILITY.prune_event(prune_list[i].eventId);
  }
}

UTILITY.prune_event = function(eventId){
  let index = -1;
  for(let i = 0; i < MAIN.EVENT_BUS.length; i++){
    if(MAIN.EVENT_BUS[i].eventId == eventId){
      index = i;
    }
  }
  if(index != -1){
    MAIN.EVENT_BUS.splice(index, 1);
  }
}

// Return events from previous frame.
UTILITY.getEvents = function(){
    let events = [];
    for(i in MAIN.EVENT_BUS){
        if(MAIN.EVENT_BUS[i].age == 1){
            events.push(MAIN.EVENT_BUS[i]);
        }
    }
    return events;
};

// Filters the events by the entity ID
UTILITY.getEventsByEntity = function(entityId){
    let unfiltered = UTILITY.getEvents();
    if(entityId){
        let filtered = [];
        for(let i in unfiltered){
            if(unfiltered[i].entityId == entityId){
                filtered.push(unfiltered[i]);
            }

        }
        return filtered;
    }
    return [];

};

UTILITY.getNextEventId = function(){
    let id = MAIN.nextEventId;
    MAIN.nextEventId++;
    return id;
}

UTILITY.addEvent = function(eventType, entityId, eventType, context){
    let event = UTILITY.Event.new(eventType, entityId, eventType, context);
    MAIN.EVENT_BUS.push(event);
}

UTILITY.addActorEvent = function(entityId, eventType, context){
    UTILITY.addEvent(EVENT_TYPES.actor, entityId, eventType, context);
}

UTILITY.getActorConfig = function(name){
    for(actor of SETTINGS.actorList){
        if(name == actor.name){
            return actor;
        }
    }
    return null;
}