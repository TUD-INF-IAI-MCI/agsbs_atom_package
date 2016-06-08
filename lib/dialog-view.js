'use babel';

import English from './language/language.en';

import ViewManager from './view-manager';

//create DOM elements for all dialogs
export default class DialogView {

	//create the main dialog
	constructor(serializedState) {
		//needed to call onclick functions
		const dialogView = this;

		//TODO: instanziate the langage which is chosen
		this.language = new English();

		this.viewManager = new ViewManager();



		this.element = document.createElement('div');
		this.element.classList.add('dialog_window');

		//invisible window to break the modalPanel
		const dialogWindow = this.element;
		this.element.onclick = function(event) {
			if(event.target == this) {
				dialogView.viewManager.closeDialog();
			}
		};

		//container for the dialog
		const dialogContainer = document.createElement('div');
		dialogContainer.classList.add('dialog_container');

		//contains main navigation elements
		const dialogNavigation = document.createElement('div');
		dialogNavigation.classList.add('dialog_navigation');

		const closeButton = document.createElement('button');
		closeButton.classList.add('fontawesome_iconed_button');

		//font awesome classes
		closeButton.classList.add('fa');
		closeButton.classList.add('fa-times');
		closeButton.classList.add('fa-2x');

		closeButton.onclick = function() {
			dialogView.viewManager.closeDialog();
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
