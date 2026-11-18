/*##############################################################################
# Scene: New Game Menu
##############################################################################*/
SCENE.SCENES.NewGame = function(){
    let ng = SCENE.SCENES.BaseScene();
    ng.name = SCENES.newGame;
    ng.setup = false;
    ng.loadingLabel = UI.COMPONENTS.TextLabel.new(
        SHAPES.RECT.new(VECTOR2.new(200,200), VECTOR2.new(200,200)),
        "Generating World",
        null,
        null
    );
    ng.update = function(){
        GRAPHICS.clearCanvas();
        ng.loadingLabel.draw();
        ng.newGame();
    };
    ng.newGame = function(){
        SESSION.NewGame();
        SCENE.setActiveScene(SCENE.SCENES.Game());
    };
    return ng;
};