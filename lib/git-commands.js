'use babel';
'use strict';

const iPath = require('path');
const iRef = require('child_process');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const iExecFile = iRef.execFile;
const fs = require('fs');
const prompt = require('prompt');


/**
* Class for running the git commands.
* @author niklas fallik
*/
export default class Git {
	// ssh://USER@iai8292.inf.tu-dresden.de/srv/git/l-80-2016_influential_operating_systems_research

	/**
	* Toggles a dialog view.
	* @param {string} host The URL that points to the git server.
	* @param {string} path The working directory.
	*/
	constructor(host, path) {
		this.host = host;
	}

	clone() {
		var child = exec('git clone ssh://fallik@iai8292.inf.tu-dresden.de/srv/git/AGSBS_Informatik/sandbox', {cwd: '~/matuc'}, (error, stdout, stderr) => {
			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
		child.stdin.setEncoding('utf-8');
		child.stdout.pipe(process.stdout);
		child.stdin.write("Test12345\n");

	}

	/**
	* Executes `git pull`.
	*/
	pull() {
		exec('git pull', {cwd: path}, (error, stdout, stderr) => {
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
		exec('git add -A', {cwd: path}, (error, stdout, stderr) => {
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
		exec(`git commit -am "${message}"`, {cwd: path}, (error, stdout, stderr) => {
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
		exec('git push', {cwd: path}, (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}
}
