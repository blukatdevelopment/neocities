# Walker

## Premise
The title will probably change, but this should be a clone of the shootemup game called "chia bomber" from the old flash days of Neopets. The idea here is that the player guides their character around a maze-like terrain fighting computer-controlled opponents throwing projectiles. While this game is intended to work as a self-contained project, it is also an attempt to build a library of reusable pieces for other projects.

## Structure

### Scenes
This game uses the abstraction of loadable "scenes", collections of logic, UI, and game elements which can be switched between. Each scene is defined in `/scenes`

### Update / Game loop
A rather familiar pattern for game dev. `main.js` runs the gameloop, which calles `update` on the active scene, which updates all the entities in that scene. 

### Graphics
Everything is drawn to a 500x500 canvas to mimic the 512x448 resolution of the SNES. There's a library for programmatic graphics, but otherwise graphics are used through sprite sheets. This is not only intended for a retro aesthetic, but also to reduce the number of files that need to be served compared to having hundreds of smaller images. This is particularly relevant, because uploading hundreds of files to neocities would, in fact, drive me crazy.

### Fake interfaces
The intent is to use the component pattern here for optimal re-use. To make this less sketchy, `/interfaces` contains markdown files documenting the different fake interfaces. Javascript is not OOP, and will not enforce these fake interfaces. Comments should note when a interface is implemented, and whenever an interface is being used via composition.

## Development
In `walker.html` there should be two sets of `<script>` tags. When working locally, select the local one(updating to your machine) and run the html file in your browser. When deploying to neocities, upload all the scripts, and make sure the src matches their address online.