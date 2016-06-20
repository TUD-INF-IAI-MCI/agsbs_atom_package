'use babel';

//markdown editor functions that are used in the footer panel
 export default class EditorFunctions {

	constructor() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
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
			alert('fuck');
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
			alert('fuck');
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
