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
		//listener for the guided dialog.
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
		//listener for the guided dialog.
		newProjectSource.addEventListener('input', function() {
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectGitUser = this.viewManager.addTextInput(gitContainer, 'git_user', language.gitUser);
		//listener for the guided dialog.
		newProjectGitUser.addEventListener('input', function() {
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectGitPassword = this.viewManager.addTextInput(gitContainer, 'git_password', language.gitPassword);
		newProjectGitPassword.setAttribute('type','password');
		//listener for the guided dialog.
		newProjectGitPassword.addEventListener('input', function() {
			toggleDocumentPreferences();
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		newProjectForm.appendChild(gitContainer);
		//Path.
		const newProjectPath = this.viewManager.addFilePicker(newProjectForm, 'directory', language.noFolder);
		//listener for the guided dialog.
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
		//listener for the guided dialog.
		newProjectPreface.addEventListener('change', function() {
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectChapters = this.viewManager.addNumberPicker(documentPreferencesContainer, 'chapters', language.chapters);
		//listener for the guided dialog.
		newProjectChapters.addEventListener('input', function() {
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectAppendixChapters = this.viewManager.addNumberPicker(documentPreferencesContainer, 'appendix_chapters', language.appendixChapters);
		//listener for the guided dialog.
		newProjectAppendixChapters.addEventListener('input', function() {
			toogleTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectLanguage = this.viewManager.addDropDownMenu(documentPreferencesContainer, 'language', language.projectLanguage, ['en', 'de', 'fr']);
		//listener for the guided dialog.
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
		newProjectTableOfContents.addEventListener('change', function() {
			toogleDepthOfTableOfContents();
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectDepthOfTableOfContents = this.viewManager.addNumberPicker(tableOfContentsContainer, 'depth_of_table_of_contents', language.tocDepth);
		newProjectForm.appendChild(tableOfContentsContainer);
		//Document metadata.
		const documentMetadataContainer = document.createElement('div');
		documentMetadataContainer.classList.add('document_metadata_container');
		//set sourceAuthor and creator
		const newProjectTitle = this.viewManager.addTextInput(documentMetadataContainer, 'title', language.title);
		newProjectTitle.addEventListener('input', function() {
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectAuthor = this.viewManager.addTextInput(documentMetadataContainer, 'author', language.author);
		newProjectAuthor.addEventListener('input', function() {
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		const newProjectInstitution = this.viewManager.addTextInput(documentMetadataContainer, 'institution', language.institution);
		newProjectInstitution.addEventListener('input', function() {
			toggleDocumentMetadata();
			toogleSubmitButton();
		});
		newProjectForm.appendChild(documentMetadataContainer);
		//Submit button
		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value', language.submit);
		//Initialize submit button.
		toogleSubmitButton();

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);

		//Create a new project on submit.
		newProjectForm.addEventListener('submit', function() {
			createNewProject();
		});

		//Resets heights when form is resetted.
		newProjectForm.addEventListener('reset', function() {
			gitContainer.style.height = '0px';
			documentPreferencesContainer.style.height = '0px';
			tableOfContentsContainer.style.height = '0px';
			newProjectDepthOfTableOfContents.parentElement.style.width = '0px';
			documentMetadataContainer.style.height = '0px';
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
			} else {
				if(gitContainer.style.height != '0px') {
					gitContainer.style.height = '0px';
					setTimeout(function() {
						viewManager.clearFormElements(gitContainer);
					}, 1000);
				};
			};
		};

		function toggleDocumentPreferences() {
			if (isPathSet() && (areGitValuesSet() || !useGit.checked)) {
				documentPreferencesContainer.style.height = '92px';
			} else {
				if(documentPreferencesContainer.style.height != '0px') {
					documentPreferencesContainer.style.height = '0px';
				};
			};
		};

		function toogleTableOfContents() {
			if(documentPreferencesContainer.style.height == '92px') {
				tableOfContentsContainer.style.height = '61px';
			} else {
				if(tableOfContentsContainer.style.height != '0px') {
					tableOfContentsContainer.style.height = '0px';
				};
			};
		};

		function toogleDepthOfTableOfContents() {
			if(newProjectTableOfContents.checked) {
				newProjectDepthOfTableOfContents.parentElement.style.width = '33%';
			} else {
				if(newProjectDepthOfTableOfContents.parentElement.style.height != '0px') {
					newProjectDepthOfTableOfContents.parentElement.style.width = '0px';
				};
			};
		};

		function toggleDocumentMetadata() {
			console.log(newProjectChapters.value);
			if(tableOfContentsContainer.style.height == '61px' && !(newProjectChapters.value == '' || newProjectChapters.value == '0')) {
				documentMetadataContainer.style.height = '82px';
			} else {
				if(documentMetadataContainer.style.height != '0px') {
					documentMetadataContainer.style.height = '0px';
				};
			};
		};

		function toogleSubmitButton() {
			if(documentMetadataContainer.style.height == '82px' && areMetadatasSet() ) {
				newProjectSubmit.removeAttribute('style');
			} else {
				newProjectSubmit.style.color = '#555555'; //@greyed
				newProjectSubmit.style.boxShadow = 'none';
				newProjectSubmit.style.cursor = 'default';
			};
		};

		//Function that is called on submit. It creates a new project.
		function createNewProject() {

			if(!(documentMetadataContainer.style.height == '82px' && areMetadatasSet())) {
				console.log('submit button is greyed');
				return;
			};

			var chapterCount, appendixChapterCount, preface, language,
				tableOfContents, depthOfTableOfContents, sourceAuthor, title;

				console.log(language);

			if(useGit.checked) {
				var source, gitUser, gitPassword;
				source = newProjectSource.value;
				gitUser = newProjectGitUser.value;
				gitPassword = newProjectGitPassword.value;

				//atom.notifications.addWarning(language.noGitSupportJet, {detail : language.noGitSupportJetDetail, dismissable : true});

				//TODO Do some awesome git stuff.
				//error if source not exist.
				//login errors.
			};

			if (newProjectPath.files[0]) {
				var path;
				path = newProjectPath.files[0].path;
			} else {
				//atom.notifications.addWarning(language.newProjectDialogNoPath, {detail : language.newProjectDialogNoPathDetail, dismissable : true});
				return;
			};

			if(true) {
				console.log('not breaked');
			};

			//chapterCount = newProjectChapters.value;
			//appendixChapterCount = newProjectAppendixChapters.value; set tihs to 0 when its empty
			//preface = newProjectPreface.checked;
			//language = newProjectLanguage.value;
			//tableOfContents = newProjectTableOfContents.checked;
			//depthOfTableOfContents = newProjectDepthOfTableOfContents.value;
			//sourceAuthor = newProjectAuthor.value;
			//title = newProjectTitle.value;
			//matuc.newProject(appendixChapterCount, chapterCount, preface, language, path, tableOfContents, depthOfTableOfContents);
			//if (tableOfContents) {
			//	matuc.generateTableOfContents(path);
			//};
			//matuc.updateMetaData(depthOfTableOfContents, sourceAuthor, title, source);
		};
	}
}
