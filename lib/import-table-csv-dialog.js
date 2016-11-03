'use babel';

const iPath = require('path');
const fs = require('fs');
import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';
import ErrorMessageFormatter from './error-message-formatter';
export default class ImportTableCsvDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		this.dialogHeadline.innerHTML = language.importTableCsv;

		const importTableCsvForm = document.createElement('form');
		importTableCsvForm.setAttribute('method','post');


		const fileInput = this.viewManager.addFilePicker(importTableCsvForm, 'csv_file', language.link, 'file');

		fileInput.setAttribute('accept', '.csv');
		fileInput.addEventListener('change', function() {
			viewManager.enableButton(importTableCsvSubmit);
			importTableCsvSubmit.focus();
		});

		this.uri = this.viewManager.addTextInput(importTableCsvForm, 'uri', language.uriTable);
		this.tableDrop = viewManager.addDropDownMenu(importTableCsvForm, 'tables', language.selectTable, []);
		this.tableDrop.parentNode.style.width = '50%';
		const uri	= this.uri;


		const importTableCsvSubmit = document.createElement('input');
		importTableCsvSubmit.setAttribute('type', 'submit');
		importTableCsvSubmit.setAttribute('value',language.import);
		viewManager.disableButton(importTableCsvSubmit);

		importTableCsvForm.appendChild(importTableCsvSubmit);
		this.dialogContent.appendChild(importTableCsvForm);


		this.tableDrop.addEventListener('change', function() {
			console.log("change");
			if(tables.selectedIndex > 0){
					viewManager.enableButton(importTableCsvSubmit);
					uri.value = tables.options[tables.selectedIndex].value;
			}else{
					viewManager.disableButton(importTableCsvSubmit);
					uri.value = "";
			}
		});
		importTableCsvForm.addEventListener('reset', function() {
			viewManager.disableButton(importTableCsvSubmit);
		});

		importTableCsvForm.addEventListener('submit', function(event) {
			if(uri.value){
				editor.importTableFromCsv(uri.value);
			}
			if(fileInput.files[0]){
				editor.importTableFromCsv(fileInput.files[0]);
			}
			viewManager.closeDialog();
		});

	}

	addTableData(){
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
		var tableArray = [];
		//ToDo
		var pathPicture = iPath.join(path,'tabellen');

		var promiseGetAll = new Promise(function(resolve, reject) {
			fs.exists(pathPicture, function(exists) {
					if (exists) {
					fs.readdir(pathPicture, function(err, files) {
						files.filter(function(file){
										return ((file.toLowerCase().substr(-4) === '.csv'));
								}).forEach(function(file) {
										tableArray.push(file);
								});
						resolve(tableArray);
						});
				}
			});
		});
		// tableArray = self.getAllPicturFromPath(pathPicture);
		var promiseReset = new Promise(function(resolve, reject) {
			while(self.tableDrop.options.length != 0) {
				self.tableDrop.remove(0);
			};
			self.tableDrop.items = [];
			resolve(true);
		});
		Promise.all([promiseReset, promiseGetAll]).then(function(){
			var promiseAddToSelection = new Promise(function(resolve, reject){
				self.tables = tableArray;
				if(tableArray.length == 0){
						var formatter  = new ErrorMessageFormatter();
						var message = self.language.thereAreNoTableInFolder	+ " "
												 + self.language.addTableToFolder + "\""+pathPicture  +"\"";
						message = formatter.formatErrorMessage(message, false);
						atom.notifications.addError(self.language.ErrorNoTable, {
							detail : message,
							dismissable : true
						});
					self.viewManager.closeDialog();
				}
				self.addItemToTableDropdown(tableArray, pathPicture);
				resolve(true);
			});
		});
  }

  getAllTablesFromPath(pathTable) {
	var tableArray = [];
	fs.exists(pathTable, function(exists) {
			if (exists) {
			fs.readdir(pathTable, function(err, files) {
				files.filter(function(file){
								return ( (file.toLowerCase().substr(-4) === '.png'));
						}).forEach(function(file){
								tableArray.push(file);
						});
				});
		}
	});
	return tableArray;
 }

  addItemToTableDropdown(tableArray, path) {
	this.tableDrop.options.add(new Option(this.language.importTableCsv, null));
	for (var i = 0; i < tableArray.length; i++) {
		this.tableDrop.options.add(new Option(tableArray[i], iPath.join(path,tableArray[i])));
		}
 }
	resetImageDropdown(){
		var length = this.tableDrop.options.length;
		for(var i = 0; i < length; i++){
			this.tableDrop.remove(i);
		}
		this.tableDrop.items = [];
	}
}
