AgsbsAtomPackageView = require './agsbs-atom-package-view'
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

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @agsbsAtomPackageView.destroy()

  serialize: ->
    agsbsAtomPackageViewState: @agsbsAtomPackageView.serialize()

  toggle: ->
    console.log 'AgsbsAtomPackage was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
