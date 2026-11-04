RANDOM.Die = {};
RANDOM.Die.new = function(sides){
    let die = {};
    die.sides = sides;
    die.roll = function(){
        return RANDOM.range(1, die.sides);
    };
    return die;
};


RANDOM.D2 = function(){
    return RANDOM.Die.new(2);
};

RANDOM.D3 = function(){
    return RANDOM.Die.new(3);
};

RANDOM.D4 = function(){
    return RANDOM.Die.new(4);
};

RANDOM.D6 = function(){
    return RANDOM.Die.new(6);
};

RANDOM.D20 = function(){
    return RANDOM.Die.new(20);
};