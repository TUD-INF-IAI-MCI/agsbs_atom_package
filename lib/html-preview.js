'use babel';

const iPath = require('path');
var $ = require('jquery');

export default class HtmlPreview {

	constructor(target) {
		this.target = target;
	}

	togglePreview() {
		var activePane, activePaneItem, file, extension;
		activePane = atom.workspace.getActivePane();
		// console.log(activePane);
		// if (activePane.activeItem[0].classList[0] == 'markdown-preview') {
		// 	alert('yeah');
		// }
		activePaneItem = atom.workspace.getActivePaneItem();
		file = activePaneItem.buffer != null ? activePaneItem.buffer.file : void 0;
		extension = file != null ? iPath.extname(file.path) : void 0;
		if (extension === '.md') {
			atom.commands.dispatch(this.target, 'markdown-preview-plus:toggle');
			console.log(atom.workspace.getActivePane());
		} else {
			alert('Bitte wählen Sie eine .md Datei aus, die in der Vorschau angezeigt werden soll.');
		}
	}
}
