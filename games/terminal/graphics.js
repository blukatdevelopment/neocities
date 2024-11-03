/*##############################################################################
# Graphics
##############################################################################*/
var GRAPHICS = {};

GRAPHICS.init = function(){
  GRAPHICS._canvas = document.getElementById("mainCanvas");
  GRAPHICS._context = GRAPHICS._canvas.getContext("2d");
}

GRAPHICS.getCanvas = function(){
  return GRAPHICS._canvas;
}

GRAPHICS.getContext = function(){
  return GRAPHICS._context;
}

GRAPHICS.setFillStyle = function(style){
  let context = GRAPHICS.getContext();
  context.fillStyle = style;
}

GRAPHICS.drawCircle = function(x, y, radius){
  let context = GRAPHICS.getContext();
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

GRAPHICS.drawLine = function(x1, y1, x2, y2){
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

GRAPHICS.fillBox = function(x, y, width, height){
  let context = GRAPHICS.getContext();
  context.fillRect(x, y, x+width, y+height);
}

GRAPHICS.drawImage = function(image, x, y, width, height){
  let context = GRAPHICS.getContext();
  context.drawImage(image, x, y, width, height)
}

GRAPHICS.drawText = function(text, size, x, y){
  if(size == null){
    size = 30;
  }
  let context = GRAPHICS.getContext()
  context.font = ""+ size +"px Arial";
  context.fillText(text, x, y);
}

GRAPHICS.loadImage = function(url){
  let element = new Image();
  element.src = url;
  return element;
}

