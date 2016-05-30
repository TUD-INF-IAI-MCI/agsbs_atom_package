'use babel';

const iPath = require('path');

const iRef = require('child_process');
const iExec = iRef.exec;
const iExecFile = iRef.execFile;

export default class Matuc {

	newProject(countOfAppendixChapters, countOfChapters, language, pathToNewProject) {
		var cmd = 'matuc new ';
		cmd = countOfAppendixChapters !== null ? cmd + '-a ' + countOfAppendixChapters + ' ' : cmd;
		cmd = countOfChapters !== null ? cmd + '-c ' + countOfChapters + ' ' : cmd;
		// should verify language abbr by regex
		cmd = language !== null ? cmd + '-l ' + language + ' ' : cmd;
		cmd = pathToNewProject !== null ? cmd + pathToNewProject : cmd + '.';

		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(cmd);
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
		console.log(cmd);
	}

	generateFile(activePaneItem) {
		var cmd, extension, file, filepath;
		if (activePaneItem != null ? activePaneItem.buffer.isModified() : void 0) {
			console.log('file is modified');
			activePaneItem.buffer.save();
		}
		file = activePaneItem != null ? activePaneItem.buffer.file : void 0;
		filepath = file != null ? file.path : void 0;
		extension = iPath.extname(iPath.basename(filepath));
		if (extension === '.md') {
			cmd = 'matuc conv ' + filepath;
			console.log("execute " + cmd);
			iExec(cmd, (error, stdout, stderr) => {
				if (error) {
					console.log(cmd);
					console.error(`exec error: ${error}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
				console.log(`stderr: ${stderr}`);
			});
			console.log(cmd);
		} else {
			alert('Bitte wählen Sie eine .md Datei aus, die in HTML umgewandelt werden soll.');
		}
	}
}

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
