Path = require 'path'
{exec, execFile} = require 'child_process'

module.exports =
class MatucCommands
  constructor: ->

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
