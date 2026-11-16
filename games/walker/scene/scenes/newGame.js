/*##############################################################################
# Scene: New Game Menu
##############################################################################*/
SCENE.SCENES.NewGame = function(){
    let ng = SCENE.SCENES.BaseScene();
    ng.name = SCENES.ngartScreen;
    ng.setup = false;
    ng.loading = false;
    ng.loadingComplete = false;
    ng.loadingLabel = UI.COMPONENTS.TextLabel.new(
        SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(400,400)),
        "Generating World",
        null,
        null
    );
    ng.init = function(){
        // TODO: put some GUI for game configuration here
        // which calls ng.newGame()
        ng.newGame();
    };
    ng.newGame = function(){
        ng.loading = true;
    };
    ng.update = function(){
        GRAPHICS.clearCanvas();
        if(ng.loading){
            ng.loadingLabel.draw();
            ng.load();
        }
    };
    ng.load = function(){

    };
    ng.init();
    return ng;
};