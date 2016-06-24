'use babel';

//creates DOM elements for the main navigation
export default class MainNavigationView {

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;
		const matuc = agsbs.matuc;

		// create root element
		this.element = document.createElement('div');
		this.element.classList.add('main_navigation_container');

		// create buttons
		viewManager.addButton(this.element, 'new_project', language.newProject, 'new_project', viewManager.toggleDialog, 0);
		viewManager.addButton(this.element, 'edit_project', language.editProject, 'fa-pencil', viewManager.toggleDialog, 1);

		viewManager.addButton(this.element, 'html_preview', language.preview, 'fa-eye', viewManager.toggleHtmlPreview);
		viewManager.addButton(this.element, 'undo', language.undo, 'fa-undo', editor.undo);
		viewManager.addButton(this.element, 'redo', language.redo, 'fa-repeat', editor.redo);

		//langauge select
		var setLanguage = atom.config.get('agsbs-atom-package.language');
		switch(setLanguage) {
			case 'english':
				var active = viewManager.addButton(this.element, 'en', language.english, 'en');
				viewManager.addButton(this.element, 'de', language.german, 'de_grey', viewManager.setLanguageToGerman);
				break;
				case 'german':
				viewManager.addButton(this.element, 'en', language.english, 'en_grey', viewManager.setLanguageToEnglish);
				var active = viewManager.addButton(this.element, 'de', language.german, 'de');
				break;
			};
			active.classList.add('active');
		}

	// Returns an object that can be retrieved when package is activated
	serialize() {}

	// Tear down any state and detach
	destroy() {
		this.element.remove();
	}

	getElement() {
		return this.element;
	}
}
