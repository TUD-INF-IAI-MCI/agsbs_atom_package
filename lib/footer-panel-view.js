'use babel';

var $ = require('jquery');

import ViewManager from './view-functions';
import Editor from './editor-functions';

export default class AgsbsAtomPackageView {

	viewFunctions = null;
	editor = null;

	constructor(serializedState) {

		this.editor = new Editor();

		this.viewFunctions = new ViewFunctions();
		//create root element
		this.element = document.createElement('div');
		this.element.classList.add('footer_panel_container');

		this.viewFunctions.addButton(this.element, 'heading1', 'h1', 'editor-functions:testFunction1');
		this.viewFunctions.addButton(this.element, 'blockqoute', 'fa-quote-right', 'editor-functions:testFunction1');
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
