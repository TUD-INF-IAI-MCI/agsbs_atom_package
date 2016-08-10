'use babel';

const pathHandler = require('path');

import ViewManager from './view-manager';
import DialogView from './dialog-view';

export default class CommitChangesDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const git = agsbs.git;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const commitChangesForm = document.createElement('form');
		commitChangesForm.setAttribute('method','post');

		const commitMessageInput = this.viewManager.addTextInput(commitChangesForm, 'source', language.commitMessage);

		const commitChangesSubmit = document.createElement("input");
		commitChangesSubmit.setAttribute('type', 'submit');
		commitChangesSubmit.setAttribute('value','Submit');

		commitChangesForm.appendChild(commitChangesSubmit);
		this.dialogContent.appendChild(commitChangesForm);

		commitChangesForm.addEventListener('submit', function(event) {
			var editor = atom.workspace.getActivePaneItem();
			editor.save();
			var path = pathHandler.dirname(editor.buffer.file.path);
			git.commit(commitMessageInput.value, path);
			viewManager.closeDialog();
		});
	}
}
