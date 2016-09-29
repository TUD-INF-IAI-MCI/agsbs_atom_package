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

		this.dialogHeadline.innerHTML = language.insertFootnote;

		const insertFootnoteForm = document.createElement('form');
		insertFootnoteForm.classList.add('footnote_form');
		insertFootnoteForm.setAttribute('method','post');

		this.footLabel = this.viewManager.addTextInput(insertFootnoteForm, 'footnote_label', language.footLabel);
		this.footLabel.setAttribute('tabindex', 1);
		const footLabel = this.footLabel;
		this.footLabel.addEventListener('input', function() {
			if(footLabel.value != '' && footText.value != '') {
				viewManager.enableButton(insertFootnoteSubmit);
			} else {
				viewManager.disableButton(insertFootnoteSubmit);
			};
		});
		this.footText = this.viewManager.addTextInput(insertFootnoteForm, 'footnote_text', language.footText);
		this.footText.setAttribute('tabindex', 2);
		const footText = this.footText;
		this.footText.addEventListener('input', function() {
			if(footLabel.value != '' && footText.value != '') {
				viewManager.enableButton(insertFootnoteSubmit);
			} else {
				viewManager.disableButton(insertFootnoteSubmit);
			};
		});

		const insertFootnoteSubmit = document.createElement('input');
		insertFootnoteSubmit.setAttribute('type', 'submit');
		insertFootnoteSubmit.setAttribute('value',language.insert);
		insertFootnoteSubmit.setAttribute('tabindex', 3);
		viewManager.disableButton(insertFootnoteSubmit);

		insertFootnoteForm.appendChild(insertFootnoteSubmit);
		this.dialogContent.appendChild(insertFootnoteForm);

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

		insertFootnoteForm.addEventListener('reset', function() {
			viewManager.disableButton(insertFootnoteSubmit);
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
