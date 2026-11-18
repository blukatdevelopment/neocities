/*##############################################################################
# Contains the levels and player data for a single playthrough
##############################################################################*/


SESSION.Session = {};
SESSION.Session.new = function(){
    let s = {
        exteriors: {},
        interiors: {},
        playerData: {},
        nextLevelId: 0,
        activeLevel: null,
        nextDoorId: 0,
        doors: {}
    };

    s.addExterior = function(ext){
        let id = s.nextLevelId;
        s.nextLevelId++;
        s.exteriors[id] = ext;
        ext.levelId = ext;
        return id;
    };
    s.addInterior = function(interior){
        let id = s.nextLevelId;
        s.nextLevelId++;
        s.interiors[id] = interior;
        interior.levelId = id;
        return id;
    };
    s.linkDoors = function(){

        // Link exterior doors, adding interior levels
        for(let key of Object.keys(s.exteriors)){
            let exterior = s.exteriors[key];
            for(let door of exterior.getDoors()){
                s.linkExteriorDoor(door, exterior);
            }
        }
    };
    s.linkExteriorDoor = function(door, exterior){
        door.levelId = exterior.levelId;
        door.doorId = s.nextDoorId;
        s.nextDoorId++;
        let destId = s.addInterior(LEVEL.Static[door.destinationName]());
        let dest = s.interiors[destId];
        door.destinationLevelId = destId;
        for(let destDoor of dest.getDoors()){
            destDoor.levelid = destId;
            destDoor.doorId = s.nextDoorId;
            s.doors[destDoor.doorId] = destDoor;
            s.nextDoorId++;
            if(!destDoor.interiorFacing){
                destDoor.destinationDoorId = door.doorId;
                destDoor.destinationLevelId = door.levelId;
            }
        }
        if(dest.entranceDoor){
            door.destinationDoorId = dest.entranceDoor.doorId;
        }
        else{
            console.log("Level " + dest.name + " has no entrance door.");
        }
        
        s.doors[door.doorId] = door;
    };
    s.saveActiveLevel = function(){
        let renderer = SCENE.getLevelRenderer();
        if(renderer == null){
            console.log("Session.saveActiveLevel(): Level renderer is null in active scene!");
            return;
        }
        if(renderer.data.exterior){
            s.exteriors[s.activeLevel] = renderer.getData();
        }
        else{
            s.interiors[s.activeLevel] = renderer.getData();
        }
    };
    s.enterLevel = function(levelId, doorId){
        s.saveActiveLevel();
        let renderer = SCENE.getLevelRenderer();
        s.activeLevel = levelId;
        let level = s.exteriors[levelId];
        if(level == null){
            level = s.interiors[levelId];
        }
        renderer.loadData(level);
        let door = s.doors[doorId];
        if(door){
           let player = SCENE.getPlayerOne();
           player.position = door.getExitPosition();
           GRAPHICS.centerCamera(player.getColRect().center());
        }
        else{
            console.log("Door not found: " + doorId);
        }
    };

    return s;
};