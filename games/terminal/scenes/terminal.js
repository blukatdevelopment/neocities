/*##############################################################################
# Scene: Terminal
##############################################################################*/
var TERMINAL = {};

TERMINAL.PROMPT = "user@computer: ";

TERMINAL.KEYS_NORMAL = {KEY_0: "0", KEY_1: "1", KEY_2: "2", KEY_3: "3", KEY_4: "4", KEY_5: "5", KEY_6: "6", KEY_7: "7", KEY_8: "8", KEY_9: "9", KEY_A: "a", KEY_B: "b", KEY_C: "c", KEY_D: "d", KEY_E: "e", KEY_F: "f", KEY_G: "g", KEY_H: "h", KEY_I: "i", KEY_J: "j", KEY_K: "k", KEY_L: "l", KEY_M: "m", KEY_N: "n", KEY_O: "o", KEY_P: "p", KEY_Q: "q", KEY_R: "r", KEY_S: "s", KEY_T: "t", KEY_U: "u", KEY_V: "v", KEY_W: "w", KEY_X: "x", KEY_Y: "y", KEY_Z: "z", K_SPACE: " "};
TERMINAL.KEYS_SHIFTED = {KEY_0: ")", KEY_1: "!", KEY_2: "@", KEY_3: "#", KEY_4: "$", KEY_5: "%", KEY_6: "^", KEY_7: "&", KEY_8: "*", KEY_9: "(", KEY_A: "A", KEY_B: "B", KEY_C: "C", KEY_D: "D", KEY_E: "E", KEY_F: "F", KEY_G: "G", KEY_H: "H", KEY_I: "I", KEY_J: "J", KEY_K: "K", KEY_L: "L", KEY_M: "M", KEY_N: "N", KEY_O: "O", KEY_P: "P", KEY_Q: "Q", KEY_R: "R", KEY_S: "S", KEY_T: "T", KEY_U: "U", KEY_V: "V", KEY_W: "W", KEY_X: "X", KEY_Y: "Y", KEY_Z: "Z", K_SPACE: " "};

// Text buffer of fixed size
TERMINAL.BUFFER = function(length, overflow){
    var buff = {};
    buff._buffer = "";
    buff._length = length;
    buff._overflow = overflow

    buff.add = function(text){
        if(buff._overflow == false && buff._buffer.length + text.length <= buff._length){
            buff._buffer += text;
            return;
        }
        if(buff._overflow){
            if(buff._buffer.length + text.length < buff._length){
                const overflow = buff._buffer.length + text.length - buff._length;
                buff._buffer = buff._buffer.slice(overflow, buff._buffer.length);
                buff._buffer += text;
            }
        }

    };

    buff.backspace = function(){
        if(buff._buffer.length > 0){
            buff._buffer = buff._buffer.slice(0, -1);
        }
    };

    buff.clear = function(){
        buff._buffer = "";
    }

    buff.contents = function(){
        return buff._buffer;
    }
    return buff;
}

TERMINAL.outputBuffer = TERMINAL.BUFFER(500, true);
TERMINAL.inputBuffer = TERMINAL.BUFFER(60, false);

TERMINAL.print = function(text){
    if(text == null || text == ""){
        return;
    }
    TERMINAL.outputBuffer.add(text + "\n");
}

TERMINAL.mouseUp = function(){}

TERMINAL.update = function(){
    TERMINAL.handleKeyboardInput();
    GRAPHICS.clearCanvas();
    GRAPHICS.setFillStyle("black");
    GRAPHICS.fillBox(0, 0, MAIN.SCREEN_MAX, MAIN.SCREEN_MAX);
    GRAPHICS.setFillStyle("green");
    TERMINAL.drawInput();
    TERMINAL.drawOutput();
}

TERMINAL.drawOutput = function(){
    const fontSize = 12;
    const fontWidth = fontSize/2;
    const lineLength = MAIN.SCREEN_MAX/fontWidth;
    const linesCount = (MAIN.SCREEN_MAX/fontSize) -2;
    const lines = TERMINAL.breakIntoLines(TERMINAL.outputBuffer.contents(), lineLength);

    while(lines.length > linesCount){
        lines.shift();
    }
    for(var i = 0; i<linesCount+1 && i<lines.length; i++){
        const indexStart = i*lineLength;
        const indexEnd = indexStart + lineLength;
        const text = lines[i];
        GRAPHICS.drawText(text, fontSize, 0, fontSize + (fontSize * i));
    }
}

TERMINAL.breakIntoLines = function(text, lineLength){
    let breakLines = text.split('\n');
    let lines = [];
    for(let lineIndex in breakLines){
        let line = breakLines[lineIndex];
        var regex = new RegExp('.{1,'+ Math.trunc(lineLength) +'}', 'gi');
        let subLines = line.match(regex);
        for(let subLine in subLines){
            lines.push(subLines[subLine]);
        }
    }
    return lines;
}

TERMINAL.drawInput = function(){
    const fontSize = 12;
    GRAPHICS.drawText(TERMINAL.PROMPT + TERMINAL.inputBuffer.contents(), fontSize, 0, MAIN.SCREEN_MAX-(fontSize/2));
}

TERMINAL.isStartButtonSelected = function(){
    var boxTopLeft = { x: 100, y: 100 };
    var boxBottomRight = { x: 200, y: 200};
    var point = INPUT.getMousePosition();
    if(!point){
      return false;
    }
    if(typeof point === "undefined"){
        return false;
    }
    return UTILITY.isInsideBox(boxTopLeft, boxBottomRight, point);
}

TERMINAL.mouseDown = function(){
}

TERMINAL.getKeyText = function(key){
    if(key in TERMINAL.KEYS_NORMAL){
        return TERMINAL.KEYS_NORMAL[key];
    }
    return "";
}

TERMINAL.handleKeyboardInput = function(){
    for( const event of INPUT.EVENTS){
        if(event.TYPE == 'INPUT_EVENT' && event.EVENT == INPUT.KEY_EVENTS.KEY_DOWN){
            const text = TERMINAL.getKeyText(event.KEY);
            TERMINAL.inputBuffer.add(text);
            if(event.KEY == "K_BACKSPACE"){
                TERMINAL.inputBuffer.backspace();
            }
            if(event.KEY == "K_ENTER"){
                const text = TERMINAL.PROMPT + TERMINAL.inputBuffer.contents();
                TERMINAL.print(text);
                SHELL.process(TERMINAL.inputBuffer.contents());
                TERMINAL.inputBuffer.clear();
            }
        }
    }

}
