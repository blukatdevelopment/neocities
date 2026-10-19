/*##############################################################################
# Generate and display a world map
##############################################################################*/
let WORLD = {};

// Record to hold terrain info
WORLD.Terrain = {};
WORLD.Terrain.Water = "water";
WORLD.Terrain.Sand = "Sand";
WORLD.Terrain.Steppe = "Steppe";
WORLD.Terrain.Grass = "Grass";
WORLD.Terrain.Forest = "Forest";
WORLD.Terrain.Rock = "Rock";
WORLD.Terrain.Snow = "Snow";
WORLD.TerrainData = {};
WORLD.TerrainData[WORLD.Terrain.Water] = { color: "rgb(3, 21, 140)"},
WORLD.TerrainData[WORLD.Terrain.Sand] = { color: "rgb(224, 206, 90)"},
WORLD.TerrainData[WORLD.Terrain.Steppe] = { color: "rgb(255, 204, 108)"},
WORLD.TerrainData[WORLD.Terrain.Grass] = { color: "rgb(11, 161, 22)"},
WORLD.TerrainData[WORLD.Terrain.Forest] = { color: "rgb(3, 31, 5)"},
WORLD.TerrainData[WORLD.Terrain.Rock] = { color: "rgb(87, 87, 87)"},
WORLD.TerrainData[WORLD.Terrain.Snow] = { color: "rgb(255, 255, 255)"}


WORLD.Grid = {};
WORLD.Grid.new = function(){
    let grid = {
        columns: 40,
        rows: 40,
        terrainMap: [],
        heightMap: [],
        humidityMap: [],
        heatMap: []
    };
    let gridSize = grid.columns * grid.rows;
    for(let i = 0; i < gridSize; i++){
        grid.terrainMap.push(null);
        grid.heightMap.push(null);
        grid.humidityMap.push(null);
        grid.heatMap.push(null);
    }
    grid.coordsToIndex = function(coords){
        return coords.x + (coords.y * grid.rows);
    };
    grid.indexToCoords = function(index){
        return VECTOR2.new(index % grid.columns, Math.trunc(index / grid.rows));
    };
    grid.coordsValid = function(coords){
        return coords.x > -1 && coords.x < grid.columns
                && coords.y > -1 && coords.y < grid.rows;
    };
    // All coords within a given radius, including the center
    grid.coordsInRadius = function(center, radius){
        let retList = [];
        let adjacencies = [];
        for(let i = (radius * -1); i < radius + 1; i++){
            for(let j = (radius * -1); j < radius + 1; j++){
                let coords = VECTOR2.new(center.x + i, center.y + j);
                if(grid.coordsValid(coords)){
                    retList.push(coords);
                }
            }
        }
        return retList;
    };
    return grid;
};

WORLD.Generate = {};
WORLD.Generate.HeatMap = function(grid){
    let equator = Math.trunc(grid.rows/2);
    for(let x = 0; x < grid.columns; x++){
        for(let y = 0; y < grid.rows; y++){
            let coords = VECTOR2.new(x, y);
            let index = grid.coordsToIndex(coords);
            let distance = Math.abs(y - equator);
            let heat = equator - distance;
            grid.heatMap[index] = heat;
        }
    }
};

// 0 is sea level
WORLD.Generate.ElevationMap = function(grid){
    for(let i = 0; i < 10; i++){
        let peakCoords = VECTOR2.new(UTILITY.randRange(0, grid.columns-1), UTILITY.randRange(0, grid.rows-1));
        let peakIndex = grid.coordsToIndex(peakCoords);
        for(let j = 0; j < 5; j++){
            WORLD.Generate.SlopeAroundPeak(grid, peakCoords, j);
        }
    }
    for(let x = 0; x < grid.columns; x++){
        for(let y = 0; y < grid.rows; y++){
            let coords = VECTOR2.new(x, y);
            let index = grid.coordsToIndex(coords);
            if(grid.heightMap[index] == null){
                grid.heightMap[index] = -1;
            }
        }
    }
};

WORLD.Generate.SlopeAroundPeak = function(grid, peak, radius){
    let height = 5 - radius; // Reduces by distance
    let coordsList = grid.coordsInRadius(peak, radius);
    for(let coords of coordsList){
        let index = grid.coordsToIndex(coords);
        if(grid.heightMap[index] == null){
            grid.heightMap[index] = height;
        }
    }
};


WORLD.Generate.HumidityMap = function(grid){
    for(let x = 0; x < grid.columns; x++){
        for(let y = 0; y < grid.rows; y++){
            let coords = VECTOR2.new(x, y);
            let index = grid.coordsToIndex(coords);
            let isWater = grid.heightMap[index] == -1;
            if(isWater){
                // Humidity on the water is 5
                grid.humidityMap[index] = 5;
            }
            else if(WORLD.Generate.isWaterAdjacent(grid, coords)){
                // Adjacent to water is 4
                grid.humidityMap[index] = 4;
            }
            else if(WORLD.Generate.isWaterNear(grid, coords)){
                grid.humidityMap[index] = 3;
            }
            else{
                grid.humidityMap[index] = 2;
            }
            WORLD.Generate.applySlopeHumidityModifiers(grid, coords, index);
        }
    }
};

WORLD.Generate.isWaterAdjacent = function(grid, coords){
    let neighbors = grid.coordsInRadius(coords, 1);
    for(let neighbor of neighbors){
        if(!neighbor.equals(coords)){
            let neighborIndex = grid.coordsToIndex(neighbor);
            if(grid.heightMap[neighborIndex] == -1){
                return true;
            }
        }
    }
    return false;
};

WORLD.Generate.isWaterNear = function(grid, coords){
    let neighbors = grid.coordsInRadius(coords, 2);
    for(let neighbor of neighbors){
        if(!neighbor.equals(coords)){
            let neighborIndex = grid.coordsToIndex(neighbor);
            if(grid.heightMap[neighborIndex] == -1){
                return true;
            }
        }
    }
    return false;
};

WORLD.Generate.applySlopeHumidityModifiers = function(grid, coords, index){
    if(grid.humidityMap[index] > 3){
        // coastal cells immune from modifier
        return;
    }
    let elevation = grid.heightMap[index];
    let eastNeighbor = VECTOR2.new(coords.x+1, coords.y);
    let eastValid = grid.coordsValid(eastNeighbor);
    let westNeighbor = VECTOR2.new(coords.x-1, coords.y);
    let westValid = grid.coordsValid(westNeighbor);
    if(westValid && grid.heightMap[grid.coordsToIndex(westNeighbor)] > elevation){
        // If cut off from humid winds, penalty
        grid.humidityMap[index] -= 2;
    }
    else if(eastValid && grid.heightMap[grid.coordsToIndex(eastNeighbor)] > elevation){
       // If humids winds are trapped by eastern elevation, bonus
       grid.humidityMap[index] += 2;
    }
};

WORLD.Generate.TerrainMap = function(grid){
    for(let x = 0; x < grid.columns; x++){
        for(let y = 0; y < grid.rows; y++){
            let coords = VECTOR2.new(x, y);
            let index = grid.coordsToIndex(coords);
            grid.terrainMap[index] = WORLD.Generate.calculateTerrain(grid, coords, index);
        }
    }
};

WORLD.Generate.calculateTerrain = function(grid, coords, index){
    let elevation = grid.heightMap[index];
    let humidity = grid.humidityMap[index];
    let heat = grid.heatMap[index];

    if(elevation < 0){
        // You're below sea level
        return WORLD.Terrain.Water;
    }
    if(elevation == 1){
        // You're on a beach
        return WORLD.Terrain.Sand;
    }
    if(elevation == 4){
        // You're too high up for vegetation
        return WORLD.Terrain.Rock;
    }
    if(elevation == 5){
        // You're so high up it snows
        return WORLD.Terrain.Snow;
    }
    // By this point elevation is 2 or 3, mainland
    if(heat < 5){
        // It's very cold this far from the equator
        return WORLD.Terrain.Snow;
    }
    if(humidity < 2){
        // You're in a non-frozen desert
        return WORLD.Terrain.Sand;
    }
    if(humidity > 3){
        // You've got a humidity bonus, have some trees
        return WORLD.Terrain.Forest;
    }
    // Humidity must be 3 by this point
    if(heat > 17){
        // Much too hot to retain water
        // Adjust this if you change elevation range
        return WORLD.Terrain.Steppe;
    }
    // By process of elimination, you're in-land.
    // You're at elevation 3, humidity 3,
    // neither close nor far from the equator,
    // and slope is not effecting your humidity
    return WORLD.Terrain.Grass;
};

// Dry land's a myth
WORLD.Generate.WaterWorld = function(){
    let grid = WORLD.Grid.new();
    let gridSize = grid.columns * grid.rows;
    for(let i = 0; i < gridSize; i++){
        grid.terrainMap[i] = WORLD.Terrain.Water;
    }
    return grid;
};

// Good for exploring on foot
WORLD.Generate.GrassWorld = function(){
    let grid = WORLD.Grid.new();
    let gridSize = grid.columns * grid.rows;
    for(let i = 0; i < gridSize; i++){
        grid.terrainMap[i] = WORLD.Terrain.Grass;
    }
    return grid;
};

WORLD.Generate.DetailedWorld = function(){
    let grid = WORLD.Grid.new();
    WORLD.Generate.HeatMap(grid);
    WORLD.Generate.ElevationMap(grid);
    WORLD.Generate.HumidityMap(grid);
    WORLD.Generate.TerrainMap(grid);
    return grid;
};