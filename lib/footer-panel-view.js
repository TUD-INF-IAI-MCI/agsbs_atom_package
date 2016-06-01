'use babel';

var $ = require('jquery');

export default class AgsbsAtomPackageView {

	constructor(serializedState) {
		//create root element
		this.element = document.createElement('div');
		this.element.classList.add('footer_panel_container');

		//const Button = document.createElement('button');
		//Button.classList.add('_button');

		////font awesome classes
		//Button.classList.add('fa');
		//Button.classList.add('fa-times');
		//Button.classList.add('fa-2x');

		//Button.onclick = function() {
		//	//atom.commands.dispatch(closeButton, 'agsbs-atom-package:closeDialog');
		//};

		//this.element.appendChild(Button);
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
