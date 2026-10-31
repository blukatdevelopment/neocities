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
    rect.rightEdge = function(){
        return SHAPES.Line.new(rect.topRight(), rect.bottomRight());
    };
    rect.leftEdge = function(){
        return SHAPES.Line.new(rect.topLeft(), rect.bottomLeft());
    };
    rect.topEdge = function(){
        return SHAPES.Line.new(rect.topLeft(), rect.topRight());
    };
    rect.bottomEdge = function(){
        return SHAPES.Line.new(rect.bottomLeft(), rect.bottomRight());
    };
    rect.getEdges = function(){
        let edges = [];
        edges.push(rect.rightEdge());
        edges.push(rect.leftEdge());
        edges.push(rect.topEdge());
        edges.push(rect.bottomEdge());
        return edges;
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
        let tl1 = rect.topLeft();
        let br1 = rect.bottomRight();
        let tl2 = otherRect.topLeft();
        let br2 = otherRect.bottomRight();

        let above = tl1.y > br2.y;
        let below = tl2.y > br1.y;
        let toRight = tl1.x > br2.x;
        let toLeft = tl2.x > br1.x;
        if(above || below || toRight || toLeft){
            return false;
        }
        return true;
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