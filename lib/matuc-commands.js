'use babel';

const iPath = require('path');
const iRef = require('child_process');
const iExec = iRef.exec;
const iExecFile = iRef.execFile;
import ErrorMessageFormatter from './error-message-formatter';

//functions to execute matuc functions from within the agsbs package
export default class Matuc {

	checkIfFileIsWithinLecture() {
		var file = atom.workspace.getActivePaneItem().buffer.file;
		var cmd;
		if(process.platform == "win32"){
			cmd = 'cd \"' + atom.config.get('agsbs-atom-package.matucPath') +'\" & ';
			cmd += `matuc_js.exe iswithinlecture \"${file.path}\"`;
		}else if(process.platform == "darwin"){
			cmd = `matuc_js iswithinlecture \"${file.path}\"`;
		}else	if(process.platform == "linux "){
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

	fixpnumInPlace(){
		var buffer = atom.workspace.getActivePaneItem().buffer;
		atom.workspace.getActivePaneItem().save();
		cmd = `matuc_js fixpnums -i -f \"${buffer.file.path}\"`
		return new Promise(function (resolve, reject) {
			iExec(cmd, (error, stdout, stderr) => {
				if (error) {
					return reject(error);
				}
				buffer.reload();
				resolve({out: "fixpnums inplace", err: stderr});
			});
		});
	}

	checkPageNumbers(){
		var buffer = atom.workspace.getActivePaneItem().buffer;
		var editor = atom.workspace.getActivePaneItem();
		atom.workspace.getActivePaneItem().save();
		editor.save();
		cmd = `matuc_js fixpnums -f \"${buffer.file.path}\"`
		return new Promise(function (resolve, reject) {
			iExec(cmd, (error, stdout, stderr) => {
				if (error) {
					return reject(error);
				}
				console.log(`checkPageNumbers ${stdout}`);
				resolve({out: stdout, err: stderr});
			});
		});
	}
	/**
	* Insert a new Page an
	*/
	newPage(){
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const helper = agsbs.helper;
		if(!helper.isBufferSelected(atom.workspace.getActivePaneItem())){
			Promise.reject(error);
			return;
		}else{
			var buffer = atom.workspace.getActivePaneItem().buffer;
	 		atom.workspace.getActivePaneItem().save();
			var cursor = atom.workspace.getActivePaneItem().getCursorBufferPosition();

			cmd = `matuc_js addpnum -f `
						+`\"${buffer.file.path}\" ${cursor.row}`;
			return new Promise(function (resolve, reject) {
				iExec(cmd, (error, stdout, stderr) => {
					if (error) {
						return reject(error);
					}
					resolve({out: stdout, err: stderr});
				});
			});
		}
	}

  /**
	* check if the installed matuc version is support by packages
	*/
	version(){
		cmd = 'matuc_js version';
		return new Promise(function (resolve, reject) {
			iExec(cmd, (error, stdout, stderr) => {
				if (error) {
					return reject(error);
				}
				resolve({out: stdout, err: stderr});
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
	* @param {string} editor The name of the author
	* @param {string} title The title of the resource
	* @param {string} source The source
	* @param {string} path The Path to the matuc project
	*/
	updateMetaData(alternatePrefix, outputFormat, editor, institution,
					title, language, source, sourceAuthor, semYear, tocDepth, workingGroup, path) {
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
		cmd = editor ? cmd + '-e "' + editor + '" ' : cmd;
		cmd = institution ? cmd + '-i "' + institution + '" ' : cmd;
		cmd = title ? cmd + '-l "' + title + '" ' : cmd;
		cmd = language ? cmd + '-L ' + language + ' ' : cmd;
		cmd = source  ? cmd + '-s "' + source + '" ' : cmd;
		cmd = sourceAuthor  ? cmd + '-A "' + sourceAuthor + '" ' : cmd;
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
				cmd = `matuc_js conf show`;
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
				resolve(currentConfig.result['Current settings']);
			});
		});
	}

	/**
	* Checks and saves changes in the current opened file invoking mistkerl, executes `matuc_js mk`
	*/
	checkAndSaveChanges() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const helper = agsbs.helper;
		var editor = atom.workspace.getActivePaneItem();		
		if(editor.buffer.file == null){
			atom.workspace.getActivePane().saveActiveItem()	
			return;
		}
		var file = editor.buffer.file.path;
		var path = iPath.dirname(file);
		var cmd; // = `matuc_js mk ${path}`;
		if(process.platform == 'win32'){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +'\\matuc_js.exe\"';
			cmd +=  ` mk \"${path}\"`;
		}else if(process.platform == 'darwin'){
			cmd = `matuc_js mk \"${path}\" `;
		}else if(process.platform == 'linux'){
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
				helper.generateErrorOutput(mistkerl.result);
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
		const helper = agsbs.helper;
		var editor = atom.workspace.getActivePaneItem();
		var path = iPath.dirname(editor.buffer.file.path) + '/..';
		//	var cmd = `matuc_js mk ${path}`;
		var cmd;
		if(process.platform == 'win32'){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +'\\matuc_js.exe\"';
			cmd +=  ` mk \"${path}\"`;
		}
		if(process.platform == 'darwin'){
			cmd = `matuc_js mk \"${path}\"`;
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
				helper.generateErrorOutput(mistkerl.result);
			}
		});
	}

	convertFile() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var path = editor.buffer.file.path;
		editor.buffer.save();
		var cmd = "";
		if(process.platform == 'win32'){
			//change to matuc path
			cmd = 'cd \"' + atom.config.get('agsbs-atom-package.matucPath') + '\" & ';
			cmd +=  `matuc_js conv \"${path}\"`;
		} else if(process.platform == 'darwin'){
			cmd = atom.config.get('agsbs-atom-package.matucPath');
			cmd += `matuc_js conv \"${path}\"`;
		}else if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}
		//cmd += `matuc_js conv ${path}`;
		console.log("matuc conv command " +cmd);
		iExec(cmd, (error, stdout, stderr) => {
			if (error) {
				var errorFormatter  = new ErrorMessageFormatter();
				let fragment = JSON.parse(stdout);
				let message = errorFormatter.formatErrorMessage(fragment.error.message, false)
				if(fragment.error.hasOwnProperty('line')){
						message += "\n\n\n" + errorFormatter.formatErrorMessage(language.checkLine + fragment.error.line, false);
				}
				if(fragment.error.hasOwnProperty('path')){
					message += "\n\n\n" + errorFormatter.formatErrorMessage(language.checkFile +" " +fragment.error.path , false);
				}
				atom.notifications.addError(language.unExpectedMatucError, {
					detail :  message,
					dismissable : true
				});
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
			//load generate HTML-file

			this.loadGeneratedHtml(path);
		});

	}
	// add quotes to path if necessary and loads generate Html afterthat
	loadGeneratedHtml(path){
		let cmd =`\"${path.replace("md", "html")}\"`;
		iExec(cmd, (error, stdout, stderr) => {
				if (error) {
					console.error(`load generate html`);
					console.error(`exec error: ${error}`);
					return;
				}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}

	convertEntireProject() {
		var editor = atom.workspace.getActivePaneItem();
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		editor.save();
		var path = iPath.dirname(editor.buffer.file.path);
		var errorFormatter  = new ErrorMessageFormatter();
		var cmd;
		if(process.platform == 'win32'){
			cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +"\\";
			cmd += 'matuc_js\" master';
			cmd += ` \"${path}\\..\"`
		}else if(process.platform == 'darwin'){
			cmd = `matuc_js master ${path}/..`;
		}else	if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}

		console.log(cmd);
		iExec(cmd, {cwd: path}, (error, stdout, stderr) => {
			if (error) {
				let fragment = JSON.parse(stdout);
				let message = "";
				if(fragment.error.message.startsWith("No configuration")){
					message = language.noConfiguration;
				}else{
					message = fragment.error.message;
					if(fragment.error.hasOwnProperty('path')){
						message += "\n\n\n" + errorFormatter.formatErrorMessage(language.checkFile +" " +fragment.error.path , false);
					}
				}

				atom.notifications.addError(language.unExpectedMatucError, {
					detail :  errorFormatter.formatErrorMessage(message, false),
					dismissable : true
				});
				console.error(`exec error: ${error}`);

				return;
			}else{
				this.loadGeneratedHtml(editor.buffer.file.path);
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
		//open file

	}

	getRelativePath(path){
		var relPath = "";
		var imgName = iPath.posix.basename(path);
		var dirParent = iPath.dirname(iPath.dirname(path));
		relPath = iPath.relative(iPath.dirname(iPath.dirname(path)), imgName);
		return relPath;
	}

	imgDesc(desc, outsourced, currentPath, title, pathToImg) {

		var cmd = "";
		if(desc.includes("\n")){
			outsourced = true;
			desc = desc.replace(/\n/g,'\\n');
		}

		pathToImg = this.getRelativePath(pathToImg);
		self.currentPath = currentPath;
		if(process.platform == 'win32'){
			//cmd = '\"' + atom.config.get('agsbs-atom-package.matucPath') +"\\";
			cmd += `matuc_js imgdsc -d \"${desc}\" `;
			cmd = outsourced ? cmd + '-o ': cmd;
			cmd = title ? cmd + '-t "' + title + '" ' : cmd;
			cmd += `${pathToImg}`;
		}
		if(process.platform == 'darwin'){
			cmd = `matuc_js imgdsc -d \"${desc}\" `;
			cmd = title ? cmd + '-t ' + '"' + title + '"' + ' ' : cmd;
			cmd += `${pathToImg}`;
		}
		if(process.platform == 'linux'){
			throw "Linux is not supported yet";
		}

		console.log(cmd);
		return new Promise(function (resolve, reject) {
			iExec(cmd, {cwd: self.currentPath}, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					let fragment = JSON.parse(stdout);
					return reject(fragment.error +"\n" +fragment.usage);
				}
				let fragment = JSON.parse(stdout);
				resolve(fragment.result);
			});
		});
	}
}
