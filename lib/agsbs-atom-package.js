'use babel';

var $;
$ = require('jquery');

import AgsbsAtomPackageView from './agsbs-atom-package-view';
import MainNavigationView from './main-navigation-view';
import SecondaryNavigationView from './secondary-navigation-view';
import NewProjectView from './new-project-view';
import { CompositeDisposable } from 'atom';
import MatucCommands from './matuc-commands';

export default {

	mainDialogView: null,
	mainDialog: null,
	mainNavigationView: null,
	mainNavigation: null,
	secondaryNavigationView: null,
	secondaryNavigation: null,
	//newProjectView: null,
	//newProject: null,
	subscriptions: null,

	activate(state) {

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

		this.mainDialogView = new AgsbsAtomPackageView(state.mainDialogViewState);

		this.mainDialog = atom.workspace.addModalPanel({
			item: this.mainDialogView.getElement(),
			visible: false
		});

		//console.log(mainDialog);

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
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:testMainDialog': () => this.testMainDialog()
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
	},

	toggle() {
		console.log('Agsbs launched!');
		this.mainNavigation.isVisible() ?
		this.mainNavigation.hide() :
		this.mainNavigation.show();
		this.secondaryNavigation.isVisible() ?
		this.secondaryNavigation.hide() :
		this.secondaryNavigation.show();
	},

	generateFile() {
		console.log('GenerateFile');
		this.matucCommands.generateFile(atom.workspace.getActivePaneItem());
	},

	newProject() {
		console.log('New Project');
		this.matucCommands.newProject(0, 3, 'DE', '~');
	},

	testMainDialog() {
		this.mainDialog.isVisible() ?
		this.mainDialog.hide() :
		this.mainDialog.show();
	}
};
