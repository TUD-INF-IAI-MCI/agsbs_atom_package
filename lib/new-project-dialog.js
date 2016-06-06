'use babel';

import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		const matuc = new Matuc();
		super(serializedState);
		//get this.element and its child dialogContent from superclass

		const newProjectForm = document.createElement('form');
		newProjectForm.setAttribute('method','post');

		const newProjectGitPath = this.viewManager.addTextInput(newProjectForm, 'git', 'path to git repository');
		const newProjectPath = this.viewManager.addFileInput(newProjectForm, 'directory', 'directory');
		const newProjectPreface = this.viewManager.addCheckbox(newProjectForm, 'preface', 'preface');
		const newProjectChapters = this.viewManager.addNumberPicker(newProjectForm, 'chapters', 'chapters');
		const newProjectAppendixChapters = this.viewManager.addNumberPicker(newProjectForm, 'appendixChapters', 'appendix chapters');
		const newProjectSourceAuthor = this.viewManager.addTextInput(newProjectForm, 'sourceAuthor', 'source author');
		const newProjectTitle = this.viewManager.addTextInput(newProjectForm, 'title', 'title');
		const newProjectSource = this.viewManager.addTextInput(newProjectForm, 'source', 'source');
		const newProjectCreator = this.viewManager.addTextInput(newProjectForm, 'creator', 'creator');
		const newProjectLanguage = this.viewManager.addSelect(newProjectForm, 'language', 'language', ['en', 'de']);

		//language

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		this.dialogContent.appendChild(newProjectForm);

		newProjectForm.onsubmit = function(event) {
			var path;
			event.preventDefault();
			path = newProjectPath.files[0].path;
			matuc.newProject(0, 3, 'DE', path);
		}
	}
}
