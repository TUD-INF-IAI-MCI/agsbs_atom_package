'use babel';

import { CompositeDisposable } from 'atom';

import Matuc from './matuc-commands';
import EditorFunctions from './editor-functions';

import Dialog from './dialog-view';
import NewProjectDialog from './new-project-dialog';

import MainNavigation from './main-navigation-view';
import FooterPanel from './footer-panel-view';

export default {

	activate(state) {

		this.mainNavigation = new MainNavigation(state.mainNavigation);

		this.mainNavigation = atom.workspace.addTopPanel({
			item: this.mainNavigation.getElement(),
			visible: false
		});

		this.footerPanel = new FooterPanel(state.footerPanel);

		this.footerPanel = atom.workspace.addBottomPanel({
			item: this.footerPanel.getElement(),
			visible: false
		});

		this.dialog = new Dialog(state.dialog);

		this.dialog = atom.workspace.addModalPanel({
			item: this.dialog.getElement(),
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
			'agsbs-atom-package:createNewProject': () => this.createNewProject()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggleDialog': () => this.toggleDialog()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggleNewProjectDialog': () => this.toggleNewProjectDialog()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:closeDialog': () => this.closeDialog()
		}));

		//test
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'editor-functions:testFunction1': () => editorFunctions.testFunction1()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'editor-functions:testFunction2': () => editorFunctions.testFunction2()
		}));
	},

	deactivate() {
		this.mainNavigation.destroy();
		this.footerPanel.destroy();
		this.subscriptions.dispose();
		this.agsbsAtomPackage.destroy();
		this.dialog.destroy();
		this.newProjectDialog.destroy();
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

	createNewProject() {
		this.matuc.newProject(0, 3, 'DE', '~');
	},

	//open or close the dialog-box
	toggleDialog() {
		if (this.dialog.isVisible()) {
			this.dialog.hide();
		} else {
			this.dialog.show();
		}
	},

	toggleNewProjectDialog() {
		if (this.newProject.isVisible()) {
			this.newProject.hide();
		} else {
			this.newProject.show();
		}
	},

	//close any dialog
	closeDialog() {
		if (this.dialog.isVisible()) {
			this.toggleDialog();
		}
		if (this.newProject.isVisible()) {
			this.toggleNewProjectDialog();
		}
	}
};
