'use babel';

//creates DOM elements for the main navigation
export default class MainNavigationView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;

		const matuc = agsbs.matuc;

		// create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		// create buttons
		const NewProjectDialogButton = document.createElement('button');
		const NewProjectDialogLabel = document.createTextNode('new project dialog');
		NewProjectDialogButton.appendChild(NewProjectDialogLabel);
		NewProjectDialogButton.onclick = function() {
			viewManager.toggleDialog(0);
		};
		this.element.appendChild(NewProjectDialogButton);

		const EditProjectDialogButton = document.createElement('button');
		const EditProjectDialogLabel = document.createTextNode('edit project');
		EditProjectDialogButton.appendChild(EditProjectDialogLabel);
		EditProjectDialogButton.onclick = function() {
			viewManager.toggleDialog(1);
		};
		this.element.appendChild(EditProjectDialogButton);

		const htmlPreviewButton = document.createElement('button');
		const htmlPreviewLabel = document.createTextNode('HTML Vorschau');
		htmlPreviewButton.appendChild(htmlPreviewLabel);

		htmlPreviewButton.onclick = function() {
			viewManager.toggleHtmlPreview(htmlPreviewButton);
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
