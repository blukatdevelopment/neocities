/*##############################################################################
# Record to display a food on the foodbar
##############################################################################*/
STATS.FoodStatus.new = function(name, sprite, remainingTime){
    let fs = {
        name: name,
        sprite: sprite,
        remainingTime: remainingTime
    };
    return fs;
};