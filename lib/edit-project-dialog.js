'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class EditProjectDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		const newProjectPreface = viewManager.addCheckbox(newProjectForm, 'preface', language.preface);

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);
	}
}
