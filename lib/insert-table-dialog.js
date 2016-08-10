'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';
/**
* Class that creates a dialog for insert a table to a *.md document.
* @author leroy buchholz
*/
export default class InsertTableDialog extends DialogView {
	/**
	* @constructor
	* @this Instance of the insert-table-dialog.
	*/
	constructor(serializedState) {
		//Used instances from agsbs-atom-package.
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;
		const editor = agsbs.editorFunctions;

		//Get this.element and its child dialogContent from superclass.
		super(serializedState);

		const insertTableDialog = this;
		//Creating DOM elements.
		const insertTableForm = document.createElement('form');
		insertTableForm.setAttribute('method','post');

		const headerCheckboxContainer = document.createElement('div');
		headerCheckboxContainer.classList.add('table_head_checkbox_container');
		const tableHeadCheckbox = viewManager.addCheckbox(headerCheckboxContainer, 'table_head_checkbox', language.tableHeadCheckbox);
		tableHeadCheckbox.addEventListener('change', function() {
			if(tableHeadCheckbox.checked) {
				addTableHead();
			} else {
				removeTableHead();
			};
		});

		insertTableForm.appendChild(headerCheckboxContainer);

		//Numberpickers for picking the wanted number of columns and rows.
		const numberpickerContainer = document.createElement('div');
		numberpickerContainer.classList.add('numberpicker_container');

		const tableColumns = this.viewManager.addNumberPicker(numberpickerContainer, 'column_picker', language.columns);
		tableColumns.setAttribute('min', '1');
		tableColumns.setAttribute('placeholder', '1');
		//Listener for changing the number of columns.
		var columnTimeout;
		tableColumns.addEventListener('input', function() {
			clearTimeout(columnTimeout);
    		columnTimeout = setTimeout(function() {
				editColumnsAndRows();
    		}, 500);
		});

		const tableRows = this.viewManager.addNumberPicker(numberpickerContainer, 'row_picker', language.rows);
		tableRows.setAttribute('min', '1');
		tableRows.setAttribute('placeholder', '1');
		//Listener for changing the number of rows.
		var rowTimeout;
		tableRows.addEventListener('input', function() {
			clearTimeout(rowTimeout);
    		rowTimeout = setTimeout(function() {
				editColumnsAndRows();
    		}, 500);
		});

		insertTableForm.appendChild(numberpickerContainer);

		//Container for the dynamically generated table.
		const tableContainer = document.createElement('div');
		tableContainer.classList.add('table_container');

		//Submit button to submit the form.
		const insertTableSubmit = document.createElement('input');
		insertTableSubmit.setAttribute('type', 'submit');
		insertTableSubmit.setAttribute('value','Submit');

		insertTableForm.appendChild(tableContainer);
		insertTableForm.appendChild(insertTableSubmit);
		this.dialogContent.appendChild(insertTableForm);
		//Create a table on submit.
		insertTableForm.addEventListener('submit', function(event) {
			var table = [];
			for (let i = 0; i < tableRows.value; i++) {
				table[i] = [];
				for (let j = 0; j < tableColumns.value; j++) {
					table[i][j] = document.getElementById(`field_${i+1}_${j+1}`).value;
					console.log('i: ' + i + 'j: ' + j);
				}
			}
			console.log(table);
			editor.createTable(table, tableHeadCheckbox.checked);
			viewManager.closeDialog();
		});
		//Delete the table on reset the form.
		insertTableForm.addEventListener('reset', function() {
			deleteColumnsAndRows();
		});

		/**
		* Get needed preferences and call the right function to add/remove columns/rows.
		*/
		function editColumnsAndRows() {
			//Get the dialogContainer.
			this.dialogContainer = insertTableDialog.dialogContent.parentElement;
			const dialogWindow = this.dialogContainer.parentElement;
			//Set the max heigt of the table-container, to set let it scroll, if window height is to small.
			const dialogWindowHeight = parseInt(window.getComputedStyle(dialogWindow, null).getPropertyValue('height').replace('px', ''));
			const dialogNavigation = dialogContainer.childNodes[0];
			const dialogNavigationHeight = parseInt(window.getComputedStyle(dialogNavigation, null).getPropertyValue('height').replace('px', ''));
			const headerCheckboxHeight = parseInt(window.getComputedStyle(headerCheckboxContainer, null).getPropertyValue('height').replace('px', ''));
			const dialogContentMarginBottom = parseInt(window.getComputedStyle(insertTableDialog.dialogContent, null).getPropertyValue('margin-bottom').replace('px', ''));
			const numberpickerContainerHeight = parseInt(window.getComputedStyle(numberpickerContainer, null).getPropertyValue('height').replace('px', ''));
			const submitButtonHeight = parseInt(window.getComputedStyle(insertTableSubmit, null).getPropertyValue('height').replace('px', ''));
			const submitButtonMarginTop = parseInt(window.getComputedStyle(insertTableSubmit, null).getPropertyValue('margin-top').replace('px', ''));
			const submitButtonMarginBottom = parseInt(window.getComputedStyle(insertTableSubmit, null).getPropertyValue('margin-bottom').replace('px', ''));
			tableContainer.style.maxHeight = 	dialogWindowHeight
												- (dialogNavigationHeight
												+ headerCheckboxHeight
												+ numberpickerContainerHeight
												+ submitButtonHeight
												+ submitButtonMarginTop
												+ submitButtonMarginBottom
												+ dialogContentMarginBottom)
												+ 'px';
			//Read default style from css to animate it.
			//Margin of input fields.
			this.setMargin = window.getComputedStyle(insertTableDialog.dialogContent, null).getPropertyValue('margin-left').replace('px', '');
			//Padding of input fileds.
			this.setPaddingLeft = window.getComputedStyle(tableColumns, null).getPropertyValue('padding-left');
			this.setPaddingRight = window.getComputedStyle(tableColumns, null).getPropertyValue('padding-right');
			//Width of the dialogContent.
			this.setContentWidth = parseInt(window.getComputedStyle(dialogContainer, null).getPropertyValue('min-width').replace('px', '')) - 2*setMargin;

			//Manipulate default style.
			//Let the width of the container grow an shrink with its content.
			this.dialogContainer.style.display = 'table-cell';
			insertTableDialog.dialogContent.style.display = 'table';

			//Set values to the number-pickers if there are none.
			if(tableColumns.value == '') {
				tableColumns.value = 1;
			};
			this.setColumns = tableColumns.value;

			if(tableRows.value == '') {
				tableRows.value = 1;
			};
			this.setRows = tableRows.value;
			if(tableHeadCheckbox.checked) {
				this.setRows++;
			}

			//Get current number of columns.
			if(tableContainer.childNodes.length) {
				this.currentColumns = tableContainer.childNodes[0].childNodes.length;
			} else {
				this.currentColumns = 0;
			};

			//Get the current number of rows.
			if(tableContainer.childNodes.length) {
					this.currentRows = tableContainer.childNodes.length;
			} else {
				this.currentRows = 0;
			};

			const dialogContainerWidth = parseInt(window.getComputedStyle(this.dialogContainer, null).getPropertyValue('width').replace('px', ''));
			const dialogWindowWidth = parseInt(window.getComputedStyle(dialogWindow, null).getPropertyValue('width').replace('px', ''));

			//Calculate the width for the next animation.
			if(this.setColumns < 3) {
				this.cellWidth = this.setContentWidth/this.setColumns - 2*this.setMargin;
			} else {
				if((this.setContentWidth/3)*this.setColumns + 2*this.setMargin >= dialogWindowWidth) {
					this.cellWidth = (dialogWindowWidth - 2*this.setMargin)/this.setColumns - 2*this.setMargin;
				} else {
					this.cellWidth = this.setContentWidth/3 - 2*this.setMargin;
				};
			};

			//Call culumn funtions if the user change the column-picker.
			if(this.currentColumns < this.setColumns) {
				setColumnWidth();
				addColumns();
			} else {
				setColumnWidth();
				removeColumns();
			};

			//Call row funtions if the user change the row-picker.
			if(this.currentRows < this.setRows) {
				addRows();
			} else {
				removeRows();
			};
		};

		function addTableHead() {
			const tableHead = document.createElement('div');
			tableHead.classList.add('head_container');
			tableHead.style.height = '0px';
			tableContainer.insertBefore(tableHead, tableContainer.childNodes[0]);
			if(this.tableRows && this.tableColumns) {
				addColumns(tableHead);
			} else {
				editColumnsAndRows();
			};
			growRowHeight(tableHead);
		};

		function removeTableHead() {
			var head = tableContainer.childNodes[0];
			if(head.classList == 'head_container') {
				if(head.style.height != '0px') {
					var headHeight = window.getComputedStyle(head, null).getPropertyValue('height');
					head.style.height = headHeight;
					var transitionDuration = window.getComputedStyle(head, null).getPropertyValue('transition-duration').replace('s', '') * 1000;
					head.style.height = '0px';
					setTimeout(function() {
						try {
							tableContainer.removeChild(head);
						} catch(exeption) {
							atom.notifications.addError(language.toFastError, {detail : language.toFastErrorDetails, dismissable : true});
						};
					}, transitionDuration);
				};
			};
		};

		/**
		* Add columns to existing or new rows.
		* @param {object} row The row where are columns to add.
		*/
		function addColumns(row) {
			//If there is no row set, call addColumns for all existing rows.
			if(!row) {
				for(var i = 0; i < this.currentRows; i++) {
					addColumns(tableContainer.childNodes[i]);
				};
				return;
			};

			//Reset currentColumns.
				this.currentColumns = row.childNodes.length;

			//Fill row with columns.
			for(var i = this.currentColumns; i < this.setColumns; i++) {
				var cell;
				//Create a text-input.
				if(row.classList[0] == 'head_container') {
					cell = viewManager.addTextarea(undefined, 'head_' + i, language.head + ' ' + (i + 1));
				} else {
					var rowNumber = row.getAttribute('id').replace('row_', '');
					if(!tableHeadCheckbox.checked) {
						rowNumber++;
					}
					cell = viewManager.addTextarea(undefined, 'field_' + rowNumber + '_' + (i + 1), language.field + ' ' + rowNumber + '.' + (i + 1));

				};

				resetCellWidth(cell);
				row.appendChild(cell);
				growCellWidth(cell);
			};
		};

		/**
		* Remove columns from all rows.
		*/
		function removeColumns() {
			for(var i = 0; i < this.currentRows; i++) {
				const row = tableContainer.childNodes[i];
				for(var j = this.currentColumns; j > this.setColumns; j--) {
					const lastChild = row.childNodes[j-1];
					if(!(lastChild.style.width == '0px')) {
						var transitionDuration = window.getComputedStyle(lastChild, null).getPropertyValue('transition-duration').replace('s', '') * 1000;
						resetCellWidth(lastChild);
						setTimeout(function() {
							try {
								row.removeChild(lastChild);
							} catch(exeption) {
								atom.notifications.addError(language.toFastError, {detail : language.toFastErrorDetails, dismissable : true});
							};
						}, transitionDuration);
					};
				};
			};
		};

		/**
		* Add rows to the table.
		*/
		function addRows() {
			for(var i = this.currentRows; i < this.setRows; i++) {
				var row = document.createElement('div');
				row.classList.add('row');
				row.setAttribute('id', 'row_' + i);
				row.style.height = '0px';
				tableContainer.appendChild(row);
				growRowHeight(row);
				addColumns(row);
			};
		};

		/**
		* Remove rows from table.
		*/
		function removeRows() {
			for(var i = this.currentRows; i > this.setRows; i--) {
				const lastChild = tableContainer.childNodes[i-1];
				if(!(lastChild.style.height == '0px')) {
					var lastChildHeigt = window.getComputedStyle(lastChild, null).getPropertyValue('height');
					lastChild.style.height = lastChildHeigt;
					var transitionDuration = window.getComputedStyle(lastChild, null).getPropertyValue('transition-duration').replace('s', '') * 1000;
					lastChild.style.height = '0px';
					setTimeout(function() {
						try {
							tableContainer.removeChild(lastChild);
						} catch(exeption) {
							atom.notifications.addError(language.toFastError, {detail : language.toFastErrorDetails, dismissable : true});
						};
					}, transitionDuration);
				};
			};
		};

		/**
		* Clear the whole table.
		*/
		function deleteColumnsAndRows() {
			tableContainer.innerHTML = null;
		};

		/**
		* Change the width of the culumns.
		*/
		function setColumnWidth() {
			//Get the number of the current cells in the table.
			this.currentCells = tableContainer.getElementsByTagName('textarea');
			for(var i = 0; i < this.currentCells.length; i++) {
				if(this.currentCells[i].style.width != this.cellWidth + 'px')
				this.currentCells[i].style.width = this.cellWidth + 'px';
			};
		};

		function resetCellWidth(cell) {
			cell.style.width = '0px';
			cell.style.paddingLeft = '0px';
			cell.style.paddingRight = '0px';
			cell.style.marginLeft = '0px';
			cell.style.marginRight = '0px';
		};

		function growCellWidth(cell) {
			//Transition only works if there is 1ms delay between creating and setting the width.
			setTimeout(function() {
				cell.style.width = this.cellWidth + 'px';
				cell.style.paddingLeft = this.setPaddingLeft;
				cell.style.paddingRight = this.setPaddingLeft;
				cell.style.marginLeft = this.setMargin + 'px';
				cell.style.marginRight = this.setMargin + 'px';
			}, 1);
		};

		function growRowHeight(row) {
			//Transition only works if there is 1ms delay between creating and setting the width.
			var transitionDuration = window.getComputedStyle(row, null).getPropertyValue('transition-duration').replace('s', '') * 1000;
			setTimeout(function() {
				row.style.height = '42px';
			}, 1);
			setTimeout(function() {
				row.style.height = 'auto';
			}, transitionDuration + 1);
		};
	}
}
