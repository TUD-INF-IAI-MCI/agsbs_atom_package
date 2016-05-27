'use babel';

var $;
$ = require('jquery');

import AgsbsAtomPackageView from './agsbs-atom-package-view';
import { CompositeDisposable } from 'atom';
import MatucCommands from './matuc-commands';

export default {

	agsbsAtomPackageView: null,
	dalPanel: null,
	subscriptions: null,

	activate(state) {
		this.agsbsAtomPackageView = new AgsbsAtomPackageView(state.agsbsAtomPackageViewState);
		this.modalPanel = atom.workspace.addModalPanel({
			item: this.agsbsAtomPackageView.getElement(),
			visible: false
		});

		this.matucCommands = new MatucCommands();

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		// Register command that toggles this view
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggle': () => this.toggle()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:generateFile': () => this.generateFile()
		}));
	},

	deactivate() {
		this.modalPanel.destroy();
		this.subscriptions.dispose();
		this.agsbsAtomPackageView.destroy();
	},

	serialize() {
		return {
			agsbsAtomPackageViewState: this.agsbsAtomPackageView.serialize()
		};
	},

	toggle() {
		console.log('AgsbsAtomPackage was toggled!');
		return (
			this.modalPanel.isVisible() ?
			this.modalPanel.hide() :
			this.modalPanel.show()
		);
	},

	generateFile: function() {
		console.log('GenerateFile');
		return this.matucCommands.generateFile(atom.workspace.getActivePaneItem());
	}
};
