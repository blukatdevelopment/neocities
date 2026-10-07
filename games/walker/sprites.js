/*##############################################################################
# Sprites
##############################################################################*/
var SPRITES = {};
SPRITES.animations = {};
SPRITES.sheets = {};

// Record to hold sheet info
SPRITES.SpriteSheet = {};
SPRITES.SpriteSheet.new = function(name, src, element, cells, resolutionX, resolutionY){
  var ss = {
    name: name,
    src: src,
    element: element,
    cellCount: cells,
    cellResolutionX: resolutionX,
    cellResolutionY: resolutionY
  };
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
  let sheet = SPRITES.SpriteSheet.new(config.name, config.sheet, config.cells, config.resolutionX, config.resolutionY);
  GRAPHICS.addImageAsync(config.sheet, sheet, "element");
  SPRITES.sheets[config.name] = sheet;
  SPRITES.animations[config.name] = {};
  for(let i in config.animations){
    let animConfig = config.animations[i];
    let anim = SPRITES.Animation.new(animConfig[0], animConfig[1], animConfig[2]);
    SPRITES.animations[config.name][animConfig[0]] = anim;
  }
};

SPRITES.renderSprite = function(posX, posY, index, sheet){

  // Assumes one horizontal strip of cells
  let offX = index * sheet.cellResolutionX;
  let offY = 0;

  // Assumes 1 pixel border between cells
  offX += index;

  GRAPHICS.drawImageToImage(
      sheet.element, // Image
      offX, // X offset into image
      offY, // Y offset into image
      sheet.cellResolutionX, // sprite width
      sheet.cellResolutionY, // sprite height
      posX, // X offset drawing to canvas
      posY, // Y offset drawing to canvas
      sheet.cellResolutionX * SETTINGS.drawScale, // size drawing to canvas
      sheet.cellResolutionY * SETTINGS.drawScale // size drawing to canvas
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
    anr.animation = animation;
  };
  anr.activeAnimation = function(){
    if(anr.animation){
      return anr.animation.name;
    }
    return null;
  };
  anr.update = function(posX, posY){
    for(let i = 0; i < UTILITY.framesAdvanced; i++){
      anr.step();
    }
    SPRITES.renderSprite(posX, posY, anr.index, anr.animation.sheet);
  }
  anr.step = function(){
    if(anr.animation){
      anr.index++;
      if(anr.index > anr.animation.endIndex){
        mgr.index = mgr.animation.startIndex;
      }
    }
  };
  return anr;
}

SPRITES.Manager = {};
SPRITES.Manager.new = function(sheet, width, height, columns, rows, frameRate, animations, handler){
  var mgr = {
    sheet: sheet,
    width: width,
    height: height,
    columns: columns,
    rows: rows,
    index: 1,
    frameRate: frameRate,
    animations: animations,
    animation: null,
    animationName: null,
    lastUpdate: Date.now(),
    frameLag: 0,
    events: [],
    state: {},
    eventHandler: handler
  };
  mgr.frameDuration = 1000 / mgr.frameRate;
  
  mgr.draw = function(posX, posY){
    var ctx = GRAPHICS.getContext();
    var cvs = GRAPHICS.getCanvas();
    
    var column = parseInt(mgr.index % mgr.rows);
    var row = parseInt(mgr.index / mgr.columns);
    //console.log("column "+ column + " row " + row);
    var offX = column * mgr.width;
    var offY = row * mgr.height;

    // Allow for a 1 pixel border between cells
      offX += column;
      offY += row;

    GRAPHICS.drawImageToImage(
      sheet, // Image
      offX, // X offset into image
      offY, // Y offset into image
      mgr.width, // sprite width
      mgr.height, // sprite height
      posX, // X offset drawing to canvas
      posY, // Y offset drawing to canvas
      mgr.width * 2, // size drawing to canvas
      mgr.height * 2 // size drawing to canvas
      );
    var currentTime = Date.now();
    var elapsed = currentTime - mgr.lastUpdate;
    mgr.lastUpdate = currentTime;
    mgr.frameLag += elapsed;
    while(mgr.frameLag >= mgr.frameDuration){
      //console.log("Frame lag:" + mgr.frameLag);
      mgr.step();
      mgr.frameLag -= mgr.frameDuration;
    }
    if(mgr.eventHandler){
      mgr.eventHandler(mgr.events, mgr.state, mgr);
      mgr.events = [];
    }
    return;
  }
  
  mgr.setAnimation = function(key){
    if(mgr.animations && mgr.animations[key]){
      if(mgr.animation != mgr.animations[key]){
        mgr.animation = mgr.animations[key];
        mgr.animationName = key;
        mgr.lastUpdate = Date.now();
        mgr.index = mgr.animation[0];
        //console.log("Set animation to " + key);
      }
    }
    else{
      console.log("Could not find animation: " + key);
    }
  }

  mgr.activeAnimation = function(){
    return mgr.animationName;
  }
  
  mgr.step = function(){
    if(mgr.animation){
      mgr.index++;
      if(mgr.index > mgr.animation[1]){
        mgr.index = mgr.animation[0];
      }
    }
  }

  // Event should be a string
  mgr.event = function(event){
    mgr.events.push(event);
  }
  return mgr;
}