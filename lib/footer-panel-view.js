'use babel';

import ViewManager from './view-manager';
import EditorFunctions from './editor-functions';

export default class FooterPanelView {

	viewManager = null;
	editor = null;

	constructor(serializedState) {

		this.editorFunctions = new EditorFunctions();

		this.viewManager = new ViewManager();
		//create root element
		this.element = document.createElement('div');
		this.element.classList.add('footer_panel_container');

		this.viewManager.addButton(this.element, 'heading1', 'h1', 'editor-functions:testFunction1');
		this.viewManager.addButton(this.element, 'blockqoute', 'fa-quote-right', 'editor-functions:testFunction1');
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
