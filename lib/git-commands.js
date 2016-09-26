'use babel';
'use strict';

const iPath = require('path');
const iRef = require('child_process');
const spawn = require('child_process').spawn;
const iExec = require('child_process').exec;
const iExecFile = iRef.execFile;
const fs = require('fs');
const prompt = require('prompt');


/**
* Class for running the git commands.
* @author niklas fallik
*/
export default class Git {
	// ssh://USER@iai8292.inf.tu-dresden.de/srv/git/l-80-2016_influential_operating_systems_research

	clone(user, repo, path) {
		iExec(`git clone git+ssh://${user}@iai8292.inf.tu-dresden.de/srv/git/AGSBS_Informatik/${repo}`, {cwd: path}, (error, stdout, stderr) => {
			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}

	/**
	* Executes `git pull`.
	*/
	pull() {
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
	add() {
		iExec('git add -A', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
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
		iExec(`git commit -am "${message}"`, {cwd: path}, (error, stdout, stderr) => {
			if (error) {
    			console.error(`exec error: ${error}`);
				atom.notifications.addError(language.commitChangesError, {
					detail : language.commitChangesErrorDetail + error,
					dismissable : true
				});
    			return;
  			}
			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
			atom.notifications.addSuccess(language.commitChangesSuccess, {
				detail : stdout,
				dismissable : true
			});
		});
	}

	/**
	* Executes `git push`.
	*/
	push() {
		iExec('git push', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}
}
