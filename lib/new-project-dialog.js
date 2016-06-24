'use babel';

import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		//const newProjectGitPath = this.viewManager.addTextInput(newProjectForm, 'git', 'path to git repository');
		const newProjectPath = this.viewManager.addFilePicker(newProjectForm, 'directory', language.noFolder);
		const newProjectPreface = this.viewManager.addCheckbox(newProjectForm, 'preface', language.preface);
		const newProjectChapters = this.viewManager.addNumberPicker(newProjectForm, 'chapters', language.chapters);
		const newProjectAppendixChapters = this.viewManager.addNumberPicker(newProjectForm, 'appendixChapters', language.appendixChapters);

		//set sourceAuthor and creator
		const newProjectAuthor = this.viewManager.addTextInput(newProjectForm, 'author', language.author);
		const newProjectTitle = this.viewManager.addTextInput(newProjectForm, 'title', language.title);
		const newProjectSource = this.viewManager.addTextInput(newProjectForm, 'source', language.source);
		const newProjectInstitution = this.viewManager.addTextInput(newProjectForm, 'institution', language.institution);
		const newProjectLanguage = this.viewManager.addDropDownMenu(newProjectForm, 'language', language.projectLanguage, ['en', 'de', 'fr']);
		const newProjectTableOfContents = this.viewManager.addCheckbox(newProjectForm, 'tableOfContents', language.tableOfContents);
		const newProjectDepthOfTableOfContents = this.viewManager.addNumberPicker(newProjectForm, 'depthOfTableOfContents', language.tocDepth);

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
			};
			matuc.updateMetaData(depthOfTableOfContents, sourceAuthor, title, source);
		}
	}
}
