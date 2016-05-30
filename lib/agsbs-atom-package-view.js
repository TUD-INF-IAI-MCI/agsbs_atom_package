'use babel';

var $;
$ = require('jquery');

export default class AgsbsAtomPackageView {

	//create the main dialog
	constructor(serializedState) {
		this.element = document.createElement('div');
		this.element.classList.add('dialog_container');

		const closeButton = document.createElement('button');
		const closeLabel = document.createTextNode('x');
		closeButton.appendChild(closeLabel);
		closeButton.onclick = function() {
			atom.commands.dispatch(closeButton, 'agsbs-atom-package:toggleMainDialog');
		};
		this.element.appendChild(closeButton);

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
