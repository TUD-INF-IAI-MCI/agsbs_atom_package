'use babel';

import DialogView from './dialog-view';
/**
* Class that creates a dialog for creating a new project.
* @author leroy buchholz
*/
export default class NewProjectDialog extends DialogView {
	/**
	* @constructor
	* @this Instance of the new-project-dialog.
	*/
	constructor(serializedState) {
		//Used instances from agsbs-atom-package.
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;

		//Get this.element and its child dialogContent from superclass.
		super(serializedState);

		//Creating DOM elements.
		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');
		//Git block.
		const useGit = this.viewManager.addCheckbox(newProjectForm, 'use_git', language.useGit);
		useGit.setAttribute('tabindex', 1);
		//Listener for the guided dialog.
		useGit.addEventListener('change', function() {
			toogleGitContainer();
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const gitContainer = document.createElement('div');
		gitContainer.classList.add('git_container');
		const newProjectSource = this.viewManager.addTextInput(gitContainer, 'source', language.source);
		newProjectSource.setAttribute('tabindex', 2);
		newProjectSource.setAttribute('disabled', '');
		//Listener for the guided dialog.
		newProjectSource.addEventListener('input', function() {
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectGitUser = this.viewManager.addTextInput(gitContainer, 'git_user', language.gitUser);
		newProjectGitUser.setAttribute('tabindex', 3);
		newProjectGitUser.setAttribute('disabled', '');
		//Listener for the guided dialog.
		newProjectGitUser.addEventListener('input', function() {
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectGitPassword = this.viewManager.addTextInput(gitContainer, 'git_password', language.gitPassword);
		newProjectGitPassword.setAttribute('tabindex', 4);
		newProjectGitPassword.setAttribute('disabled', '');
		newProjectGitPassword.setAttribute('type','password');
		//Listener for the guided dialog.
		newProjectGitPassword.addEventListener('input', function() {
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		newProjectForm.appendChild(gitContainer);
		//Path.
		const newProjectPath = this.viewManager.addFilePicker(newProjectForm, 'directory', language.noFolder, 'folder');
		//Listener for the guided dialog.
		newProjectPath.addEventListener('change', function() {
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		//Document preferences.
		const documentPreferencesContainer = document.createElement('div');
		documentPreferencesContainer.classList.add('document_preferences_container');
		const newProjectPreface = this.viewManager.addCheckbox(documentPreferencesContainer, 'preface', language.preface);
		newProjectPreface.setAttribute('tabindex', 5);
		newProjectPreface.setAttribute('disabled', '');
		//Listener for the guided dialog.
		newProjectPreface.addEventListener('change', function() {
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectChapters = this.viewManager.addNumberPicker(documentPreferencesContainer, 'chapters', language.chapters);
		newProjectChapters.setAttribute('tabindex', 6);
		newProjectChapters.setAttribute('disabled', '');
		//Listener for the guided dialog.
		newProjectChapters.addEventListener('input', function() {
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectAppendixChapters = this.viewManager.addNumberPicker(documentPreferencesContainer, 'appendix_chapters', language.appendixChapters);
		newProjectAppendixChapters.setAttribute('tabindex', 7);
		newProjectAppendixChapters.setAttribute('disabled', '');
		//Listener for the guided dialog.
		newProjectAppendixChapters.addEventListener('input', function() {
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectLanguage = this.viewManager.addDropDownMenu(documentPreferencesContainer, 'language', language.projectLanguage, ['en', 'de', 'fr']);
		newProjectLanguage.setAttribute('disabled', '');
		//Listener for the guided dialog.
		newProjectLanguage.addEventListener('change', function() {
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		newProjectForm.appendChild(documentPreferencesContainer);
		//Table of content.
		const tableOfContentsContainer = document.createElement('div');
		tableOfContentsContainer.classList.add('table_of_contents_container');
		const newProjectTableOfContents = this.viewManager.addCheckbox(tableOfContentsContainer, 'table_of_contents', language.tableOfContents);
		newProjectTableOfContents.setAttribute('tabindex', 8);
		newProjectTableOfContents.setAttribute('disabled', '');
		newProjectTableOfContents.addEventListener('change', function() {
			toogleDepthOfTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectDepthOfTableOfContents = this.viewManager.addNumberPicker(tableOfContentsContainer, 'depth_of_table_of_contents', language.tocDepth);
		newProjectDepthOfTableOfContents.setAttribute('tabindex', 9);
		newProjectDepthOfTableOfContents.setAttribute('disabled', '');
		newProjectForm.appendChild(tableOfContentsContainer);
		//Document metadata.
		const documentMetadataContainer = document.createElement('div');
		documentMetadataContainer.classList.add('document_metadata_container');
		//set sourceAuthor and creator
		const newProjectTitle = this.viewManager.addTextInput(documentMetadataContainer, 'title', language.title);
		newProjectTitle.setAttribute('tabindex', 10);
		newProjectTitle.setAttribute('disabled', '');
		newProjectTitle.addEventListener('input', function() {
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectAuthor = this.viewManager.addTextInput(documentMetadataContainer, 'author', language.author);
		newProjectAuthor.setAttribute('tabindex', 11);
		newProjectAuthor.setAttribute('disabled', '');
		newProjectAuthor.addEventListener('input', function() {
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectInstitution = this.viewManager.addTextInput(documentMetadataContainer, 'institution', language.institution);
		newProjectInstitution.setAttribute('tabindex', 12);
		newProjectInstitution.setAttribute('disabled', '');
		newProjectInstitution.addEventListener('input', function() {
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		newProjectForm.appendChild(documentMetadataContainer);
		//Submit button
		const newProjectSubmit = document.createElement('input');
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value', language.submit);
		newProjectSubmit.setAttribute('tabindex', 13);
		newProjectSubmit.setAttribute('disabled', '');
		//Initialize submit button.
		viewManager.disableButton(newProjectSubmit);

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);

		//Create a new project on submit.
		newProjectForm.addEventListener('submit', function() {
			createNewProject();
		});

		//Resets heights when form is resetted.
		newProjectForm.addEventListener('reset', function() {
			gitContainer.style.height = '0px';
			viewManager.disableInputs(gitContainer);
			documentPreferencesContainer.style.height = '0px';
			viewManager.disableInputs(documentPreferencesContainer);
			tableOfContentsContainer.style.height = '0px';
			viewManager.disableInputs(tableOfContentsContainer);
			newProjectDepthOfTableOfContents.parentElement.style.width = '0px';
			viewManager.disableInputs(newProjectDepthOfTableOfContents);
			documentMetadataContainer.style.height = '0px';
			viewManager.disableInputs(documentMetadataContainer);
			toogleSubmitButton();
		});

		function areGitValuesSet() {
			var allGitValuesAreSet = true;
			if(newProjectSource.value == '') {
				allGitValuesAreSet = false;
			};
			if(newProjectGitUser.value == '') {
				allGitValuesAreSet = false;
			};
			if(newProjectGitPassword.value == '') {
				allGitValuesAreSet = false;
			};
			return allGitValuesAreSet;
		};

		function isPathSet() {
			var pathIsSet = true;
			if(!newProjectPath.files[0]) {
				pathIsSet = false;
			};
			return pathIsSet;
		};

		function areDocumentPreferencesSet() {
			var documentPreferencesAreSet = true;
			if(newProjectSource.value == '') {
				allGitValuesAreSet = false;
			};
			if(newProjectGitUser.value == '') {
				allGitValuesAreSet = false;
			};
			if(newProjectGitPassword.value == '') {
				allGitValuesAreSet = false;
			};
			return documentPreferencesAreSet;
		};

		function areMetadatasSet() {
			var allMetadatasAreSet = true;
			if(newProjectTitle.value == '') {
				allMetadatasAreSet = false;
			};
			if(newProjectAuthor.value == '') {
				allMetadatasAreSet = false;
			};
			if(newProjectInstitution.value == '') {
				allMetadatasAreSet = false;
			};
			return allMetadatasAreSet;
		};

		function toogleGitContainer() {
			if(useGit.checked) {
				gitContainer.style.height = '82px';
				viewManager.enableInputs(gitContainer);
			} else {
				if(gitContainer.style.height != '0px') {
					gitContainer.style.height = '0px';
					viewManager.disableInputs(gitContainer);
					setTimeout(function() {
						viewManager.clearFormElements(gitContainer);
					}, 1000);
				};
			};
		};

		function toggleDocumentPreferences() {
			if (isPathSet() && (areGitValuesSet() || !useGit.checked)) {
				documentPreferencesContainer.style.height = '92px';
				viewManager.enableInputs(documentPreferencesContainer);
			} else {
				if(documentPreferencesContainer.style.height != '0px') {
					documentPreferencesContainer.style.height = '0px';
					viewManager.disableInputs(documentPreferencesContainer);
				};
			};
		};

		function toogleTableOfContents() {
			if(documentPreferencesContainer.style.height == '92px') {
				tableOfContentsContainer.style.height = '61px';
				viewManager.enableInputs(tableOfContentsContainer.getElementsByTagName('input')[0]);
			} else {
				if(tableOfContentsContainer.style.height != '0px') {
					tableOfContentsContainer.style.height = '0px';
					viewManager.disableInputs(tableOfContentsContainer.getElementsByTagName('input')[0]);
				};
			};
		};

		function toogleDepthOfTableOfContents() {
			if(newProjectTableOfContents.checked) {
				newProjectDepthOfTableOfContents.parentElement.style.width = '33%';
				viewManager.enableInputs(newProjectDepthOfTableOfContents);
			} else {
				if(newProjectDepthOfTableOfContents.parentElement.style.height != '0px') {
					newProjectDepthOfTableOfContents.parentElement.style.width = '0px';
					viewManager.disableInputs(newProjectDepthOfTableOfContents);
				};
			};
		};

		function toggleDocumentMetadata() {
			if(tableOfContentsContainer.style.height == '61px' && !(newProjectChapters.value == '' || newProjectChapters.value == '0')) {
				documentMetadataContainer.style.height = '82px';
				viewManager.enableInputs(documentMetadataContainer);
			} else {
				if(documentMetadataContainer.style.height != '0px') {
					documentMetadataContainer.style.height = '0px';
					viewManager.disableInputs(documentMetadataContainer);
				};
			};
		};

		function toogleSubmitButton() {
			if(documentMetadataContainer.style.height == '82px' && areMetadatasSet() ) {
				viewManager.enableButton(newProjectSubmit);
			} else {
				viewManager.disableButton(newProjectSubmit);
			};
		};

		//Function that is called on submit. It creates a new project.
		function createNewProject() {
			//Warnings for wrong inputs.
			if(!(documentMetadataContainer.style.height == '82px' && areMetadatasSet())) {
				if(useGit.checked) {
					if(newProjectSource.value == '') {
						atom.notifications.addWarning(language.newProjectDialogMissingGitValue, {detail : language.newProjectDialogMissingGitValueSource, dismissable : true});
					};
					if(newProjectGitUser.value == '') {
						atom.notifications.addWarning(language.newProjectDialogMissingGitValue, {detail : language.newProjectDialogMissingGitValueUsername, dismissable : true});
					};
					if(newProjectGitPassword.value == '') {
						atom.notifications.addWarning(language.newProjectDialogMissingGitValue, {detail : language.newProjectDialogMissingGitValuePassword, dismissable : true});
					};
				};
				if(!newProjectPath.files[0]) {
					atom.notifications.addWarning(language.newProjectDialogNoPath, {detail : language.newProjectDialogNoPathDetail, dismissable : true});
				};
				if(newProjectChapters.value == '' || newProjectChapters.value == '0') {
					atom.notifications.addWarning(language.newProjectDialogNoChapters, {detail : language.newProjectDialogNoChaptersDetail, dismissable : true});
				};
				if(newProjectTitle.value == '') {
					atom.notifications.addWarning(language.newProjectDialogMissingMetadataValue, {detail : language.newProjectDialogMissingMetadataValueTitle, dismissable : true});
				};
				if(newProjectAuthor.value == '') {
					atom.notifications.addWarning(language.newProjectDialogMissingMetadataValue, {detail : language.newProjectDialogMissingMetadataValueAuthor, dismissable : true});
				};
				if(newProjectInstitution.value == '') {
					atom.notifications.addWarning(language.newProjectDialogMissingMetadataValue, {detail : language.newProjectDialogMissingMetadataValueInstitution, dismissable : true});
				};
				return;
			};

			if(useGit.checked) {
				var source, gitUser, gitPassword;
				source = newProjectSource.value;
				gitUser = newProjectGitUser.value;
				gitPassword = newProjectGitPassword.value;

				atom.notifications.addWarning(language.noGitSupportJet, {detail : language.noGitSupportJetDetail, dismissable : true});

				//TODO Do some awesome git stuff.
				//error if source not exist.
				//login errors.
			};

			var path, chapterCount, appendixChapterCount, preface, projectLanguage, tableOfContents, title, sourceAuthor, institution;

			path = newProjectPath.files[0].path;
			chapterCount = newProjectChapters.value;

			if(newProjectAppendixChapters.value == '') {
				appendixChapterCount = 0;
			} else {
				appendixChapterCount = newProjectAppendixChapters.value;
			};

			preface = newProjectPreface.checked;
			projectLanguage = newProjectLanguage.value;
			tableOfContents = newProjectTableOfContents.checked;
			if(tableOfContents) {
				depthOfTableOfContents = newProjectDepthOfTableOfContents.value;
			} else {
				depthOfTableOfContents = 0;
			};
			title = newProjectTitle.value;
			sourceAuthor = newProjectAuthor.value;
			matuc.newProject(appendixChapterCount, chapterCount, preface, projectLanguage, path, tableOfContents, depthOfTableOfContents);
			if (tableOfContents) {
				matuc.generateTableOfContents(path);
			};

			viewManager.closeDialog();
		};
	}
}
