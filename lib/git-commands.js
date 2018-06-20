'use babel';
'use strict';

const iPath = require('path');
const iRef = require('child_process');
const spawn = require('child_process').spawn;
const iExec = require('child_process').exec;
const iExecFile = iRef.execFile;
const fs = require('fs');
//const prompt = require('prompt');


/**
* Class for running the git commands.
* @author niklas fallik, jens voegler
*/
export default class Git {	
	clone(user, repoName) {
		var gitLocalPath =  atom.config.get('agsbs-atom-package.gitLocalPath')
		var gitServerPath = atom.config.get('agsbs-atom-package.gitServerPath');
		var gitCmd = `git clone ssh://${user}@${gitServerPath}/${repoName}`;
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const helper = agsbs.helper;
		const language = agsbs.language;
		console.log("gitCmd " +gitCmd);
		if(!fs.existsSync(gitLocalPath)) {
			 helper.createDirectory(gitLocalPath);
		}
		iExec(gitCmd, {cwd: gitLocalPath}, (error, stdout, stderr) => {
			if (error) {
				console.warn(`exec error: ${error}`);
				atom.notifications.addError("", {
						detail : language.gitCloneError,
						dismissable : true
					});
  		}else{
				atom.notifications.addSuccess("", {
					detail : language.gitCloneSucess,
					dismissable : true
				});
				  atom.project.addPath(iPath.join(atom.config.get('agsbs-atom-package.gitLocalPath'), repoName));
				}
		});
	}

	/**
	* Executes `git pull`.
	*/
	pull(path) {
		iExec('git pull', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}


	/**
	* Executes `git add -A`.
	*/
	addAll(path) {
		return new Promise(function (resolve, error){
			iExec('git add -A', {cwd: path}, (error, stdout, stderr) => {
	  			if (error) {
						console.error("path " + path)
	    			console.error(`exec error: ${error}`);
	    			return reject(error);
	  			}
					resolve({out: stdout, err: stderr});	  			
			});
		});		
	}

	/**
	* Executes `git commit -am "message"`.
	* @param {string} message The commit message.
	* @param {string} path The path of the local git repository.
	*/
	commit(message, path) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		return new Promise(function (resolve, reject){
				iExec(`git commit -am "${message}"`, {cwd: path}, (error, stdout, stderr) => {
					if (error) {
		    			console.error(`exec error: ${error}`);
						atom.notifications.addError(language.commitChangesError, {
							detail : language.commitChangesErrorDetail + error,
							dismissable : true
						});
		    			return reject(error);
		  			}
						resolve({out: stdout, err: stderr});
				});
			});
	}

	/**
	* Executes `git push`.
	*/
	push(path) {
		iExec('git push origin', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}
}
