/*##############################################################################
# Level Renderer
##############################################################################*/
LEVEL.Renderer = {};
LEVEL.Renderer.new = function(){
    let lr = {
        player: null,
        entities: [],
        scenery: [], // excluded from collisions
        ui: null
    };
    lr.init = function(){
        GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
        lr.physics = PHYSICS.Controller.new();
        lr.player = ACTORFACTORY.playerOne();
        lr.addEntity(lr.player);
        lr.ui = UI.COMPONENTS.InventoryManager.new();
        lr.ui.linkActor(lr.player);
    };
    lr.loadData = function(data){
        let levelSize = SETTINGS.DefaultLevelTileSize * SETTINGS.DefaultLevelSize;
        let levelRect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(levelSize, levelSize));
        SCENE.setLevelRect(levelRect);

        if(data.tileMap){
            let tileMap = data.tileMap;
            for(let i = 0; i < tileMap.tiles.length; i++){
                let sprite = tileMap.getSpriteByIndex(i);
                let pos = tileMap.getPositionByIndex(i);
                let tile = ENTITYFACTORY.Scenery(sprite, pos);
                lr.scenery.push(tile);
            }
        }
        for(let entityData of data.entityData){
            lr.addEntity(ENTITYFACTORY.Load(entityData));
        }
        if(data.playerPosition && lr.player){
            lr.player.setPosition(data.playerPosition);
        }
    };
    lr.update = function(){
        lr.physics.update();
        if(SCENE.getGameState() === GAMESTATES.play){
            for(let entity of lr.entities){
                if(entity){
                  entity.update();
                }
            }
        }
        lr.ui.update();
        lr.updateCursor();
        lr.drawLevel();
    };
    lr.cursorInRange = function(){
        let pos = GRAPHICS.getWorldCursor();
        let walkerPos = lr.player.centeredPosition();
        let distance = pos.distance(walkerPos);
        return distance < SETTINGS.interactionRange;
    };
    lr.updateCursor = function(){
        if(lr.cursorInRange()){
            SCENE.updateCursor(SPRITES.static.cursors.roundBlack);
          }
          else{
            SCENE.updateCursor(SPRITES.static.cursors.roundRed);
          }
    };
    lr.drawLevel = function(){
        GRAPHICS.clearCanvas();

        for(let renderer of lr.scenery){
            renderer.draw();
        }
        for(let ent of lr.getRenderSortedEntities()){
            ent.draw();
        }
        lr.ui.draw();
    }
    lr.getRenderSortedEntities = function(){
        let onScreen = [];
        for(let ent of lr.entities){
            if(GRAPHICS.isOnScreen(ent.getSpriteRect())){
                onScreen.push(ent);
            }
        }
        onScreen.sort((a, b) => {
            let aY = a.position.y + a.getSpriteRect().size.y;
            let bY = b.position.y + b.getSpriteRect().size.y;
            if(aY < bY){
                return -1;
            }
            if(aY > bY){
                return 1;
            }
            return 0;
        });
        return onScreen;
    };
    lr.addEntity = function(entity){
        if(entity == null){
            return;
        }
        lr.entities.push(entity);
        lr.physics.registerCollider(entity.getCollider());
    };
    lr.destroyEntity = function(entity){
      if(entity == lr.player){
        console.log("Game over!");
      }
      // Removes entity after update loop completes.
      UTILITY.delayExecute(0, () => { lr.removeEntity(entity); });
    };
    lr.removeEntity = function(entity){
      lr.entities = lr.entities.filter((ent) => ent !== entity);
      lr.physics.unregisterCollider(entity.getCollider());
    };
    lr.notification = function(message){
        if(lr.ui){
            lr.ui.notificationsBar.notification(message);
        }
    };
    return lr;
};