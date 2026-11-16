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