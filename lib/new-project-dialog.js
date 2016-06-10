'use babel';

import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		var viewManager = new ViewManager();
		const matuc = new Matuc();

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		//const newProjectGitPath = this.viewManager.addTextInput(newProjectForm, 'git', 'path to git repository');
		const newProjectPath = viewManager.addFileInput(newProjectForm, 'directory', this.language.noFolder);
		const newProjectPreface = viewManager.addCheckbox(newProjectForm, 'preface', this.language.preface);
		const newProjectChapters = viewManager.addNumberPicker(newProjectForm, 'chapters', 'chapters');
		const newProjectAppendixChapters = viewManager.addNumberPicker(newProjectForm, 'appendixChapters', 'appendix chapters');

		//set sourceAuthor and creator
		const newProjectAuthor = viewManager.addTextInput(newProjectForm, 'author', 'author');
		const newProjectTitle = viewManager.addTextInput(newProjectForm, 'title', 'title');
		const newProjectSource = viewManager.addTextInput(newProjectForm, 'source', 'source');
		const newProjectInstitution = viewManager.addTextInput(newProjectForm, 'institution', 'institution');
		const newProjectLanguage = viewManager.addDropDownMenu(newProjectForm, 'language', 'language', ['en', 'de', 'fr']);
		const newProjectTableOfContents = viewManager.addCheckbox(newProjectForm, 'tableOfContents', 'table of contents');
		const newProjectDepthOfTableOfContents = viewManager.addNumberPicker(newProjectForm, 'depthOfTableOfContents', 'depth of table of contents');

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);

		newProjectForm.onsubmit = function(event) {
			var path, chapterCount, appendixChapterCount, preface, language,
				tableOfContents, depthOfTableOfContents, sourceAuthor, title, source;
			event.preventDefault();
			path = newProjectPath.files[0].path;
			chapterCount = newProjectChapters.value;
			appendixChapterCount = newProjectAppendixChapters.value;
			preface = newProjectPreface.checked;
			language = newProjectLanguage.value;
			tableOfContents = newProjectTableOfContents.checked;
			depthOfTableOfContents = newProjectDepthOfTableOfContents.value;
			sourceAuthor = newProjectAuthor.value;
			title = newProjectTitle.value;
			source = newProjectSource.value;
			matuc.newProject(appendixChapterCount, chapterCount, preface, language, path, tableOfContents, depthOfTableOfContents);
			if (tableOfContents) {
				matuc.generateTableOfContents(path);
			}
			matuc.updateMetaData(depthOfTableOfContents, sourceAuthor, title, source);
		}
	}
}
