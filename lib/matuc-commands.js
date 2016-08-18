'use babel';

const iPath = require('path');
const iRef = require('child_process');
const iExec = iRef.exec;
const iExecFile = iRef.execFile;

//functions to execute matuc functions from within the agsbs package
export default class Matuc {

	/**
	* Creates a new matuc project, executes `matuc_js new`
	* @param {int} countOfAppendixChapters The count of chapters in appendix
	* @param {int} countOfChapters The count of chapters
	* @param {boolean} preface Whether a preface shall be added
	* @param {string} language Sets the language for the matuc project
	* @param {string} path Sets the path where the project shall be stored
	*/
	newProject(countOfAppendixChapters, countOfChapters, preface, language, path) {
		var cmd = 'matuc_js new ';
		cmd = countOfAppendixChapters ? cmd + '-a ' + countOfAppendixChapters + ' ' : cmd;
		cmd = countOfChapters !== null ? cmd + '-c ' + countOfChapters + ' ' : cmd;
		cmd = preface == true ? cmd + '-p ' : cmd;
		cmd = language !== null ? cmd + '-l ' + language + ' ' : cmd;
		cmd = path !== null ? cmd + path : cmd + '.';

		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	/**
	* Generates a table of contents, executes `matuc toc`
	* @param {string} path The path to directory of the project to which a table of contents shall be added
	*/
	generateTableOfContents(path) {
		var cmd = 'matuc toc ' + path;
		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	/**
	* Updates the metadata of the matuc project, executes `matuc conf update`
	* @param {int} depthOfTableOfContents The depth of the table of contents
	* @param {string} sourceAuthor The name of the author
	* @param {string} title The title of the resource
	* @param {string} source The source
	* @param {string} path The Path to the matuc project
	*/
	updateMetaData(depthOfTableOfContents, sourceAuthor, title, source, path) {
		var cmd = path !== null ? "cd " + path +" &" : cmd + '.';
		cmd = cmd + ' matuc conf update ';
		cmd = sourceAuthor ? cmd + '-e \"' + sourceAuthor + '\" ' : cmd;
		cmd = title ? cmd + '-l \"' + title + '\" ' : cmd;
		cmd = source  ? cmd + '-s \"' + source + '\" ' : cmd;
		cmd = depthOfTableOfContents  ? cmd + '--toc-depth ' + depthOfTableOfContents + ' ' : cmd;


		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	/**
	* Generates an HTML file from markdown file, executes `matuc conv`
	* @param {object} activePaneItem The current pane the user is working in
	*/
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

	/**
	* Checks and saves changes in the current opened file invoking mistkerl, executes `matuc_js mk`
	*/
	checkAndSaveChanges() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var file = editor.buffer.file.path;
		var path = iPath.dirname(file);
		var cmd = `matuc_js mk ${path}`;
		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			mistkerl = JSON.parse(stdout);
			if (typeof mistkerl.result === 'string') {
				atom.notifications.addSuccess(language.mistkerlDidNotFindAnyErrorAndSavedFile, {
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

	/**
	* Checks all markdown files in the project folder invoking mistkerl and saves the currend opened file, executes `matuc_js mk`
	*/
	checkEntireProject() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var path = iPath.dirname(editor.buffer.file.path) + '/..';
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
				let errors = mistkerl.result;
				let fileNames = Object.keys(errors);
				for (let i = 0; i < fileNames.length; i++) {
					let errorsInLines = errors[fileNames[i]];
					let message = '';
					for (l = 0; l < errorsInLines.length; l++) {
						let lines = Object.keys(errorsInLines[l]);
						for (j = 0; j < lines.length; j++) {
							message += language.line + lines[j] + ': ' + errorsInLines[l][lines[j]] + '\n';
						}
					}
					atom.notifications.addError(language.mistkerlFoundErrorInFile + iPath.basename(fileNames[i]), {
						detail : message,
						dismissable : true
					});
				}
				editor.save();
			}

			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	outsourceImgDesc(desc, currentPath, pathToImg, title) {
		var t = title.replace(/\s/g, '_');
		var cmd = `matuc_js imgdsc -d ${desc} -t ${t} ${pathToImg}`;
		iExec(cmd, {cwd: currentPath}, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
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
