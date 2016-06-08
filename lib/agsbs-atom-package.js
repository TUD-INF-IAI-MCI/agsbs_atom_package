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
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'agsbs-atom-package:toggleNewProjectDialog': () => this.toggleDialog(this.newProject)
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

	//launch
	toggle() {
		this.mainNavigation.isVisible() ?
		this.mainNavigation.hide() :
		this.mainNavigation.show();
		this.footerPanel.isVisible() ?
		this.footerPanel.hide() :
		this.footerPanel.show();
	},

	//toggle function for all dialogs
	toggleDialog(dialog) {
		const agsbsAtomPackage = this;
		if (dialog.isVisible()) {
			dialog.hide();
		} else {
			dialog.show();
			dialog.item.getElementsByTagName('input')[0].focus();
			console.log(dialog.item.getElementsByTagName('input')[0]);
			dialog.item.addEventListener('keydown', function (event) {
				if (event.which == 27) {
					agsbsAtomPackage.closeDialogs();
				}
			});
		}
	},

	//close any dialog
	closeDialogs() {
		if (this.newProject.isVisible()) {
			this.toggleDialog(this.newProject);
		}
	}
};
