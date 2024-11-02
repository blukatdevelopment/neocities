/*##############################################################################
# Scene management
##############################################################################*/
var SCENE = {};

// Configured for the current project
SCENE.SCENES = {
  TERMINAL: "terminal"
};

SCENE._activeScene = SCENE.SCENES.TERMINAL;

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

SCENE.update = function(){
  var activeScene = SCENE.getActiveScene();
  if(activeScene != null){
    activeScene.update();
  }
}

// Returns iScene
// This is hardcoded for the current project
SCENE.getActiveScene = function(){
  switch(SCENE._activeScene){
    case SCENE.SCENES.TERMINAL:
      return TERMINAL;
  }
      return null;
}

// accepts iScene
SCENE.setActiveScene = function(scene){
  SCENE._activeScene = scene;
}