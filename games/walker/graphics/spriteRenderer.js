// Renders a single sprite with no animations
SPRITES.SpriteRenderer = {};
SPRITES.SpriteRenderer.new = function(sprite, position){
  let sr = {
    sprite: sprite,
    position: VECTOR2.new(0, 0),
    parent: null // inherent position from an object
  };
  if(position){
    sr.position = position;
  }
  sr.update = function(){
    sr.draw();
  };
  sr.draw = function(){
    let pos = sr.position;
    if(sr.parent){
      pos = sr.parent.getPosition();
    }
    SPRITES.renderSprite(pos.x, pos.y, sr.sprite.index, sr.sprite.sheet);
  };
  sr.setSprite = function(newSprite){
    sr.sprite = newSprite;
  };
  sr.getRect = function(){
    if(sr.sprite == null){
      return SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(0,0));
    }
    let position = VECTOR2.new(0,0);
    if(sr.parent){
      position = sr.parent.position;
    }
    return SHAPES.RECT.new(
      position,
      VECTOR2.new(sr.sprite.sheet.cellResolutionX,sr.sprite.sheet.cellResolutionY)
    );
  };
  sr.toString = function(){
    let ret = "Renderer[";
    ret += "sprite: " + sr.sprite.name;
    ret += ", position: " + sr.position.toString();
    ret += ", parent: " + parent;
    ret += "]";
    return ret;
  };
  return sr;
};