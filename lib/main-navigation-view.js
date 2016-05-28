'use babel';

var $;
$ = require('jquery');
import MatucCommands from './matuc-commands';

export default class TestshiceView {

	constructor(serializedState) {

		this.matucCommands = new MatucCommands();
		// Create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		// Create buttons
		const newProject = document.createElement('button');
		const newProjectLabel = document.createTextNode('Neues Projekt');
		newProject.appendChild(newProjectLabel);
		newProject.onclick = function() {
			console.log('Buttonclick');
			// this.matucCommands.newProject(0, 3, DE, '');
		};
		this.element.appendChild(newProject);

		const save = document.createElement('button');
		const saveLabel = document.createTextNode('Speichern');
		save.appendChild(saveLabel);
		this.element.appendChild(save);

		const htmlPreview = document.createElement('button');
		const htmlPreviewLabel = document.createTextNode('html Vorschau');
		htmlPreview.appendChild(htmlPreviewLabel);
		// htmlPreview.onclick = ;
		this.element.appendChild(htmlPreview);
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
