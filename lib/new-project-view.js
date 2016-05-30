'use babel';

var $;
$ = require('jquery');

export default class AgsbsAtomPackageView {

	constructor(serializedState) {

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
