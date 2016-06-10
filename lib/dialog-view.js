'use babel';

import English from './language/language.en';
import German from './language/language.de';

import ViewManager from './view-manager';

//create DOM elements for all dialogs
export default class DialogView {

	//create the main dialog
	constructor(serializedState) {
		//needed to call onclick functions
		const dialogView = this;

		this.viewManager = new ViewManager();

		//listener for langage settings
		atom.config.observe('agsbs-atom-package.language', function(value) {
			var language;
			switch (value) {
				case 'english':
					language = new English();
					break;
				case 'german':
					language = new German();
					break;
				default:
					language = new English();
					break;
			}
			dialogView.language = language;
		});


		this.element = document.createElement('div');
		this.element.classList.add('dialog_window');

		//window to break the modalPanel
		const dialogWindow = this.element;
		this.element.onclick = function(event) {
			if(event.target == this) {
				dialogView.viewManager.closeDialog();
			}
		};

		//container for the dialog
		const dialogContainer = document.createElement('div');
		dialogContainer.classList.add('dialog_container');
		dialogContainer.classList.add('native-key-bindings');

		//contains main navigation elements
		const dialogNavigation = document.createElement('div');
		dialogNavigation.classList.add('dialog_navigation');

		const closeButton = this.viewManager.addButton(dialogNavigation, 'close_button', 'fa-times');

		closeButton.onclick = function() {
			dialogView.viewManager.closeDialog();
		};

		//container for the dialoges (used in other views by inherit, cannot be const)
		this.dialogContent = document.createElement('div');
		this.dialogContent.classList.add('dialog_content');

		//dialogNavigation.appendChild(closeButton);
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
