'use babel';

import { CompositeDisposable } from 'atom';

import Matuc from './matuc-commands';
import EditorFunctions from './editor-functions';

import NewProjectDialog from './new-project-dialog';

import MainNavigation from './main-navigation-view';
import FooterPanel from './footer-panel-view';

export default {

	activate(state) {

		//adds main navigation to the package
		this.mainNavigation = new MainNavigation(state.mainNavigation);

		this.mainNavigation = atom.workspace.addTopPanel({
			item: this.mainNavigation.getElement(),
			visible: false
		});

		//adds footer panel to the package
		this.footerPanel = new FooterPanel(state.footerPanel);

		this.footerPanel = atom.workspace.addBottomPanel({
			item: this.footerPanel.getElement(),
			visible: false
		});

		this.newProjectDialog = new NewProjectDialog(state.newProjectDialog);

		this.newProject = atom.workspace.addModalPanel({
			item: this.newProjectDialog.getElement(),
			visible: false
		});

		this.matuc = new Matuc();
		this.editorFunctions = new EditorFunctions();

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
			'agsbs-atom-package:toggleNewProjectDialog': () => this.toggleNewProjectDialog()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:closeDialog': () => this.closeDialogs()
		}));
	},

	deactivate() {
		this.mainNavigation.destroy();
		this.footerPanel.destroy();
		this.newProjectDialog.destroy();
		this.subscriptions.dispose();
		this.agsbsAtomPackage.destroy();
	},

	serialize() {

	},

	toggle() {
		this.mainNavigation.isVisible() ?
		this.mainNavigation.hide() :
		this.mainNavigation.show();
		this.footerPanel.isVisible() ?
		this.footerPanel.hide() :
		this.footerPanel.show();
	},

	generateFile() {
		this.matuc.generateFile(atom.workspace.getActivePaneItem());
	},

	//toggle functions for all dialogs

	toggleNewProjectDialog() {
		if (this.newProject.isVisible()) {
			this.newProject.hide();
		} else {
			this.newProject.show();
		}
	},

	//close any dialog
	closeDialogs() {
		if (this.newProject.isVisible()) {
			this.toggleNewProjectDialog();
		}
	}
};
