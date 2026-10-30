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