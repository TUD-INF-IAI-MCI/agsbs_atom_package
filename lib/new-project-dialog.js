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

		const useGit = this.viewManager.addCheckbox(newProjectForm, 'use_git', language.useGit);
		const gitContainer = document.createElement('div');
		gitContainer.classList.add('git_container');
		const newProjectSource = this.viewManager.addTextInput(gitContainer, 'source', language.source);
		const newProjectGitUser = this.viewManager.addTextInput(gitContainer, 'git_user', language.gitUser);
		const newProjectGitPassword = this.viewManager.addTextInput(gitContainer, 'git_password', language.gitPassword);
		newProjectGitPassword.setAttribute('type','password');

		newProjectForm.appendChild(gitContainer);

		const newProjectPath = this.viewManager.addFilePicker(newProjectForm, 'directory', language.noFolder);
		const newProjectPreface = this.viewManager.addCheckbox(newProjectForm, 'preface', language.preface);
		const newProjectChapters = this.viewManager.addNumberPicker(newProjectForm, 'chapters', language.chapters);
		const newProjectAppendixChapters = this.viewManager.addNumberPicker(newProjectForm, 'appendixChapters', language.appendixChapters);

		//set sourceAuthor and creator
		const newProjectAuthor = this.viewManager.addTextInput(newProjectForm, 'author', language.author);
		const newProjectTitle = this.viewManager.addTextInput(newProjectForm, 'title', language.title);
		const newProjectInstitution = this.viewManager.addTextInput(newProjectForm, 'institution', language.institution);
		const newProjectLanguage = this.viewManager.addDropDownMenu(newProjectForm, 'language', language.projectLanguage, ['en', 'de', 'fr']);
		const newProjectTableOfContents = this.viewManager.addCheckbox(newProjectForm, 'tableOfContents', language.tableOfContents);
		const newProjectDepthOfTableOfContents = this.viewManager.addNumberPicker(newProjectForm, 'depthOfTableOfContents', language.tocDepth);

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);

		//listeners to animate guided dialog.

		useGit.addEventListener('change', function() {
			if(useGit.checked) {
				gitContainer.style.height = '82px';
			} else {
				gitContainer.style.height = '0px';
				viewManager.clearFormElements(gitContainer);
			}
		});



		//Listener that catches form-inputs on submit.
		newProjectForm.onsubmit = function(event) {
			var path, chapterCount, appendixChapterCount, preface, language,
				tableOfContents, depthOfTableOfContents, sourceAuthor, title;
			//event.preventDefault();

			if(useGit.checked) {
				var source, gitUser, gitPassword;
				source = newProjectSource.value;
				gitUser = newProjectGitUser.value;
				gitPassword = newProjectGitPassword.value;

				//TODO Do some awesome git stuff.
				//error if source not exist.
				//login errors.
			}
			//path = newProjectPath.files[0].path;
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
		}
	}
}
