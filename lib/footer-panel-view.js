'use babel';

//creates DOM elements for the footer panel
export default class FooterPanelView {

	test() {
		console.log('lässig');
	}

	constructor(serializedState) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		const viewManager = agsbs.viewManager;
		const editor = agsbs.editorFunctions;
		const matuc = agsbs.matuc;

		//create root element
		this.element = document.createElement('div');
		this.element.classList.add('footer_panel_container');

		// viewManager.addButton(this.element, 'h1', language.headline1, 'h1', this.test, undefined, 'strg + 1');
		viewManager.addButton(this.element, 'bold', language.bold, 'fa-bold', editor.setBold, undefined, 'alt + shift + s');
		viewManager.addButton(this.element, 'italic', language.italic, 'fa-italic', editor.setItalics, undefined, 'alt + shift + i');
		viewManager.addButton(this.element, 'strikethrough', language.italic, 'fa-strikethrough', editor.strikethrough, undefined, 'alt + shift + i');
		viewManager.addButton(this.element, 'headline1', language.headline1, 'fa-header', editor.firstLevelHeadline, undefined, 'alt + shift + 1');
		//viewManager.addButton(this.element, 'h2', 'h2');
		//viewManager.addButton(this.element, 'h3', 'h3');
		//viewManager.addButton(this.element, 'h4', 'h4');
		//viewManager.addButton(this.element, 'h5', 'h5');
		//viewManager.addButton(this.element, 'h6', 'h6');
		//viewManager.addButton(this.element, 'blockqoute', 'fa-quote-right');
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
