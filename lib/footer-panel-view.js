'use babel';

var $ = require('jquery');

export default class AgsbsAtomPackageView {

	constructor(serializedState) {
		//create root element
		this.element = document.createElement('div');
		this.element.classList.add('footer_panel_container');

		this.addButton('dings', 'fa-');
		this.addButton('dingsbums', 'plus');
		//const Button = document.createElement('button');
		//Button.classList.add('fontawsomeIconedButton');

		////font awesome classes
		//Button.classList.add('fa');
		//Button.classList.add('fa-times');
		//Button.classList.add('fa-2x');

		//Button.onclick = function() {
		//	//atom.commands.dispatch(closeButton, 'agsbs-atom-package:closeDialog');
		//};

		//this.element.appendChild(Button);
	}

	//adds a new button to panel
	//id: id of the button
	//iconPath: name of the font awesome class or name of an icon in styles/icons
	//clickFunction: function that is called on click
	addButton(id, iconPath, clickFunction) {
		var button = document.createElement('button');
		button.setAttribute ('id', id);
		if (iconPath.substr(0, 3) == 'fa-') {
			button.classList.add('fontawsome_iconed_button');
			button.classList.add('fa');
			button.classList.add(iconPath);
			button.classList.add('fa-2x');
		} else {
			button.classList.add('own_iconed_button');
		}
		button.onclick = function() {
			//atom.commands.dispatch(button, 'agsbs-atom-package:closeDialog');
			//funtioniert das, wenn die temporär gleich heißen?
		};

		this.element.appendChild(button);
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
