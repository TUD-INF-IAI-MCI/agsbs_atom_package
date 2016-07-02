'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class InsertTableDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;
		const editor = agsbs.editorFunctions;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const insertTableDialog = this;

		const insertTableForm = document.createElement('form');
		insertTableForm.setAttribute('method','post');

		const numberpickerContainer = document.createElement('div');
		numberpickerContainer.classList.add('numberpicker_container');

		const tableRows = this.viewManager.addNumberPicker(numberpickerContainer, 'rows', language.rows);
		tableRows.setAttribute('min', '2');
		//listener for the guided dialog.
		tableRows.addEventListener('input', function() {
			viewManager.noFunction();
			createColumbsAndRows();
		});
		const tableColumbs = this.viewManager.addNumberPicker(numberpickerContainer, 'columbs', language.columbs);
		tableColumbs.setAttribute('min', '1');
		//listener for the guided dialog.
		tableColumbs.addEventListener('input', function() {
			viewManager.noFunction();
			createColumbsAndRows();
		});
		const tableContainer = document.createElement('div');
		tableContainer.classList.add('table_container');

		const headContainer = document.createElement('div');
		headContainer.classList.add('head_container');
		const cellContainer = document.createElement('div');
		cellContainer.classList.add('cell_container');

		insertTableForm.appendChild(numberpickerContainer);

		const insertTableSubmit = document.createElement('input');
		insertTableSubmit.setAttribute('type', 'submit');
		insertTableSubmit.setAttribute('value','Submit');

		tableContainer.appendChild(headContainer);
		tableContainer.appendChild(cellContainer);
		insertTableForm.appendChild(tableContainer);
		insertTableForm.appendChild(insertTableSubmit);
		this.dialogContent.appendChild(insertTableForm);

		insertTableForm.addEventListener('submit', function(event) {
			viewManager.noFunction();
			viewManager.closeDialog();
		});

		insertTableForm.addEventListener('reset', function() {
			deleteColumbsAndRows();
		});

		function createColumbsAndRows() {
			//rows = Zeilen, columbs = Spalten
			if(tableRows.value == '') {
				tableRows.value = 2;
			};
			if(tableColumbs.value == '') {
				tableColumbs.value = 1;
			};

			var currentWidth = insertTableDialog.dialogContent.offsetWidth;
			var currentMargin = window.getComputedStyle(insertTableDialog.dialogContent, null).getPropertyValue('margin-left');

			var currentRows = headContainer.childNodes.length;
			var currentColumbs = cellContainer.childNodes.length / currentRows + 1;
			var currentTableCells = headContainer.childNodes.length + cellContainer.childNodes.length;
			//Insert cells.
			if(currentColumbs >= tableColumbs.value && currentRows >= tableRows.value) {
				for(var i = currentColumbs; i < tableColumbs.value; i++) {
					viewManager.addTextInput (headContainer, 'head_' + i, language.head + ' ' + i);
				};
			};

			//zwei divs...eins erste Zeile mit border bottom und der Rest
		};

		function deleteColumbsAndRows() {
			headContainer.innerHTML = null;
			cellContainer.innerHTML = null;
		};
	}
}
