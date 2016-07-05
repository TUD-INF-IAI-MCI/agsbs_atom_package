'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertTableCsvDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const insertTableCsvForm = document.createElement('form');
		insertTableCsvForm.setAttribute('method','post');

		const fileInput = this.viewManager.addFilePicker(insertTableCsvForm, 'csv-file', language.link);

		const insertTableCsvSubmit = document.createElement("input");
		insertTableCsvSubmit.setAttribute('type', 'submit');
		insertTableCsvSubmit.setAttribute('value','Submit');

		insertTableCsvForm.appendChild(insertTableCsvSubmit);
		this.dialogContent.appendChild(insertTableCsvForm);

		insertTableCsvForm.addEventListener('submit', function(event) {
			var file = fileInput.files[0];
			editor.insertTableFromCsv(file);
			viewManager.closeDialog();
		});
	}
}
