AgsbsAtomPackageView = require './agsbs-atom-package-view'
{exec, execFile} = require 'child_process'
Path = require 'path'
{CompositeDisposable} = require 'atom'

module.exports = AgsbsAtomPackage =
  agsbsAtomPackageView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @agsbsAtomPackageView = new AgsbsAtomPackageView(state.agsbsAtomPackageViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @agsbsAtomPackageView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'agsbs-atom-package:toggle': => @toggle()
    @subscriptions.add atom.commands.add 'atom-workspace', 'agsbs-atom-package:generateFile': => @generateFile()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @agsbsAtomPackageView.destroy()

  serialize: ->
    agsbsAtomPackageViewState: @agsbsAtomPackageView.serialize()

  toggle: ->
    console.log 'AgsbsAtomPackage was toggled!'
    console.log 'Test'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()

  generateFile: ->
    editor = atom.workspace.getActivePaneItem()
    # save before html is generated
    if  editor?.buffer.isModified
      console.log 'file is modified'
      editor?.buffer.save()
    file = editor?.buffer.file

    filepath = file?.path
    extension = Path.extname(Path.basename(filepath))
    if extension is '.md'
      cmd = 'matuc conv ' +filepath
      console.log "execute " +cmd
      exec cmd
    else
      alert('Selektieren Sie eine md-Datei')
