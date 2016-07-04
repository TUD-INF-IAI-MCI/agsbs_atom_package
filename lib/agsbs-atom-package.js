'use babel';

import English from './language/language.en';
import German from './language/language.de';

import { CompositeDisposable } from 'atom';

import ViewManager from './view-manager';
import ShortcutManager from './shortcut-manager';
import EditorFunctions from './editor-functions';

import Matuc from './matuc-commands';

import NewProjectDialog from './new-project-dialog';
import EditProjectDialog from './edit-project-dialog';
import InsertLinkDialog from './insert-link-dialog';
import InsertTableDialog from './insert-table-dialog';
import InsertGraphicDialog from './insert-graphic-dialog';
import InsertFootnoteDialog from './insert-footnote-dialog';

import MainNavigation from './main-navigation-view';
import FooterPanel from './footer-panel-view';

export default {

	//set settings
	config: {
		someSetting: {
			//delete the default some Setting from setting pane
		},
		language: {
			description:'be aware, a change will reload the window!',
			type: 'string',
			default: 'english',
			enum: ['english', 'german']
		},
	},

	activate(state) {

		this.viewManager = new ViewManager();
		this.shortcutManager = new ShortcutManager();
		this.editorFunctions = new EditorFunctions();
		this.matuc = new Matuc();

		//handle language switch
		var setLanguage = atom.config.get('agsbs-atom-package.language');

		this.switchLanguage(setLanguage);

		//needed to set attributes in observe function
		const agsbs = this;

		//listener for langage settings
		atom.config.observe('agsbs-atom-package.language', function(value) {
			if (setLanguage != value) {

				setLanguage = value;

				agsbs.switchLanguage(setLanguage);
				agsbs.destroyViews();
				agsbs.renderMainView();
				agsbs.toggle();
			};
		});

		//enable latex rendering in markdown preview plus
		atom.config.set('markdown-preview-plus.enableLatexRenderingByDefault', true);

		this.renderMainView();

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		//register commands
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggle': () => this.toggle()
		}));
	},

	renderNewProjectDialog() {
		this.newProjectDialog = atom.workspace.addModalPanel({
			item: new NewProjectDialog().getElement(),
			visible: false
		});
		return this.newProjectDialog;
	},

	renderEditProjectDialog() {
		this.editProjectDialog = atom.workspace.addModalPanel({
			item: new EditProjectDialog().getElement(),
			visible: false
		});
		return this.editProjectDialog;
	},

	renderInsertLinkDialog() {
		var insertLinkDialogInstance = new InsertLinkDialog();
		this.insertLinkDialog = atom.workspace.addModalPanel({
			item: insertLinkDialogInstance.getElement(),
			visible: false
		});
		return {panel: this.insertLinkDialog, instance: insertLinkDialogInstance};
	},

	renderInsertTableDialog() {
		this.insertTableDialog = atom.workspace.addModalPanel({
			item: new InsertTableDialog().getElement(),
			visible: false
		});
		return this.insertTableDialog;
	},

	renderInsertGraphicDialog() {
		this.insertGraphicDialog = atom.workspace.addModalPanel({
			item: new InsertGraphicDialog().getElement(),
			visible: false
		});
		return this.insertGraphicDialog;
	},

	renderInsertFootnoteDialog() {
		this.insertFootnoteDialog = atom.workspace.addModalPanel({
			item: new InsertFootnoteDialog().getElement(),
			visible: false
		});
		return this.insertFootnoteDialog;
	},


	switchLanguage(setLanguage) {
		switch (setLanguage) {
			case 'english':
				this.language = new English();
				break;
				case 'german':
				this.language = new German();
				break;
				default:
				this.language = new English();
				break;
			};
	},

	renderMainView() {

		//adds main navigation to the package
		this.mainNavigation = atom.workspace.addTopPanel({
			item: new MainNavigation().getElement(),
			visible: false
		});

		//adds footer panel to the package
		this.footerPanel = atom.workspace.addBottomPanel({
			item: new FooterPanel().getElement(),
			visible: false
		});
	},

	destroyViews() {
		this.mainNavigation.destroy();
		this.footerPanel.destroy();
		this.newProjectDialog.destroy();
		this.editProjectDialog.destroy();
	},

	deactivate() {
		this.destroyViews();
		this.subscriptions.dispose();
		this.agsbsAtomPackage.destroy();
	},

	serialize() {

	},

	//launch
	toggle() {
		this.mainNavigation.isVisible() ?
		this.mainNavigation.hide() :
		this.mainNavigation.show();
		this.footerPanel.isVisible() ?
		this.footerPanel.hide() :
		this.footerPanel.show();
	}
};
