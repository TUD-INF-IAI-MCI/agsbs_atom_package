'use babel';

/*
 Maybe some package are required hereby
 Here are the functions of the editor implemented like

 - string formation,
 - insertation of links, image, tables
 */

 var $ = require('jquery');

 export default class Editor {

 	testFunction() {
 		activePaneItem = atom.workspace.getActivePaneItem();
 		console.log(activePaneItem);
		alert('Editor class');
 	}
 }


  /* ToDos
    In https://github.com/TUD-INF-IAI-MCI/AgsbsMarkdownPlugin/blob/master/AgsbsMarkdownHelper.py
    are functions are defined here.
    In the class AddTagCommand(sublime_plugin.TextCommand) the string is generated depending on the tag

      { "keys": ["alt+shift+h"], "command": "add_tag", "args": {"tag": "h", "markdown_str":"#"} },
      --> add heading level (maybe not necessary)
      { "keys": ["alt+shift+i"], "command": "add_tag", "args": {"tag": "em", "markdown_str":"_"} },
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
