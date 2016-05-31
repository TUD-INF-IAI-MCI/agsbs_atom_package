'use babel';

var $ = require('jquery');

export default class AgsbsAtomPackageView {

	//create the main dialog
	constructor(serializedState) {
		this.element = document.createElement('div');
		this.element.classList.add('dialog_window');

		const Dialogwindow = this.element;
		this.element.onclick = function() {
			atom.commands.dispatch(Dialogwindow, 'agsbs-atom-package:closeMainDialog');
		};

		const dialogContainer = document.createElement('div');
		dialogContainer.classList.add('dialog_container');

		const dialogNavigation = document.createElement('div');
		dialogNavigation.classList.add('dialog_navigation');

		const closeButton = document.createElement('button');
		closeButton.classList.add('close_button');
		closeButton.onclick = function() {
			atom.commands.dispatch(closeButton, 'agsbs-atom-package:closeMainDialog');
		};

		dialogContent = document.createElement('div');
		dialogContent.classList.add('dialog_content');

		dialogNavigation.appendChild(closeButton);
		dialogContainer.appendChild(dialogNavigation);
		dialogContainer.appendChild(dialogContent);
		this.element.appendChild(dialogContainer);
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
