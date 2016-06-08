'use babel';

import { CompositeDisposable } from 'atom';

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
		console.log('Git SRC:\nAGSBS_Informatik/sandbox');
	}
};
