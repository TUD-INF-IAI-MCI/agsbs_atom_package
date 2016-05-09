AgsbsAtomPackageView = require './agsbs-atom-package-view'
MatucCommands = require './matuc-commands'


{CompositeDisposable} = require 'atom'

module.exports = AgsbsAtomPackage =
  agsbsAtomPackageView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @agsbsAtomPackageView = new AgsbsAtomPackageView(state.agsbsAtomPackageViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @agsbsAtomPackageView.getElement(), visible: false)
    @matucCommands = new MatucCommands()
    
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
    console.log 'GenerateFile'
    @matucCommands.generateFile(atom.workspace.getActivePaneItem())
