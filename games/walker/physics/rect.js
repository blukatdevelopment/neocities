SHAPES.RECT = {};
SHAPES.RECT.new = function(position, size){
    let rect = {
        position: position, // Top left corner
        size: size
    };
    rect.center = function(){
        return VECTOR2.new(
            rect.position.x + rect.size.x/2,
            rect.position.y + rect.size.y/2
        );
    };
    rect.extents = function(){
        return VECTOR2.new(
            rect.position.x+rect.size.x,
            rect.position.y+rect.size.y
        );
    };
    rect.topRight = function(){
        return VECTOR2.new(
            rect.position.x+rect.size.x,
            rect.position.y
        );
    };
    rect.topLeft = function(){
        return rect.position;
    };
    rect.bottomRight = function(){
        return rect.extents();
    };
    rect.bottomLeft = function(){
        return VECTOR2.new(
            rect.position.x,
            rect.position.y+rect.size.y
        );
    };
    // Returns polygonal points
    rect.getPoints = function(){
        let points = [
            rect.topLeft(),
            rect.topRight(),
            rect.bottomLeft(),
            rect.bottomRight()
        ];
        return points;
    };
    rect.contains = function(point){
        let tl = rect.topLeft();
        let br = rect.bottomRight();
        if(point.x >= tl.x && point.x <= br.x){
            if(point.y >= tl.y  && point.y <= br.y){
                return true;
            }
        }
        return false;
    };
    rect.isInside = function(otherRect){
        return otherRect.contains(rect.topLeft()) &&
            otherRect.contains(rect.topRight()) &&
            otherRect.contains(rect.bottomLeft()) &&
            otherRect.contains(rect.bottomRight());
    };
    rect.overlaps = function(otherRect){
        let largest = rect;
        let smallest = otherRect;
        if(otherRect.size.x * otherRect.size.y > rect.size.x * rect.size.y){
            largest = otherRect;
            smallest = rect;
        }
        let points = smallest.getPoints();
        for(let point of points){
            if(largest.contains(point)){                
                return true;
            }
        }
        return false;
    };
    rect.recenter = function(point){
        let halfSize = VECTOR2.new(rect.size.x/2, rect.size.y/2);
        rect.position = VECTOR2.new(point.x-halfSize.x, point.y-halfSize.y);
    };
    rect.toString = function(){
        let ret = "Rect[";
        ret += rect.position.toString();
        ret += ", " + rect.size.toString();
        ret += "]";
        return ret;
    };
    rect.clone = function(){
        return SHAPES.RECT.new(rect.position.clone(), rect.size.clone());
    };

    return rect;
};