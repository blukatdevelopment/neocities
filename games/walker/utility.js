/*##############################################################################
# Util
##############################################################################*/
var UTILITY = {}

UTILITY.StopWatch = {};
UTILITY.StopWatch.new = function(){
    let sw = {
        startTime: null,
        endTime: null,
        secondsElapsed: null
    };
    sw.start = function(){
        sw.startTime = Date.now();
    };
    sw.stop = function(){
        sw.endTime = Date.now();
        sw.secondsElapsed = (sw.endTime - sw.startTime)/1000;
        return sw.secondsElapsed;
    };
    return sw;
};

UTILITY.randRange = function(min, max){
  return Math.round(Math.random() * (max - min) + min);
};

UTILITY.d6 = function(){
    return UTILITY.randRange(1, 6);
};

UTILITY.d20 = function(){
    return UTILITY.randRange(1, 6);
};

// 1 in <size> chance. Returns true on a success
UTILITY.chance = function(size){
    let roll = UTILITY.randRange(1, size);
    return roll == size;
};

UTILITY.choice = function(optionsList){
  return optionsList[UTILITY.randRange(0, optionsList.length-1)];
};

UTILITY.isInsideBox = function(topLeft, bottomRight, point){
  var inX = point.x < bottomRight.x && point.x > topLeft.x;
  var inY = point.y < bottomRight.y && point.y > topLeft.y;
  return inX && inY;
};

UTILITY.clamp = function(value, min, max){
    if(value < min){
        return min;
    }
    if(value > max){
        return max;
    }
    return value;
}

var VECTOR2 = {};
VECTOR2.new = function(x, y){
    let v2 = {
        x: x,
        y: y
    };
    v2.equals = function(other){
        return v2.x == other.x && v2.y == other.y;
    };
    v2.distance = function(point){
        var a = v2.x - point.x;
        var b = v2.y - point.y;

        return Math.sqrt( a*a + b*b );
    }
    v2.add = function(otherVector){
        return VECTOR2.new(v2.x + otherVector.x, v2.y + otherVector.y);
    };
    v2.multiply = function(otherVector){
        return VECTOR2.new(v2.x * otherVector.x, v2.y * otherVector.y);
    }
    v2.toString = function(){
        return "{" + v2.x + ", " + v2.y + "}";
    };
    v2.move = function(direction, magnitude){
        let ret = VECTOR2.new(v2.x, v2.y);
        switch(direction){
          case DIRECTIONS.north:
            ret.y -= magnitude;
          break;
          case DIRECTIONS.south:
            ret.y += magnitude;
          break;
          case DIRECTIONS.east:
            ret.x += magnitude;
          break;
          case DIRECTIONS.west:
            ret.x -= magnitude;
          break;
        }
        return ret;
    };
    v2.clone = function(){
        return VECTOR2.new(v2.x, v2.y);
    };
    return v2;
};
VECTOR2.vectorFromDirection = function(direction){
    switch(direction){
        case DIRECTIONS.none:
            return VECTOR2.new(0, 0);
        break;
        case DIRECTIONS.north:
            return VECTOR2.north();
        break;
        case DIRECTIONS.south:
            return VECTOR2.south();
        break;
        case DIRECTIONS.east:
            return VECTOR2.east();
        break;
        case DIRECTIONS.west:
            return VECTOR2.west();
        break;
    }
};
VECTOR2.north = function(){ return VECTOR2.new(0, 1); };
VECTOR2.south = function(){ return VECTOR2.new(0, -1); };
VECTOR2.east = function(){ return VECTOR2.new(1, 0); };
VECTOR2.west = function(){ return VECTOR2.new(-1, 0); };
VECTOR2.northWest = function(){ return VECTOR2.new(-1, 1); };
VECTOR2.northEast = function(){ return VECTOR2.new(1, 1); };
VECTOR2.southWest = function(){ return VECTOR2.new(-1, -1); };
VECTOR2.southEast = function(){ return VECTOR2.new(1, -1); };

UTILITY.Interaction = {};
UTILITY.Interaction.new = function(initiator){
    let interaction = {
        initiator: initiator
    };
    return interaction;
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
    };
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
        return rect.extents();
    };
    rect.bottomLeft = function(){
        return VECTOR2.new(
            rect.position.x,
            rect.position.y+rect.size.y
        );
    };
    // Returns polygonal points
    rect.getPoints = function(){
        let points = [
            rect.topLeft(),
            rect.topRight(),
            rect.bottomLeft(),
            rect.bottomRight()
        ];
        return points;
    };
    rect.contains = function(point){
        let tl = rect.topLeft();
        let br = rect.bottomRight();
        if(point.x >= tl.x && point.x <= br.x){
            if(point.y >= tl.y  && point.y <= br.y){
                return true;
            }
        }
        return false;
    };
    rect.isInside = function(otherRect){
        return otherRect.contains(rect.topLeft()) &&
            otherRect.contains(rect.topRight()) &&
            otherRect.contains(rect.bottomLeft()) &&
            otherRect.contains(rect.bottomRight());
    };
    rect.overlaps = function(otherRect){
        let largest = rect;
        let smallest = otherRect;
        if(otherRect.size.x * otherRect.size.y > rect.size.x * rect.size.y){
            largest = otherRect;
            smallest = rect;
        }

        let points = smallest.getPoints();
        for(let point of points){
            if(largest.contains(point)){                
                return true;
            }
        }
        return false;
    };
    rect.recenter = function(point){
        let halfSize = VECTOR2.new(rect.size.x/2, rect.size.y/2);
        rect.position = VECTOR2.new(point.x-halfSize.x, point.y-halfSize.y);
    };
    rect.toString = function(){
        let ret = "Rect[";
        ret += rect.position.toString();
        ret += ", " + rect.size.toString();
        ret += "]";
        return ret;
    };
    rect.clone = function(){
        return SHAPES.RECT.new(rect.position.clone(), rect.size.clone());
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
    col.toString = function(){
        let ret = "Collision[";
        ret += col.first.toString();
        ret += ", " + col.second.toString();
        ret += "]";
        return ret;
    };
    return col;
};

// Assuming only box colliders will exist.
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
            pos = VECTOR2.new(ppos.x+pos.x, ppos.y+pos.y);
        }
        let size = bc.rect.size;
        let rect = SHAPES.RECT.new(pos, size);
        return rect;
    };
    bc.contains = function(point){
        let rect = bc.absoluteRect();
        return rect.contains(point);
    };
    bc.isInside = function(otherRect){
        let rect = bc.absoluteRect();
        return rect.isInside(otherRect);
    };
    // Assumes another box collider
    bc.overlaps = function(otherCollider){
        let rect = bc.absoluteRect();
        let otherRect = otherCollider.absoluteRect();
        return otherRect.overlaps(rect);    
    };
    // Check if collider would remain within the level if moved
    bc.boundsCheck = function(destination){
        let levelRect = SCENE.getLevelRect();
        if(levelRect == null){
            return true;
        }
        let rect = bc.absoluteRect();
        rect.position = destination;
        return rect.isInside(levelRect);
    };
    // Makes one check, assuming distance is less than scale
    bc.moveAndCollideShort = function(destination, suppressCollisionEvents){
        if(bc.controller == null || bc.parent == null){
            UTILITY.log("BoxCollider.moveAndCollide()", "BoxCollider not assigned to physics controller.", { controller: bc.controller == null, parent: bc.parent == null});
            return null;
        }
        if(!bc.boundsCheck(destination)){
            // Don't move out of bounds.
            return null;
        }
        let previous = bc.parent.getPosition();
        bc.parent.setPosition(VECTOR2.new(destination.x, destination.y));
        let excludeList = [];
        excludeList.push(bc.parent.getEntityId());
        let ret = bc.controller.checkForCollision(excludeList, bc);
        if(suppressCollisionEvents){
            return ret;
        }
        if(ret){
            if(ret.second.rigid){
                //revert upon collision with rigid collider
                bc.parent.setPosition(previous);
                
            }
            // Emit collision events
            bc.parent.onCollide(ret);
            if(ret.second && ret.second.parent){
                ret.second.parent.onCollide(ret);
            }
            return ret;
        }
        return null;
    };
    bc.resize = function(updatedSize){
        bc.rect.size = updatedSize;
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
        colliders: [],
        rigidColliders: [],
        collisionGrid: null
    };
    ctl.registerCollider = function(collider){
        ctl.colliders.push(collider);
        collider.controller = ctl;
    };
    ctl.unregisterCollider = function(collider){
        ctl.colliders = ctl.colliders.filter((cl) => cl !== collider);
    };
    ctl.checkForCollision = function(excludeList, collider){
        // Used by BoxCollider.moveAndCollideShort()
        let colliders = ctl.getLocalColliders(collider.absoluteRect().position);
        for(let cl of colliders){
            if(cl.parent && !excludeList.includes(cl.parent.getEntityId())){
                if(cl.parent.getEntityId() == 1){
                    let str = cl.toString() + ", " + collider.toString() + ", " + collider.overlaps(cl);
                };
                if(collider.overlaps(cl)){
                    let col = PHYSICS.Collision.new(collider, cl);
                    return col;
                }
            }         
        }
        return null;
    };
    ctl.getLocalColliders = function(point){
        if(ctl.collisionGrid){
            return ctl.collisionGrid.getLocalColliders(point);
        }
        return ctl.rigidColliders;
    };
    ctl.getCollidersByPoint = function(excludeList, point){
        let cols = [];
        for(let cl of ctl.colliders){
            if(cl.parent && !excludeList.includes(cl.parent.getEntityId())){
                if(cl.contains(point)){
                    cols.push(cl);
                }
            }
        }
        return cols;
    };
    ctl.rectHitScan = function(excludeList, rect){
        let cols = [];
        for(let cl of ctl.colliders){
            if(cl.parent && !excludeList.includes(cl.parent.getEntityId())){
                let otherRect = cl.absoluteRect();
                if(otherRect.overlaps(rect)){
                    cols.push(cl);
                }
            }
        }
        return cols;
    };
    // Call this each frame before collision checks are made
    ctl.update = function(){
        ctl.refreshRigidCollidersList();
        ctl.refreshCollisionGrid();
    };
    ctl.refreshRigidCollidersList = function(){
        ctl.rigidColliders = [];
        for(let collider of ctl.colliders){
            if(collider.rigid){
                ctl.rigidColliders.push(collider);
            }
        }
    };
    ctl.refreshCollisionGrid = function(){
        let size = Math.ceil((SETTINGS.DefaultLevelTileSize * SETTINGS.DefaultLevelSize) / PHYSICS.CollisionCellSize);
        ctl.collisionGrid = PHYSICS.CellGrid.new(ctl.rigidColliders, size);
    };
    return ctl;
};

// Divide the map up into cells for faster collision scans
PHYSICS.CellGrid = {};
PHYSICS.CollisionCellSize = 400;
PHYSICS.CellGrid.new = function(colliders, size){
    let grid = {
        size: size,
        cells: []
    };

    grid.init = function(){
        for(let i = 0; i< size*size; i++){
            grid.cells.push([]);
        }
        for(let collider of colliders){
            let cellIndex = grid.posToCellIndex(collider.absoluteRect().position);
            grid.cells[cellIndex].push(collider);
        }
    };
    grid.posToCellIndex = function(position){
        let cellSize = PHYSICS.CollisionCellSize;
        let gridX = Math.floor(position.x / cellSize);
        let gridY = Math.floor(position.y / cellSize);
        return gridX + (grid.size * gridY)
    };
    grid.getLocalColliders = function(point){
        let index = grid.posToCellIndex(point);
        return grid.cells[index];
    };
    grid.init();
    return grid;
};

UTILITY.delayExecute = function(frames, funct){
    let execution = {
        frames: frames,
        onExecute: funct
    };
    MAIN.DELAYED_EXECUTIONS.push(execution);
};
