'use babel';

import DialogView from './dialog-view';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		super(serializedState);
		//get this.element and its child dialogContent from superclass

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		this.viewManager.addTextInput(newProjectForm, 'git', 'path to git repository');

		this.viewManager.addTextInput(newProjectForm, 'directory', 'directory');
		this.viewManager.addCheckbox(newProjectForm, 'preface', 'preface');

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);
	}
}
