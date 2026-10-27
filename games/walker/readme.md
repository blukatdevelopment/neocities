# Walker

## Premise
The title will probably change, but this should be a clone of the shootemup game called "chia bomber" from the old flash days of Neopets. The idea here is that the player guides their character around a maze-like terrain fighting computer-controlled opponents throwing projectiles. While this game is intended to work as a self-contained project, it is also an attempt to build a library of reusable pieces for other projects.

## Structure

### Scenes
This game uses the abstraction of loadable "scenes", collections of logic, UI, and game elements which can be switched between. Each scene is defined in `/scenes`

### Update / Game loop
A rather familiar pattern for game dev. `main.js` runs the gameloop, which calles `update` on the active scene, which updates all the entities in that scene. 

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

# Design
I'm going to stuff some design decisions in this document for later reference.

## Progression / Balance
Vertical progression replaces an existing option with a superior one, usually using higher numbers with the same mechanic. In RPGs the player character starts at level 1 and gains higher stats as they level up. In response, the designers of a game will attempt to balance enemies in order to match a particular level. If balance is perfect, then playing at the appropriate level will result in uniform difficulty, under-leveling will result in harder gameplay, and over-leveling will result in easy gameplay.

In order to provide a sandbox, I'll thus want to limit vertical progression across the world that is generated. Some areas may be more dangerous or challenging than others, but it should not be because every combat encounter is perfectly balanced with level-appropriate stats. The entire world should be explorable, regardless of level, and should not be rendered obsolete as the player character progresses. Likewise, the entire world should not level up with the player in order to arrive at perfect balance. Instead, the world should offer a variety of challenges with different aspects. As the player progresses through the game, they should be given choices offering both vertical and horizontal progression.

Each level, a player should be able to pick from a list of perks. Perks may come with a stat increase, but may also come with an ability. Initially, the thought is to have a level cap of 10. After level 10, the player may continue to level up, but each new ability must replace an existing one.

At this moment, the target is a default commoner stat block of 10HP, 10Energy, and 1 unarmed damage.

## Day/Night cycle
A day consists of 24 hours. Dawn is 06, noon is 12, dusk is 18, and midnight is 24. In real time, a day cycle should take between 10 and 20 minutes.

## Rest
Between dusk and 02 the player can attempt to rest at a bed or on the ground. Successfully resting advances time to dawn, and failing a rest results in enemies appearing and interrupting. The chance of success is 6/6 in safety, 3/6 in the wilderness, and 1/6 in a dungeon. This is to make exploring and delving more dangerous than staying in a town. A campfire raises success chance by 1. Failing to rest before dawn results in an "exhausted" debuff. Successfully resting removes "exhausted". If "exhausted" is already removed, the player gains a "well-rested" buff, the duration decided on hours slept. Resting before 7 counts as a day of bedrest and fully restores the player's resources.

## Food
When consumed, a food gives a buff to health, energy, and magic bars for a duration. Up to three foods can be consumed at once, filling three food slots. This is encourage the player to regularly consume foods. Meaty foods offer more health, fatty and sweet foods offer more energy, and magical herbs offer magic. Each combination of unique foods is a balance between the three resource bars. Cooking is achieved by using a recipe at a cooking station, resulting in a cooked food. Cooked foods offer more possible unique food combinations from the same pool of ingredients, and have their effects increased. To help mitigate vertical scaling, the following other properties can be balanced as trade-offs: duration, instant resource restoration, resource regen over time, non-resource buffs, and stack size. By balancing all of these, it might be possible to allow several biomes to offer different, yet balanced food choices.

## Healing
Both food and the "well-rested" buff from resting provide slow healing over time. The act of eating and resting heals a small amount instantly. The intent is to keep health is a precious resource, and to maintain it while continually fighting consumes magic and healing items.

## Equipment
A paper doll provides slots to equip items. The head, torso, legs, and feet slots can be filled by clothing and armor. Two slots presenting the main and off hand can be equipped with weapons and shields, some of which taking up both slots. A button(perhaps R or F) allows the equipped items to be stowed or drawn. When drawn, left and right mouse buttons use the equipped items. Additionally, three relic slots ought to allow items to be worn which offer a buff. Like food, switching between relics should allow a player to switch between different loadouts for their play style or situation.

## Magic
The player gains a magic bar through food, relics, or abilities. Each spell a character knows is represented as a physical item such as a scroll, spellbook, or relic, and occupies an inventory slot. Some spells may consume energy and health in addition to or in place of magic.

## Alchemy
Certain items such as food and monster parts are alchemical ingredients, and thus have four alchemical properties. A mortar and pestle can combine two raw ingredients that share a property, creating rough potion that contains any properties held in common, and randomly fills the remaining properties. A calcinator purifies a rough potion, removing one its effects at random. An alembic converts three potions to one with stronger properties. A potion is thus made by blending, purifying, and distilling the raw ingredients.
