'use babel';

const iPath = require('path');
var $ = require('jquery');

import MatucCommands from './matuc-commands';
import HtmlPreview from './html-preview';

export default class TestshiceView {

	constructor(serializedState) {
		// Create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		// Create buttons
		const newProjectButton = document.createElement('button');
		const newProjectLabel = document.createTextNode('Neues Projekt');
		newProjectButton.appendChild(newProjectLabel);
		newProjectButton.onclick = function() {
			// any DOM object as target
			atom.commands.dispatch(newProjectButton, 'agsbs-atom-package:newProject');
		};
		this.element.appendChild(newProjectButton);

		const saveButton = document.createElement('button');
		const saveLabel = document.createTextNode('Speichern');
		saveButton.appendChild(saveLabel);
		this.element.appendChild(saveButton);

		const htmlPreviewButton = document.createElement('button');
		const htmlPreviewLabel = document.createTextNode('HTML Vorschau');
		htmlPreviewButton.appendChild(htmlPreviewLabel);
		const htmlPreview = new HtmlPreview(htmlPreviewButton);
		htmlPreviewButton.onclick = function() {
			// var activePane, activePaneItem, file, extension;
			// activePane = atom.workspace.getActivePane();
			// // console.log(activePane);
			// // if (activePane.activeItem[0].classList[0] == 'markdown-preview') {
			// // 	alert('yeah');
			// // }
			// activePaneItem = atom.workspace.getActivePaneItem();
			// file = activePaneItem.buffer != null ? activePaneItem.buffer.file : void 0;
			// extension = file != null ? iPath.extname(file.path) : void 0;
			// if (extension === '.md') {
    		// 	atom.commands.dispatch(htmlPreviewButton, 'markdown-preview-plus:toggle');
			// 	console.log(atom.workspace.getActivePane());
			// } else {
			// 	alert('Bitte wählen Sie eine .md Datei aus, die in der Vorschau angezeigt werden soll.');
			// }
			htmlPreview.togglePreview();
		};
		this.element.appendChild(htmlPreviewButton);
	}

	// Returns an object that can be retrieved when package is activated
	serialize() {}

	// Tear down any state and detach
	destroy() {
		this.element.remove();
	}

	getElement() {
		return this.element;
	}
}
