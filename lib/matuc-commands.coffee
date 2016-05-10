Path = require 'path'
{exec, execFile} = require 'child_process'

module.exports =
class MatucCommands
  constructor: ->

 ###
  old  { "keys": ["f5"], "command": "create_html_file"},

  Generate html file of selected buffer, which has to be a Markdown file, *.md
  It is also tested ist the buffer is modified
 ###
  generateFile: (activePaneItem)->
    # save before html is generated
    if  activePaneItem?.buffer.isModified
      console.log 'file is modified'
      activePaneItem?.buffer.save()
    file = activePaneItem?.buffer.file
    filepath = file?.path
    extension = Path.extname(Path.basename(filepath))
    if extension is '.md'
      cmd = 'matuc conv ' +filepath
      console.log "execute " +cmd
      exec cmd
    else
      alert('Selektieren Sie eine md-Datei')

### ToDos

 The installation of Matuc is required for all these commands

 { "keys": ["f2"], "command": "create_structure"},
 --> matuc init
 { "keys": ["f3"], "command": "check_with_mk" , "args": {"function": "checkFile"} },
 --> matuc mk
 { "keys": ["f4"], "command": "check_with_mk" , "args": {"function": "checkAll"} },
 --> matuc mk ??
 { "keys": ["f5"], "command": "create_html_file"},
 --> matuc conv filename
 { "keys": ["f6"], "command": "create_all"},
 --> matuc master pfad
###
