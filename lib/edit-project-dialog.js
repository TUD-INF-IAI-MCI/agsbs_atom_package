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
		const helper = agsbs.helper;
		if (!helper.isBufferSelected(true)) {
			return;
		}
		var file = editor.buffer.file.path;
		var path = iPath.dirname(file);
		var promise = matuc.showConfig(path);
		var alternatePrefixInput,
			editorInput,
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
			alternatePrefixInput = viewManager.addCheckbox(editProjectForm, 'alternate_prefix', language.appendixPrefix);
			editorInput = viewManager.addTextInput(editProjectForm, 'edit_author', data.editor, language.author);
			sourceAuthorInput = viewManager.addTextInput(editProjectForm, 'edit_source_author', data.sourceAuthor, language.sourceAuthor);
			institutionInput = viewManager.addTextInput(editProjectForm, 'edit_institution', data.institution, language.institution);
			titleInput = viewManager.addTextInput(editProjectForm, 'edit_title', data.lecturetitle, language.title);
			var container = document.createElement('div');
			container.classList.add('edit_stuff_container');
			projectLanguageInput = viewManager.addDropDownMenu(container, 'edit_project_language', language.languageTitle, ['de', 'en', 'fr']);
			projectLanguageInput.value = data.language;
			tocDepthInput = viewManager.addNumberPicker(container, 'edit_toc_depth', language.toc_Depth);
			console.log(tocDepthInput);
			tocDepthInput.value = data.tocDepth;
			editProjectForm.appendChild(container);
			sourceInput = viewManager.addTextInput(editProjectForm, 'edit_source', data.source, language.source);
			semYearInput = viewManager.addTextInput(editProjectForm, 'edit_sem_year', data.semesterofedit, language.semYear);
			workingGroupInput = viewManager.addTextInput(editProjectForm, 'edit_working_group', data.workinggroup, language.workingGroup);

			const editProjectSubmit = document.createElement('input');
			editProjectSubmit.setAttribute('type', 'submit');
			editProjectSubmit.setAttribute('value',language.edit);
			editProjectForm.appendChild(editProjectSubmit);
		});

		this.dialogContent.parentNode.style.width = '500px';
		this.dialogContent.appendChild(editProjectForm);

		editProjectForm.addEventListener('submit', function() {
			save();
		});

		function save() {
			const alternatePrefix = alternatePrefixInput.value;
			const editor = editorInput.value;
			const institution = institutionInput.value;
			const title = titleInput.value;
			const projectLanguage = projectLanguageInput.value;
			const source = sourceInput.value;
			const sourceAuthor = sourceAuthorInput.value;
			const semYear = semYearInput.value;
			const tocDepth = tocDepthInput.value;
			const workingGroup = workingGroupInput.value;
			var promiseUpdate = matuc.updateMetaData(alternatePrefix, null, editor, institution,
									title, projectLanguage, source, sourceAuthor, semYear, tocDepth, workingGroup, path);
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
