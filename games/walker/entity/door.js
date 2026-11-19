/*##############################################################################
# Has an item that can be harvested by interacting
##############################################################################*/
ENTITY.Door = {};
ENTITY.Door.new = function(destinationName, interiorFacing, direction){
    let d = ENTITY.baseEntity.new();
    d.interiorFacing = interiorFacing;
    d.destinationName = "Cave";
    d.destinationLevelId = null;
    d.destinationDoorId = null;
    d.levelId = null;
    d.doorId = null;
    d.direction = direction;
    d.tags.push("door");
    d.onInteract = function(interaction){
        SESSION.EnterLevel(d.destinationLevelId, d.destinationDoorId);
    };
    d.getExitPosition = function(){
        let pos = d.collider.absoluteRect().center();
        pos = pos.move(d.direction, 64);
        return pos;
    };
    d.onCollide = function(collision){
        let target = collision.second.parent == d ? collision.first.parent : collision.second.parent;
        if(target == d){
            return;
        }
        if(target.hasTag("player")){
            d.onInteract();
        }
    };

    return d;
};