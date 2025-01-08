/*##############################################################################
# Graphics
##############################################################################*/
var GRAPHICS = {};

GRAPHICS.init = function(){
  GRAPHICS._canvas = document.getElementById("mainCanvas");
  GRAPHICS._canvas.setAttribute('crossOrigin', '');
  GRAPHICS._context = GRAPHICS._canvas.getContext("2d");
  GRAPHICS._canvas.width = MAIN.CANVAS_MAX;
  GRAPHICS._canvas.height = MAIN.CANVAS_MAX;
  GRAPHICS._scale = MAIN.CANVAS_MAX / MAIN.VIEWPORT_MAX;
}

// Scales from viewport to screen
GRAPHICS.scale = function(viewport_units){
  return viewport_units * GRAPHICS._scale;
}

GRAPHICS.getCanvas = function(){
  return GRAPHICS._canvas;
}

GRAPHICS.getContext = function(){
  return GRAPHICS._context;
}

GRAPHICS.drawCircle = function(x, y, radius){
  let context = GRAPHICS.getContext();
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

GRAPHICS.drawLine = function(x1, y1, x2, y2){

  x1 = GRAPHICS.scale(x1);
  y1 = GRAPHICS.scale(y1);
  x2 = GRAPHICS.scale(x2);
  y2 = GRAPHICS.scale(y2);

  let context = GRAPHICS.getContext();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

GRAPHICS.clearCanvas = function(){
  let context = GRAPHICS.getContext();
  let canvas = GRAPHICS.getCanvas();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
}

// XY is for top left corner.
GRAPHICS.drawBox = function(x, y, width, height){
  // Top
  GRAPHICS.drawLine(x, y, x+width, y);
  // Left
  GRAPHICS.drawLine(x, y, x, y+height); 
  // Bottom
  GRAPHICS.drawLine(x, y+height, x+width, y+height);
  // Right
  GRAPHICS.drawLine(x+width, y, x+width, y+height);
}

GRAPHICS.drawImageToImage = function(image, x1, y1, width1, height1, x2, y2, width2, height2){
  x2 = GRAPHICS.scale(x2);
  y2 = GRAPHICS.scale(y2);
  width2 = GRAPHICS.scale(width2);
  height2 = GRAPHICS.scale(height2);
  
  let context = GRAPHICS.getContext();
  context.drawImage(image, x1, y1, width1, height1, x2, y2, width2, height2);
}

GRAPHICS.drawImage = function(image, x, y, width, height){
  x = GRAPHICS.scale(x);
  y = GRAPHICS.scale(y);
  width = GRAPHICS.scale(width);
  height = GRAPHICS.scale(height);

  let context = GRAPHICS.getContext();
  context.drawImage(image, x, y, width, height)
}

GRAPHICS.drawText = function(text, x, y){
  x = GRAPHICS.scale(x);
  y = GRAPHICS.scale(y);
  let textSize = GRAPHICS.scale(30);

  let context = GRAPHICS.getContext()
  context.font = "" + textSize + "px Arial";
  context.fillText(text, x, y);
}

GRAPHICS.loadImage = function(url){
  let element = new Image();
  element.src = url;
  return element;
}

