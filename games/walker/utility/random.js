UTILITY.randRange = function(min, max){
  return Math.round(Math.random() * (max - min) + min);
};

UTILITY.d6 = function(){
    return UTILITY.randRange(1, 6);
};

UTILITY.d20 = function(){
    return UTILITY.randRange(1, 6);
};

// 1 in <size> chance. Returns true on a success
UTILITY.chance = function(size){
    let roll = UTILITY.randRange(1, size);
    return roll == size;
};

UTILITY.choice = function(optionsList){
  return optionsList[UTILITY.randRange(0, optionsList.length-1)];
};