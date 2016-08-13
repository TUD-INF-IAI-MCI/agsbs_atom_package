'use babel';

const iPath = require('path');
const iRef = require('child_process');
const iExec = iRef.exec;
const iExecFile = iRef.execFile;

//functions that works with matuc
export default class Matuc {

	newProject(countOfAppendixChapters, countOfChapters, preface, language, path) {
		var cmd = 'matuc new ';
		cmd = countOfAppendixChapters !== null ? cmd + '-a ' + countOfAppendixChapters + ' ' : cmd;
		cmd = countOfChapters !== null ? cmd + '-c ' + countOfChapters + ' ' : cmd;
		cmd = preface == true ? cmd + '-p ' : cmd;
		cmd = language !== null ? cmd + '-l ' + language + ' ' : cmd;
		cmd = path !== null ? cmd + path : cmd + '.';

		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(cmd);
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	generateTableOfContents(path) {
		var cmd = 'matuc toc ' + path;
		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(cmd);
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	updateMetaData(depthOfTableOfContents, sourceAuthor, title, source) {
		var cmd = 'matuc conf update ';
		cmd = sourceAuthor !== null ? cmd + '-e ' + sourceAuthor + ' ' : cmd;
		cmd = title !== null ? cmd + '-l ' + title + ' ' : cmd;
		cmd = source !== null ? cmd + '-s ' + source + ' ' : cmd;
		cmd = depthOfTableOfContents !== null ? cmd + '--toc-depth ' + depthOfTableOfContents + ' ' : cmd;

		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(cmd);
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
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
			atom.notifications.addWarning(language.noMdWarningGenerate, {detail : language.noMdDetailGenerate, dismissable : true});
		}
	}

	checkAndSaveChanges() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var file = editor.buffer.file.path;
		var path = iPath.dirname(file);
		var cmd = `matuc_js mk ${path}`;
		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(cmd);
				console.error(`exec error: ${error}`);
				return;
			}
			mistkerl = JSON.parse(stdout);

			if (typeof mistkerl.result === 'string') {
				atom.notifications.addSuccess(language.mistkerlDidNotFindAnyError, {
					detail : '',
					dismissable : true
				});
			} else {
				let errors = mistkerl.result[file];
				let message = '';
				for (l = 0; l < errors.length; l++) {
					let lines = Object.keys(errors[l]);
					for (i = 0; i < lines.length; i++) {
						message += language.line + lines[i] + ': ' + errors[l][lines[i]] + '\n';
					}
				}
				atom.notifications.addError(language.mistkerlFoundErrorInFile + iPath.basename(file), {
					detail : message,
					dismissable : true
				});
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
		editor.save();
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
