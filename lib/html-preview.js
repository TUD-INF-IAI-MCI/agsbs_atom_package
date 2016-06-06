'use babel';

const iPath = require('path');

export default class HtmlPreview {

	togglePreview(target) {
		activePaneItem = atom.workspace.getActivePaneItem();
		file = activePaneItem.buffer != null ? activePaneItem.buffer.file : void 0;
		extension = file != null ? iPath.extname(file.path) : void 0;
		if (extension === '.md') {
			atom.commands.dispatch(target, 'markdown-preview-plus:toggle');
		} else {
			alert('Bitte wählen Sie eine .md Datei aus, die in der Vorschau angezeigt werden soll.');
		}
	}
}
