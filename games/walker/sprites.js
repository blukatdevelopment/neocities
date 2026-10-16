/*##############################################################################
# Sprites
##############################################################################*/
var SPRITES = {};
SPRITES.static = {};
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

// A single cell to be rendered by a SpriteRenderer
SPRITES.Sprite = {};
SPRITES.Sprite.new = function(name, sheet, index){
  let st = {
    name: name,
    sheet: sheet,
    index: index
  };
  return st;
};

// A range of cells to be played in an Animator
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

SPRITES.loadStaticSprites = function(config){
  UTILITY.log("SPRITES", "Loading static sprite config", config);
  let element = GRAPHICS.loadImage(config.sheet);
  let sheet = SPRITES.SpriteSheet.new(config.name, config.sheet, element, config.cells, config.resolutionX, config.resolutionY);
  SPRITES.static[config.name] = {};
  for(let i in config.sprites){
    let sprite = SPRITES.Sprite.new(config.sprites[i], sheet, i);
    SPRITES.static[config.name][sprite.name] = sprite;
  }
};

SPRITES.loadActorSprites = function(config){
  UTILITY.log("SPRITES", "Loading Actor Config", config);
  let element = GRAPHICS.loadImage(config.sheet);
  let sheet = SPRITES.SpriteSheet.new(config.name, config.sheet, element, config.cells, config.resolutionX, config.resolutionY);
  SPRITES.sheets[config.name] = sheet;
  SPRITES.animations[config.name] = {};
  for(let i in config.animations){
    let animConfig = config.animations[i];
    let anim = SPRITES.Animation.new(animConfig[0], sheet, animConfig[1], animConfig[2]);
    SPRITES.animations[config.name][animConfig[0]] = anim;
  }
};

SPRITES.renderSprite = function(posX, posY, index, sheet, forceDisplayMode){
  // Assumes one horizontal strip of cells
  let offX = index * sheet.cellResolutionX;
  let offY = 0;
  let displayMode = GRAPHICS.getDisplayMode();
  if(forceDisplayMode){
    displayMode = forceDisplayMode;
  }

  // Make relative to camera
  if( displayMode == DISPLAY_MODES.camera){
    let relative = GRAPHICS.relativeToCamera(VECTOR2.new(posX, posY));
    posX = relative.x;
    posY = relative.y;
  }

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

// Renders a single sprite with no animations
SPRITES.SpriteRenderer = {};
SPRITES.SpriteRenderer.new = function(sprite, position){
  let sr = {
    sprite: sprite,
    position: VECTOR2.new(0, 0),
    parent: null // inherent position from an object
  };
  if(position){
    sr.position = position;
  }
  sr.update = function(){
    sr.draw();
  };
  sr.draw = function(){
    let pos = sr.position;
    if(sr.parent){
      pos = sr.parent.getPosition();
    }
    SPRITES.renderSprite(pos.x, pos.y, sr.sprite.index, sr.sprite.sheet);
  };
  sr.setSprite = function(newSprite){
    sr.sprite = newSprite;
  };
  sr.toString = function(){
    let ret = "Renderer[";
    ret += "sprite: " + sr.sprite.name;
    ret += ", position: " + sr.position.toString();
    ret += ", parent: " + parent;
    ret += "]";
    return ret;
  };
  return sr;
};

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