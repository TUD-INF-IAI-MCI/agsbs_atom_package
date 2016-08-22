'use babel';

import NewProjectDialog from './new-project-dialog';

//creates DOM elements for the main navigation
export default class MainNavigationView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;
		const matuc = agsbs.matuc;
		const activePainItem = atom.workspace.getActivePaneItem();

		const newProjectDialog = agsbs.renderNewProjectDialog();
		const editProjectDialog = agsbs.renderEditProjectDialog();
		const commitChangesDialog = agsbs.renderCommitChangesDialog();

		// create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		const tools = document.createElement('div');
		tools.classList.add('tools');

		// create buttons
		const newProjectButton = viewManager.addButton(tools, 'new_project', language.newProject, 'new_project', viewManager.toggleDialog, newProjectDialog, 'f2');
		const editProjectButton = viewManager.addButton(tools, 'edit_project', language.editProject, 'fa-pencil', viewManager.toggleDialog, editProjectDialog);
		viewManager.groupButtons(language.projectTitle, [newProjectButton, editProjectButton]);
		const saveChangesButton = viewManager.addButton(tools, 'save_changes', language.saveChanges, 'fa-floppy-o', matuc.checkAndSaveChanges, undefined, 'ctrl + s');
		const undoButton = viewManager.addButton(tools, 'undo', language.undo, 'fa-undo', editor.undo);
		const redoButton = viewManager.addButton(tools, 'redo', language.redo, 'fa-repeat', editor.redo);
		const htmlPreviewButton = viewManager.addButton(tools, 'html_preview', language.preview, 'fa-eye', viewManager.toggleHtmlPreview);
		viewManager.groupButtons(language.documentTitle, [saveChangesButton, undoButton, redoButton, htmlPreviewButton]);
		const checkProject = viewManager.addButton(tools, 'check_project', language.checkProject, 'check_all', matuc.checkEntireProject, undefined, 'f4');
		const commitChangesButton = viewManager.addButton(tools, 'commit_changes', language.commitChanges, 'commit', viewManager.toggleDialog, commitChangesDialog);
		viewManager.groupButtons(language.publishTitle, [checkProject, commitChangesButton]);

		this.element.appendChild(tools);

		//langauge select
		var setLanguage = atom.config.get('agsbs-atom-package.language');
		const languages = document.createElement('div');
		languages.classList.add('languages');

		var active, inactive;
		switch(setLanguage) {
			case 'english':
				active = viewManager.addButton(languages, 'en', language.english, 'en');
				inactive = viewManager.addButton(languages, 'de', language.german, 'de_grey', viewManager.setLanguageToGerman);
				break;
				case 'german':
				inactive = viewManager.addButton(languages, 'en', language.english, 'en_grey', viewManager.setLanguageToEnglish);
				active = viewManager.addButton(languages, 'de', language.german, 'de');
				break;
			};
			active.classList.add('active');
			this.element.appendChild(languages);
			viewManager.groupButtons(language.languageTitle, [active, inactive]);
		}

	// Returns an object that can be retrieved when package is activated
	serialize() {}

	// Tear down any state and detach
	destroy() {
		this.element.remove();
	}

	getElement() {
		return this.element;
	}

	disableSaveButton() {
		saveChangesButton.setAttribute('disabled', 'true');
	}
}
