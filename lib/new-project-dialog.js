'use babel';

import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		const matuc = new Matuc();

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		const newProjectGitPath = this.viewManager.addTextInput(newProjectForm, 'git', 'path to git repository');
		const newProjectPath = this.viewManager.addFileInput(newProjectForm, 'directory', 'directory');
		const newProjectPreface = this.viewManager.addCheckbox(newProjectForm, 'preface', 'preface');
		const newProjectChapters = this.viewManager.addNumberPicker(newProjectForm, 'chapters', 'chapters');
		const newProjectAppendixChapters = this.viewManager.addNumberPicker(newProjectForm, 'appendixChapters', 'appendix chapters');
		//set sourceAuthor and creator
		const newProjectSourceAuthor = this.viewManager.addTextInput(newProjectForm, 'author', 'author');
		const newProjectTitle = this.viewManager.addTextInput(newProjectForm, 'title', 'title');
		const newProjectSource = this.viewManager.addTextInput(newProjectForm, 'source', 'source');
		const newProjectCreator = this.viewManager.addTextInput(newProjectForm, 'publisher', 'publisher');
		const newProjectLanguage = this.viewManager.addSelect(newProjectForm, 'language', 'language', ['en', 'de', 'fr']);
		const newProjectTableOfContents = this.viewManager.addCheckbox(newProjectForm, 'tableOfContents', 'table of contents');
		const newProjectDepthOfTableOfContents = this.viewManager.addNumberPicker(newProjectForm, 'depthOfTableOfContents', 'depth of table of contents');

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
			sourceAuthor = newProjectSourceAuthor.value;
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
