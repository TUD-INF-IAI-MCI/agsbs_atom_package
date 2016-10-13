'use babel';

const papa = require('./ext/papaparse.min.js');
const fs = require('fs');
const iPath = require('path');
//markdown editor functions
 export default class EditorFunctions {

	constructor() {
	 this.translateOnLanguageChange();
	}

	/**
	* Undoes a step made by the user
	*/
	undo() {
		atom.workspace.getActivePaneItem().undo();
	}

	/**
	* Redoes a step made by the user
	*/
	redo() {
		atom.workspace.getActivePaneItem().redo();
	}

	/**
	* Sets selected text bold or enables the environment for bold written text
	*/
	setBold() {
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var range = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			let bufferRange = {
				start: {
					column: cursorPosition.column - 2,
					row: cursorPosition.row
				},
				end: {
					column: cursorPosition.column + 2,
					row: cursorPosition.row
				}
			};
			if (editor.getTextInBufferRange(bufferRange) == '____') {
				editor.setTextInBufferRange(bufferRange, '');
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(range, '____');
				editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 2});
				editor.getElement().focus();
			}
		} else if (selectedText.slice(0,2) == '__' && selectedText.slice(length - 2, length) == '__') {
			let unset = selectedText.slice(2,length - 2);
			editor.setTextInBufferRange(range, unset);
			editor.getElement().focus();
		} else {
			editor.setTextInBufferRange(range, '__' + selectedText + '__');
		}
	}

	/**
	* Sets selected text italics or enables the environment for written text in italics
	*/
	setItalics() {
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var range = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			let bufferRange = [
				{
					start: {
						column: cursorPosition.column - 2,
						row: cursorPosition.row
					},
					end: {
						column: cursorPosition.column,
						row: cursorPosition.row
					}
				},
				{
					start: {
						column: cursorPosition.column - 1,
						row: cursorPosition.row
					},
					end: {
						column: cursorPosition.column + 1,
						row: cursorPosition.row
					}
				}
			];
			if (editor.getTextInBufferRange(bufferRange[0]) != '__' && editor.getTextInBufferRange(bufferRange[1]) == '__') {
				editor.setTextInBufferRange(bufferRange[1], '');
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(range, '__');
				editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 1});
				editor.getElement().focus();
			}
		} else if (selectedText.slice(0,3) == '___' || selectedText.slice(0,2) != '__' && selectedText.slice(0,1) == '_' && selectedText.slice(length - 1, length) == '_') {
			let unset = selectedText.slice(1,length - 1);
			editor.setTextInBufferRange(range, unset);
		} else {
			editor.setTextInBufferRange(range, '_' + selectedText + '_');
		}
	}

	/**
	* Strikes selected text through or enables the environment for striked through text
	*/
	strikethrough() {
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var range = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			let bufferRange = {
				start: {
					column: cursorPosition.column - 2,
					row: cursorPosition.row
				},
				end: {
					column: cursorPosition.column + 2,
					row: cursorPosition.row
				}
			};
			if (editor.getTextInBufferRange(bufferRange) == '~~~~') {
				editor.setTextInBufferRange(bufferRange, '');
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(range, '~~~~');
				editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 2});
				editor.getElement().focus();
			}
		} else if (selectedText.slice(0,2) == '~~' && selectedText.slice(length - 2, length) == '~~') {
			let unset = selectedText.slice(2,length - 2);
			editor.setTextInBufferRange(range, unset);
		} else {
			editor.setTextInBufferRange(range, '~~' + selectedText + '~~');
		}
	}

	/**
	* Defines text in line as headline
	* @param {int} level The headline level
	*/
	headline(level) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var selectedRange = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		var headline = '';
		for (let i = 0; i < level; i++) {
			headline += '#';
		}
		headline += ' ';
		if (selectedText == '') {
			let checkRange = {
				start: {
					column: 0,
					row: cursorPosition.row
				},
				end: {
					column: 6,
					row: cursorPosition.row
				}
			};
			let unsetRange = {
				start: {
					column: 0,
					row: cursorPosition.row
				},
				end: {
					column: editor.getTextInBufferRange(checkRange).lastIndexOf('#') + 2,		// plus two includes space after #
					row: cursorPosition.row
				}
			};
			if (editor.getTextInBufferRange(checkRange).lastIndexOf('#') == (level - 1)) {
				editor.setTextInBufferRange(unsetRange, '');
				editor.getElement().focus();
			} else if (editor.getTextInBufferRange(checkRange).lastIndexOf('#') >= 0) {
				editor.setTextInBufferRange(unsetRange, headline);
				editor.getElement().focus();
			} else {
				editor.moveToBeginningOfLine();
				let beginningOfLine = editor.getSelectedBufferRange();
				editor.setTextInBufferRange(beginningOfLine, headline);
				editor.getElement().focus();
			}
		} else if (selectedRange.start.column > 0) {
			atom.notifications.addError(language.headlineError, {detail : language.headlineErrorDetail, dismissable : true});
			return;
		} else {
			let lastHashtagPos = selectedText.lastIndexOf('#');
			if (lastHashtagPos == (level - 1)) {
				editor.setTextInBufferRange(selectedRange, selectedText.slice(lastHashtagPos + 2, length));
			} else if (lastHashtagPos >= 0) {
				editor.setTextInBufferRange(selectedRange, headline + selectedText.slice(lastHashtagPos + 2, length));
			} else {
				editor.setTextInBufferRange(selectedRange, headline + selectedText);
			}
		}
	}

	/**
	* Sets selected text as formula or enables the formula environment
	*/
	insertFormula() {
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var range = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			let bufferRange = [
				{
					start: {
						column: cursorPosition.column - 2,
						row: cursorPosition.row
					},
					end: {
						column: cursorPosition.column + 2,
						row: cursorPosition.row
					}
				},
				{
					start: {
						column: cursorPosition.column - 3,
						row: cursorPosition.row
					},
					end: {
						column: cursorPosition.column + 3,
						row: cursorPosition.row
					}
				}];
			if (editor.getTextInBufferRange(bufferRange[0]) == '$$$$') {
				editor.setTextInBufferRange(bufferRange[0], '');
				editor.getElement().focus();
			} else if (editor.getTextInBufferRange(bufferRange[1]) == '$$  $$') {
				editor.setTextInBufferRange(bufferRange[1], '');
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(range, '$$  $$');
				editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 3});
				editor.getElement().focus();
			}
		} else if (selectedText.slice(0,2) == '$$' && selectedText.slice(length - 2, length) == '$$') {
			let unset = selectedText.slice(3,length - 3);
			editor.setTextInBufferRange(range, unset);
			editor.getElement().focus();
		} else {
			editor.setTextInBufferRange(range, '$$ ' + selectedText + ' $$');
		}
	}

	insertFormulaInline() {
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var range = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			let bufferRange = {
				start: {
					column: cursorPosition.column - 1,
					row: cursorPosition.row
				},
				end: {
					column: cursorPosition.column + 1,
					row: cursorPosition.row
				}
			};
			if (editor.getTextInBufferRange(bufferRange) == '$$') {
				editor.setTextInBufferRange(bufferRange, '');
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(range, '$$');
				editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 1});
				editor.getElement().focus();
			}
		} else if (selectedText.slice(0,1) == '$' && selectedText.slice(length - 1, length) == '$') {
			let unset = selectedText.slice(1,length - 1);
			editor.setTextInBufferRange(range, unset);
		} else {
			editor.setTextInBufferRange(range, '$' + selectedText + '$');
		}
	}

	/**
	* Defines the current line as a blockquote
	*/
	blockquote() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var selectedRange = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			let checkRange = {
				start: {
					column: 0,
					row: cursorPosition.row
				},
				end: {
					column: 2,
					row: cursorPosition.row
				}
			};
			if (editor.getTextInBufferRange(checkRange) == '> ') {
				editor.setTextInBufferRange(checkRange, '');
				editor.getElement().focus();
			} else {
				editor.moveToBeginningOfLine();
				let beginningOfLine = editor.getSelectedBufferRange();
				editor.setTextInBufferRange(beginningOfLine, '> ');
				editor.getElement().focus();
			}
		} else if (selectedRange.start.column > 0) {
			atom.notifications.addError(language.blockquoteError, {detail : language.blockquoteErrorDetail, dismissable : true});
			return;
		} else {
			if (selectedText.slice(0,2) == '> ') {
				editor.setTextInBufferRange(selectedRange, selectedText.slice(2, length));
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(selectedRange, '> ' + selectedText);
				editor.getElement().focus();
			}
		}
	}

	/**
	* Defines either an ordered or an unordered list from selected lines or adds the respective symbol to the beginning of the line
	* @param {string} type The type of the list, either `ordered` or `unordered`
	*/
	addList(type) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var selectedRange = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		var pattern;
		var numberLength = 1;
		if (type == 'unordered') {
			pattern = '- ';
		} else {
			let bufferRange = {
				start: {
					column: 0,
					row: cursorPosition.row - 1
				},
				end: {
					column: 4,
					row: cursorPosition.row - 1
				}
			}
			let count = editor.getTextInBufferRange(bufferRange);
			count = count.slice(0, count.lastIndexOf('.'));
			if (isNaN(parseInt(count))) {
				pattern = '1. ';
			} else {
				numberLength = (parseInt(count) + 1).toString().length;
				var sign = parseInt(count) + 1;
				pattern = sign + '. ';

			}
		}
		if (selectedText == '') {
			let signLength = pattern == '- ' ? 2 : numberLength + 2;
			let bufferRange = {
				start: {
					column: 0,
					row: cursorPosition.row
				},
				end: {
					column: signLength,
					row: cursorPosition.row
				}
			};
			let signRange = {
				start: {
					column: 0,
					row: cursorPosition.row - 1
				},
				end: {
					column: 2,
					row: cursorPosition.row - 1
				}
			};
			if (editor.getTextInBufferRange(bufferRange) == pattern) {
				editor.setTextInBufferRange(bufferRange, '');
				editor.getElement().focus();
			} else {
				editor.moveToBeginningOfLine();
				let beginningOfLine = editor.getSelectedBufferRange();
				editor.setTextInBufferRange(beginningOfLine, pattern);
				if (pattern == '1. ' && !editor.isBufferRowBlank(beginningOfLine.start.row - 1)) {
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: beginningOfLine.start.row + 1, column: 0});
				} else if (pattern == '- ' && !editor.isBufferRowBlank(signRange.start.row) && editor.getTextInBufferRange(signRange) != '- '){
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: beginningOfLine.start.row + 1, column: 0});
				} else {
					editor.setCursorBufferPosition({row: beginningOfLine.start.row, column: 0});
				}
				editor.moveToEndOfLine();
				editor.getElement().focus();
			}
		} else if (selectedRange.start.row < selectedRange.end.row) {
			if (type == 'unordered') {
				let firstLine = selectedRange.start.row;
				let lastLine = selectedRange.end.row;
				let leaveLineBlank;
				for (var i = firstLine; i <= lastLine; i++) {
					let bufferRange = {
						start: {
							column: 0,
							row: i
						},
						end: {
							column: 2,
							row: i
						}
					}
					if (editor.getTextInBufferRange(bufferRange) == pattern) {
						editor.setTextInBufferRange(bufferRange, '');
						leaveLineBlank = false;
					} else {
						pattern = '- ';
						let textInBufferRange = editor.getTextInBufferRange(bufferRange);
						editor.setTextInBufferRange(bufferRange, pattern + textInBufferRange);
						if (!editor.isBufferRowBlank(selectedRange.start.row - 1)) {
							leaveLineBlank = true;
						}
					}
				}
				if (leaveLineBlank) {
					editor.setCursorBufferPosition({row: selectedRange.end.row, column: selectedRange.end.column});
					editor.insertNewlineBelow();
					editor.insertNewlineBelow();
					editor.setCursorBufferPosition({row: selectedRange.start.row, column: selectedRange.start.column});
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: selectedRange.end.row + 3, column: 0});
				}
			} else {
				sign = sign === undefined ? 1 : sign;
				let firstLine = selectedRange.start.row;
				let lastLine = selectedRange.end.row;
				let leaveLineBlank;
				for (var i = firstLine; i <= lastLine; i++) {
					let bufferRange = {
						start: {
							column: 0,
							row: i
						},
						end: {
							column: numberLength + 2,
							row: i
						}
					}
					let regex = /\d\.\s/g;
					let match = editor.getTextInBufferRange(bufferRange).match(regex);
					if (match !== null) {
						editor.setTextInBufferRange(bufferRange, '');
						leaveLineBlank = false;
					} else {
						pattern = sign + '. ';
						let textInBufferRange = editor.getTextInBufferRange(bufferRange);
						editor.setTextInBufferRange(bufferRange, pattern + textInBufferRange);
						if (!editor.isBufferRowBlank(selectedRange.start.row - 1)) {
							leaveLineBlank = true;
						}
					}
					sign++;
				}
				if (leaveLineBlank) {
					editor.setCursorBufferPosition({row: selectedRange.end.row, column: selectedRange.end.column});
					editor.insertNewlineBelow();
					editor.insertNewlineBelow();
					editor.setCursorBufferPosition({row: selectedRange.start.row, column: selectedRange.start.column});
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: selectedRange.end.row + 3, column: 0});
				}
			}
			editor.getElement().focus();
		} else if (selectedRange.start.column > 0) {
			atom.notifications.addError(language.addListError, {detail : language.addListErrorDetail, dismissable : true});
		} else {
			if (selectedText.slice(0,3) == pattern) {
				editor.setTextInBufferRange(selectedRange, selectedText.slice(3, length));
				editor.getElement().focus();
			} else if (selectedText.slice(0,2) == pattern) {
				editor.setTextInBufferRange(selectedRange, selectedText.slice(2, length));
				editor.setCursorBufferPosition({row: selectedRange.start.row, column: 0});
				editor.moveToEndOfLine();
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(selectedRange, pattern + selectedText);
				let signRange = {
					start: {
						column: 0,
						row: cursorPosition.row - 1
					},
					end: {
						column: 2,
						row: cursorPosition.row - 1
					}
				};
				if (pattern == '1. ' && !editor.isBufferRowBlank(selectedRange.start.row - 1)) {
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: selectedRange.start.row + 1, column: 0});
					editor.moveToEndOfLine();
				} else if (!editor.isBufferRowBlank(selectedRange.start.row - 1 && editor.getTextInBufferRange(signRange) != '- ')){
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: selectedRange.start.row + 1, column: 0});
				} else {
					editor.setCursorBufferPosition({row: selectedRange.start.row, column: 0});
					editor.moveToEndOfLine();
				}
				editor.getElement().focus();
			}
		}
	}

	/**
	* Adds a horizontal rule
	*/
	addHorizontalRule() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var selectedRange = editor.getSelectedBufferRange();
		if (selectedText == '') {
			let additionalRows;
			if (editor.isBufferRowBlank(selectedRange.start.row)) {
				additionalRows = 1;
				editor.insertNewlineBelow();
			} else {
				additionalRows = 2;
				editor.insertNewlineBelow();
				editor.insertNewlineBelow();
			}
			let bufferRange = {
				start: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				},
				end: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				}
			}
			editor.setTextInBufferRange(bufferRange, '---');
			editor.setCursorBufferPosition({row: bufferRange.start.row, column:bufferRange.start.column});
			editor.insertNewlineBelow();
			editor.setCursorBufferPosition({row: bufferRange.start.row + 1, column:bufferRange.start.column});
			editor.insertNewlineBelow();
			editor.getElement().focus();
		} else {
			atom.notifications.addError(language.addHorizontalRuleError, {detail : language.addHorizontalRuleErrorDetail, dismissable : true});
		}
	}

	/**
	* Formats text as code, distinguishes between inline and block formatted code
	*/
	formatAsCode() {
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var selectedRange = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			if (selectedRange.start.column > 0) {
				let bufferRange = {
					start: {
						column: cursorPosition.column - 1,
						row: cursorPosition.row
					},
					end: {
						column: cursorPosition.column + 1,
						row: cursorPosition.row
					}
				};
				if (editor.getTextInBufferRange(bufferRange) == '``') {
					editor.setTextInBufferRange(bufferRange, '');
					editor.getElement().focus();
				} else {
					editor.setTextInBufferRange(selectedRange, '``');
					editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 1});
					editor.getElement().focus();
				}
			} else {
				let lineAbove = selectedRange.start.row - 1;
				let lineBelow = selectedRange.start.row + 1;
				let contentOfLineAbove = {
					start: {
						column: 0,
						row: lineAbove
					},
					end: {
						column: 3,
						row: lineAbove
					}
				}
				let contentOfLineBelow = {
					start: {
						column: 0,
						row: lineBelow
					},
					end: {
						column: 3,
						row: lineBelow
					}
				}
				if (editor.getTextInBufferRange(contentOfLineAbove) == '```'
					&& editor.getTextInBufferRange(contentOfLineBelow) == '```') {
					editor.setCursorBufferPosition({row: lineAbove, column: 0});
					editor.deleteLine();
					editor.deleteLine();
					editor.deleteLine();
				} else {
					let additionalRows = 0;
					if (!editor.isBufferRowBlank(selectedRange.start.row)) {
						editor.insertNewlineBelow();
						additionalRows = 1;
					}
					let bufferRange = {
						start: {
							column: 0,
							row: selectedRange.start.row + additionalRows
						},
						end: {
							column: 0,
							row: selectedRange.start.row + additionalRows
						}
					}
					editor.setCursorBufferPosition({row: bufferRange.start.row, column: 0});
					editor.setTextInBufferRange(bufferRange, '```');	// + syntax from preference
					editor.insertNewlineBelow();
					editor.insertNewlineBelow();
					bufferRange = {
						start: {
							column: 0,
							row: selectedRange.start.row + 3
						},
						end: {
							column: 0,
							row: selectedRange.start.row + 3
						}
					}
					editor.setTextInBufferRange(bufferRange, '```');
					editor.setCursorBufferPosition({row: bufferRange.start.row - 2, column: 0});
				}
			}
			editor.getElement().focus();
		} else {
			if (selectedRange.start.column > 0) {
				if (selectedText.slice(0,1) == '`' && selectedText.slice(length - 1, length) == '`') {
					let unset = selectedText.slice(1,length - 1);
					editor.setTextInBufferRange(selectedRange, unset);
				} else {
					editor.setTextInBufferRange(selectedRange, '`' + selectedText + '`');
				}
			} else {
				let firstLine = selectedRange.start.row;
				let lastLine = selectedRange.end.row;
				let contentOfFirstLine = {
					start: {
						column: 0,
						row: firstLine
					},
					end: {
						column: 3,
						row: firstLine
					}
				}
				let contentOfLastLine = {
					start: {
						column: 0,
						row: lastLine
					},
					end: {
						column: 3,
						row: lastLine
					}
				}
				if (editor.getTextInBufferRange(contentOfFirstLine) == '```'
					&& editor.getTextInBufferRange(contentOfLastLine) == '```') {
					editor.setCursorBufferPosition({row: firstLine, column: 0});
					editor.deleteLine();
					editor.setCursorBufferPosition({row: lastLine - 1, column: 0});
					editor.deleteLine();
				} else {
					// TODO
					// editor.setCursorBufferPosition({row: firstLine, column: 0});
					editor.insertNewlineAbove();
					let bufferRange = {
						start: {
							column: 0,
							row: firstLine
						},
						end: {
							column: 0,
							row: firstLine
						}
					}
					editor.setTextInBufferRange(bufferRange, '```');
					editor.setCursorBufferPosition({row: lastLine + 1, column: 0});
					editor.insertNewlineBelow();
					bufferRange = {
						start: {
							column: 0,
							row: lastLine + 2
						},
						end: {
							column: 0,
							row: lastLine + 2
						}
					}
					editor.setTextInBufferRange(bufferRange, '```');
					editor.getElement().focus();
				}
			}
		}
	}

	/**
	* Defines a page break
	*/
	newPage() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var selectedRange = editor.getSelectedBufferRange();
		var medium = language.page;
		var pattern = '|| - ' + medium + ' ';
		var occurances = 1;
		if (selectedRange.start.row == 0) {
			pattern += occurances + ' -';
		} else {
			for (let i = 0; i <= selectedRange.start.row; i++) {
				let bufferRange = {
					start: {
						column: 0,
						row: i
					},
					end: {
						column: 4,
						row: i
					}
				}
				if (editor.getTextInBufferRange(bufferRange) == '|| -') {
					pattern = '|| - ' + medium + ' ' + occurances + ' -';
					editor.setTextInBufferRange(bufferRange, pattern);
					editor.setCursorBufferPosition({row: bufferRange.end.row, column: pattern.length});
					editor.deleteToEndOfLine();
					occurances++;
				}
			}
			pattern = '|| - ' + medium + ' ' + occurances + ' -';
		}
		if (selectedText == '') {
			let additionalRows;
			if (selectedRange.start.row == 0) {
				if (!editor.isBufferRowBlank(0)) {
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: 0, column: 0});
				}
				additionalRows = 0;
			} else if (editor.isBufferRowBlank(selectedRange.start.row)) {
				additionalRows = 1;
				editor.insertNewlineBelow();
			} else {
				additionalRows = 2;
				editor.insertNewlineBelow();
				editor.insertNewlineBelow();
			}
			let bufferRange = {
				start: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				},
				end: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				}
			}
			editor.setTextInBufferRange(bufferRange, pattern);
			editor.setCursorBufferPosition({row: bufferRange.start.row, column:bufferRange.start.column});
			editor.insertNewlineBelow();
			editor.setCursorBufferPosition({row: bufferRange.start.row + 1, column:bufferRange.start.column});
			editor.insertNewlineBelow();
			let lastCursorPosition = editor.getCursorBufferPosition();
			for (let i = selectedRange.start.row + 3; i <= editor.getLineCount(); i++) {
				let bufferRange = {
					start: {
						column: 0,
						row: i
					},
					end: {
						column: 4,
						row: i
					}
				}
				if (editor.getTextInBufferRange(bufferRange) == '|| -') {
					occurances++;
					pattern = '|| - ' + medium + ' ' + occurances + ' -';
					editor.setTextInBufferRange(bufferRange, pattern);
					editor.setCursorBufferPosition({row: bufferRange.end.row, column: pattern.length});
					editor.deleteToEndOfLine();
				}
			}
			editor.setCursorBufferPosition(lastCursorPosition);
			editor.getElement().focus();
		} else {
			atom.notifications.addError(language.newPageError, {detail : language.newPageErrorDetail, dismissable : true});
		}
	}

	/**
	* Inserts a link, overtakes selected text as link text in InsertLinkDialog
	* @param {string} text The link text
	* @param {string} url The URL for the link
	* @param {string} title The link title
	*/
	insertLink(text, url, title) {
		var editor = atom.workspace.getActivePaneItem();
		var selectedRange = editor.getSelectedBufferRange();
		var pattern = title != '' ? `[${text}](${url} "${title}") ` : `[${text}](${url}) `;
		var bufferRange = {
			start: {
				column: selectedRange.start.column - 1,
				row: selectedRange.start.row
			},
			end: {
				column: selectedRange.start.column,
				row: selectedRange.start.row
			}
		}
		if (selectedRange.start.column > 0 && editor.getTextInBufferRange(bufferRange) != ' ') {
			pattern = ' ' + pattern;
		}
		editor.setTextInBufferRange(selectedRange, pattern);
		editor.setCursorBufferPosition({row: editor.getSelectedBufferRange().end.row, column: editor.getSelectedBufferRange().end.column});
		editor.getElement().focus();
	}

	/**
	* Inserts a graphic, overtakes selected text as alt text in InsertGraphicDialog
	* @param {string} alt The alt text
	* @param {string} url The URL pointing to the graphic
	* @param {string} title The graphic's title
	*/
	insertGraphic(fragment) {
		var editor = atom.workspace.getActivePaneItem();
		var selectedRange = editor.getSelectedBufferRange();
		var pattern = fragment;
		var bufferRange = {
			start: {
				column: selectedRange.start.column - 1,
				row: selectedRange.start.row
			},
			end: {
				column: selectedRange.start.column,
				row: selectedRange.start.row
			}
		}
		if (selectedRange.start.column > 0 && editor.getTextInBufferRange(bufferRange) != ' ') {
			pattern = ' ' + pattern;
		}
		editor.setTextInBufferRange(selectedRange, pattern);
		editor.setCursorBufferPosition({row: editor.getSelectedBufferRange().end.row, column: editor.getSelectedBufferRange().end.column});
		editor.getElement().focus();
	}

	/**
	* Inserts a table
	* @param {object} table The table converted to JSON
  * @param {string} tableType Type of the table
	* @param {boolean} tableHead Whether the table has a head row
	*/
	createTable(table, tableType, tableHead) {
    // space between columns
    const TableColumnSpaces = 2;
    const ColumnWidthOffSet = 3;
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedRange = editor.getSelectedBufferRange();
		var selectedText = editor.getSelectedText();
		if (selectedText == '') {
			let additionalRows;
			if (selectedRange.start.row == 0) {
				if (!editor.isBufferRowBlank(0)) {
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: 0, column: 0});
				}
				additionalRows = 0;
			} else if (editor.isBufferRowBlank(selectedRange.start.row)) {
				additionalRows = 1;
				editor.insertNewlineBelow();
			} else {
				additionalRows = 2;
				editor.insertNewlineBelow();
				editor.insertNewlineBelow();
			}
			let bufferRange = {
				start: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				},
				end: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				}
			}
			editor.insertNewlineBelow();
			var rows = table.length;
			var columns = table[0].length;
			var editorTable = '';
      let commentRange = {
      	start: {
      		column: 0,
      		row: selectedRange.start.row + additionalRows - 1
      	},
      	end: {
      		column: 0,
      		row: selectedRange.start.row + additionalRows - 1
      	}
      }
      editor.setTextInBufferRange(commentRange, `<!-- BEGIN OF TABLE -->`);
      switch(tableType){
        case "simpleTable":
          editorTable = this.createSimpleTable(table, columns, rows, tableHead,
                                              TableColumnSpaces,
                                              ColumnWidthOffSet);
          break;
        case "pipeTable":
          editorTable = this.createPipeTable(table, columns, rows);
          break;
        case "multilineTable":
          editorTable = this.createMultilineTable(table, columns, rows, tableHead);
          break;
        case "gridTable":
        editorTable = this.createGridTable(table, columns, rows, tableHead,
                                            TableColumnSpaces,
                                            ColumnWidthOffSet);
          break;
        default:
          console.log("Error cannot create table");
          break;
      }
			editor.setTextInBufferRange(bufferRange, editorTable);
			commentRange = {
				start: {
					column: 0,
					row: editor.getSelectedBufferRange().end.row + 1
				},
				end: {
					column: 0,
					row: editor.getSelectedBufferRange().end.row + 1
				}
			}
			editor.setTextInBufferRange(commentRange, '<!-- END OF TABLE -->\n');
			editor.setCursorBufferPosition({row: commentRange.start.row, column: 0});
			editor.insertNewlineBelow();
			editor.setCursorBufferPosition({row: commentRange.start.row + 1, column: 0});
			editor.insertNewlineBelow();
			editor.getElement().focus();
		} else {
			atom.notifications.addError(language.importTableFromCsvError, {
				detail : language.importTableFromCsvErrorDetail,
				dismissable : true
			});
		}
	}

  /**
  * Create a grid table, see http://pandoc.org/MANUAL.html#tables
  * @param {object} Table as json
  * @param {integer} columns count of columns as integer
  * @param {integer} rows count of rows as integer
  * @param {boolean} tableHead Whether the table has a head row
  * @return {string} editorTable Markdown for createGridTable
  */
  createGridTable(table, columns, rows, hasHead, TableColumnSpaces,
                                      ColumnWidthOffSet){
    var editorTable = "";
    var columnWidths = this.caluateCellWidthMultiline(table, columns, rows);
    //console.log("columnWidths for createGridTable "+columnWidths);
    var separator = "";
    for(i=0; i < columns; i++){
      if(i==0){
        separator = "+" + "-".repeat(columnWidths[i] + ColumnWidthOffSet)
      }else{
        separator += "+" + "-".repeat(columnWidths[i] + ColumnWidthOffSet);
      }
    }
    separator += "+";
    //start with table
    editorTable = separator + "\n";
    for(j=0; j < rows;j++){
      if(j==0 && hasHead){
        //iterator over all columns
        for(k=0; k< columns; k++){
          var value = table[j][k];
          if(!value){
            value = "";
          }
          value = this.rightAlignmentOfContent(value,
                                        columnWidths[k], ColumnWidthOffSet, 0);
          editorTable += "|" + value;
        }
        editorTable += "| \n";
        editorTable += separator.replace(/-/g,"=");
        editorTable += "\n";
      }else{
        var linebreaksInRow = 0;
        linebreaksInRow = this.getLinebreakOfRow(table[j]); // multilineTable
        for(l = 0; l < linebreaksInRow; l++){
          for(k=0;k < columns; k++){
            var cellValues = table[j][k].split("\n");
            var value = cellValues[l];
            if(!value){
              value = "";
            }
            value = this.rightAlignmentOfContent(value,
                                          columnWidths[k], ColumnWidthOffSet, 0);
            editorTable += "|" + value;
          }
          editorTable += "| \n";
        }
        editorTable += separator + "\n";
      }
    }

    //end with table
    console.log("editorTable " +editorTable);
    return editorTable;
  }

  /**
  * Return maximum line breaks of table row
  * @param {array} row a row of a table
  * @return {int} maxLinebreaks maximum line break of row
  */
  getLinebreakOfRow(row){
    var linebreaks = 0;
    for(i = 0; i < row.length;i++){
      var lines = row[i].split("\n").length
      if(linebreaks < lines){
        linebreaks = lines;
      }
    }
    return linebreaks;
  }


  /**
  * Create a multiline table, see http://pandoc.org/MANUAL.html#tables
  * @param {object} Table as json
  * @param {integer} columns count of columns as integer
  * @param {integer} rows count of rows as integer
  * @param {boolean} tableHead Whether the table has a head row
  * @return {string} editorTable Markdown for multiline table
  */
  createMultilineTable(table, columns, rows, hasHead){
    return "Multiline tables will be support soon";
  }
  /**
  * Create a simple table, see http://pandoc.org/MANUAL.html#tables
  * @param {object} Table as json
  * @param {integer} columns count of columns as integer
  * @param {integer} rows count of rows as integer
  * @param {boolean} tableHead Whether the table has a head row
  * @param {integer} TableColumnSpaces
  * @param {integer} ColumnWidthOffSet
  * @return {string} editorTable Markdown for simple table
  */
  createSimpleTable(table, columns, rows, hasHead,
                    TableColumnSpaces,
                    ColumnWidthOffSet){
    var editorTable = "";
    var columnWidths = this.caluateCellWidth(table, columns, rows);
    var separator = "";
    // get separator
    for(i=0; i < columns; i++){
      if(i==0){
        separator = "-".repeat(columnWidths[i] + ColumnWidthOffSet)
      }else{
        separator += " ".repeat(TableColumnSpaces) + "-".repeat(columnWidths[i] + ColumnWidthOffSet);
      }
    }
    // in table[0] the head is stored
    for(i=0; i < rows; i++){
        if(!hasHead && i == 0){editorTable += separator +"\n";}
        for(j=0; j< columns;j++){
          // no space required before the first column
          if(j == 0){
            editorTable += this.rightAlignmentOfContent(table[i][j],
                                          columnWidths[j], ColumnWidthOffSet, 0);
          }else{
            editorTable += this.rightAlignmentOfContent(table[i][j],
                                        columnWidths[j], ColumnWidthOffSet,
                                        TableColumnSpaces);
          }
        }
        if(hasHead && i == 0){
          editorTable += "\n" + separator +"\n";
        }else{
            editorTable += "\n";
        }
    }
    return editorTable;
  }

  /**
  * add additional space before the value of the cell depending on columnWidth
  * @param {string} value content of the cell
  * @param {integer} columnWidth
  * @param {integer} ColumnWidthOffSet
  * @param {integer} TableColumnSpaces
  * @return {string} newValue with spaces
  */
  rightAlignmentOfContent(value, columnWidth, ColumnWidthOffSet, TableColumnSpaces){
    if(!value){
      spaces  = columnWidth +ColumnWidthOffSet + TableColumnSpaces;
      result = " ".repeat(spaces);
    }else{
      spaces = columnWidth + ColumnWidthOffSet +TableColumnSpaces  - value.length;
      result = " ".repeat(spaces) + value;
    }
    return result;
  }

  /**
  * Calculates the column width depending on the each cell for multiline content
  * @param {array} table
  * @param {integer} columns count of columns
  * @param {integer} rows count of columns
  * @return {array} columnWidth array with maximum of the columns
  */
  caluateCellWidthMultiline(table, columns, rows){
    columnWidths = [];
    for(j = 0; j < columns; j++){
      width = 0;
      for(i=0; i < rows;i++){
        var contentOfCell = table[i][j].split("\n");
        for(k = 0; k < contentOfCell.length; k++){
          if(k==0){
            width= contentOfCell[k].length;
          }else if(width < contentOfCell[k].length){
            width = contentOfCell[k].length;
          }
        }
      }
      console.log("max width for " +j +" column is "+width);
      columnWidths.push(width);
    }
    return columnWidths;
  }

  /**
  * Calculates the column width depending on the each cell of the table
  * @param {array} table
  * @param {integer} columns count of columns
  * @param {integer} rows count of columns
  * @return {array} columnWidth array with maximum of the columns
  */
  caluateCellWidth(table, columns, rows){
    columnWidths = [];
    for(j = 0; j < columns; j++){
        width = 0;
        for(i=0; i < rows;i++){
          var cellValue = table[i][j];
          if(j==0){
            width = cellValue.length;
          }else if(width < cellValue.length){
            width = cellValue.length;
          }
        }
        columnWidths.push(width);
    }
    return columnWidths;
  }

  /**
  * Create a pipe table, see http://pandoc.org/MANUAL.html#tables
  * @param {object} Table as json
  * @param {integer} columns count of columns as integer
  * @param {integer} rows count of rows as integer
  * @return {string} editorTable Markdown for pipeTable
  */
  createPipeTable(table, columns, rows){
    var editorTable = "";
    for (let c = 0; c < columns; c++) {
    	let substitude = table[0][c];
    	substitude = substitude.replace(/\n/g, ' <br> ');
    	substitude = substitude.replace(/-/, '<ul><li>');
    	substitude = substitude.replace(/<br>\s-/g, '</li><li>');
    	if (substitude.includes('<ul>')) {
    		console.log('true');
    		substitude += ' </li></ul>';
    	}
    	substitude = substitude.replace(/\d\./, '<ol><li>');
    	substitude = substitude.replace(/<br>\s\d\./g, '</li><li>');
    	if (substitude.includes('<ol>')) {
    		substitude += ' </li></ol>';
    	}
    	editorTable += '| ' + substitude;
    }
    editorTable += '|\n';
  	for (let c = 0; c < columns; c++) {
  		editorTable += '| ----- ';
  	}
  	editorTable += '|\n';
    for (let r = 1; r < rows; r++) {
    	for (let c = 0; c < columns; c++) {
    		let substitude = table[r][c];
    		substitude = substitude.replace(/\n/g, ' <br> ');
    		substitude = substitude.replace(/-/, '<ul><li>');
    		substitude = substitude.replace(/<br>\s-/g, '</li><li>');
    		if (substitude.includes('<ul>')) {
    			console.log('true');
    			substitude += ' </li></ul>';
    		}
    		substitude = substitude.replace(/\d\./, '<ol><li>');
    		substitude = substitude.replace(/<br>\s\d\./g, '</li><li>');
    		if (substitude.includes('<ol>')) {
    			substitude += ' </li></ol>';
    		}
    		editorTable += '| ' + substitude;
    	}
    	if (r == rows - 1) {
    		editorTable += '|';
    	} else {
    		editorTable += '|\n';
    	}
    }
    return editorTable;
  }

	writeTableFromJson(papasResult) {
		var csvAsJson = papasResult.data;
		var rows = csvAsJson.length;
		var columns = csvAsJson[0].length;
		var table = '';
		for (let c = 0; c < columns; c++) {
			table += '| ' + csvAsJson[0][c] + ' ';
		}
		table += '|\n';
		for (let c = 0; c < columns; c++) {
			table += '| ----- ';
		}
		table += '|\n';
		for (let r = 1; r < rows; r++) {
			for (let c = 0; c < columns; c++) {
				table += '| ' + csvAsJson[r][c] + ' ';
			}
			if (r == rows - 1) {
				table += '|';
			} else {
				table += '|\n';
			}
		}
		return table;
	}

	/**
	* Imports a table from a CSV file and parses it for markdown
	* @param {string} file The path to the CSV file
	*/
	importTableFromCsv(file) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedRange = editor.getSelectedBufferRange();
		var selectedText = editor.getSelectedText();
		if (selectedText == '') {
			let additionalRows;
			if (selectedRange.start.row == 0) {
				if (!editor.isBufferRowBlank(0)) {
					editor.insertNewlineAbove();
					editor.setCursorBufferPosition({row: 0, column: 0});
				}
				additionalRows = 0;
			} else if (editor.isBufferRowBlank(selectedRange.start.row)) {
				additionalRows = 1;
				editor.insertNewlineBelow();
			} else {
				additionalRows = 2;
				editor.insertNewlineBelow();
				editor.insertNewlineBelow();
			}
			let bufferRange = {
				start: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				},
				end: {
					column: 0,
					row: selectedRange.start.row + additionalRows
				}
			}
			editor.insertNewlineBelow();

			if (typeof(file) === "string") {
				var self = this;
				new Promise(function (resolve, reject) {
					fs.readFile(file, 'utf8', (error, data) => {
						if (error) {
							return reject(error);
						}
						resolve(papa.parse(data));
					});
				}).then(function(data){
					let commentRange = {
						start: {
							column: 0,
							row: selectedRange.start.row + additionalRows - 1
						},
						end: {
							column: 0,
							row: selectedRange.start.row + additionalRows - 1
						}
					}
          var name  = iPath.dirname(file)+"\\" +iPath.basename(file);

					editor.setTextInBufferRange(commentRange, `<!-- BEGIN OF TABLE | From CSV file: ${name} -->`);
					editor.setTextInBufferRange(bufferRange, self.writeTableFromJson(data));
					commentRange = {
						start: {
							column: 0,
							row: editor.getSelectedBufferRange().end.row + 1
						},
						end: {
							column: 0,
							row: editor.getSelectedBufferRange().end.row + 1
						}
					}
					editor.setTextInBufferRange(commentRange, '<!-- END OF TABLE -->\n');
					editor.setCursorBufferPosition({row: commentRange.start.row, column: 0});
					editor.insertNewlineBelow();
					editor.setCursorBufferPosition({row: commentRange.start.row + 1, column: 0});
					editor.insertNewlineBelow();
					editor.getElement().focus();
				});
			} else {
				var self = this;
				new Promise(function (resolve, reject) {
					papa.parse(file, {
						complete: function(result) {
							resolve(result);
						}
					});
				}).then(function(data) {
					let commentRange = {
						start: {
							column: 0,
							row: selectedRange.start.row + additionalRows - 1
						},
						end: {
							column: 0,
							row: selectedRange.start.row + additionalRows - 1
						}
					}
					editor.setTextInBufferRange(commentRange, `<!-- BEGIN OF TABLE | From CSV file: ${file.path} -->`);
					editor.setTextInBufferRange(bufferRange, self.writeTableFromJson(data));
					commentRange = {
						start: {
							column: 0,
							row: editor.getSelectedBufferRange().end.row + 1
						},
						end: {
							column: 0,
							row: editor.getSelectedBufferRange().end.row + 1
						}
					}
					editor.setTextInBufferRange(commentRange, '<!-- END OF TABLE -->\n');
					editor.setCursorBufferPosition({row: commentRange.start.row, column: 0});
					editor.insertNewlineBelow();
					editor.setCursorBufferPosition({row: commentRange.start.row + 1, column: 0});
					editor.insertNewlineBelow();
					editor.getElement().focus();
				});
			}
			// -------------------------

		} else {
			atom.notifications.addError(language.importTableFromCsvError, {
				detail : language.importTableFromCsvErrorDetail,
				dismissable : true
			});
		}
	}

	/**
	* Returns whether a footnote label is already used
	* @param {string} label The label which will be checked
	* @return {boolean} isLabelUsed Whether the label is used for any footnote
	*/
	isLabelUsed(label) {
		var editor = atom.workspace.getActivePaneItem();
		var pattern = `[^${label}]`;
		return editor.getText().includes(pattern);
	}

	/**
	* Inserts a footnote
	* @param {string} label The footnote label
	* @param {string} text The text written in the footnote
	*/
	insertFootnote(label, text) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedRange = editor.getSelectedBufferRange();
		var pattern = `[^${label}]`;
		editor.setTextInBufferRange(selectedRange, pattern + ' ');
		var r = selectedRange.end.row + 1;
		var bufferRange = {
			start: {
				column: 0,
				row: r
			},
			end: {
				column: 4,
				row: r
			}
		}
		while (editor.getTextInBufferRange(bufferRange) != '|| -' && r < editor.getLineCount()) {
			r++;
			bufferRange = {
				start: {
					column: 0,
					row: r
				},
				end: {
					column: 4,
					row: r
				}
			}
		}
		if (r == editor.getLineCount()) {
			editor.insertNewlineBelow();
			editor.setCursorBufferPosition({row: bufferRange.start.row + 1, column: 0});
		} else {
			editor.setCursorBufferPosition({row: bufferRange.start.row, column: 0});
		}
		editor.insertNewlineAbove();
		bufferRange = {
			start: {
				column: 0,
				row: r
			},
			end: {
				column: 0,
				row: r
			}
		}
		editor.setTextInBufferRange(bufferRange, `${pattern}: ${text}`);
		editor.setCursorBufferPosition({row: selectedRange.end.row, column: selectedRange.start.column + pattern.length});
		editor.getElement().focus();
	}

	/**
	* Makes selected text an annotation or enables the environment for creating annotations
	*/
	insertAuthorAnnotation() {
		var editor = atom.workspace.getActivePaneItem();
		var selectedText = editor.getSelectedText();
		var length = selectedText.length;
		var range = editor.getSelectedBufferRange();
		var cursorPosition = editor.getCursorBufferPosition();
		if (selectedText == '') {
			let bufferRange = {
				start: {
					column: cursorPosition.column - 24,
					row: cursorPosition.row
				},
				end: {
					column: cursorPosition.column + 6,
					row: cursorPosition.row
				}
			};
			if (editor.getTextInBufferRange(bufferRange) == '<div class="annotation"></div>') {
				editor.setTextInBufferRange(bufferRange, '');
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(range, '<div class="annotation"></div>');
				editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 24});
				editor.getElement().focus();
			}
		} else if (selectedText.slice(0,24) == '<div class="annotation">' && selectedText.slice(length - 6, length) == '</div>') {
			let unset = selectedText.slice(24,length - 6);
			editor.setTextInBufferRange(range, unset);
			editor.getElement().focus();
		} else {
			editor.setTextInBufferRange(range, '<div class="annotation">' + selectedText + '</div>');
		}
	}

	/**
	* Translates language specific words on the flow
	*/
	translateOnLanguageChange() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActiveTextEditor();
    if(editor){
  		var lineCount = editor.getLineCount();

  		var medium = language.page;
  		var pattern = '|| - ' + medium + ' ';
  		var occurances = 1;
  		pattern += occurances + ' -';
  		for (let i = 0; i < lineCount; i++) {
  			let bufferRange = {
  				start: {
  					column: 0,
  					row: i
  				},
  				end: {
  					column: 4,
  					row: i
  				}
  			}
  			if (editor.getTextInBufferRange(bufferRange) == '|| -') {
  				pattern = '|| - ' + medium + ' ' + occurances + ' -';
  				editor.setTextInBufferRange(bufferRange, pattern);
  				editor.setCursorBufferPosition({row: bufferRange.end.row, column: pattern.length});
  				editor.deleteToEndOfLine();
  				occurances++;
  			}
  		}
  		editor.setCursorBufferPosition({row: lineCount - 0, column: 0});
  		editor.getElement().focus();
    }
	}
}
