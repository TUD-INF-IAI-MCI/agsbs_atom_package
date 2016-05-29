'use babel';

var $ = require('jquery');
import MatucCommands from './matuc-commands';

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
		const htmlPreviewLabel = document.createTextNode('html Vorschau');
		htmlPreviewButton.appendChild(htmlPreviewLabel);
		htmlPreviewButton.onclick = function() {
			atom.commands.dispatch(htmlPreviewButton, 'markdown-preview-plus:toggle');
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
