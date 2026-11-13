/*##############################################################################
# Scene: Start Menu
##############################################################################*/
SCENE.SCENES.Start = function(){
    let st = SCENE.SCENES.BaseScene();
    st.name = SCENES.startScreen;
    st.setup = false;
    st.playButton = UI.COMPONENTS.TextButton.new(
        SHAPES.RECT.new(
            VECTOR2.new(180,180),
            VECTOR2.new(40,20)
        ),
        "Play",
        () => { SCENE.setActiveScene(SCENE.SCENES.Game()); }
    );
    st.editButton = UI.COMPONENTS.TextButton.new(
        SHAPES.RECT.new(
            VECTOR2.new(180,200),
            VECTOR2.new(40,20)
        ),
        "Edit",
        () => { SCENE.setActiveScene(SCENE.SCENES.LevelEditor()); }
    );
    st.update = function(){
        GRAPHICS.clearCanvas();
        st.playButton.update();
        st.editButton.update();
        st.playButton.draw();
        st.editButton.draw();
    };
    return st;
};