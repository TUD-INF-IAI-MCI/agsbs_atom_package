'use babel';

var $ = require('jquery');

export default class AgsbsAtomPackageView {

	//create the main dialog
	constructor(serializedState) {
		this.element = document.createElement('div');
		this.element.classList.add('dialog_window');

		const dialogWindow = this.element;
		this.element.onclick = function(event) {
			if(event.target == this) {
				console.log(event.target);
				atom.commands.dispatch(dialogWindow, 'agsbs-atom-package:closeDialog');
			}
		};

		const dialogContainer = document.createElement('div');
		dialogContainer.classList.add('dialog_container');

		const dialogNavigation = document.createElement('div');
		dialogNavigation.classList.add('dialog_navigation');

		const closeButton = document.createElement('button');
		closeButton.classList.add('close_button');
		closeButton.onclick = function() {
			atom.commands.dispatch(closeButton, 'agsbs-atom-package:closeDialog');
		};

		const dialogContent = document.createElement('div');
		dialogContent.classList.add('dialog_content');

		const newProjectForm = document.createElement('form');
		dialogContent.classList.add('dialog_content');
		newProjectForm.setAttribute('method','post');

		const newProjectName = document.createElement('input');
		newProjectName.setAttribute('type','text');
		newProjectName.setAttribute('name','username');
		newProjectName.setAttribute('placeholder','project name');

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectName);
		newProjectForm.appendChild(newProjectSubmit);
		dialogContent.appendChild(newProjectForm);

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
