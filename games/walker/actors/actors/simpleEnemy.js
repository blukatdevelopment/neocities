/*##############################################################################
# Wandersand pauses in random directions
##############################################################################*/
AGENT.SIMPLE_ENEMY = {};
AGENT.SIMPLE_ENEMY.new = function(actor){
    let se = {
        nextDirectionChange: Date.now(),
        direction: DIRECTIONS.none,
        actor: actor
    };
    se.direction = UTILITY.randRange(DIRECTIONS.none, DIRECTIONS.east);
    se.nextDirectionChange = Date.now() + (1000 * UTILITY.randRange(1, 3)); 
    se.update = function(){
        if(Date.now() > se.nextDirectionChange){
            se.direction = UTILITY.randRange(DIRECTIONS.north, DIRECTIONS.east);
            se.nextDirectionChange = Date.now() + (1000 * UTILITY.randRange(1, 5));
        }
        if(se.direction != DIRECTIONS.none){
            se.actor.move(se.direction);
        }
    };
    return se;
};
