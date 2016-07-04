'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertGraphicDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const insertGraphicForm = document.createElement('form');
		insertGraphicForm.setAttribute('method','post');

		const insertGraphicSubmit = document.createElement("input");
		insertGraphicSubmit.setAttribute('type', 'submit');
		insertGraphicSubmit.setAttribute('value','Submit');

		insertGraphicForm.appendChild(insertGraphicSubmit);
		this.dialogContent.appendChild(insertGraphicForm);

		insertGraphicForm.addEventListener('submit', function(event) {
			viewManager.noFunction();
			viewManager.closeDialog();
		});
	}
}
