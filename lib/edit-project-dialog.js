'use babel';
const iPath = require('path');
import ViewManager from './view-manager';
import DialogView from './dialog-view';
import Matuc from './matuc-commands';

export default class EditProjectDialog extends DialogView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const matuc = agsbs.matuc;

		//get this.element and its child dialogContent from superclass
		super(serializedState);

		this.dialogHeadline.innerHTML = language.editProject;

		const editProjectForm = document.createElement('form');
		editProjectForm.setAttribute('method','post');

		var editor = atom.workspace.getActivePaneItem();
		var file = editor.buffer.file.path;
		var path = iPath.dirname(file);
		var promise = matuc.showConfig(path);
		var alternatePrefixInput,
			sourceAuthorInput,
			institutionInput,
			titleInput,
			projectLanguageInput,
			sourceInput,
			semYearInput,
			tocDepthInput,
			workingGroupInput;

		// this.outputFormatDropdown = this.viewManager.addDropDownMenu(editProjectForm, 'output_format', language.outputFormat, ['html', 'was', 'sonst?']);

		promise.then(function(data) {
			//alternatePrefixInput = viewManager.addCheckbox(editProjectForm, 'alternate_prefix', data.appendixPrefix);
			sourceAuthorInput = viewManager.addTextInput(editProjectForm, 'author', data.sourceAuthor, language.author);
			institutionInput = viewManager.addTextInput(editProjectForm, 'institution', data.institution);
			titleInput = viewManager.addTextInput(editProjectForm, 'title', data.lecturetitle);
			projectLanguageInput = viewManager.addDropDownMenu(editProjectForm, 'project_language', data.language, ['de', 'en', 'fr']);
			sourceInput = viewManager.addTextInput(editProjectForm, 'source', data.source);
			semYearInput = viewManager.addTextInput(editProjectForm, 'sem_year', data.semesterofedit);
			tocDepthInput = viewManager.addNumberPicker(editProjectForm, 'toc_depth', data.tocDepth);
			workingGroupInput = viewManager.addTextInput(editProjectForm, 'working_group', data.workinggroup);

			const editProjectSubmit = document.createElement('input');
			editProjectSubmit.setAttribute('type', 'submit');
			editProjectSubmit.setAttribute('value',language.edit);
			editProjectForm.appendChild(editProjectSubmit);
		});

		this.dialogContent.appendChild(editProjectForm);

		editProjectForm.addEventListener('submit', function() {
			save();
		});

		function save() {
			const alternatePrefix = alternatePrefixInput.value;
			const sourceAuthor = sourceAuthorInput.value;
			const institution = institutionInput.value;
			const title = titleInput.value;
			const projectLanguage = projectLanguageInput.value;
			const source = sourceInput.value;
			const semYear = semYearInput.value;
			const tocDepth = tocDepthInput.value;
			const workingGroup = workingGroupInput.value;
			var promiseUpdate = matuc.updateMetaData(alternatePrefix, null, sourceAuthor, institution,
									title, projectLanguage, source, semYear, tocDepth, workingGroup, path);
			promise.catch(function(error) {
				atom.notifications.addError(language.somethingWentWrongDuringSavingProjectMetadata, {
					detail : error,
					dismissable : true
				});
			});
			atom.notifications.addSuccess(language.changesFromEditProjectDialogSaved);
			viewManager.closeDialog();
		}
	}
}
