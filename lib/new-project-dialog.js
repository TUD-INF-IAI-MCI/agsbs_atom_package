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
		const gitContainer = document.createElement('div');
		gitContainer.classList.add('git_container');
		//listener for the guided dialog.
		useGit.addEventListener('change', function() {
			toogleGitContainer();
			toggleDocumentPreferences();
		});
		const newProjectSource = this.viewManager.addTextInput(gitContainer, 'source', language.source);
		//listener for the guided dialog.
		newProjectSource.addEventListener('input', function() {
			toggleDocumentPreferences();
		});
		const newProjectGitUser = this.viewManager.addTextInput(gitContainer, 'git_user', language.gitUser);
		//listener for the guided dialog.
		newProjectGitUser.addEventListener('input', function() {
			toggleDocumentPreferences();
		});
		const newProjectGitPassword = this.viewManager.addTextInput(gitContainer, 'git_password', language.gitPassword);
		newProjectGitPassword.setAttribute('type','password');
		//listener for the guided dialog.
		newProjectGitPassword.addEventListener('input', function() {
			toggleDocumentPreferences();
		});
		newProjectForm.appendChild(gitContainer);
		//Path.
		const newProjectPath = this.viewManager.addFilePicker(newProjectForm, 'directory', language.noFolder);
		//listener for the guided dialog.
		newProjectPath.addEventListener('change', function() {
			toggleDocumentPreferences();
		});
		//Document preferences.
		const documentPreferencesContainer = document.createElement('div');
		documentPreferencesContainer.classList.add('document_preferences_container');
		const newProjectPreface = this.viewManager.addCheckbox(documentPreferencesContainer, 'preface', language.preface);
		const newProjectChapters = this.viewManager.addNumberPicker(documentPreferencesContainer, 'chapters', language.chapters);
		const newProjectAppendixChapters = this.viewManager.addNumberPicker(documentPreferencesContainer, 'appendix_chapters', language.appendixChapters);
		const newProjectLanguage = this.viewManager.addDropDownMenu(documentPreferencesContainer, 'language', language.projectLanguage, ['en', 'de', 'fr']);
		newProjectForm.appendChild(documentPreferencesContainer);
		//Table of content.
		const tableOfContentsContainer = document.createElement('div');
		tableOfContentsContainer.classList.add('table_of_contents_container');
		const newProjectTableOfContents = this.viewManager.addCheckbox(tableOfContentsContainer, 'table_of_contents', language.tableOfContents);
		const newProjectDepthOfTableOfContents = this.viewManager.addNumberPicker(tableOfContentsContainer, 'depth_of_table_of_contents', language.tocDepth);
		newProjectForm.appendChild(tableOfContentsContainer);
		//Document metadata.
		//set sourceAuthor and creator
		const newProjectAuthor = this.viewManager.addTextInput(newProjectForm, 'author', language.author);
		const newProjectTitle = this.viewManager.addTextInput(newProjectForm, 'title', language.title);
		const newProjectInstitution = this.viewManager.addTextInput(newProjectForm, 'institution', language.institution);

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);

		//Resets heights when form is resetted.
		newProjectForm.addEventListener('reset', function() {
			gitContainer.style.height = '0px';
			documentPreferencesContainer.style.height = '0px';
		});

		//Listener that catches form-inputs on submit.
		newProjectForm.onsubmit = function(event) {
			var chapterCount, appendixChapterCount, preface, language,
				tableOfContents, depthOfTableOfContents, sourceAuthor, title;

			event.preventDefault();

			if(useGit.checked) {
				var source, gitUser, gitPassword;
				source = newProjectSource.value;
				gitUser = newProjectGitUser.value;
				gitPassword = newProjectGitPassword.value;

				//TODO Do some awesome git stuff.
				//error if source not exist.
				//login errors.
			};

			if (newProjectPath.files[0]) {
				var path;
				path = newProjectPath.files[0].path;
			} else {
				atom.notifications.addWarning(language.newProjectDialogNoPath, {detail : language.newProjectDialogNoPathDetail, dismissable : true});
			};

			//chapterCount = newProjectChapters.value;
			//appendixChapterCount = newProjectAppendixChapters.value;
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

		function toogleGitContainer() {
			if(useGit.checked) {
				gitContainer.style.height = '82px';
			} else {
				gitContainer.style.height = '0px';
				setTimeout(function() {
					viewManager.clearFormElements(gitContainer);
				}, 1000);
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
	}
}
