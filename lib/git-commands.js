'use babel';

const iPath = require('path');
const iRef = require('child_process');
const execSync = require('child_process').execSync;
const iExec = iRef.exec;
const iExecFile = iRef.execFile;

//functions that works with matuc
export default class Git {
	// ssh://USER@iai8292.inf.tu-dresden.de/srv/git/l-80-2016_influential_operating_systems_research

	constructor(host) {
		this.host = host;
	}

	clone(username, src, path) {
		var source;
		if (src.charAt(0) == '/') {
			source = src.slice(1,str.length);
		} else {
			source = src;
		}
		var cmd = `git clone ssh://${username}@${this.host}${source}`;
		var gitPath = `ssh://${username}@${this.host}${source}`;
		// var cd = spawn('cd', [path]);
		// const gitClone = execSync('git', ['clone', gitPath], {cwd: path, input: 'Test12345'});
		const gitClone = execSync(cmd, [{cwd: path, input: 'Test12345'}]);
		// gitClone.stdout.on('data', (data) => {
		// 	console.log(`stdout: ${data}`);
		//
		// });

		// gitClone.stderr.on('data', (data) => {
		// 	console.log(`stderr: ${data}`);
		// });

		// gitClone.on('close', (code) => {
		// 	if (code !== 0) {
		// 		console.log(`child process exited with code ${code}`);
		// 	}
		//
		// });

		// iExec(cmd, (error, stdout, stderr) => {
		// 	if (error) {
		// 		console.log(cmd);
		// 		console.error(`exec error: ${error}`);
		// 		return;
		// 	}
		// 	console.log(`stdout: ${stdout}`);
		// 	console.log(`stderr: ${stderr}`);
		// });
	}
}
