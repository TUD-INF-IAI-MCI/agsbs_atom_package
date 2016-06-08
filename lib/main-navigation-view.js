'use babel';

import HtmlPreview from './html-preview';

//creates DOM elements for the main navigation
export default class MainNavigationView {

	constructor(serializedState) {
		// create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		// create buttons
		const testNewProjectDialogButton = document.createElement('button');
		const testNewProjectDialogLabel = document.createTextNode('new project dialog');
		testNewProjectDialogButton.appendChild(testNewProjectDialogLabel);
		testNewProjectDialogButton.onclick = function() {
			atom.commands.dispatch(testNewProjectDialogButton, 'agsbs-atom-package:toggleNewProjectDialog');
		};
		this.element.appendChild(testNewProjectDialogButton);

		const htmlPreviewButton = document.createElement('button');
		const htmlPreviewLabel = document.createTextNode('HTML Vorschau');
		htmlPreviewButton.appendChild(htmlPreviewLabel);
		const htmlPreview = new HtmlPreview();
		htmlPreviewButton.onclick = function() {
			htmlPreview.togglePreview(htmlPreviewButton);
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
