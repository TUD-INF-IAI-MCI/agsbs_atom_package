'use babel';

const pathHandler = require('path');

import ViewManager from './view-manager';
import DialogView from './dialog-view';

export default class SaveDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const commitChangesDialog = agsbs.renderCommitChangesDialog();
		const git = agsbs.git;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		this.dialogHeadline.innerHTML = language.userWantsToCommitChanges;
		const commitMessage = document.createElement('div');
		commitMessage.classList.add('save_commit_message_container');
		commitMessage.setAttribute('disabled', '');
		const commitMessageInput = viewManager.addTextInput(commitMessage, 'save_dialog_commit_message', language.commitMessage);
		this.dialogContent.appendChild(commitMessage);

		commitMessageInput.addEventListener('input', function() {
			if(commitMessageInput.value != '') {
				viewManager.enableButton(commitButton);
			} else {
				viewManager.disableButton(commitButton);
			};
		});

		const buttonContainer = document.createElement('div');
		buttonContainer.classList.add('save_buttons');
		buttonContainer.style.height = '42px';

		const yesButton = viewManager.addButton(buttonContainer, 'yes_button', language.yes, undefined, yesClicked);
		const noButton = viewManager.addButton(buttonContainer, 'no_button', language.no, undefined, viewManager.closeDialog);

		this.dialogContent.appendChild(buttonContainer);

		const commitButtonContainer = document.createElement('div');
		commitButtonContainer.classList.add('save_commit_button_container');

		const commitButton = viewManager.addButton(commitButtonContainer, 'save_commit_button', language.commit, undefined, commit);
		viewManager.disableButton(commitButton);

		this.dialogContent.appendChild(commitButtonContainer);

		function yesClicked() {
			commitMessage.style.height = '42px';
			commitMessage.removeAttribute('disabled');
			buttonContainer.style.height = '0px';
			commitButtonContainer.style.height = '42px';
		};

		function commit() {
			var editor = atom.workspace.getActivePaneItem();
			var path = pathHandler.dirname(editor.buffer.file.path);
			git.add(commitMessageInput.value, path);
			//git.commit(commitMessageInput.value, path);
			viewManager.closeDialog();
		}
	}
}
