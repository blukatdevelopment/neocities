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