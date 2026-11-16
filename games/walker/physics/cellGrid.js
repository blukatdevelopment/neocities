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
            if(grid.cells[cellIndex] != null){
                grid.cells[cellIndex].push(collider);
            }
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
    grid.getCellCoords = function(position){
        let index = grid.posToCellIndex(position);
        let y = Math.trunc(index / grid.size);
        let x = index % grid.size;
        return VECTOR2.new(x, y);
    };
    grid.getCollidersAtCell = function(coords){
        let index = grid.coordsToIndex(coords);
        if(index > -1 && index < grid.cells.length){
            return grid.cells[index];
        }
        return [];
    };
    grid.coordsToIndex = function(coords){
        let gridX = coords.x;
        let gridY = coords.y;
        return gridX + (grid.size * gridY)
    };
    grid.init();
    return grid;
};