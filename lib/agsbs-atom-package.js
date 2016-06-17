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

		//needed to set attribute in observe function
		const agsbs = this;

		this.viewManager = new ViewManager();
		this.shortcutManager = new ShortcutManager();
		this.editorFunctions = new EditorFunctions();
		this.matuc = new Matuc();

		var setLanguage = atom.config.get('agsbs-atom-package.language');

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

		//listener for langage settings
		atom.config.observe('agsbs-atom-package.language', function(value) {
			if (setLanguage != value) {
				atom.reload();
			}
		});

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

		//modalPanelArrayPosition = 0
		this.newProjectDialog = new NewProjectDialog(state.newProjectDialog);

		this.newProject = atom.workspace.addModalPanel({
			item: this.newProjectDialog.getElement(),
			visible: false
		});

		//modalPanelArrayPosition = 1
		this.editProjectDialog = new EditProjectDialog(state.editProjectDialog);

		this.editProject = atom.workspace.addModalPanel({
			item: this.editProjectDialog.getElement(),
			visible: false
		});

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		// register commands
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggle': () => this.toggle()
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
