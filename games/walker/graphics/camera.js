// Basic rectangular camera that can be panned
GRAPHICS.Camera = {};
GRAPHICS.Camera.new = function(position, size){
  let cam = {
    rect: SHAPES.RECT.new(position, size)
  };
  cam.move = function(destination){
    if(cam.boundsCheck(destination)){
      // Valid destination
      cam.rect.position = destination;
      return;
    }
    let pos = cam.rect.position;
    let destX = VECTOR2.new(destination.x, pos.y);
    if(cam.boundsCheck(destX)){
      // Move only on x axis if possible
      cam.rect.position = destX;
      return;
    }
    let destY = VECTOR2.new(pos.x, destination.y);
    if(cam.boundsCheck(destY)){
      // Move only on y axis if possible
      cam.rect.position = destY;
      return;
    }
  };
  cam.boundsCheck = function(destination){
    let levelRect = SCENE.getLevelRect();
    if(levelRect == null){
      return true;
    }
    let rect = cam.rect.clone();
    rect.position = destination;
    return rect.isInside(levelRect);
  };
  return cam;
};