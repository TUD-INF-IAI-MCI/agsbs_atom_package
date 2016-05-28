(function() {
	var MatucCommands;

	const path = require('path');

	const ref = require('child_process');
	const exec = ref.exec;
	const execFile = ref.execFile;

	module.exports = MatucCommands = (function() {
		function MatucCommands() {}


	    /*
		old  { "keys": ["f5"], "command": "create_html_file"},

		Generate html file of selected buffer, which has to be a Markdown file, *.md
		It is also tested ist the buffer is modified
 		*/

		MatucCommands.prototype.newProject = function(countOfAppendixChapters, countOfChapters, language, pathToNewProject) {
			var cmd = 'matuc new ';
			cmd = countOfAppendixChapters !== null ? cmd + '-a ' + countOfAppendixChapters + ' ' : cmd;
			cmd = countOfChapters !== null ? cmd + '-c ' + countOfChapters + ' ' : cmd;
			// should verify language abbr by regex
			cmd = language !== null ? cmd + '-l ' + language + ' ' : cmd;
			cmd = pathToNewProject !== null ? cmd + pathToNewProject : cmd + '.';

			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					console.log(cmd);
					console.error(`exec error: ${error}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
				console.log(`stderr: ${stderr}`);
			});
			console.log(cmd);
			return MatucCommands;
		}

	    MatucCommands.prototype.generateFile = function(activePaneItem) {
	    	var cmd, extension, file, filepath;
			if (activePaneItem != null ? activePaneItem.buffer.isModified : void 0) {
				console.log('file is modified');
				if (activePaneItem != null) {
					activePaneItem.buffer.save();
				}
			}
			file = activePaneItem != null ? activePaneItem.buffer.file : void 0;
			filepath = file != null ? file.path : void 0;
			extension = path.extname(path.basename(filepath));
			if (extension === '.md') {
    			cmd = 'matuc conv ' + filepath;
				console.log("execute " + cmd);
				return exec(cmd);
			} else {
				return alert('Selektieren Sie eine md-Datei');
			}
		};

		return MatucCommands;

	})();


  /* ToDos

   The installation of Matuc is required for all these commands

   { "keys": ["f2"], "command": "create_structure"},
   --> matuc init
   { "keys": ["f3"], "command": "check_with_mk" , "args": {"function": "checkFile"} },
   --> matuc mk
   { "keys": ["f4"], "command": "check_with_mk" , "args": {"function": "checkAll"} },
   --> matuc mk ??
   { "keys": ["f5"], "command": "create_html_file"},
   --> matuc conv filename
   { "keys": ["f6"], "command": "create_all"},
   --> matuc master pfad
   */

}).call(this);
