# Walker

## Premise
The title will probably change, but this should be a clone of the shootemup game called "chia bomber" from the old flash days of Neopets. The idea here is that the player guides their character around a maze-like terrain fighting computer-controlled opponents throwing projectiles. While this game is intended to work as a self-contained project, it is also an attempt to build a library of reusable pieces for other projects.

## Structure

### Files
While in most OOP projects you have strict "one class per file" rules, I'm relaxing that a bit. Each additional file adds a bit of overhead, as this game is to be hosted on neocities, and the deployment process is manual. 10-20 scripts is going to be about the maximum number of scripts I'm going to want to upload by hand.

### Scenes
This game uses the abstraction of loadable "scenes", collections of logic, UI, and game elements which can be switched between. Each scene is defined in `/scenes`

### Update / Game loop
A rather familiar pattern for game dev. `main.js` runs the gameloop, which calles `update` on the active scene, which updates all the entities in that scene. There's a separate framerate for both the game loop and frames in animations. `UTILITY.delayExecute()` will execute something a number of frames in the future.

### Settings file
Global constants and application settings are largely consolidated into `settings.js`.

### Graphics
Everything is upscaled from a 400x400 viewport to mimic the 512x448 resolution of the SNES. Sprite sheets consist of a single row of cells with no padding, and there's a separate sheet for each actor.

## Development
For local development, make sure that `SETTINGS.devMode` is true in `settings.js`, then run `walker.dev.html`. Should your environments not match mine, update the script urls in the html and their constants in the `settings.js`.

## Deployment
0. Ensure the urls in `walker.html` reflect your environment
1. Ensure SETTINGS.prodUrl matches step 0
2. Ensure SETTINGS.devMode = false
3. Deploy everything but `walker.dev.html`
4. Serve `walker.html` as the game page