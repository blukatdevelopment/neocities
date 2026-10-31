SHAPES.Line = {};
SHAPES.Line.new = function(origin, terminus){
    let line = {
        origin: origin,
        terminus: terminus
    };
    line.intersection = function(other){
        let x1 = line.origin.x;
        let y1 = line.origin.y;
        let x2 = line.terminus.x;
        let y2 = line.terminus.y;
        let x3 = other.origin.x;
        let y3 = other.origin.y;
        let x4 = other.terminus.x;
        let y4 = other.terminus.y;

        let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        // If denominator is 0, the lines are parallel or collinear
    if (denominator === 0) {
        return null;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // Is the intersection point along both segments?
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return null;
    }

    // Calculate the absolute x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return VECTOR2.new(x, y);
    };
    return line;
};