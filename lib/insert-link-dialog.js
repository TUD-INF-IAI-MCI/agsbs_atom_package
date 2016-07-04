'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertLinkDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const insertLinkForm = document.createElement('form');
		insertLinkForm.setAttribute('method','post');

		this.linkText = this.viewManager.addTextInput(insertLinkForm, 'link-text', language.linkText);
		var link = this.viewManager.addTextInput(insertLinkForm, 'link', language.link);

		const insertLinkSubmit = document.createElement("input");
		insertLinkSubmit.setAttribute('type', 'submit');
		insertLinkSubmit.setAttribute('value','Submit');

		insertLinkForm.appendChild(insertLinkSubmit);
		this.dialogContent.appendChild(insertLinkForm);

		insertLinkForm.onsubmit = function(event) {
			var url, text;
			url = link.value;
			text = linkText.value;
			editor.insertLink(text, url);
			viewManager.closeDialog();
		}
	}

	setSelectedAsLinkText() {
		console.log('SPAST');
		this.linkText.value = linkText.value = atom.workspace.getActivePaneItem().getSelectedText();
	}
}
