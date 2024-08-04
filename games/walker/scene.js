/*##############################################################################
# Scene management
##############################################################################*/
var SCENE = {};

// Config
SCENE.SCENES = {
  START: "start",
  GAME: "GAME",
  END: "lose",
  NEXT: "next"
};

SCENE._activeScene = SCENE.SCENES.START;

SCENE.mouseDown = function(evt){
  var activeScene = this.getActiveScene();
  if(activeScene != null){
    activeScene.mouseDown(evt);
  }
}

SCENE.mouseUp = function(evt){
  var activeScene = this.getActiveScene();
  if(activeScene != null){
    activeScene.mouseUp(evt);
  }
}

SCENE.mouseDown = function(evt){
  var activeScene = this.getActiveScene();
  if(activeScene != null){
    activeScene.mouseDown(evt);
  }
}

SCENE.update = function(){
  var activeScene = SCENE.getActiveScene();
  if(activeScene != null){
    activeScene.update();
  }
}

SCENE.getActiveScene = function(){
  switch(SCENE._activeScene){
    case SCENE.SCENES.GAME:
      return GAME;
    case SCENE.SCENES.START:
      return START;
  }
      return null;
}

SCENE.setActiveScene = function(scene){
  SCENE._activeScene = scene;
}