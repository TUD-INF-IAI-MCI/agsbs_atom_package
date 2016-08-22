'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertLinkDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		this.dialogHeadline.innerHTML = language.insertLink;

		const insertLinkForm = document.createElement('form');
		insertLinkForm.classList.add('link_form');
		insertLinkForm.setAttribute('method','post');

		this.link = this.viewManager.addTextInput(insertLinkForm, 'link', language.link);
		this.link.setAttribute('tabindex', 1);

		const link = this.link;
		this.link.addEventListener('input', function() {
			if(link.value != '' && linkText.value != '') {
				viewManager.enableButton(insertLinkSubmit);
			} else {
				viewManager.disableButton(insertLinkSubmit);
			};
		});

		this.linkText = this.viewManager.addTextInput(insertLinkForm, 'link_text', language.linkText);
		this.linkText.setAttribute('tabindex', 2);
		const linkText = this.linkText;
		this.linkText.addEventListener('input', function() {
			if(link.value != '' && linkText.value != '') {
				viewManager.enableButton(insertLinkSubmit);
			} else {
				viewManager.disableButton(insertLinkSubmit);
			};
		});
		const title = this.viewManager.addTextInput(insertLinkForm, 'link_title', language.linkTitle);
		title.setAttribute('tabindex', 3);

		const insertLinkSubmit = document.createElement('input');
		insertLinkSubmit.setAttribute('type', 'submit');
		insertLinkSubmit.setAttribute('value','Submit');
		insertLinkSubmit.setAttribute('tabindex', 4);
		viewManager.disableButton(insertLinkSubmit);

		insertLinkForm.appendChild(insertLinkSubmit);
		this.dialogContent.appendChild(insertLinkForm);

		insertLinkForm.addEventListener('submit', function(event) {
			var url, text, titte;
			url = link.value;
			text = linkText.value;
			titte = title.value;
			editor.insertLink(text, url, titte);
			viewManager.closeDialog();
		});

		insertLinkForm.addEventListener('reset', function() {
			viewManager.disableButton(insertLinkSubmit);
		});
	}

	setSelectedAsLinkText() {
		var selectedText = atom.workspace.getActivePaneItem().getSelectedText();
		if (selectedText != '') {
			this.linkText.value = selectedText;
			this.link.focus();
		}
	}
}
