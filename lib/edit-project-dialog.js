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

		this.dialogHeadline.innerHTML = language.editProject;

		const editProjectForm = document.createElement('form');
		editProjectForm.setAttribute('method','post');

		const editProjectSubmit = document.createElement('input');
		editProjectSubmit.setAttribute('type', 'submit');
		editProjectSubmit.setAttribute('value',language.edit);

		editProjectForm.appendChild(editProjectSubmit);
		this.dialogContent.appendChild(editProjectForm);
	}
}
