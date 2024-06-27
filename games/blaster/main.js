/*##############################################################################
# Scene management
##############################################################################*/
var scene = {};
scene.START_SCENE = "start",
scene.GAME_SCENE = "game",
scene.END_SCENE = "lose",
scene.NEXT_SCENE = "next";
scene.activeScene = scene.START_SCENE;

scene.update = function(){
  switch(this.activeScene){
    case this.GAME_SCENE:
      game.update();
      break;
    case this.START_SCENE:
      start.update();
      break;
    case this.END_SCENE:
      end.update();
      break;
    case this.NEXT_SCENE:
      next.update();
      break;
  }
}

scene.mouseDown = function(evt){
    switch(this.activeScene){
    case this.GAME_SCENE:
      game.mouseDown(evt);
      break;
    case this.START_SCENE:
      start.mouseDown(evt);
      break;
    case this.END_SCENE:
      end.mouseDown(evt);
      break;
    case this.NEXT_SCENE:
      next.mouseDown(evt);
      break;
  }
}

scene.mouseUp = function(evt){
    switch(this.activeScene){
    case this.GAME_SCENE:
      game.mouseUp(evt);
      break;
  }
}

/*##############################################################################
# Util
##############################################################################*/

function randRange(min, max){
  return Math.random() * (max - min) + min;
}

function isInsideBox(topLeft, bottomRight, point){
  var inX = point.x < bottomRight.x && point.x > topLeft.x;
  var inY = point.y < bottomRight.y && point.y > topLeft.y;
  return inX && inY;  
}

/*##############################################################################
# SFX
##############################################################################*/
const SFX_PEW = "https://cdn.discordapp.com/attachments/1255876329002504193/1256001477525373029/pew.mp3?ex=667f2e07&is=667ddc87&hm=9fd59691868655e0a67d884196f675635350d2751da4085f101b8ae1204d7093&",
SFX_IMPACT = "https://cdn.discordapp.com/attachments/1255876329002504193/1256001477277777941/impact.mp3?ex=667f2e07&is=667ddc87&hm=16fac53ce143b27ebec950fd53911f0ccf7cb6294b1535c15a69afe1f07de913&",
SFX_EXPLOSION = "https://cdn.discordapp.com/attachments/1255876329002504193/1256001477034381394/explosion.mp3?ex=667f2e07&is=667ddc87&hm=b7b0793a36552953c175bf410f624bd3ef0d2feb603a66ee2e87d364e53c7fcd&";

function playSound(file){
  var audio = new Audio(file);
  audio.play();
}

/*##############################################################################
# Main
##############################################################################*/
var main = {};
main.SCREEN_MIN = 0;
main.SCREEN_MAX = 400;

main.fps = 60;
main.startTime = Date.now();
main.frameDuration = 1000 / main.fps
main.lag = 0;

main.gameLoop = function(){
  requestAnimationFrame(main.gameLoop, getCanvas());

  var current_time = Date.now();
  var elapsed = current_time - main.startTime;
  main.startTime = current_time;
  main.lag = elapsed;
  while(main.lag >= main.frameDuration){
    scene.update();
    main.lag -= main.frameDuration;
  }
}

main.init = function(){
  initContext();
  initInput();
}

main.main = function(){
  this.init();
  this.gameLoop();
}

main.main();