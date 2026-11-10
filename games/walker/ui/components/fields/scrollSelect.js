/*##############################################################################
# Select from a list of string labels that you can scroll through
##############################################################################*/
UI.COMPONENTS.ScrollSelect = {};
UI.COMPONENTS.ScrollSelect.new = function(rect, options, displayCount){
    let ss = {
        rect: rect,
        options: options,
        displayCount: displayCount,
        labels: null,
        selected: 0,
        index: 0,
        textHeight: 8
    };
    ss.init = function(){
        ss.updateOptions();
        let buttonX = ss.rect.position.x + 72;
        let topY = ss.rect.position.y;
        ss.upButton = UI.COMPONENTS.SpriteButton.new(
            SHAPES.RECT.new(
                VECTOR2.new(buttonX, topY),
                VECTOR2.new(8,8)
            ),
            SPRITES.static.cursors.arrowBlack,
            () => { ss.scrollUp(); },
            "Scroll Up"
        );
        let bottomY = ss.rect.position.y + ss.rect.size.y;
        ss.downButton = UI.COMPONENTS.SpriteButton.new(
            SHAPES.RECT.new(
                VECTOR2.new(buttonX, bottomY),
                VECTOR2.new(8,8)
            ),
            SPRITES.static.cursors.arrowBlackDown,
            () => { ss.scrollDown(); },
            "Scroll Down"
        );
    };

    ss.scrollUp = function(){
        ss.index -= ss.displayCount;
        if(ss.index < 0){
            ss.index = 0;
        }
    };
    ss.scrollDown = function(){
        if(ss.index < ss.options.length && ss.index + ss.displayCount < ss.options.length){
            ss.index += ss.displayCount;
        }
    };
    ss.updateOptions = function(){
        ss.labels = [];
        for(let i = 0; i < ss.options.length; i++){
            let option = ss.options[i];
            let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(ss.rect.size.x-ss.textHeight, ss.textHeight));
            let label = UI.COMPONENTS.TextLabel.new(
                rect,
                option,
                option,
                () => { ss.select(i); }
            );
            ss.labels.push(label);
        }
    };
    ss.update = function(){
        let start = ss.index;
        let end = ss.index + ss.displayCount;
        for(let i = start; i<end; i++){
            if(i < ss.labels.length){
                let label = ss.labels[i];
                let yOff =  (i - start) * ss.textHeight + ss.textHeight;
                label.rect.position = ss.rect.position.clone();
                label.rect.position.y += yOff;
                label.rect.position.x += ss.textHeight;
                label.update();
            }
        }
        ss.upButton.update();
        ss.downButton.update();
    };
    ss.draw = function(){
        // Draw a border
        let x = ss.rect.position.x;
        let y = ss.rect.position.y;
        let w = ss.rect.size.x;
        let h = ss.rect.size.height;
        let c = GRAPHICS.Colors.Black;
        GRAPHICS.drawBox(x, y, w, h, c);

        let start = ss.index;
        let end = ss.index + ss.displayCount;
        for(let i = start; i<end; i++){
            if(i < ss.labels.length){
                let label = ss.labels[i];
                label.draw();
            }
        }
        ss.upButton.draw();
        ss.downButton.draw();
    };
    ss.select = function(index){
        ss.selected = index;
    };
    ss.getSelected = function(){
        return ss.options[ss.selected];
    };
    ss.isHovered = function(){
        let mPos = INPUT.getDownScaledMousePosition();
        return ss.rect.contains(mPos);
    };
    ss.init();
    return ss;
};
