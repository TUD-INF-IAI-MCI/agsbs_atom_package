'use babel';

const iPath = require('path');
const fs = require('fs');
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

		this.pictureDrop = viewManager.addDropDownMenu(insertGraphicForm, 'pictures', null, []);

		this.or = document.createElement('p');
		this.or.innerHTML = language.or;
		insertGraphicForm.appendChild(this.or);
		this.uri = this.viewManager.addTextInput(insertGraphicForm, 'uri', language.uri);
		const title = this.viewManager.addTextInput(insertGraphicForm, 'graphic_title', language.graphicTitle);

		const insertGraphicSubmit = document.createElement('input');
		insertGraphicSubmit.setAttribute('type', 'submit');
		insertGraphicSubmit.setAttribute('value',language.insert);
		viewManager.disableButton(insertGraphicSubmit);

		insertGraphicForm.appendChild(insertGraphicSubmit);
		this.dialogContent.appendChild(insertGraphicForm);

		const altText = this.altText;
		const uri = this.uri;
		const file = this.file;

		this.altText.addEventListener('input', function() {
			if(file.files[0] || uri.value) {
				viewManager.enableButton(insertGraphicSubmit);
			};
		});

		this.file.addEventListener('change', function() {
			uri.setAttribute('disabled', '');
			if(altText.value != '') {
				viewManager.enableButton(insertGraphicSubmit);
			};
		});

		this.uri.addEventListener('input', function() {
			if(altText.value) {
				viewManager.enableButton(insertGraphicSubmit);
			};
		});

		insertGraphicForm.addEventListener('reset', function() {
			viewManager.disableButton(insertGraphicSubmit);
		});

		insertGraphicForm.addEventListener('submit', function(event) {
			let alt, location, titte, currentPath;
			alt = altText.value;
			location = typeof file.files[0] === 'undefined' ? uri.value : file.files[0].path;
			titte = title.value;
			currentPath = iPath.dirname(atom.workspace.getActivePaneItem().buffer.file.path);
			alt = alt.replace(/\n/g, ' <br> ');
			titte = titte.replace(/\s/g, '_');
			let promise = matuc.imgDesc(alt, currentPath, titte, location);
			promise.then(function(fragment) {
				editor.insertGraphic(fragment.internal.verbatim);
				if (fragment.external) {
					var fd = fs.openSync(currentPath + '/images.md', 'a+');
					fs.write(fd, fragment.external.verbatim, (error) => {
						if (error) {
							atom.notifications.addError(language.somethingWentWrongDuringInsertOfGraphic, {
								detail : error,
								dismissable : true
							});
							return;
						} else {
							atom.notifications.addSuccess('images.md ' + language.imagesMdHasBeenWritten, {
								detail : 'in: ' + currentPath,
								dismissable : true
							});
							fs.closeSync(fd);
						}
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
	addPictureData(){
		this.resetPictureDropdown();
		var editor = atom.workspace.getActivePaneItem();
		var path = iPath.dirname(editor.buffer.file.path);
		var self = this;
		var imageArray = [];
		var pathPicture = iPath.join(path,'bilder');
		imageArray = this.getAllPicturFromPath(pathPicture);
		this.pictures = imageArray;
		this.addItemToPictureDropdown(imageArray);
	}

	getAllPicturFromPath(pathPicture){
		var imageArray = [];
		fs.exists(pathPicture, function(exists) {
  			if (exists) {
				fs.readdir(pathPicture, function(err, files) {
					files.filter(function(file){
            return ( (file.toLowerCase().substr(-4) === '.png') ||
										 (file.toLowerCase().substr(-4) === '.jpg') ||
										 (file.toLowerCase().substr(-4)=== '.svg'));
        		}).forEach(function(file){
            	imageArray.push(file);
        		});
  				});
			}
		});
		return imageArray;
	}

	addItemToPictureDropdown(imageArray) {
		for (var i = 0; i < imageArray.length; i++) {
			this.pictureDrop.options.add(new Option(imageArray[i], imageArray[i]));
		}
	}
	resetPictureDropdown(){
		var length = this.pictureDrop.options.length;
		for(var i = 0; i < length; i++){
			this.pictureDrop.remove(i);
			this.pictureDrop.items = [];
		}
	}
}
