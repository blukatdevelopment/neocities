/*##############################################################################
# Sprites
##############################################################################*/
var SPRITES = {};

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
    //console.log("offX: " + offX + " offY" + offY);
    ctx.drawImage(
      sheet, // Image
      offX, // X offset into image
      offY, // Y offset into image
      mgr.width, // sprite width
      mgr.height, // sprite height
      posX, // X offset drawing to canvas
      posY, // Y offset drawing to canvas
      mgr.width, // size drawing to canvas
      mgr.height // size drawing to canvas
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
      mgr.animation = mgr.animations[key];
      mgr.animationName = key;
      mgr.lastUpdate = Date.now();
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