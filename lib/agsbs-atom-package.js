'use babel';

import English from './language/language.en';
import German from './language/language.de';

import { CompositeDisposable } from 'atom';

import ViewManager from './view-manager';
import ShortcutManager from './shortcut-manager';
import EditorFunctions from './editor-functions';

import Matuc from './matuc-commands';
import Git from './git-commands';

import NewProjectDialog from './new-project-dialog';
import EditProjectDialog from './edit-project-dialog';
import CommitChangesDialog from './commit-changes-dialog';
import InsertLinkDialog from './insert-link-dialog';
import InsertTableDialog from './insert-table-dialog';
import InsertGraphicDialog from './insert-graphic-dialog';
import InsertFootnoteDialog from './insert-footnote-dialog';
import InsertTableCsvDialog from './import-table-csv-dialog';
import SaveDialog from './save-dialog';

import Helper from './helper';

import MainNavigation from './main-navigation-view';
import FooterPanel from './footer-panel-view';

export default {
	//set settings
	config: {
		language: {
			type: 'string',
			default: 'english',
			enum: ['english', 'german']
		},
		matucPath:{
			type: 'string',
			default: ""
		},
		enableGitAutoCommitAfterSave:{
				type: 'boolean',
				default: false,
			},
		gitPath:{
				type: 'string',
				enabled: false,
				default: "enter the path of your git repo"
			},
		insertOnlyInternalMaterial:{
				type: 'boolean',
				default: true,
			},
		csvDelimiter:{
				title: "CSV Delimiter",
				description: "This is the sign that separats the values between the columns.",
				type: 'string',
				default: ";"
			},
		supportedMatucVersion:{
			title: 'Required Matuc version',
			description: 'Only the **named versions** support all functions of matuc.',
			type: 'string',
			default: '0.5.1',
			enum: ['0.5.1']
		}
	},

	activate(state) {
		//Install packages depended on.
		var apd = require('atom-package-dependencies');
		apd.install();
		//Disable default markdown preview.
		atom.packages.disablePackage('markdown-preview');
		//enable latex rendering in markdown preview plus
		atom.config.set('markdown-preview-plus.enableLatexRenderingByDefault', true);
		if(process.platform == 'win32'){
			atom.config.set('agsbs-atom-package.matucPath', "C:\\Program Files (x86)\\agsbs\\matuc");
		};
		if(process.platform == 'darwin'){
			atom.config.set('agsbs-atom-package.matucPath', "add manually");
		};
		if(process.platform == 'linux'){
			atom.config.set('agsbs-atom-package.matucPath', "add manually");
		};
		this.viewManager = new ViewManager();
		this.shortcutManager = new ShortcutManager();
		this.matuc = new Matuc();
		this.git = new Git();
		this.helper = new Helper();

		//handle language switch
		var setLanguage = atom.config.get('agsbs-atom-package.language');

		this.switchLanguage(setLanguage);
		this.editorFunctions = new EditorFunctions();
		//needed to set attributes in observe function
		const agsbs = this;

		//listener for langage settings
		atom.config.observe('agsbs-atom-package.language', function(value) {
			if (setLanguage != value) {

				setLanguage = value;

				agsbs.switchLanguage(setLanguage);
				agsbs.destroyViews();
				//Reload editor-functions to rename pages.
				agsbs.editorFunctions = new EditorFunctions();
				agsbs.renderMainView();
				agsbs.toggle();
			};
		});

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

	renderSaveDialog() {
		this.saveDialog = atom.workspace.addModalPanel({
			item: new SaveDialog().getElement(),
			visible: false
		});
		return this.saveDialog;
	},

	renderEditProjectDialog() {
		this.editProjectDialog = atom.workspace.addModalPanel({
			item: new EditProjectDialog().getElement(),
			visible: false
		});
		return this.editProjectDialog;
	},

	renderCommitChangesDialog() {
		this.commitChangesDialog = atom.workspace.addModalPanel({
			item: new CommitChangesDialog().getElement(),
			visible: false
		});
		return this.commitChangesDialog;
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
		var insertGraphicDialogInstance = new InsertGraphicDialog();
		this.insertGraphicDialog = atom.workspace.addModalPanel({
			item: insertGraphicDialogInstance.getElement(),
			visible: false
		});
		return {panel: this.insertGraphicDialog, instance: insertGraphicDialogInstance};
	},

	renderInsertFootnoteDialog() {
		var insertFootnoteDialogInstance = new InsertFootnoteDialog();
		this.insertFootnoteDialog = atom.workspace.addModalPanel({
			item: insertFootnoteDialogInstance.getElement(),
			visible: false
		});
		return {panel: this.insertFootnoteDialog, instance: insertFootnoteDialogInstance};
	},

	renderImportTableCsvDialog() {
		var importTableCsvDialogInstance = new InsertTableCsvDialog();
		this.importTableCsvDialog = atom.workspace.addModalPanel({
			item: importTableCsvDialogInstance.getElement(),
			visible: false
		});
		return {panel:this.importTableCsvDialog, instance: importTableCsvDialogInstance};
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
			className: 'agsbsMainNavigation',
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
		if(this.editProjectDialog){
			this.editProjectDialog.destroy();
		};
	},

	deactivate() {
		this.destroyViews();
		this.subscriptions.dispose();
		if(this.agsbsAtomPackage){
			this.agsbsAtomPackage.destroy();
		}
	},

	serialize() {

	},

	//launch
	toggle() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const matuc = agsbs.matuc;
		const helper = agsbs.helper;
		const language = agsbs.language;
		var promise = matuc.version();
		main = this;
		promise.then(function(result){
			var json = JSON.parse(result['out']);
			if(json.result.version.toString() == atom.config.get('agsbs-atom-package.supportedMatucVersion')) {
				main.mainNavigation.isVisible() ?
				main.mainNavigation.hide() :
				main.mainNavigation.show();
				main.footerPanel.isVisible() ?
				main.footerPanel.hide() :
				main.footerPanel.show();
				if (process.platform == 'darwin') {
					atom.config.set('agsbs-atom-package.matucPath', '/Library/Frameworks/Python.framework/Versions/3.5/bin/');
				}
			}else{
			message = language.wrongMatucVersion;
			message = message.replace("${version}", atom.config.get('agsbs-atom-package.supportedMatucVersion'));
			atom.notifications.addError(language.error, {
				detail : message,
				dismissable : true
			});
			}
		});
	}
};
