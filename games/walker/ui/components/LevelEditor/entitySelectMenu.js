/*##############################################################################
# Allows player to place entities in level editor
##############################################################################*/
UI.COMPONENTS.EntitySelectMenu = {};
UI.COMPONENTS.EntitySelectMenu.new = function(){
    let esm = {
        rect: SHAPES.RECT.new(VECTOR2.new(320, 280), VECTOR2.new(80, 100))
    };
    esm.panel = UI.COMPONENTS.Panel.new(esm.rect);
    esm.placeButton = UI.COMPONENTS.TextButton.new(
        SHAPES.RECT.new(
            VECTOR2.new(esm.rect.position.x, esm.rect.position.y+80),
            VECTOR2.new(80,20)
        ),
        "Place",
        () => { esm.placeEntity(); }
    );
    let options = ENTITYFACTORY.getEntityNames();
    esm.select = UI.COMPONENTS.ScrollSelect.new(
        SHAPES.RECT.new(
            VECTOR2.new(esm.rect.position.x, esm.rect.position.y),
            VECTOR2.new(80,60)
        ),
        options,
        9
    );
    
    esm.placeEntity = function(){
        let selected = esm.select.getSelected();
        let pos = GRAPHICS.getCameraCenter();
        let entity = ENTITYFACTORY[selected]();
        entity.position = pos;
        SCENE.createEntity(entity);

    };
    esm.update = function(){
        esm.placeButton.update();
        esm.select.update();
        esm.placeButton.text = "Place " + esm.select.getSelected();
    };
    
    esm.draw = function(){
        esm.panel.draw();
        esm.placeButton.draw();
        esm.select.draw();
    };
    esm.isHovered = function(){
        let mPos = INPUT.getDownScaledMousePosition();
        return esm.rect.contains(mPos);
    };
    return esm;
};