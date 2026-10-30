var VECTOR2 = {};
VECTOR2.new = function(x, y){
    let v2 = {
        x: x,
        y: y
    };
    v2.equals = function(other){
        return v2.x == other.x && v2.y == other.y;
    };
    v2.distance = function(point){
        var a = v2.x - point.x;
        var b = v2.y - point.y;

        return Math.sqrt( a*a + b*b );
    }
    v2.add = function(otherVector){
        return VECTOR2.new(v2.x + otherVector.x, v2.y + otherVector.y);
    };
    v2.multiply = function(otherVector){
        return VECTOR2.new(v2.x * otherVector.x, v2.y * otherVector.y);
    }
    v2.toString = function(){
        return "{" + v2.x + ", " + v2.y + "}";
    };
    v2.move = function(direction, magnitude){
        let ret = VECTOR2.new(v2.x, v2.y);
        switch(direction){
          case DIRECTIONS.north:
            ret.y -= magnitude;
          break;
          case DIRECTIONS.south:
            ret.y += magnitude;
          break;
          case DIRECTIONS.east:
            ret.x += magnitude;
          break;
          case DIRECTIONS.west:
            ret.x -= magnitude;
          break;
        }
        return ret;
    };
    v2.clone = function(){
        return VECTOR2.new(v2.x, v2.y);
    };
    return v2;
};
VECTOR2.vectorFromDirection = function(direction){
    switch(direction){
        case DIRECTIONS.none:
            return VECTOR2.new(0, 0);
        break;
        case DIRECTIONS.north:
            return VECTOR2.north();
        break;
        case DIRECTIONS.south:
            return VECTOR2.south();
        break;
        case DIRECTIONS.east:
            return VECTOR2.east();
        break;
        case DIRECTIONS.west:
            return VECTOR2.west();
        break;
    }
};
VECTOR2.north = function(){ return VECTOR2.new(0, 1); };
VECTOR2.south = function(){ return VECTOR2.new(0, -1); };
VECTOR2.east = function(){ return VECTOR2.new(1, 0); };
VECTOR2.west = function(){ return VECTOR2.new(-1, 0); };
VECTOR2.northWest = function(){ return VECTOR2.new(-1, 1); };
VECTOR2.northEast = function(){ return VECTOR2.new(1, 1); };
VECTOR2.southWest = function(){ return VECTOR2.new(-1, -1); };
VECTOR2.southEast = function(){ return VECTOR2.new(1, -1); };


UTILITY.isInsideBox = function(topLeft, bottomRight, point){
  var inX = point.x < bottomRight.x && point.x > topLeft.x;
  var inY = point.y < bottomRight.y && point.y > topLeft.y;
  return inX && inY;
};