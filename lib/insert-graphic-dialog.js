'use babel';

const iPath = require('path');
import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertraphicDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;
		const matuc = agsbs.matuc;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		this.dialogHeadline.innerHTML = language.insertGraphic;

		const insertGraphicForm = document.createElement('form');
		insertGraphicForm.classList.add('insert_graphic_form');
		insertGraphicForm.setAttribute('method','post');

		this.altText = this.viewManager.addTextarea(insertGraphicForm, 'alt_text', language.altText);
		this.file = this.viewManager.addFilePicker(insertGraphicForm, 'graphic_file', language.graphicFile, 'file');
		this.file.setAttribute('accept', 'image/*');
		this.or = document.createElement('p');
		this.or.innerHTML = language.or;
		insertGraphicForm.appendChild(this.or);
		this.uri = this.viewManager.addTextInput(insertGraphicForm, 'uri', language.uri);
		const title = this.viewManager.addTextInput(insertGraphicForm, 'graphic_title', language.graphicTitle);

		const insertGraphicSubmit = document.createElement('input');
		insertGraphicSubmit.setAttribute('type', 'submit');
		insertGraphicSubmit.setAttribute('value',language.insert);

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
			const currentPath = iPath.dirname(atom.workspace.getActivePaneItem().buffer.file.path);
			let promise = matuc.imgDesc(alt, currentPath, titte, location);
			promise.then(function(fragment) {
				editor.insertGraphic(fragment.internal.verbatim);
				if (fragment.external) {
					fs.writeFile('message.txt', 'Hello Node.js', (err) => {
					if (err) throw err;
						console.log('It\'s saved!');
					});
				}
			}).catch(function(error) {
				atom.notifications.addError(language.somethingWentWrongDuringInsertOfGraphic, {
					detail : error,
					dismissable : true
				});
			});
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
