/*##############################################################################
# Graphics
##############################################################################*/
var GRAPHICS = {};

GRAPHICS.init = function(){
  GRAPHICS._canvas = document.getElementById("mainCanvas");
  GRAPHICS._canvas.setAttribute('crossOrigin', '');
  GRAPHICS._context = GRAPHICS._canvas.getContext("2d");
  GRAPHICS._canvas.width = SETTINGS.canvasMax;
  GRAPHICS._canvas.height = SETTINGS.canvasMax;
  GRAPHICS._scale = SETTINGS.canvasMax / SETTINGS.viewportMax;
  GRAPHICS._context.imageSmoothingEnabled = false;
  GRAPHICS._camera = GRAPHICS.Camera.new(VECTOR2.new(0,0), VECTOR2.new(400,400));
  GRAPHICS.setDisplayMode(DISPLAY_MODES.static);
}

// Basic rectangular camera that can be panned
GRAPHICS.Camera = {};
GRAPHICS.Camera.new = function(position, size){
  let cam = {
    rect: SHAPES.RECT.new(position, size)
  };
  cam.move = function(destination){
    if(cam.boundsCheck(destination)){
      // Valid destination
      cam.rect.position = destination;
      return;
    }
    let pos = cam.rect.position;
    let destX = VECTOR2.new(destination.x, pos.y);
    if(cam.boundsCheck(destX)){
      // Move only on x axis if possible
      cam.rect.position = destX;
      return;
    }
    let destY = VECTOR2.new(pos.x, destination.y);
    if(cam.boundsCheck(destY)){
      // Move only on y axis if possible
      cam.rect.position = destY;
      return;
    }
  };
  cam.boundsCheck = function(destination){
    let levelRect = SCENE.getLevelRect();
    if(levelRect == null){
      return true;
    }
    let rect = cam.rect.clone();
    rect.position = destination;
    return rect.isInside(levelRect);
  };
  return cam;
};

GRAPHICS.isOnScreen = function(rect){
  let cr = GRAPHICS._camera.rect;
  let ret = cr.overlaps(rect);
  return true;
};

GRAPHICS.getDisplayMode = function(){
  return GRAPHICS._displayMode;
};

GRAPHICS.setDisplayMode = function(mode){
  UTILITY.log("GRAPHICS", "Setting display mode", {mode: mode});
  GRAPHICS._displayMode = mode;
};

// Returns global camera instance
GRAPHICS.getCamera = function(){
  return GRAPHICS._camera;
};

// Vector2
GRAPHICS.centerCamera = function(point){
  let size = GRAPHICS._camera.rect.size;
  let centered = VECTOR2.new(point.x - (size.x/2), point.y - (size.y/2));
  GRAPHICS._camera.move(centered);
};

// Returns position relative to camera VECTOR2
GRAPHICS.relativeToCamera = function(point){
  //console.log("From " + point.toString() + " to " + GRAPHICS._camera.rect.position.toString());
  let pos = GRAPHICS._camera.rect.position;
  return VECTOR2.new(point.x - pos.x, point.y - pos.y);
};

// Scales up from viewport to screen
GRAPHICS.scale = function(viewport_units){
  return viewport_units * GRAPHICS._scale;
};

// Scales down from screen down to viewport
GRAPHICS.downScale = function(pixels){
  return pixels / GRAPHICS._scale;
};

// returns point in worldspace where mouse is pointing
GRAPHICS.getWorldCursor = function(){
  let pos = INPUT.getMousePosition();
  if(pos){
    pos.x = GRAPHICS.downScale(pos.x);
    pos.y = GRAPHICS.downScale(pos.y);
    pos = GRAPHICS.getWorldPoint(pos);
  }
  return pos;
};

// Converts from point relative to viewport to point in absolute space
GRAPHICS.getWorldPoint = function(viewPortPoint){
  let pos = GRAPHICS._camera.rect.position;
  return pos.add(viewPortPoint);
};

GRAPHICS.getCanvas = function(){
  return GRAPHICS._canvas;
};

GRAPHICS.getContext = function(){
  return GRAPHICS._context;
};

GRAPHICS.drawCircle = function(x, y, radius){
  GRAPHICS._context.imageSmoothingEnabled = false;
  let context = GRAPHICS.getContext();
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
  GRAPHICS._context.imageSmoothingEnabled = false;
};

GRAPHICS.drawLine = function(x1, y1, x2, y2){
  GRAPHICS._context.imageSmoothingEnabled = false;
  x1 = GRAPHICS.scale(x1);
  y1 = GRAPHICS.scale(y1);
  x2 = GRAPHICS.scale(x2);
  y2 = GRAPHICS.scale(y2);

  let context = GRAPHICS.getContext();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  GRAPHICS._context.imageSmoothingEnabled = false;
};

GRAPHICS.clearCanvas = function(){
  GRAPHICS._context.imageSmoothingEnabled = false;
  let context = GRAPHICS.getContext();
  let canvas = GRAPHICS.getCanvas();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  GRAPHICS._context.imageSmoothingEnabled = false;
};

// XY is for top left corner.
GRAPHICS.drawBox = function(x, y, width, height){

  GRAPHICS._context.imageSmoothingEnabled = false;
  // Top
  GRAPHICS.drawLine(x, y, x+width, y);
  // Left
  GRAPHICS.drawLine(x, y, x, y+height); 
  // Bottom
  GRAPHICS.drawLine(x, y+height, x+width, y+height);
  // Right
  GRAPHICS.drawLine(x+width, y, x+width, y+height);
  GRAPHICS._context.imageSmoothingEnabled = false;
};

// XY is for the top left corner.
GRAPHICS.fillBox = function(x, y, width, height, color){
  let ctx = GRAPHICS._context;
  ctx.imageSmoothingEnabled = false;
  if(color){
    ctx.fillStyle = color;
  }
  ctx.fillRect(x, y, width, height);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = SETTINGS.defaultColor;
};

GRAPHICS.drawImageToImage = function(image, x1, y1, width1, height1, x2, y2, width2, height2){
  GRAPHICS._context.imageSmoothingEnabled = false;
  x2 = x2;
  y2 = y2;

  let context = GRAPHICS.getContext();
  context.drawImage(image, x1, y1, width1, height1, x2, y2, width2, height2);
  GRAPHICS._context.imageSmoothingEnabled = false;
};

GRAPHICS.drawImage = function(image, x, y, width, height){
  GRAPHICS._context.imageSmoothingEnabled = false;
  x = GRAPHICS.scale(x);
  y = GRAPHICS.scale(y);
  width = GRAPHICS.scale(width);
  height = GRAPHICS.scale(height);

  let context = GRAPHICS.getContext();
  context.drawImage(image, x, y, width, height);
  GRAPHICS._context.imageSmoothingEnabled = false;
};

// Draw text at static point
GRAPHICS.drawText = function(text, x, y, _textSize, color){
  let ctx = GRAPHICS.getContext();
  ctx.imageSmoothingEnabled = false;
  let textSize = GRAPHICS.scale(SETTINGS.defaultFontSize);
  if(_textSize){
    textSize = _textSize;
  }
  if(color){
    ctx.fillStyle = color;
  }
  x = GRAPHICS.scale(x);
  y = GRAPHICS.scale(y);
  ctx.font = "" + textSize + "px Arial";
  ctx.fillText(text, x, y);
  ctx.fillStyle = SETTINGS.defaultColor;
  ctx.imageSmoothingEnabled = false;
};

// Draw text relative to viewport
GRAPHICS.drawTextRelative = function(text, x, y, color){
  let ctx = GRAPHICS.getContext();
  ctx.imageSmoothingEnabled = false;
  if(color){
    ctx.fillStyle = color;
  }
  let relative = GRAPHICS.relativeToCamera(VECTOR2.new(x, y));
  GRAPHICS.drawText(text, relative.x, relative.y);
  ctx.fillStyle = SETTINGS.defaultColor;
};

GRAPHICS.loadImage = function(fileName){
  let element = new Image();
  element.addEventListener('error', function handleError() {
    UTILITY.log("GRAPHICS", "Invalid URL", {url: element.src});
  });
  element.src = SETTINGS.assetsUrl + fileName;
  return element;
};



// Applies async validation before actually adding to object
GRAPHICS.addImageAsync = function(fileName, object, key){
  GRAPHICS.isValidImage(fileName)
  .then(isValid => {
    if (isValid) {
      UTILITY.log("GRAPHICS", "Image URL valid. Loading.", { name: fileName });
      const img = new Image();
      img.src = fileName;
      object[key] = img;
    }
    else {
      UTILITY.log("GRAPHICS", "Image URL invalid.", { name: fileName });
    }
  });
};

GRAPHICS.isValidImage = function(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);

    img.src = src;
  });
};