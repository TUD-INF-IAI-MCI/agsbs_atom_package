'use babel';
'use strict';

const iPath = require('path');
const iRef = require('child_process');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const iExecFile = iRef.execFile;
const fs = require('fs');
const prompt = require('prompt');

//functions that works with matuc
export default class Git {
	// ssh://USER@iai8292.inf.tu-dresden.de/srv/git/l-80-2016_influential_operating_systems_research

	constructor(host, path) {
		this.host = host;
	}

	pull() {
		exec('git pull', [{cwd: path}], (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}

	add() {
		exec('git add -A', [{cwd: path}], (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}

	commit(message) {
		exec(`git commit -am "${message}"`, [{cwd: path}], (error, stdout, stderr) => {
			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}

	push() {
		exec('git push', [{cwd: path}], (error, stdout, stderr) => {
  			if (error) {
    			console.error(`exec error: ${error}`);
    			return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
		});
	}

	getExecOptions(path) {
		return {
			cwd: path,
			input: 'Test12345',
			maxBuffer: 1024 * 5000
		};
	}
}
