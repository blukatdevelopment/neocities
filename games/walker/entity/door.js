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
    d.doorId = null;
    d.direction = direction;
    d.tags.push("door");
    d.onInteract = function(interaction){
        console.log("Opening the door to " + d.destination);
        if(d.destinationLevelId && d.destinationDoorId){
            console.log("Door configured.");
        }
    };

    return d;
};