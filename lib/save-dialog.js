'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';

export default class SaveDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const commitChangesDialog = agsbs.renderCommitChangesDialog();

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		this.dialogHeadline.innerHTML = language.userWantsToCommitChanges;

		const buttonContainer = document.createElement('div');
		buttonContainer.classList.add('buttons');

		const yesButton = document.createElement('input');
		yesButton.setAttribute('id', 'yes');
		yesButton.setAttribute('type', 'submit');
		yesButton.setAttribute('value', language.yes);
		yesButton.setAttribute('tabindex', 14);

		const noButton = document.createElement('input');
		noButton.setAttribute('id', 'no');
		noButton.setAttribute('type', 'submit');
		yesButton.setAttribute('value', language.no);
		yesButton.setAttribute('tabindex', 14);

		buttonContainer.appendChild(yesButton);
		buttonContainer.appendChild(noButton);

		// viewManager.addButton(buttonContainer, 'yes', language.yes, 'yes', commit);
		// viewManager.addButton(buttonContainer, 'no', language.no, 'no', viewManager.closeDialog);

		yesButton.onclick = function(event) {
				commit();
		};

		noButton.onclick = function(event) {
				viewManager.closeDialog();
		};

		this.dialogContent.appendChild(buttonContainer);

		function commit() {
			viewManager.closeDialog();
			viewManager.toggleDialog(commitChangesDialog);
		}
	}
}
