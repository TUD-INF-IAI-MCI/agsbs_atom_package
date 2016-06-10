'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		var viewManager = new ViewManager();
		const matuc = new Matuc();

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		const newProjectPreface = viewManager.addCheckbox(newProjectForm, 'preface', this.language.preface);

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);
	}
}
