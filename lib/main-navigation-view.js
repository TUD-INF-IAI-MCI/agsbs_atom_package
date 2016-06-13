'use babel';

//creates DOM elements for the main navigation
export default class MainNavigationView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const viewManager = agsbs.viewManager;

		// create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		// create buttons
		const testNewProjectDialogButton = document.createElement('button');
		const testNewProjectDialogLabel = document.createTextNode('new project dialog');
		testNewProjectDialogButton.appendChild(testNewProjectDialogLabel);
		testNewProjectDialogButton.onclick = function() {
			viewManager.toggleDialog();
		};
		this.element.appendChild(testNewProjectDialogButton);

		const EditProjectDialogButton = document.createElement('button');
		const EditProjectDialogLabel = document.createTextNode('edit project');
		EditProjectDialogButton.appendChild(EditProjectDialogLabel);
		EditProjectDialogButton.onclick = function() {
			viewManager.toggleDialog();
		};
		this.element.appendChild(EditProjectDialogButton);

		const htmlPreviewButton = document.createElement('button');
		const htmlPreviewLabel = document.createTextNode('HTML Vorschau');
		htmlPreviewButton.appendChild(htmlPreviewLabel);

		htmlPreviewButton.onclick = function() {
			viewManager.togglePreview(htmlPreviewButton);
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
