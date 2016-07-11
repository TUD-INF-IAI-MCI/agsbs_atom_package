'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertraphicDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const insertGraphicForm = document.createElement('form');
		insertGraphicForm.setAttribute('method','post');

		this.altText = this.viewManager.addTextInput(insertGraphicForm, 'alt-text', language.altText);
		this.file = this.viewManager.addFilePicker(insertGraphicForm, 'file', language.graphicFile, 'file');
		this.file.setAttribute('accept', 'image/*');
		this.uri = this.viewManager.addTextInput(insertGraphicForm, 'uri', language.uri);
		const title = this.viewManager.addTextInput(insertGraphicForm, 'uri', language.graphicTitle);

		const insertGraphicSubmit = document.createElement("input");
		insertGraphicSubmit.setAttribute('type', 'submit');
		insertGraphicSubmit.setAttribute('value','Submit');

		insertGraphicForm.appendChild(insertGraphicSubmit);
		this.dialogContent.appendChild(insertGraphicForm);


		const altText = this.altText;
		const uri = this.uri;
		const file = this.file;
		insertGraphicForm.addEventListener('submit', function(event) {
			var alt, location, titte;
			alt = altText.value;
			location = typeof file.files[0] === 'undefined' ? uri.value : file.files[0].path;
			titte = title.value;
			editor.insertGraphic(alt, location, titte);
			viewManager.closeDialog();
		});
	}

	setSelectedAsAltText() {
		var selectedText = atom.workspace.getActivePaneItem().getSelectedText();
		if (selectedText != '') {
			this.altText.value = selectedText;
		}
	}
}
