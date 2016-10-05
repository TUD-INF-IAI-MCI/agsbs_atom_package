'use babel';

const iPath = require('path');
const iRef = require('child_process');
const iExec = iRef.exec;
const iExecFile = iRef.execFile;

//functions to execute matuc functions from within the agsbs package
export default class Matuc {

	checkIfFileIsWithinLecture() {
		var file = atom.workspace.getActivePaneItem().buffer.file;
		var cmd;
		if(process.platform == "win32"){
			cmd = 'cd \"' + atom.config.get('agsbs-atom-package.matucPath') +'\" & ';
			cmd += `matuc_js.exe iswithinlecture ${file.path}`;
		}
		if(process.platform == "darwin"){
			cmd = `matuc_js iswithinlecture ${file.path}`;
		}
		if(process.platform == "linux "){
			throw "Linux is not supported yet";
		}
		console.log("cmd checkIfFileIsWithinLecture : "+cmd);
		var isWithinLecture;
		return new Promise(function (resolve, reject) {
			iExec(cmd, (error, stdout, stderr) => {
				if (error) {
					return reject(error);
				}
				isWithinLecture = JSON.parse(stdout).result['is within a lecture'];
				resolve(isWithinLecture);
			});
		});
	}

	/**
	* Creates a new matuc project, executes `matuc_js new`
	* @param {int} countOfAppendixChapters The count of chapters in appendix
	* @param {int} countOfChapters The count of chapters
	* @param {boolean} preface Whether a preface shall be added
	* @param {string} language Sets the language for the matuc project
	* @param {string} path Sets the path where the project shall be stored
	*/
	newProject(countOfAppendixChapters, countOfChapters, preface, language, path) {

		var cmd;
		if(process.platform == "win32"){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +'\\matuc_js.exe\" ';
		}
		if(process.platform == "darwin"){
			cmd = 'matuc_js ';
		}
		if(process.platform == "linux "){
			throw "Linux is not supported yet";
		}
		cmd += 'new ';
		cmd = countOfAppendixChapters ? cmd + '-a ' + countOfAppendixChapters + ' ' : cmd;
		cmd = countOfChapters !== null ? cmd + '-c ' + countOfChapters + ' ' : cmd;
		cmd = preface == true ? cmd + '-p ' : cmd;
		cmd = language !== null ? cmd + '-l ' + language + ' ' : cmd;
		cmd = path !== null ? cmd + "\"" + path + "\"" : cmd + '.';
		console.log("command is  " +cmd);
		return new Promise(function (resolve, reject) {
			iExec(cmd, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return reject(error);
				}
				resolve({out: stdout, err: stderr});
				// console.log(`stdout: ${stdout}`);
				// console.log(`stderr: ${stderr}`);
			});
		});
	}

	/**
	* Generates a table of contents, executes `matuc toc`
	* @param {string} path The path to directory of the project to which a table of contents shall be added
	*/
	generateTableOfContents(path) {
		var cmd = 'matuc_js toc .';
		iExec(cmd, {cwd: path}, (error, stdout, stderr) => {
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
	updateMetaData(alternatePrefix, outputFormat, sourceAuthor, institution,
					title, language, source, semYear, tocDepth, workingGroup, path) {
		var cmd;
		if(process.platform == 'win32'){
		cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +"\\";
		cmd +=  'matuc_js.exe \" conf update ' ;
		}
		if(process.platform == 'darwin'){
			cmd = 'matuc_js conf update ';
		}
		if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}
		cmd = alternatePrefix ? cmd + '-a ' : cmd;
		// sourceAuthor is not -e = editor
		cmd = sourceAuthor ? cmd + '-e "' + sourceAuthor + '" ' : cmd;
		cmd = institution ? cmd + '-i "' + institution + '" ' : cmd;
		cmd = title ? cmd + '-l "' + title + '" ' : cmd;
		cmd = language ? cmd + '-L ' + language + ' ' : cmd;
		cmd = source  ? cmd + '-s "' + source + '" ' : cmd;
		cmd = semYear ? cmd + '-S ' + semYear + ' ' : cmd;
		cmd = tocDepth  ? cmd + '--toc-depth ' + tocDepth + ' ' : cmd;
		cmd = workingGroup ? cmd + '-w ' + workingGroup + ' ' : cmd;
		console.log("cmd update " + cmd);
		return new Promise(function (resolve, reject) {
			iExec(cmd, {cwd: path}, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return reject(error);
				}
				resolve({out: stdout, err: stderr});
			});
		});
	}

	initMetaData(path) {
		return new Promise(function (resolve, reject) {
			iExec('matuc conf init', {cwd: path}, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return reject(error);
				}
				resolve({out: stdout, err: stderr});
				// console.log(`stdout: ${stdout}`);
				// console.log(`stderr: ${stderr}`);
			});
		});
	}

	showConfig(path) {
		var cmd;
		if(process.platform == 'win32'){
		cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +"\\";
		cmd +=  'matuc_js.exe\" conf show ' ;
		}
		if(process.platform == 'darwin'){
			cmd = 'matuc_js conf show ';
		}
		if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}
		//var cmd = 'matuc_js conf show';
		return new Promise(function (resolve, reject) {
			iExec(cmd, {cwd: path}, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return reject(error);
				}
				currentConfig = JSON.parse(stdout);
				resolve(currentConfig.result['Current settings:']);
			});
		});
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
		var cmd; // = `matuc_js mk ${path}`;
		if(process.platform == 'win32'){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +"\\";
			cmd +=  `matuc_js.exe\" mk \"${path}\" ` ;
		}
		if(process.platform == 'darwin'){
			cmd = `matuc_js mk ${path} `;
		}
		if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}
		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			mistkerl = JSON.parse(stdout);
			if (typeof mistkerl.result === 'string') {
				atom.notifications.addSuccess(language.mistkerlDidNotFindAnyErrorAndSavedFile);
			} else {
				let errors = mistkerl.result[file];
				let message = '';
				for (l = 0; l < mistkerl.result.length; l++) {
					let lines = Object.keys(errors[l]);
					for (i = 0; i < lines.length; i++) {
						message += language.line + lines[i] + ': ' + errors[l][lines[i]] + '\n';
					}
				}
				atom.notifications.addError(language.mistkerlFoundErrorInFile + iPath.basename(file), {
					detail : this.formatErrorMessage(message),
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
		//	var cmd = `matuc_js mk ${path}`;
		var cmd;
		if(process.platform == 'win32'){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +'\\matuc_js.exe\"';
			cmd +=  ` mk ${path}`;
		}
		if(process.platform == 'darwin'){
			cmd = `matuc_js mk ${path}`;
		}
		if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}
		editor.save();
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
						detail : this.formatErrorMessage(message),
						dismissable : true
					});
				}
			}
		});
	}

	convertFile() {
		var editor = atom.workspace.getActivePaneItem();
		var path = editor.buffer.file.path;
		editor.buffer.save();
		var cmd;
		if(process.platform == 'win32'){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +"\\";
			cmd +=  `matuc_js.exe\" conv \"${path}\"`;
		}
		if(process.platform == 'darwin'){
			cmd = atom.config.get('agsbs-atom-package.matucPath');
			cmd += `matuc_js conv \"${path}\"`;
		}
		if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}
		//cmd += `matuc_js conv ${path}`;
		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
		//load generate HTML-file
		cmd = path.replace("md", "html");
		iExec(cmd);
	}

	convertEntireProject() {
		var editor = atom.workspace.getActivePaneItem();
		var path = iPath.dirname(editor.buffer.file.path);
		var cmd;
		if(process.platform == 'win32'){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +"\\";
			cmd += 'matuc_js\" master';
			cmd += ` \"${path}\\..\"`
		}
		if(process.platform == 'darwin'){
			cmd = `matuc_js master ${path}/..`;
		}
		if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}

		console.log(cmd);
		iExec(cmd, {cwd: path}, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
		//open file
		cmd =  editor.buffer.file.path.replace("md", "html")
		iExec(cmd);
	}

	formatErrorMessage(message){
		var formattedMessage = "";
		var pos = message.indexOf(':');
		var replaceString = "\n" + " ".repeat(pos + 1);
		formattedMessage = message.replace(/(.{62})/g, `$1 ${replaceString}`);
		return formattedMessage;
	}

	imgDesc(desc, currentPath, title, pathToImg) {
		var t = title.replace(/\s/g, '_');
		var cmd = `matuc_js imgdsc -d "${desc}" -t ${title} ${pathToImg}`;
		return new Promise(function (resolve, reject) {
			iExec(cmd, {cwd: currentPath}, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return reject(error);
				}
				let fragment = JSON.parse(stdout);
				resolve(fragment.result);
			});
		});
	}
}
