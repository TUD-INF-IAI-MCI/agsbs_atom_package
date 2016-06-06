'use babel';

const iPath = require('path');

// import MatucCommands from './matuc-commands';
import HtmlPreview from './html-preview';

export default class AgsbsAtomPackageView {

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
			atom.commands.dispatch(newProjectButton, 'agsbs-atom-package:createNewProject');
		};
		this.element.appendChild(newProjectButton);

		const saveButton = document.createElement('button');
		const saveLabel = document.createTextNode('Speichern');
		saveButton.appendChild(saveLabel);
		this.element.appendChild(saveButton);

		const htmlPreviewButton = document.createElement('button');
		const htmlPreviewLabel = document.createTextNode('HTML Vorschau');
		htmlPreviewButton.appendChild(htmlPreviewLabel);
		const htmlPreview = new HtmlPreview();
		htmlPreviewButton.onclick = function() {
			htmlPreview.togglePreview(htmlPreviewButton);
		};
		this.element.appendChild(htmlPreviewButton);

		const testMainDialogButton = document.createElement('button');
		const testMainDialogLabel = document.createTextNode('main dialog');
		testMainDialogButton.appendChild(testMainDialogLabel);
		testMainDialogButton.onclick = function() {
			atom.commands.dispatch(testMainDialogButton, 'agsbs-atom-package:toggleDialogView');
		};
		this.element.appendChild(testMainDialogButton);

		const testNewProjectDialogButton = document.createElement('button');
		const testNewProjectDialogLabel = document.createTextNode('new project dialog');
		testNewProjectDialogButton.appendChild(testNewProjectDialogLabel);
		testNewProjectDialogButton.onclick = function() {
			atom.commands.dispatch(testNewProjectDialogButton, 'agsbs-atom-package:toggleNewProjectDialog');
		};
		this.element.appendChild(testNewProjectDialogButton);
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
