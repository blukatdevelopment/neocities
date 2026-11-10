LEVEL.Data = {};
LEVEL.Data.new = function(){
    let ld = {
        tileMap: null,
        entityData: [],
        playerPosition: null
    };
    ld.toJs = function(){
        return JSON.stringify(ld);

        return "This is totally valid JS, trust me ;3";
    };
    return ld;
};