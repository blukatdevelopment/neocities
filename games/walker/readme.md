# Walker

## Premise
The title will probably change, but this should be a clone of the shootemup game called "chia bomber" from the old flash days of Neopets. The idea here is that the player guides their character around a maze-like terrain fighting computer-controlled opponents throwing projectiles. While this game is intended to work as a self-contained project, it is also an attempt to build a library of reusable pieces for other projects.

## Structure

### Scenes
This game uses the abstraction of loadable "scenes", collections of logic, UI, and game elements which can be switched between. Each scene is defined in `/scenes`

### Update / Game loop
A rather familiar pattern for game dev. `main.js` runs the gameloop, which calles `update` on the active scene, which updates all the entities in that scene. 

### Entities
Any object that exists in the game world is represented by the entitiy. `/entities/entities/` contains individual entity definitions.

### Actors
A subclass of entity which acts on its own. Helper classes can be found in `/actors/`, and individual actor definitions can be found in `/actors/actors/`.

### Settings file
Global constants and application settings are consolidated
into `settings.js`. 

### Graphics
Everything is upscaled from a 400x400 canvas to mimic the 512x448 resolution of the SNES. Sprite sheets consist of a single row of cells with one pixel of padding, and there's a separate sheet for each animation. The actor animation controller will default to idle animations, so set them up first when you add new entities.

## Development
For local development, make sure SETTINGS.SETTINGS.devUrl is accurate. Either run `build.py` for a one-off build, or else run `autobuild.py` (making sure you have watchdog installed) to autobuild whenever you create or modify files in the project folder. In either case, you'll create `walker.build.html`, which you can open in a browser to test the game.

## Deployment
0. Ensure that SETTINGS.devMode is true and that SETTINGS.prodUrl is correct for your deployment
1. Run build.py
2. Deploy `/assets` (only the png files are used currently) into an `/assets` folder on neocities, then `walker.build.html` beside it
3. Serve `walker.build.html` as the game page