'use babel';

import ViewFunctions from './view-functions';

export default class DialogView {

	//create the main dialog
	constructor(serializedState) {

		this.viewFunctions = new ViewFunctions();

		this.element = document.createElement('div');
		this.element.classList.add('dialog_window');

		//invisible window to break the modalPanel
		const dialogWindow = this.element;
		this.element.onclick = function(event) {
			if(event.target == this) {
				console.log(event.target);
				atom.commands.dispatch(dialogWindow, 'agsbs-atom-package:closeDialog');
			}
		};

		//container for the dialog
		const dialogContainer = document.createElement('div');
		dialogContainer.classList.add('dialog_container');

		//contains main navigation elements
		const dialogNavigation = document.createElement('div');
		dialogNavigation.classList.add('dialog_navigation');

		const closeButton = document.createElement('button');
		closeButton.classList.add('fontawsome_iconed_button');

		//font awesome classes
		closeButton.classList.add('fa');
		closeButton.classList.add('fa-times');
		closeButton.classList.add('fa-2x');

		closeButton.onclick = function() {
			atom.commands.dispatch(closeButton, 'agsbs-atom-package:closeDialog');
		};

		//container for the dialoges (used in other views by inherit, cannot be const)
		this.dialogContent = document.createElement('div');
		this.dialogContent.classList.add('dialog_content');

		dialogNavigation.appendChild(closeButton);
		dialogContainer.appendChild(dialogNavigation);
		dialogContainer.appendChild(this.dialogContent);
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
