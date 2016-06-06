'use babel';

export default class ViewManager {

	//adds a new button to panel
	//parent: 			parent element (this.element)
	//id: 				id of the button
	//icon: 			name of the font awesome class or name of an icon in styles/icons
	//clickFunction: 	function that is called on click
	addButton(parent, id, icon, clickFunction) {

		var button = document.createElement('button');
		button.setAttribute ('id', id);
		if (icon.substr(0, 3) == 'fa-') {
			button.classList.add('fontawsome_iconed_button');
			button.classList.add('fa');
			button.classList.add(icon);
			button.classList.add('fa-2x');
		} else {
			button.classList.add('own_iconed_button');
			button.style.backgroundImage = 'url(atom://agsbs-atom-package/styles/icons/' + icon + '.svg)';
		}
		button.onclick = function() {
			atom.commands.dispatch(button, clickFunction);
		};

		parent.appendChild(button);
	}

	//adds a new text-input to a form
	//parent:		form to add
	//id:			id of the text-input
	//placeholder:	placeholder-text
	addTextInput (parent, id, placeholder) {
		const textInput = document.createElement('input');
		textInput.setAttribute('type','text');
		textInput.setAttribute('id',id);
		textInput.setAttribute('placeholder', placeholder);

		parent.appendChild(textInput);
	}

	//adds a new checkbox to a form
	//parent:	form to add
	//id:		id of the checkbox
	//label:	label of the checkbox
	addCheckbox (parent, id, label) {
		const checkbox = document.createElement('input');
		checkbox.setAttribute('type','checkbox');
		checkbox.setAttribute('id',id);

		parent.appendChild(checkbox);
	}
}
