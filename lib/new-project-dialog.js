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


		this.viewManager.addTextInput(newProjectForm, 'git', 'path to git repository');

		this.viewManager.addTextInput(newProjectForm, 'directory', 'directory');
		this.viewManager.addCheckbox(newProjectForm, 'preface', 'preface');


		// <input type="file" id="ctrl" webkitdirectory directory multiple/>
		const newProjectPath = document.createElement('input');
		newProjectPath.setAttribute('id','project_path_input');
		newProjectPath.setAttribute('type','file');
		newProjectPath.setAttribute('name','project_path');
		newProjectPath.setAttribute('placeholder','project path');
		newProjectPath.setAttribute('webkitdirectory','');
		newProjectPath.setAttribute('directory','');

		const newProjectSubmit = document.createElement("input");
		newProjectSubmit.setAttribute('type', 'submit');
		newProjectSubmit.setAttribute('value','Submit');

		newProjectForm.appendChild(newProjectSubmit);
		newProjectForm.appendChild(newProjectPath);
		this.dialogContent.appendChild(newProjectForm);

		newProjectForm.onsubmit = function(e) {
			var path;
			e.preventDefault();
			console.log(newProjectPath);
			path = newProjectPath.files[0].path;
			matuc.newProject(0, 3, 'DE', path);
		}
	}
}
