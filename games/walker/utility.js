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
    v2.distance = function(point){
        var a = v2.x - point.x;
        var b = v2.y - point.y;

        return Math.sqrt( a*a + b*b );
    }
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
    rect.topLeft = function(){
        return rect.position;
    };
    rect.bottomRight = function(){
        return rect.extents;
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
    rect.toString = function(){
        let ret = "Rect[";
        ret += rect.position.toString();
        ret += ", " + rect.size.toString();
        ret += "]";
        return ret;
    };

    return rect;
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

// Physics
let PHYSICS = {};


PHYSICS.Collision = {};
PHYSICS.Collision.new = function(first, second){
    let col = {
        first: first, // Collider initiating collision
        second: second // Collider
    };
    return col;
};

PHYSICS.BoxCollider = {};
PHYSICS.BoxCollider.new = function(){
    let bc = {
        parent: null,
        rigid: true,
        // rect is relative to parent entity
        rect: SHAPES.RECT.new(VECTOR2.new(0, 0), VECTOR2.new(0, 0)),
        controller: null
    };
    // Account for parent position
    bc.absoluteRect = function(){
        let pos = bc.rect.position;
        if(bc.parent){
            let ppos = bc.parent.getPosition();
            pos = VECTOR2.new(ppos.x+pos.x, ppos.z+pos.y);
        }
        let size = bc.rect.size;
        let rect = SHAPES.RECT.new(pos, size);
        return rect;
    };
    bc.contains = function(point){
        let rect = bc.absoluteRect();
        return rect.contains(point);
    };
    bc.overlaps = function(otherCollider){
        let rect = bc.absoluteRect();
        return otherCollider.contains(rect.topLeft()) || otherCollider.contains(rect.topRight()) || otherCollider.contains(rect.bottomLeft()) || otherCollider.contains(rect.bottomRight());
    };
    // Makes one check, assuming distance is less than scale
    bc.moveAndCollideShort = function(destination){
        if(bc.controller && bc.parent){
            let currentPosition = bc.rect.position;
            bc.rect.position = destination;
            let excludeList = [];
            excludeList.push(bc.parent.getEntityId());
            let ret = bc.controller.checkForCollision(excludeList, bc);
            bc.rect.position = currentPosition;
            return ret;
        }
        else{
            UTILITY.log("BoxCollider.moveAndCollide()", "BoxCollider not assigned to physics controller.", { controller: bc.controller == null, parent: bc.parent == null});
        }
    };
    bc.toString = function(){
        let parent = "null";
        if(bc.parent){
            parent = bc.parent.getName();
        }
        let ret = "BoxCollider[Parent: " + parent;
        ret += ", " + bc.absoluteRect().toString() + "]";
        return ret;
    };
    return bc;
};

PHYSICS.Controller = {};
PHYSICS.Controller.new = function(){
    let ctl = {
        colliders: []
    };
    ctl.registerCollider = function(collider){
        ctl.colliders.push(collider);
        collider.controller = ctl;
    };
    ctl.checkForCollision = function(excludeList, collider){
        //console.log("Exclude list" + JSON.stringify(excludeList));
        for(let cl of ctl.colliders){
            if(cl.parent && !excludeList.includes(cl.parent.getEntityId())){
                //console.log("Check for collision" + collider.toString());
                if(collider.overlaps(cl)){
                    return PHYSICS.Collision.new(collider, cl);
                }
                //console.log("No collision: " + collider.toString() + ", " + cl.toString());
            }
        }
        return null;
    };
    return ctl;
};