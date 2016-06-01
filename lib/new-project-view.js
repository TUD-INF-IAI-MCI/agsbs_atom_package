'use babel';

var $ = require('jquery');

export default class AgsbsAtomPackageView {

	constructor(serializedState) {
		//get this.element and its child dialogContent from superclass

		//const newProjectForm = document.createElement('form');
		//dialogContent.classList.add('dialog_content');
		//newProjectForm.setAttribute('method','post');

		//const newProjectName = document.createElement('input');
		//newProjectName.setAttribute('type','text');
		//newProjectName.setAttribute('name','username');
		//newProjectName.setAttribute('placeholder','project name');

		//const newProjectSubmit = document.createElement("input");
		//newProjectSubmit.setAttribute('type', 'submit');
		//newProjectSubmit.setAttribute('value','Submit');

		//newProjectForm.appendChild(newProjectName);
		//newProjectForm.appendChild(newProjectSubmit);
		//dialogContent.appendChild(newProjectForm);
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
