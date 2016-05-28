'use babel';

var $;
$ = require('jquery');

import AgsbsAtomPackageView from './agsbs-atom-package-view';
import MainNavigationView from './main-navigation-view';
import SecondaryNavigationView from './secondary-navigation-view';
import { CompositeDisposable } from 'atom';
import MatucCommands from './matuc-commands';

export default {

	//agsbsAtomPackageView: null,
	mainNavigationView: null,
	secondaryNavigationView: null,
	mainNavigation: null,
	secondaryNavigation: null,
	subscriptions: null,

	activate(state) {

		//this.agsbsAtomPackageView = new AgsbsAtomPackageView(state.agsbsAtomPackageViewState);
		//this.modalPanel = atom.workspace.addModalPanel({
		//	item: this.agsbsAtomPackageView.getElement(),
		//	visible: false
		//});

		this.mainNavigationView = new MainNavigationView(state.mainNavigationView);

		this.mainNavigation = atom.workspace.addTopPanel({
			item: this.mainNavigationView.getElement(),
			visible: false
		});

		this.secondaryNavigationView = new SecondaryNavigationView(state.secondaryNavigationView);

		this.secondaryNavigation = atom.workspace.addBottomPanel({
			item: this.secondaryNavigationView.getElement(),
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
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:newProject': () => this.newProject()
		}));
	},

	deactivate() {
		this.mainNavigation.destroy();
		this.secondaryNavigation.destroy();
		this.subscriptions.dispose();
		this.agsbsAtomPackageView.destroy();
	},

	serialize() {
		mainNavigationViewState: this.mainNavigationView.serialize();
		secondaryNavigationViewState: this.secondaryNavigationView.serialize();

		return true;//if main + secondary is
			//agsbsAtomPackageViewState: this.agsbsAtomPackageView.serialize()
	},

	toggle() {
		console.log('Agsbs launched!');
			this.mainNavigation.isVisible() ?
			this.mainNavigation.hide() :
			this.mainNavigation.show();
			this.secondaryNavigation.isVisible() ?
			this.secondaryNavigation.hide() :
			this.secondaryNavigation.show();
		return true; //main + secondary return true
	},

	generateFile: function() {
		console.log('GenerateFile');
		return this.matucCommands.generateFile(atom.workspace.getActivePaneItem());
	},

	newProject: function() {
		console.log('New Project');
		return this.matucCommands.newProject(0, 3, 'DE', '~');
	}
};
