'use babel';

var $;
$ = require('jquery');

export default class TestshiceView {

	constructor(serializedState) {
		// Create root element
		this.element = document.createElement('div');
		this.element.classList.add('dialog_container');

		const closeButton = document.createElement('button');
		const closeLabel = document.createTextNode('x');
		closeButton.appendChild(closeLabel);
		this.element.appendChild(closeButton);

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
