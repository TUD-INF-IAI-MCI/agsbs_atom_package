'use babel';

var $;
$ = require('jquery');

export default class AgsbsAtomPackageView {

	constructor(serializedState) {
		// Create root element
		this.element = document.createElement('div');
		this.element.classList.add('secondary_navigation_container');

		// Create message element
		const message = document.createElement('div');
		message.textContent = 'Hello World!';
		message.classList.add('message');
		this.element.appendChild(message);
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
