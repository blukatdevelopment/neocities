/*##############################################################################
# SFX
# TODO: Add an init which loads all sounds at startup
##############################################################################*/
var SOUND = {}

SOUND.EFFECTS = {
  PEW: "https://github.com/blukatdevelopment/neocities/raw/main/assets/pew.mp3",
  IMPACT: "https://github.com/blukatdevelopment/neocities/raw/main/assets/impact.mp3",
  EXPLOSION: "https://github.com/blukatdevelopment/neocities/raw/main/assets/explosion.mp3"
};

SOUND.playSound = function(file){
  var audio = new Audio(file);
  audio.play();
}