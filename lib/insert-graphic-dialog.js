'use babel';

const iPath = require('path');
const fs = require('fs');
import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';
import ErrorMessageFormatter from './error-message-formatter';
export default class InsertGraphicDialog extends DialogView {

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

		const outsourceCheckboxContainer = document.createElement('div');
		outsourceCheckboxContainer.classList.add('outsource_checkbox_container');
		const outsourceCheckbox = viewManager.addCheckbox(outsourceCheckboxContainer, 'outsource_checkbox', language.outsourceCheckbox);

		insertGraphicForm.appendChild(outsourceCheckboxContainer);

		this.altText = this.viewManager.addTextarea(insertGraphicForm, 'alt_text', language.altText);

		const insertOnlyInternalMaterial = atom.config.get('agsbs-atom-package.insertOnlyInternalMaterial');
		if(!insertOnlyInternalMaterial){
			this.file = this.viewManager.addFilePicker(insertGraphicForm, 'graphic_file', language.graphicFile, 'file');
			this.file.setAttribute('accept', 'image/*');
			this.file.addEventListener('change', function() {
				uri.setAttribute('disabled', '');
				if(altText.value != '') {
					viewManager.enableButton(insertGraphicSubmit);
				};
			});
		}
		this.pictureDrop = viewManager.addDropDownMenu(insertGraphicForm, 'pictures', language.selectPicture, []);
		this.pictureDrop.parentNode.style.width = '100%';

		this.or = document.createElement('p');
		this.or.innerHTML = language.or;
		insertGraphicForm.appendChild(this.or);
		this.uri = this.viewManager.addTextInput(insertGraphicForm, 'uri', language.uri);
		this.graphicTitle = this.viewManager.addTextInput(insertGraphicForm, 'graphicTitle', language.graphicTitle);

		const insertGraphicSubmit = document.createElement('input');
		insertGraphicSubmit.setAttribute('type', 'submit');
		insertGraphicSubmit.setAttribute('value',language.insert);
		viewManager.disableButton(insertGraphicSubmit);

		insertGraphicForm.appendChild(insertGraphicSubmit);
		this.dialogContent.appendChild(insertGraphicForm);

		const altText = this.altText;
		const uri = this.uri;
		const file = this.file;
		const graphicTitle = this.graphicTitle;


		this.altText.addEventListener('input', function() {
			if(!insertOnlyInternalMaterial){
					if(file.files[0]){
					viewManager.enableButton(insertGraphicSubmit);
				}
			}
			if( uri.value || pictures.selectedIndex > 0) {
				viewManager.enableButton(insertGraphicSubmit);
			};
			if(altText.value.length > 80){
				outsourceCheckbox.checked = true;
			}
			if(altText.value == '' || (altText.value.length > 80 && graphicTitle.value == '')){
				viewManager.disableButton(insertGraphicSubmit);
			}
		});



		this.pictureDrop.addEventListener('change', function() {
			if(pictures.selectedIndex > 0){
				uri.value = pictures.options[pictures.selectedIndex].value;
				if(altText.value != '') {
					viewManager.enableButton(insertGraphicSubmit);
				};
			}else{
					viewManager.disableButton(insertGraphicSubmit);
					uri.value = "";
			}
		});
		this.graphicTitle.addEventListener('input', function() {
			if(altText.value == '' || (altText.value.length > 80 && graphicTitle.value == '')){
				viewManager.disableButton(insertGraphicSubmit);
			}else
			{
					viewManager.enableButton(insertGraphicSubmit);
			}
		});

		this.uri.addEventListener('input', function() {
			if(altText.value && altText.value.length <= 80) {
				viewManager.enableButton(insertGraphicSubmit);
			}else{
				viewManager.disableButton(insertGraphicSubmit);
			}
		});

		insertGraphicForm.addEventListener('reset', function() {
			viewManager.disableButton(insertGraphicSubmit);
		});

		insertGraphicForm.addEventListener('submit', function(event) {
			let alt, location, title, currentPath;
			alt = altText.value;
			if(!insertOnlyInternalMaterial){
				location = typeof file.files[0] === 'undefined' ? uri.value : file.files[0].path;
			}else{
				location = uri.value;
			}
			title = document.getElementById("graphicTitle").children[0].value; //ToDo, why is graphicTitle.value not working
			currentPath = iPath.dirname(atom.workspace.getActivePaneItem().buffer.file.path);
			//alt = alt.replace(/\n/g, ' <br> ');
			var panes = atom.workspace.getPaneItems();
			for (var i = 0; i < panes.length; i++){
				var val = panes[i];
				if(val.buffer){
					val.buffer.save();
				}
			}
			let promise = matuc.imgDesc(alt, outsourceCheckbox.checked, currentPath, title, location);			
			promise.then(function(fragment) {
				if (fragment.external) {
					editor.insertGraphic(fragment.internal.verbatim.replace("images.html#", "bilder.html#"));
					var fd = fs.openSync(currentPath + '/bilder.md', 'a+');
					let desc = "\n" + fragment.external.verbatim//to fix error
					desc = desc.replace(/["']/g, "\\\"");
					fs.write(fd, desc, (error) => {
						if (error) {
							atom.notifications.addError(language.somethingWentWrongDuringInsertOfGraphic, {
								detail : error,
								dismissable : true
							});
							return;
						} else {
							atom.notifications.addSuccess('bilder.md ' + language.imagesMdHasBeenWritten, {
								detail : 'in: ' + currentPath,
								dismissable : true
							});
							fs.closeSync(fd);
						}
					});
				}else{
						editor.insertGraphic(fragment.internal.verbatim.replace(/["']/g, "\\\""));
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
		var editor = atom.workspace.getActivePaneItem();
		var path = "";
		if (editor.buffer.file) {
			path = iPath.dirname(editor.buffer.file.path);
		} else {
			var formatter = new ErrorMessageFormatter();
			message = formatter.formatErrorMessage(this.language.selectMdFile, false);
			atom.notifications.addError(this.language.error, {
				detail : message,
				dismissable : true
			});
			this.viewManager.closeDialog();
			return;
		}
		var self = this;
		var imageArray = [];
		//ToDo
		var pathPicture = iPath.join(path,'bilder');

		var promiseGetAll = new Promise(function(resolve, reject) {
			fs.exists(pathPicture, function(exists) {
	  			if (exists) {
					fs.readdir(pathPicture, function(err, files) {
						files.filter(function(file){
									let filename = file.toLowerCase();
									if(filename.indexOf(" ") == -1){
	            			return (((filename.substr(-4) === '.png') ||
										(filename.substr(-4) === '.jpg') ||
										(filename.substr(-5) === '.jpeg') ||
										(filename.substr(-4)=== '.svg')) &&
										(filename.match(/eqn\d{3}.png/) == null));
									}
	        			}).forEach(function(file) {
	            			imageArray.push(file);
	        			});
						resolve(imageArray);
	  				});
				}else{
					var formatter  = new ErrorMessageFormatter();
					var message = self.language.thereAreNoPicturesInFolder	+ " "
											 + self.language.addPictureToFolder + "\""+pathPicture  +"\"";
					message = formatter.formatErrorMessage(message, false);
					atom.notifications.addError(self.language.ErrorNoPicture, {
						detail : message,
						dismissable : true
					});
					self.viewManager.closeDialog();
				}
			});
		});
		// imageArray = self.getAllPicturFromPath(pathPicture);
		var promiseReset = new Promise(function(resolve, reject) {
			while(self.pictureDrop.options.length != 0) {
    		self.pictureDrop.remove(0);
    	};
			self.pictureDrop.items = [];
			resolve(true);
		});
		Promise.all([promiseReset, promiseGetAll]).then(function(){
			var promiseAddToSelection = new Promise(function(resolve, reject){
				self.pictures = imageArray;
				if(imageArray.length == 0){
						var formatter  = new ErrorMessageFormatter();
						var message = self.language.thereAreNoPicturesInFolder	+ " "
						 						 + self.language.addPictureToFolder + "\""+pathPicture  +"\"";
						message = formatter.formatErrorMessage(message, false);
						atom.notifications.addError(self.language.ErrorNoPicture, {
							detail : message,
							dismissable : true
						});
					self.viewManager.closeDialog();
				}
				self.addItemToPictureDropdown(imageArray, pathPicture);
				resolve(true);
			});
		});
	}

	getAllPicturFromPath(pathPicture) {
		var imageArray = [];
		fs.exists(pathPicture, function(exists) {
  			if (exists) {
				fs.readdir(pathPicture, function(err, files) {
					files.filter(function(file){
									if(!file.toLowerCase().contains(" ")){ //avoid spaces
            				return ( (file.toLowerCase().substr(-4) === '.png') ||
								 		(file.toLowerCase().substr(-4) === '.jpg') ||
								 		(file.toLowerCase().substr(-4) === '.svg'));
								 }
        			}).forEach(function(file){
            			imageArray.push(file);
        			});
  				});
			}
		});
		return imageArray;
	}

	addItemToPictureDropdown(imageArray, path) {
		this.pictureDrop.options.add(new Option(this.language.selectImageFile, null));
		for (var i = 0; i < imageArray.length; i++) {
			this.pictureDrop.options.add(new Option(imageArray[i], iPath.join(path,imageArray[i])));
		}
	}
	resetPictureDropdown(){
		var length = this.pictureDrop.options.length;
		for(var i = 0; i < length; i++){
			this.pictureDrop.remove(i);
		}
		this.pictureDrop.items = [];
	}
}
