/*##############################################################################
# Sprites
##############################################################################*/
var SPRITES = {};
SPRITES.animations = {};
SPRITES.sheets = {};

// Record to hold sheet info
SPRITES.SpriteSheet = {};
SPRITES.SpriteSheet.new = function(name, src, element, cells, resolutionX, resolutionY){
  var ss = {};
  ss.name = name;
  ss.src = src;
  ss.element = element;
  ss.cellCount = cells;
  ss.cellResolutionX = resolutionX;
  ss.cellResolutionY = resolutionY;
  UTILITY.log("SPRITES", "New sprite sheet loaded:", ss);
  return ss;
};

SPRITES.Animation = {};
SPRITES.Animation.new = function(name, sheet, startIndex, endIndex){
  var anim = {
    name: name,
    sheet: sheet,
    startIndex: startIndex,
    endIndex: endIndex
  };
  return anim;
};


SPRITES.loadActorSprites = function(config){
  UTILITY.log("SPRITES", "Loading Actor Config", config);
  let element = GRAPHICS.loadImage(config.sheet);;
  let sheet = SPRITES.SpriteSheet.new(config.name, config.sheet, element, config.cells, config.resolutionX, config.resolutionY);
  SPRITES.sheets[config.name] = sheet;
  SPRITES.animations[config.name] = {};
  for(let i in config.animations){
    let animConfig = config.animations[i];
    let anim = SPRITES.Animation.new(animConfig[0], sheet, animConfig[1], animConfig[2]);
    SPRITES.animations[config.name][animConfig[0]] = anim;
  }
};

SPRITES.renderSprite = function(posX, posY, index, sheet){
  // Assumes one horizontal strip of cells
  let offX = index * sheet.cellResolutionX;
  let offY = 0;

  GRAPHICS.drawImageToImage(
      sheet.element, // Image
      offX, // X offset into image
      offY, // Y offset into image
      sheet.cellResolutionX, // sprite width
      sheet.cellResolutionY, // sprite height
      posX, // X offset drawing to canvas
      posY, // Y offset drawing to canvas
      sheet.cellResolutionX, 
      sheet.cellResolutionY 
   );
};

// Increments over the animation's cells using the animation clock
SPRITES.Animator = {};
SPRITES.Animator.new = function(){
  let anr = {
    animation: null,
    index: 0,
  };
  anr.setAnimation = function(animation){
    if(anr.animation.name != animation.name){
      anr.animation = animation;
      anr.index = animation.startIndex;
    }
    
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
    if(anr.animation){
      anr.index++;
      if(anr.index > anr.animation.endIndex){
        anr.index = anr.animation.startIndex;
      }
    }
    else{
      UTILITY.log("SPRITES", "Animator has no animation", + JSON.stringify(anr));
    }
  };
  return anr;
}