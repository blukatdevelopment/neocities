
LEVEL.Generate.Cell = {};
LEVEL.Generate.Cell.new = function(data, rect){
    let cg = {
        data: data,
        rect: rect,
        entities: []
    };
    cg.generate = function(){
        cg.generateEntities();
    };
    cg.getRandomPosition = function(){
        let minX = cg.rect.position.x;
        let minY = cg.rect.position.y;
        let maxX = minX + cg.rect.size.x;
        let maxY = minY + cg.rect.size.y;
        return VECTOR2.new(
            UTILITY.randRange(minX, maxX),
            UTILITY.randRange(minY, maxY)
        );
    };
    cg.placeEntityRandomly = function(entity){
        let iterations = 0;

        while(iterations < 5000){
            iterations++;
            entity.position = cg.getRandomPosition();
            if(cg.canPlace(entity)){
                iterations = 5000;
            }
        }

        cg.addEntity(entity);
    };
    cg.canPlace = function(_entity){
        for(let entity of cg.entities){
            if(_entity.collider.overlaps(entity.collider)){
                return false;
            }
        }
        return true;
    };
    cg.addEntity = function(entity){
        cg.data.entityData.push(entity.getData());
        cg.entities.push(entity);
    };
    cg.generateEntities = function(){};
    return cg;
};

LEVEL.Generate.Cell.addScenery = function(cg, sprite){
    let scenery = ENTITYFACTORY.Scenery(sprite, VECTOR2.new(0,0));
    cg.placeEntityRandomly(scenery);
};
LEVEL.Generate.Cell.addRandomScenery = function(cg, sceneryConstructors, numberToAdd){
    for(let i = 0; i < numberToAdd; i++){
        let constructor = UTILITY.choice(sceneryConstructors);
        let scenery = constructor();
        cg.placeEntityRandomly(scenery);
    }
};

LEVEL.Generate.Cell.addItem = function(cg, itemName){
    let item = ENTITYFACTORY.ItemStack(itemName, 1, 1);
    cg.placeEntityRandomly(item);
};

LEVEL.Generate.Cell.addRandomItems = function(cg, items, numberToAdd){
    for(let i = 0; i < numberToAdd; i++){
        let item = ENTITYFACTORY.ItemStack(UTILITY.choice(items), 1, 1);
        cg.placeEntityRandomly(item);
    }
};