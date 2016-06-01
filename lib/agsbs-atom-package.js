'use babel';

var $ = require('jquery');

import AgsbsAtomPackageView from './agsbs-atom-package-view';
import MainNavigationView from './main-navigation-view';
import SecondaryNavigationView from './secondary-navigation-view';
import NewProjectView from './new-project-view';
import { CompositeDisposable } from 'atom';
import Matuc from './matuc-commands';
const matuc = new Matuc();

export default {

	DialogView: null,
	Dialog: null,
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

		this.DialogView = new AgsbsAtomPackageView(state.DialogViewState);

		this.Dialog = atom.workspace.addModalPanel({
			item: this.DialogView.getElement(),
			visible: false
		});

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
			'agsbs-atom-package:toggleDialog': () => this.toggleDialog()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:closeDialog': () => this.closeDialog()
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
		matuc.generateFile(atom.workspace.getActivePaneItem());
	},

	newProject() {
		matuc.newProject(0, 3, 'DE', '~');
	},

	//open or close the dialog-box
	toggleDialog() {
		if (this.Dialog.isVisible()) {
			this.Dialog.hide();
			$('.dialog_content').empty();
		} else {
			this.Dialog.show();
		}
	},

	//close dialog by hitting escape or click beside the dialog-box
	closeDialog() {
		if (this.Dialog.isVisible()) {
			this.toggleDialog();
		}
	}
};
