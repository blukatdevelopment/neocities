/*##############################################################################
# Util
##############################################################################*/
var UTILITY = {}
UTILITY.randRange = function(min, max){
  return Math.random() * (max - min) + min;
}

UTILITY.isInsideBox = function(topLeft, bottomRight, point){
  var inX = point.x < bottomRight.x && point.x > topLeft.x;
  var inY = point.y < bottomRight.y && point.y > topLeft.y;
  return inX && inY;  
}
