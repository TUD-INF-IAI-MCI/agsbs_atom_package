'use babel';

import NewProjectDialog from './new-project-dialog';
import Helper from './helper';
const iPath = require('path');
var apd = require('atom-package-dependencies');

const treeView =  apd.require('tree-view');
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
		const treeView =  apd.require('tree-view');
		const git = agsbs.git;

		// create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		const tools = document.createElement('div');
		tools.classList.add('tools');
		
		// create buttons
		const newProjectButton = viewManager.addButton(tools, 'new_project', language.newProject, 'new_project', viewManager.toggleDialog, newProjectDialog, 'f2');
		
		const cloneProjectButton = viewManager.addButton(tools, 'edit_project', language.cloneExistingRepo, 'commit', clone, undefined, undefined)
		const editProjectButton = viewManager.addButton(tools, 'edit_project', language.editProject, 'fa-pencil', this.getEditProjectDialog, undefined, '');
		viewManager.groupButtons(language.projectTitle, [newProjectButton, cloneProjectButton, editProjectButton]);
		const saveChangesButton = viewManager.addButton(tools, 'save_changes', language.saveChanges, 'fa-floppy-o', checkAndSave, undefined, 'ctrl + s');

		const newFileButton = viewManager.addButton(tools, 'new_file', language.newFile, 'new_file',  newFile, undefined, 'shift + alt + n');
		const undoButton = viewManager.addButton(tools, 'undo', language.undo, 'fa-undo', editor.undo);
		const redoButton = viewManager.addButton(tools, 'redo', language.redo, 'fa-repeat', editor.redo);
		const htmlPreviewButton = viewManager.addButton(tools, 'html_preview', language.preview, 'fa-eye', viewManager.toggleHtmlPreview);
		const generateFileButton = viewManager.addButton(tools, 'generate_file', language.generateFile, 'fa-file-code-o', this.convertToHtml, undefined, 'f5');
		const convertEntireProjectButton = viewManager.addButton(tools, 'convert_project', language.convertEntireProject, 'create_all', this.convertEntireProject, undefined, 'f6');
		var conversionProfiles = ["blind", "visually"];
		const dropDownMenuConversionProfile = viewManager.addDropDownMenu(tools, 'combobox_converion_profile', language.conversionProfile, [], false);
		//add label for conversion profile CND ToDo
		const labelDropDown = document.createElement("label");
		labelDropDown.setAttribute('for', 'combobox_converion_profile');
		labelDropDown.innerHTML = language.conversionProfile;

		viewManager.groupButtons(language.documentTitle, [saveChangesButton, newFileButton, undoButton, redoButton, htmlPreviewButton, generateFileButton, convertEntireProjectButton, labelDropDown, dropDownMenuConversionProfile]);
		const checkProject = viewManager.addButton(tools, 'check_project', language.checkProject, 'check_all', this.checkEntireProject, undefined, 'f4');
		const commitChangesButton = viewManager.addButton(tools, 'commit_changes', language.commitChanges, 'commit', viewManager.toggleDialog, commitChangesDialog);
		viewManager.groupButtons(language.publishTitle, [checkProject, commitChangesButton]);
		// add profiles to DropDownMenu
		var profileName = "";
		for(var i = 0; i < conversionProfiles.length; i++){
			switch(conversionProfiles[i]){
				case "blind":
					profileName = language.blind;
					break;
				case "visually":
					profileName = language.visuallyImpaired;
					break;
			}
			dropDownMenuConversionProfile.options.add(new Option(profileName, conversionProfiles[i]));
		}

		atom.config.observe('agsbs-atom-package.enableGitUsage', function(value) {
			if(value) {
				commitChangesButton.style.display = 'block';
				cloneProjectButton.style.display = 'block';
			} else {
				commitChangesButton.style.display = 'none';
				cloneProjectButton.style.display = 'none';
			};
		});

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
		
		function newFile(){		 	
			var inst = treeView.getTreeViewInstance()
			inst.add()
		}
		
		function clone(){
			atom.commands.dispatch(atom.views.getView(atom.workspace), "github:clone")
		}
		
		function checkAndSave() {
			if(atom.workspace.getActivePaneItem().uri != 'atom://config'){
				matuc.checkAndSaveChanges();
			}
			if(atom.config.get('agsbs-atom-package.enableGitUsage')){
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
		const viewManager = agsbs.viewManager;
		const warningPagenumDiaglog = agsbs.renderWarningPagenumberingDialog();
		viewManager.toggleDialog(warningPagenumDiaglog.panel)

		if (!helper.isBufferSelected(true)) {
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

	convertToHtml() {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const matuc = agsbs.matuc;
		const helper = agsbs.helper;
		if (!helper.isBufferSelected(true)) {
			return;
		}
		var profile = helper.getProfile();
		helper.checkAndCorrectLineEnding();
		var promise = matuc.checkIfFileIsWithinLecture();
		promise.then(function (isWithinLecture) {
			if (isWithinLecture) {
				matuc.checkAndSaveChanges()				
				matuc.convertFile(profile);
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
		if (!helper.isBufferSelected(true)) {
			return;
		}
		var profile = helper.getProfile();
		var promise = matuc.checkIfFileIsWithinLecture();
		promise.then(function (isWithinLecture) {
			if (isWithinLecture) {
				matuc.convertEntireProject(profile);
			} else {
				atom.notifications.addError(language.SelectedWrongFileError, {
					detail : language.SelectedWrongFileErrorDetail,
					dismissable : true
				});
			}
		});
	}
}
