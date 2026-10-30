PHYSICS.Collision = {};
PHYSICS.Collision.new = function(first, second){
    let col = {
        first: first, // Collider initiating collision
        second: second // Collider
    };
    col.toString = function(){
        let ret = "Collision[";
        ret += col.first.toString();
        ret += ", " + col.second.toString();
        ret += "]";
        return ret;
    };
    return col;
};