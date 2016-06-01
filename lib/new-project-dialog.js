'use babel';

var $ = require('jquery');
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class NewProjectDialog extends DialogView {

	constructor(serializedState) {
		const matuc = new Matuc();
		super(serializedState);
		//get this.element and its child dialogContent from superclass

		const newProjectForm = document.createElement('form');
		// dialogContent.classList.add('dialog_content');
		newProjectForm.setAttribute('method','post');

		const newProjectName = document.createElement('input');
		newProjectName.setAttribute('id','project_name_input');
		newProjectName.setAttribute('type','text');
		newProjectName.setAttribute('name','project_name');
		newProjectName.setAttribute('placeholder','project name');

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
		newProjectSubmit.onclick = function() {
			var name = $('#project_path_input').value;
			matuc.newProject(0, 3, 'DE', name);
		}

		newProjectForm.appendChild(newProjectName);
		newProjectForm.appendChild(newProjectSubmit);
		newProjectForm.appendChild(newProjectPath);
		this.dialogContent.appendChild(newProjectForm);
	}
}