SPRITES.static = {};
SPRITES.animations = {};
SPRITES.sheets = {};

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
  posX = GRAPHICS.scale(posX);
  posY = GRAPHICS.scale(posY);
  GRAPHICS.drawImageToImage(
      sheet.element, // Image
      offX, // X offset into image
      offY, // Y offset into image
      sheet.cellResolutionX, // sprite width
      sheet.cellResolutionY, // sprite height
      posX, // X offset drawing to canvas
      posY, // Y offset drawing to canvas
      GRAPHICS.scale(sheet.cellResolutionX), 
      GRAPHICS.scale(sheet.cellResolutionY) 
   );
};

// Draws a sprite directly onto the screen without scaling
// or relative positioning
SPRITES.staticRenderSprite = function(posX, posY, index, sheet){
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

