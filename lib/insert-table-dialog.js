'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertTableDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const insertTableForm = document.createElement('form');
		insertTableForm.setAttribute('method','post');

		const numberpickerContainer = document.createElement('div');
		numberpickerContainer.classList.add('numberpicker_container');

		const tableRows = this.viewManager.addNumberPicker(numberpickerContainer, 'rows', language.rows);
		tableRows.setAttribute('min', '2');
		//listener for the guided dialog.
		tableRows.addEventListener('input', function() {
			viewManager.noFunction();
		});
		const tableColumbs = this.viewManager.addNumberPicker(numberpickerContainer, 'columbs', language.columbs);
		tableColumbs.setAttribute('min', '1');
		//listener for the guided dialog.
		tableColumbs.addEventListener('input', function() {
			viewManager.noFunction();
			//const hr = document.createElement('hr');
			//insertTableForm.appendChild(hr);
		});

		insertTableForm.appendChild(numberpickerContainer);

		const insertTableSubmit = document.createElement('input');
		insertTableSubmit.setAttribute('type', 'submit');
		insertTableSubmit.setAttribute('value','Submit');

		insertTableForm.appendChild(insertTableSubmit);
		this.dialogContent.appendChild(insertTableForm);

		insertTableForm.addEventListener('submit', function(event) {
			viewManager.noFunction();
			viewManager.closeDialog();
		});

		function createColumbsAndRows() {

		};

		function deleteColumbsAndRows() {

		};
	}
}
