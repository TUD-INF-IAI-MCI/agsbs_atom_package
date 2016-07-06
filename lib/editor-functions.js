'use babel';

const papa = require('./ext/papaparse.min.js');

//markdown editor functions that are used in the footer panel
 export default class EditorFunctions {

	 constructor() {
		 this.translateOnLanguageChange();
	 }

	undo() {
		atom.workspace.getActivePaneItem().undo();
	}

	redo() {
		atom.workspace.getActivePaneItem().redo();
	}

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

	 strikethrough() {
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
			if (editor.getTextInBufferRange(bufferRange) == '~~') {
				editor.setTextInBufferRange(bufferRange, '');
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(range, '~~');
				editor.setCursorBufferPosition({row: cursorPosition.row, column: cursorPosition.column + 1});
				editor.getElement().focus();
			}
		} else if (selectedText.slice(0,2) == '~~' && selectedText.slice(length - 2, length) == '~~') {
			let unset = selectedText.slice(2,length - 2);
			editor.setTextInBufferRange(range, unset);
		} else {
			editor.setTextInBufferRange(range, '~~' + selectedText + '~~');
		}
	}

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
			if (editor.getTextInBufferRange(bufferRange) == pattern) {
				editor.setTextInBufferRange(bufferRange, '');
				editor.getElement().focus();
			} else {
				editor.moveToBeginningOfLine();
				let beginningOfLine = editor.getSelectedBufferRange();
				editor.setTextInBufferRange(beginningOfLine, pattern);
				editor.getElement().focus();
			}
		} else if (selectedRange.start.row < selectedRange.end.row) {
			if (type == 'unordered') {
				let firstLine = selectedRange.start.row;
				let lastLine = selectedRange.end.row;
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
					} else {
						pattern = '- ';
						let textInBufferRange = editor.getTextInBufferRange(bufferRange);
						editor.setTextInBufferRange(bufferRange, pattern + textInBufferRange);
					}
				}
			} else {
				sign = sign === undefined ? 1 : sign;
				let firstLine = selectedRange.start.row;
				let lastLine = selectedRange.end.row;
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
					} else {
						pattern = sign + '. ';
						let textInBufferRange = editor.getTextInBufferRange(bufferRange);
						editor.setTextInBufferRange(bufferRange, pattern + textInBufferRange);
					}
					sign++;
				}
			}
			editor.getElement().focus();
		} else if (selectedRange.start.column > 0) {
			atom.notifications.addError(language.addListError, {detail : language.addListErrorDetail, dismissable : true});
		} else {
			if (selectedText.slice(0,3) == pattern) {
				editor.setTextInBufferRange(selectedRange, selectedText.slice(3, length));
				editor.getElement().focus();
			} else {
				editor.setTextInBufferRange(selectedRange, pattern + selectedText);
				editor.getElement().focus();
			}
		}
	}

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

	insertGraphic(alt, url, title) {
		var editor = atom.workspace.getActivePaneItem();
		var selectedRange = editor.getSelectedBufferRange();
		var pattern = title != '' ? `![${alt}](${url} "${title}") ` : `![${alt}](${url}) `;
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

	insertTableFromCsv(file) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
		var selectedRange = editor.getSelectedBufferRange();
		var selectedText = editor.getSelectedText();
		console.log(editor);
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
			papa.parse(file, {
				complete: function(result) {
					var csvAsJson = result.data;
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
						table += '|\n\n';
					}
					editor.setTextInBufferRange(bufferRange, table);
				}
			});
			editor.getElement().focus();
		} else {
			atom.notifications.addError(language.insertTableFromCsvError, {
				detail : language.insertTableFromCsvErrorDetail,
				dismissable : true
			});
		}
	}

	translateOnLanguageChange() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		var editor = atom.workspace.getActivePaneItem();
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


  /* ToDos#
    In https://github.com/TUD-INF-IAI-MCI/AgsbsMarkdownPlugin/blob/master/AgsbsMarkdownHelper.py
    are functions are defined here.
mmand(sublime_plugin.TextCommand) the string is generated depending on the tag

      { "keys": ["alt+shift+h"], "command": "add_tag", "args": {"tag": "h", "markdown_str":"#"} },
      --> add heading level (maybe not necessary)
["alt+shift+i"], "command": "add_tag", "args": {"tag": "em", "markdown_str":"_"} },
      --> formats string italic
      { "keys": ["alt+shift+r"], "command": "add_tag", "args": {"tag": "hr", "markdown_str":"----------"} },
      --> insert horizontal row
  	{ "keys": ["alt+shift+s"], "command": "add_tag", "args": {"tag": "strong", "markdown_str":"**"} },
      --> formats string strong
      { "keys": ["alt+shift+v"], "command": "add_tag", "args": {"tag": "strong+em", "markdown_str":"***"} },
      --> formats string strong and italic
      { "keys": ["alt+shift+f"], "command": "add_tag", "args": {"tag": "formula", "markdown_str":"$$"} },
      --> test whether formula is line or block
      { "keys": ["alt+shift+u"], "command": "add_tag", "args": {"tag": "ul", "markdown_str":"- "} },
       --> formats as  unordered list
      { "keys": ["alt+shift+o"], "command": "add_tag", "args": {"tag": "ol", "markdown_str":"1. "} },
      --> formats as ordered list
      { "keys": ["alt+shift+q"], "command": "add_tag", "args": {"tag": "blockqoute", "markdown_str":"> "} },
      --> formats as blockqoute
      { "keys": ["alt+shift+c"], "command": "add_tag", "args": {"tag": "code", "markdown_str":"\t"} },
      --> formats as code

    The following functions are defined in the classes that are named in the way
      insert_panel --> class InsertPanelCommand(..)
    insert_table --> class InsertTableCommand(..)
    name_next --> class NameNextCommand()
      { "keys": ["alt+shift+a"], "command": "insert_panel", "args": {"tag": "a name"} },
      --> insert anker maybe not necessary
      { "keys": ["alt+shift+t"], "command": "insert_table"},
      --> insert table  (GUI required)
      { "keys": ["alt+shift+l"], "command": "insert_link_panel"},
      --> insert link (GUI required)
      { "keys": ["ctrl+shift+l"], "command": "create_internal_link"},
      --> insert internal link (GUI required)
      { "keys": ["ctrl+shift+f"], "command": "insert_footnote"},
      --> insert foot note (GUI required)
      { "keys": ["alt+shift+p"], "command": "insert_page"},
      --> insert page number
      {"keys":["ctrl+shift+t"],"command":"import_csv_table"},
      --> insert table by import
      { "keys": ["ctrl+alt+i"], "command": "insert_image_panel"},
      --> insert  image (GUI required)
      { "keys": ["shift+f2"], "command": "add_folder_to_project"},
      --> maybe not necessary
     {"keys":["shift+f8"], "command": "open_file","args": {"file": "${packages}/Agsbs Markdown Helper/Default.sublime-keymap"}}
      --> shows the shortcuts
   */
