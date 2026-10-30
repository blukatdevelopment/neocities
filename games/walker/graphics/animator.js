// Increments over the animation's cells using the animation clock
SPRITES.Animator = {};
SPRITES.Animator.new = function(){
  let anr = {
    animation: null,
    index: 0,
    nextAnimation: null
  };
  anr.setAnimation = function(animation){
    if(anr.animation.name != animation.name){
      anr.animation = animation;
      anr.index = animation.startIndex;
    }
    
  };
  // Plays first animation, loops next
  anr.playAnimationOnce = function(animation, nextAnimation){
    anr.nextAnimation = nextAnimation;
    anr.setAnimation(animation);
  };
  anr.activeAnimation = function(){
    if(anr.animation){
      return anr.animation.name;
    }
    return null;
  };
  anr.update = function(posX, posY){
    for(let i = 0; i < UTILITY.framesAdvanced(); i++){
      anr.step();
    }
    if(anr.animation){
      SPRITES.renderSprite(posX, posY, anr.index, anr.animation.sheet);
    }
    else{
      UTILITY.log("SPRITES", "Invalid animation", JSON.stringify(anr.animation));
    }
  }
  anr.step = function(){
    if(SCENE.getGameState() && SCENE.getGameState() !== GAMESTATES.play){
      return;
    }
    if(anr.animation){
      anr.index++;
      if(anr.index > anr.animation.endIndex){
        if(anr.nextAnimation){
          // Switch to next animation if one's configured
          anr.setAnimation(anr.nextAnimation);
          anr.nextAnimation = null;
        }
        else{
          // Loop current animation
          anr.index = anr.animation.startIndex;
        }
      }
    }
    else{
      UTILITY.log("SPRITES", "Animator has no animation", + JSON.stringify(anr));
    }
  };
  return anr;
};