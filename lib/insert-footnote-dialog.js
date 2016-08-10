'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertFootnoteDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
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

		const footLabel = this.footLabel;
		const footText = this.footText;
		insertFootnoteForm.addEventListener('submit', function(event) {
			if (editor.isLabelUsed(footLabel.value)) {
				atom.notifications.addError(language.footLabelError, {
					detail : language.footLabelErrorDetail,
					dismissable : true
				});
			} else {
				editor.insertFootnote(footLabel.value, footText.value);
				viewManager.closeDialog();
			}
		});
	}

	setSelectedTextAsLabel() {
		var selectedText = atom.workspace.getActivePaneItem().getSelectedText();
		if (selectedText != '') {
			this.footLabel.value = selectedText;
			this.footText.focus();
		}
	}
}
