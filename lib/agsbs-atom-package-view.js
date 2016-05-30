'use babel';

var $ = require('jquery');

export default class AgsbsAtomPackageView {

	//create the main dialog
	constructor(serializedState) {
		this.element = document.createElement('div');
		this.element.classList.add('dialog_container');

		dialogNavigation = document.createElement('div');
		dialogNavigation.classList.add('dialog_navigation');

		const closeButton = document.createElement('button');
		closeButton.classList.add('close_button');
		closeButton.onclick = function() {
			atom.commands.dispatch(closeButton, 'agsbs-atom-package:toggleMainDialog');
		};

		dialogContent = document.createElement('div');
		dialogContent.classList.add('dialog_content');

		dialogNavigation.appendChild(closeButton);
		this.element.appendChild(dialogNavigation);
		this.element.appendChild(dialogContent);
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
