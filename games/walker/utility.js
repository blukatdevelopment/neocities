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

var SHAPES = {};
SHAPES.RECT = {};
SHAPES.RECT.new = function(position, size){
    let rect = {
        position: position, // Top left corner
        size: size
    };
    rect.center = function(){
        return VECTOR2.new(
            rect.position.x + rect.size.x/2,
            rect.position.y + rect.size.y/2
        );
    };
    // Bottom Right corner
    rect.extents = function(){
        return VECTOR2.new(
            rect.position.x+rect.size.x,
            rect.position.y+rect.size.y
        );
    }
    rect.topRight = function(){
        return VECTOR2.new(
            rect.position.x+rect.size.x,
            rect.position.y
        );
    };
    rect.bottomLeft = function(){
        return VECTOR2.new(
            rect.position.x,
            rect.position.y+rect.size.y
        );
    };
    rect.contains = function(point){
        let pos = rect.position;
        let ext = rect.extents;
        if(point.x >= pos.x && point.x <= ext.x){
            if(point.y >= pos.y && point.y <= ext.y){
                return true;
            }
        }
        return false;
    };
    rect.overlaps = function(otherRect){
        if(rect.contains(otherRect.position)){
            return true; 
        }
        if(rect.contains(otherRect.extents())){
            return true;
        }
        if(rect.contains(otherRect.topRight())){
            return true;
        }
        if(rect.contains(otherRect.bottomLeft())){
            return true;
        }
        return false;
    };

    return rect;
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

UTILITY.getActorConfig = function(name){
    for(actor of SETTINGS.actorList){
        if(name == actor.name){
            return actor;
        }
    }
    return null;
}

// Physics

let PHYSICS = {};
PHYSICS.BoxCollider = {};
PHYSICS.BoxCollider.new = function(){
    let bc = {
        entity: null
    };
    return bc;
};

PHYSICS.Controller = {};
PHYSICS.Controller.new = function(){
    let ctl = {
        colliders: []
    };
    ctl.registerCollider = function(collider){

    };
    return ctl;
};