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

		const tableColumbs = this.viewManager.addNumberPicker(numberpickerContainer, 'columbs', language.columbs);
		tableColumbs.setAttribute('min', '1');
		tableColumbs.setAttribute('placeholder', '1');
		//listener for the guided dialog.
		tableColumbs.addEventListener('input', function() {
			//viewManager.noFunction();
			createColumbsAndRows();
		});
		const tableRows = this.viewManager.addNumberPicker(numberpickerContainer, 'rows', language.rows);
		tableRows.setAttribute('min', '2');
		tableRows.setAttribute('placeholder', '2');
		//listener for the guided dialog.
		tableRows.addEventListener('input', function() {
			//viewManager.noFunction();
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
			var columbs, rows;
			if(tableColumbs.value == '') {
				columbs = 1;
			} else {
				columbs = tableColumbs.value;
			};
			if(tableRows.value == '') {
				rows = 2;
			} else {
				rows = tableRows.value;
			};

			var currentColumbs = headContainer.childNodes.length;
			var currentRows;
			if(currentColumbs == 0) {
				currentRows = 0;
			} else {
				currentRows = cellContainer.childNodes.length / currentColumbs + 1;
			};

			var currentContentWidth = insertTableDialog.dialogContent.offsetWidth;
			var currentMargin = window.getComputedStyle(insertTableDialog.dialogContent, null).getPropertyValue('margin-left').replace('px', '');

			var cellWidth = currentContentWidth/columbs - 2*currentMargin;

			const currentCells = tableContainer.getElementsByTagName('input');

			const dialogContainer = insertTableDialog.dialogContent.parentElement;

			var currentContainerWidth;
			if(dialogContainer.style.width) {
				currentContainerWidth = dialogContainer.style.width.replace('px', '');
			} else {
				window.getComputedStyle(dialogContainer, null).getPropertyValue('width').replace('px', '');
			};

			//Insert cells.
			if(currentColumbs <= columbs) {
				for(var i = 0; i < currentCells.length; i++) {
					currentCells[i].style.width = cellWidth + 'px';
				};

				for(var i = currentColumbs; i < columbs; i++) {
					const cell = viewManager.addTextInput (headContainer, 'head_' + i, language.head + ' ' + i);
					//Transition only works if there is 10ms delay between creating and setting the width.
					setTimeout(function() {
						cell.style.width = cellWidth + 'px';
					}, 1);

					//for Schleife für alle rows
				};
			};

			if(currentColumbs > Columbs) {
				//for Schleife für alle Rows
			};
		};

		function deleteColumbsAndRows() {
			headContainer.innerHTML = null;
			cellContainer.innerHTML = null;
		};
	}
}
