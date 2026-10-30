// Divide the map up into cells for faster collision scans
PHYSICS.CellGrid = {};
PHYSICS.CollisionCellSize = 400;
PHYSICS.CellGrid.new = function(colliders, size){
    let grid = {
        size: size,
        cells: []
    };

    grid.init = function(){
        for(let i = 0; i< size*size; i++){
            grid.cells.push([]);
        }
        for(let collider of colliders){
            let cellIndex = grid.posToCellIndex(collider.absoluteRect().position);
            grid.cells[cellIndex].push(collider);
        }
    };
    grid.posToCellIndex = function(position){
        let cellSize = PHYSICS.CollisionCellSize;
        let gridX = Math.floor(position.x / cellSize);
        let gridY = Math.floor(position.y / cellSize);
        return gridX + (grid.size * gridY)
    };
    grid.getLocalColliders = function(point){
        let index = grid.posToCellIndex(point);
        return grid.cells[index];
    };
    grid.init();
    return grid;
};