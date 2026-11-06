UTILITY.randRange = function(min, max){
  return Math.round(Math.random() * (max - min) + min);
};

// Random int between 1 and max
RANDOM.roll = function(max){
  return UTILITY.randRange(1, max);
};

// 1 in <size> chance. Returns true on a success
RANDOM.chance = function(size){
    let roll = UTILITY.randRange(1, size);
    return roll == size;
};

RANDOM.choice = function(optionsList){
  return optionsList[UTILITY.randRange(0, optionsList.length-1)];
};