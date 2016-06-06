'use babel';

import ViewManager from './view-manager';

import Editor from './editor-functions';

export default class FooterPanelView {

	viewManager = null;
	editor = null;

	constructor(serializedState) {

		this.editor = new Editor();

		this.viewManager = new ViewManager();

		//create root element
		this.element = document.createElement('div');
		this.element.classList.add('footer_panel_container');


		this.viewManager.addButton(this.element, 'h1', 'h1', 'editor-functions:testFunction1');
		this.viewManager.addButton(this.element, 'h2', 'h2', 'editor-functions:testFunction1');
		this.viewManager.addButton(this.element, 'h3', 'h3', 'editor-functions:testFunction1');
		this.viewManager.addButton(this.element, 'h4', 'h4', 'editor-functions:testFunction1');
		this.viewManager.addButton(this.element, 'h5', 'h5', 'editor-functions:testFunction1');
		this.viewManager.addButton(this.element, 'h6', 'h6', 'editor-functions:testFunction1');
		this.viewManager.addButton(this.element, 'blockqoute', 'fa-quote-right', 'editor-functions:testFunction2');
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
