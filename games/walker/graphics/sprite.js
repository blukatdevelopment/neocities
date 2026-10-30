// A single cell to be rendered by a SpriteRenderer
SPRITES.Sprite = {};
SPRITES.Sprite.new = function(name, sheet, index){
  let st = {
    name: name,
    sheet: sheet,
    index: index
  };
  st.toString = function(){
    return "Sprite[" + st.name + ", sheet:" + st.sheet.name + ", index:" + st.index + "]";
  };
  return st;
};