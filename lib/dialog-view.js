'use babel';

//create DOM elements for all dialogs
export default class DialogView {

	//create the main dialog
	constructor(serializedState) {

		//needed to call onclick functions
		const dialogView = this;

		//instances from agsbs-atom-package
		this.agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		this.language = this.agsbs.language;
		this.viewManager = this.agsbs.viewManager;

		//window to break the modalPanel
		this.element = document.createElement('div');
		this.element.classList.add('dialog_window');

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

		const closeButton = this.viewManager.addButton(dialogNavigation, 'close_button', this.language.close, 'fa-times', dialogView.viewManager.closeDialog);

		//container for the dialoges (used in other views by inherit, cannot be const)
		this.dialogContent = document.createElement('div');
		this.dialogContent.classList.add('dialog_content');

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
