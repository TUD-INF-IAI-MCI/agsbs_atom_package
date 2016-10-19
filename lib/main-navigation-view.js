'use babel';

import NewProjectDialog from './new-project-dialog';
import Helper from './helper';
const iPath = require('path');

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
		// const editProjectDialog = agsbs.renderEditProjectDialog();
		const commitChangesDialog = agsbs.renderCommitChangesDialog();

		const git = agsbs.git;

		// create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		const tools = document.createElement('div');
		tools.classList.add('tools');

		// create buttons
		const newProjectButton = viewManager.addButton(tools, 'new_project', language.newProject, 'new_project', viewManager.toggleDialog, newProjectDialog, 'f2');
		const editProjectButton = viewManager.addButton(tools, 'edit_project', language.editProject, 'fa-pencil', this.getEditProjectDialog, undefined, '');
		viewManager.groupButtons(language.projectTitle, [newProjectButton, editProjectButton]);
		const saveChangesButton = viewManager.addButton(tools, 'save_changes', language.saveChanges, 'fa-floppy-o', checkAndSave, undefined, 'ctrl + s');

		const undoButton = viewManager.addButton(tools, 'undo', language.undo, 'fa-undo', editor.undo);
		const redoButton = viewManager.addButton(tools, 'redo', language.redo, 'fa-repeat', editor.redo);
		const htmlPreviewButton = viewManager.addButton(tools, 'html_preview', language.preview, 'fa-eye', viewManager.toggleHtmlPreview);
		const generateFileButton = viewManager.addButton(tools, 'generate_file', language.generateFile, 'fa-file-code-o', this.convertToHtml, undefined, 'f5');
		const convertEntireProjectButton = viewManager.addButton(tools, 'convert_project', language.convertEntireProject, 'create_all', this.convertEntireProject, undefined, 'f6');
		viewManager.groupButtons(language.documentTitle, [saveChangesButton, undoButton, redoButton, htmlPreviewButton, generateFileButton, convertEntireProjectButton]);
		const checkProject = viewManager.addButton(tools, 'check_project', language.checkProject, 'check_all', this.checkEntireProject, undefined, 'f4');
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

		function checkAndSave() {
			matuc.checkAndSaveChanges();
			if(atom.config.get('agsbs-atom-package.enableGitAutoCommitAfterSave')){
				const saveDialog = agsbs.renderSaveDialog();
				viewManager.toggleDialog(saveDialog);
			}
		}
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

	getEditProjectDialog() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const helper = agsbs.helper;
		if (!helper.isBufferSelected()) {
			return;
		}
		const editProjectDialog = agsbs.renderEditProjectDialog();
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;
		var editor = atom.workspace.getActivePaneItem();
		var promise = matuc.checkIfFileIsWithinLecture();
		promise.then(function(isWithinLecture) {
			if (isWithinLecture) {
				viewManager.toggleDialog(editProjectDialog);
			} else {
				atom.notifications.addError(language.SelectedWrongFileError, {
					detail : language.SelectedWrongFileErrorDetail,
					dismissable : true
				});
			}
		});
	}

	checkEntireProject() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const matuc = agsbs.matuc;
		const helper = agsbs.helper;
		if (!helper.isBufferSelected()) {
			return;
		}
		var promise = matuc.checkIfFileIsWithinLecture();
		promise.then(function(isWithinLecture) {
			if (isWithinLecture) {
				matuc.checkEntireProject();
			} else {
				atom.notifications.addError(language.SelectedWrongFileError, {
					detail : language.SelectedWrongFileErrorDetail,
					dismissable : true
				});
			}
		});
	}

	convertToHtml(activePaneItem) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const matuc = agsbs.matuc;
		const helper = agsbs.helper;
		if (!helper.isBufferSelected()) {
			return;
		}
		var promise = matuc.checkIfFileIsWithinLecture();
		promise.then(function (isWithinLecture) {
			if (isWithinLecture) {
				matuc.convertFile();
			} else {
				atom.notifications.addError(language.SelectedWrongFileError, {
					detail : language.SelectedWrongFileErrorDetail,
					dismissable : true
				});
			}
		});
	}

	convertEntireProject() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const matuc = agsbs.matuc;
		const helper = agsbs.helper;
		if (!helper.isBufferSelected()) {
			return;
		}
		var promise = matuc.checkIfFileIsWithinLecture();
		promise.then(function (isWithinLecture) {
			if (isWithinLecture) {
				matuc.convertEntireProject();
			} else {
				atom.notifications.addError(language.SelectedWrongFileError, {
					detail : language.SelectedWrongFileErrorDetail,
					dismissable : true
				});
			}
		});
	}
}
