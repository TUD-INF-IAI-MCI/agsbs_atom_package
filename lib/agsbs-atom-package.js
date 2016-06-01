'use babel';

var $ = require('jquery');

import DialogView from './dialog-view';
import MainNavigationView from './main-navigation-view';
import FooterPanelView from './footer-panel-view';
import NewProjectDialog from './new-project-dialog';
import { CompositeDisposable } from 'atom';
import Matuc from './matuc-commands';
import Editor from './editor-functions';

const matuc = new Matuc();
const editor = new Editor();

export default {

	dialogView: null,
	dialog: null,
	mainNavigationView: null,
	mainNavigation: null,
	footerPanelView: null,
	footerPanel: null,
	newProjectView: null,
	newProject: null,
	subscriptions: null,

	activate(state) {

		this.mainNavigationView = new MainNavigationView(state.mainNavigationView);

		this.mainNavigation = atom.workspace.addTopPanel({
			item: this.mainNavigationView.getElement(),
			visible: false
		});

		this.footerPanelView = new FooterPanelView(state.footerPanelView);

		this.footerPanel = atom.workspace.addBottomPanel({
			item: this.footerPanelView.getElement(),
			visible: false
		});

		this.dialogView = new DialogView(state.dialogView);

		this.dialog = atom.workspace.addModalPanel({
			item: this.dialogView.getElement(),
			visible: false
		});

		this.newProjectDialog = new NewProjectDialog(state.newProjectDialog);

		this.newProject = atom.workspace.addModalPanel({
			item: this.newProjectDialog.getElement(),
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
			'agsbs-atom-package:createNewProject': () => this.createNewProject()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggleDialogView': () => this.toggleDialogView()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggleNewProjectDialog': () => this.toggleNewProjectDialog()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:closeDialog': () => this.closeDialog()
		}));

		//test
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'editor-functions:testFunction1': () => editor.testFunction1()
		}));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'editor-functions:testFunction1': () => editor.testFunction2()
		}));
	},

	deactivate() {
		this.mainNavigation.destroy();
		this.footerPanel.destroy();
		this.subscriptions.dispose();
		this.agsbsAtomPackageView.destroy();
		this.dialogView.destroy();
		this.newProjectDialog.destroy();
	},

	serialize() {
		mainNavigationViewState: this.mainNavigationView.serialize();
		secondaryNavigationViewState: this.footerPanelView.serialize();
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
		matuc.generateFile(atom.workspace.getActivePaneItem());
	},

	createNewProject() {
		matuc.newProject(0, 3, 'DE', '~');
	},

	//open or close the dialog-box
	toggleDialogView() {
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

	//close any dialog by hitting escape or clicking beside the dialog-box
	closeDialog() {
		if (this.dialog.isVisible()) {
			this.toggleDialogView();
		}
		if (this.newProject.isVisible()) {
			this.toggleNewProjectDialog();
		}
	}
};
