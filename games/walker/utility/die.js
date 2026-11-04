RANDOM.Die = {};
RANDOM.Die.new = function(sides){
    let die = {};
    die.sides = sides;
    die.roll = function(){
        return RANDOM.range(1, die.sides);
    };
    return die;
};


UTILITY.d6 = function(){
    return UTILITY.randRange(1, 6);
};

UTILITY.d20 = function(){
    return UTILITY.randRange(1, 6);
};