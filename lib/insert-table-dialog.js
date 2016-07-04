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

		const tableColumns = this.viewManager.addNumberPicker(numberpickerContainer, 'columns', language.columns);
		tableColumns.setAttribute('min', '1');
		tableColumns.setAttribute('placeholder', '1');
		//listener for the guided dialog.
		tableColumns.addEventListener('input', function() {
			createColumnsAndRows();
		});
		const tableRows = this.viewManager.addNumberPicker(numberpickerContainer, 'rows', language.rows);
		tableRows.setAttribute('min', '2');
		tableRows.setAttribute('placeholder', '2');
		//listener for the guided dialog.
		tableRows.addEventListener('input', function() {
			createColumnsAndRows();
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
			deleteColumnsAndRows();
		});


		function createColumnsAndRows() {
			this.dialogContainer = insertTableDialog.dialogContent.parentElement;
			this.currentCells = tableContainer.getElementsByTagName('input');
			//Read default style from css.
			this.setMargin = window.getComputedStyle(insertTableDialog.dialogContent, null).getPropertyValue('margin-left').replace('px', '');
			this.setContentWidth = parseInt(window.getComputedStyle(dialogContainer, null).getPropertyValue('min-width').replace('px', '')) - 2*setMargin;
			this.setPaddingLeft = window.getComputedStyle(tableColumns, null).getPropertyValue('padding-left');
			this.setPaddingRight = window.getComputedStyle(tableColumns, null).getPropertyValue('padding-right');
			this.rowContainerHeight = parseInt(window.getComputedStyle(tableColumns, null).getPropertyValue('height').replace('px', '')) + 2*setMargin;

			//Manipulate default style.
			//Let the width of the container grow an shrink with its content.
			this.dialogContainer.style.display = 'table-cell';
			insertTableDialog.dialogContent.style.display = 'table';

			if(tableColumns.value == '') {
				this.setColumns = 1;
			} else {
				this.setColumns = tableColumns.value;
			};
			if(tableRows.value == '') {
				this.setRows = 2;
			} else {
				this.setRows = tableRows.value;
			};

			this.currentColumns = headContainer.childNodes.length;

			if(this.currentColumns == 0) {
				this.currentRows = 0;
			} else {
				this.currentRows = cellContainer.childNodes.length / this.currentColumns + 1;
			};

			this.cellWidth;
			if(this.setColumns < 3) {
				this.cellWidth = this.setContentWidth/this.setColumns - 2*this.setMargin;
			} else {
				this.cellWidth = this.setContentWidth/3 - 2*this.setMargin;
			};

			if(this.currentColumns <= this.setColumns) {
				setColumnWidth();
				addColumns();
			} else {
				removeColumns();
			};

			if(this.currentRows <= this.setRows) {

			};
		};

		function setColumnWidth() {
			for(var i = 0; i < this.currentCells.length; i++) {
				this.currentCells[i].style.width = this.cellWidth + 'px';
			};
		};

		function addColumns() {
			for(var i = this.currentColumns; i < this.setColumns; i++) {
				const cell = viewManager.addTextInput (undefined, 'head_' + i, language.head + ' ' + i);
				cell.style.paddingLeft = '0px';
				cell.style.paddingRight = '0px';
				cell.style.marginLeft = '0px';
				cell.style.marginRight = '0px';
				headContainer.appendChild(cell);
				//Transition only works if there is 1ms delay between creating and setting the width.
				setTimeout(function() {
					cell.style.width = this.cellWidth + 'px';
					cell.style.paddingLeft = this.setPaddingLeft;
					cell.style.paddingRight = this.setPaddingLeft;
					cell.style.marginLeft = this.setMargin + 'px';
					cell.style.marginRight = this.setMargin + 'px';
				}, 1);
			};
		};

		function removeColumns() {
			//Remove columns.
			for(var i = this.currentColumns; i > this.setColumns; i--) {
				const lastChild = headContainer.lastChild;
				var transitionDuration = window.getComputedStyle(lastChild, null).getPropertyValue('transition-duration').replace('s', '') * 1000;
				lastChild.style.padding = '0px';
				lastChild.style.width = '0px';
				setTimeout(function() {
					headContainer.removeChild(lastChild);
					setColumnWidth();
				}, transitionDuration);
			}
		};

		function deleteColumnsAndRows() {
			headContainer.innerHTML = null;
			cellContainer.innerHTML = null;
		};
	}
}
