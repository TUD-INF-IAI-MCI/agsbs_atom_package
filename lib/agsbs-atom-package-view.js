'use babel';

var $;
$ = require('jquery');

export default class TestshiceView {


	constructor(serializedState) {
		// Create root element
		this.element = document.createElement('div');
		this.element.classList.add('agsbs-atom-package');

		// Create message element
		const message = document.createElement('div');
		message.textContent = 'Hello World!';
		message.classList.add('message');
		this.element.appendChild(message);

		//var testshice = '<p class = "testshice"></p>';
		//$('.top').add(testshice).css({ "background-color" : "red", "width" : "100px", "height" : "100px"} );

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
