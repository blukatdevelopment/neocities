/*##############################################################################
# Displays text on the top-right corner of the screen.
##############################################################################*/
UI.COMPONENTS.NotificationBar = {};
UI.COMPONENTS.NotificationBar.new = function(){
    let nbRect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(40, 40)
    );
    let sprite = SPRITES.static.statusbar.statusbar;    
    let nb = UI.COMPONENTS.BaseComponent.new(nbRect, null);
    nb.notifications = [];
    nb.expireTime = null;
    nb.draw = function(){
        if(nb.notifications.length == 0){
            return;
        }
        let now = Date.now();
        if(nb.expireTime != null && now > nb.expireTime){
            nb.expireTime = null;
            nb.notifications.shift();
            return;
        }
        if(nb.expireTime == null){
            nb.expireTime = now + SETTINGS.NotificationDuration;
        }
        GRAPHICS.drawText(nb.notifications[0], 0, 20, 20, GRAPHICS.Colors.White);
    };
    nb.notification = function(message){
        nb.notifications.push(message);
    };
    return nb;
};