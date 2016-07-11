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

		const insertFootnoteForm = document.createElement('form');
		insertFootnoteForm.setAttribute('method','post');

		this.footLabel = this.viewManager.addTextInput(insertFootnoteForm, 'footnote-label', language.footLabel);
		this.footText = this.viewManager.addTextInput(insertFootnoteForm, 'footnote-text', language.footText);


		const insertFootnoteSubmit = document.createElement("input");
		insertFootnoteSubmit.setAttribute('type', 'submit');
		insertFootnoteSubmit.setAttribute('value','Submit');

		insertFootnoteForm.appendChild(insertFootnoteSubmit);
		this.dialogContent.appendChild(insertFootnoteForm);

		const footText = this.footText;
		const footLabel = this.footLabel;
		insertFootnoteForm.addEventListener('submit', function(event) {
			editor.isLabelUsed(footLabel);
			editor.insertFootnote(footLabel, footText);
			viewManager.closeDialog();
		});
	}
}
