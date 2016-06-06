'use babel';

import DialogView from './dialog-view';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		super(serializedState);
		//get this.element and its child dialogContent from superclass

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		const git = this.viewManager.addTextInput(newProjectForm, 'git', 'path to git repository');
		const path = this.viewManager.addFileInput(newProjectForm, 'directory', 'directory');
		const preface = this.viewManager.addCheckbox(newProjectForm, 'preface', 'preface');

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);
	}
}
