/*##############################################################################
# Shell resembling unix shell
# Prints output to the terminal bassed on the input string.
##############################################################################*/
var SHELL = {};


SHELL.process = function(input){
	let args = input.split(' ');
	let program = args[0];
	if(program == null || program == ""){
		return;
	}
	switch(program){
		case "help":
			TERMINAL.print("Try one of these commands: echo");
			return;
		case "echo":
			TERMINAL.print(input.slice(program.length+1, input.length));
			return;
		break;
		case "ls":
			SHELL.ls(args);
			return
	}
	TERMINAL.print("Unknown command: " + input);
}


