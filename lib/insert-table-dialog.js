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
			const dialogContainer = insertTableDialog.dialogContent.parentElement;
			//Read default style from css.
			const setMargin = window.getComputedStyle(insertTableDialog.dialogContent, null).getPropertyValue('margin-left').replace('px', '');
			const setContentWidth = window.getComputedStyle(dialogContainer, null).getPropertyValue('min-width').replace('px', '') - 2*setMargin;
			const setPaddingLeft = window.getComputedStyle(tableColumbs, null).getPropertyValue('padding-left');
			const setPaddingRight = window.getComputedStyle(tableColumbs, null).getPropertyValue('padding-right');
			//Manipulate default style.
			//Let the width of the container grow an shrink with its content.
			dialogContainer.style.display = 'table-cell';
			insertTableDialog.dialogContent.style.display = 'table';

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

			var cellWidth;
			if(columbs < 3) {
				cellWidth = setContentWidth/columbs - 2*setMargin;
			} else {
				cellWidth = setContentWidth/3 - 2*setMargin;
			};

			const currentCells = tableContainer.getElementsByTagName('input');

			//Insert columbs.
			if(currentColumbs <= columbs) {
				for(var i = 0; i < currentCells.length; i++) {
					currentCells[i].style.width = cellWidth + 'px';
				};

				for(var i = currentColumbs; i < columbs; i++) {
					const cell = viewManager.addTextInput (undefined, 'head_' + i, language.head + ' ' + i);
					cell.style.paddingLeft = '0px';
					cell.style.paddingRight = '0px';
					cell.style.marginLeft = '0px';
					cell.style.marginRight = '0px';
					headContainer.appendChild(cell);
					//Transition only works if there is 10ms delay between creating and setting the width.
					setTimeout(function() {
						cell.style.width = cellWidth + 'px';
						cell.style.paddingLeft = setPaddingLeft;
						cell.style.paddingRight = setPaddingLeft;
						cell.style.marginLeft = setMargin + 'px';
						cell.style.marginRight = setMargin + 'px';
					}, 1);

					//for Schleife für alle rows
				};
			};
			//Remove columbs.
			if(currentColumbs > columbs) {
				for(var i = currentColumbs; i > columbs; i--) {
					var transitionDuration = window.getComputedStyle(headContainer.lastChild, null).getPropertyValue('transition-duration').replace('s', '') * 1000;
					headContainer.lastChild.style.padding = '0px';
					headContainer.lastChild.style.width = '0px';
					setTimeout(function() {
						headContainer.removeChild(headContainer.lastChild);
						for(var i = 0; i < currentCells.length; i++) {
							currentCells[i].style.width = cellWidth + 'px';
						};
					}, transitionDuration);
				}
				//for Schleife für alle Rows
			};
		};

		function deleteColumbsAndRows() {
			headContainer.innerHTML = null;
			cellContainer.innerHTML = null;
		};
	}
}
