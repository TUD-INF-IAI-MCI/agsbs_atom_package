'use babel';

//functions to add DOM elemente easier
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
			button.classList.add('fontawesome_iconed_button');
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
		return textInput;
	}

	//adds a new file-picker to a form
	//parent:		form to add
	//id:			id of the file-input
	addFileInput (parent, id) {
		const fileInput = document.createElement('input');
		fileInput.setAttribute('type','file');
		fileInput.setAttribute('id',id);
		fileInput.setAttribute('webkitdirectory','');

		const fileInputLabel = document.createElement("label");
    	fileInputLabel.setAttribute("for", id);
		fileInputLabel.classList.add('fontawesome_iconed_button');
		fileInputLabel.classList.add('fa');
		fileInputLabel.classList.add('fa-folder-open');
		fileInputLabel.classList.add('fa-2x');

		parent.appendChild(fileInputLabel);
		parent.appendChild(fileInput);
		return fileInput;
	}

	//adds a new checkbox to a form
	//parent:	form to add
	//id:		id of the checkbox
	//label:	label of the checkbox
	addCheckbox (parent, id, label) {
		const checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('id', id);

		const checkboxLabel = document.createElement("label");
    	checkboxLabel.setAttribute("for", id);
    	checkboxLabel.innerHTML = label;

		parent.appendChild(checkboxLabel);
		parent.appendChild(checkbox);
		return checkbox;
	}

	//adds a new number-picker to a form
	//parent:	form to add
	//id:		id of the number-picker
	//label:	label of the number-picker
	addNumberPicker (parent, id, label) {
		const numberPicker = document.createElement('input');
		numberPicker.setAttribute('type', 'number');
		numberPicker.setAttribute('id', id);
		numberPicker.setAttribute('placeholder', '0');

		const numberPickerLabel = document.createElement("label");
		numberPickerLabel.setAttribute("for", id);
		numberPickerLabel.innerHTML = label;

		parent.appendChild(numberPickerLabel);
		parent.appendChild(numberPicker);
		return numberPicker;
	}

	//adds a new select-field to a form
	//parent:	form to add
	//id:		id of the select-field
	//label:	label of the select-field
	//options:	array of selectable options
	addSelect (parent, id, label, options) {
		const select = document.createElement('select');
		select.setAttribute('id', id);

		const selectLabel = document.createElement("label");
		selectLabel.setAttribute("for", id);
		selectLabel.innerHTML = label;

		options.forEach(function(option) {
    		const selectOption = document.createElement("option");
			selectOption.innerHTML = option;
			select.appendChild(selectOption);
		});

		parent.appendChild(selectLabel);
		parent.appendChild(select);
		return select;
	}

	// user initiated calls

	toggleDialog() {
		const dialog = atom.workspace.panelContainers.modal.panels[0];
		if (dialog.isVisible()) {
			dialog.hide();
		} else {
			dialog.show();
			dialog.item.parentElement.style.visibility = 'hidden';
			dialog.item.style.visibility = 'visible';
			dialog.item.getElementsByTagName('input')[0].focus();
			dialog.item.addEventListener('keydown', function (event) {
				if (event.which == 27) {
					this.closeDialog();
				}
			});
		}
	}

	closeDialog() {
		const dialog = atom.workspace.panelContainers.modal.panels[0];
		if (dialog.isVisible()) {
			this.toggleDialog();
		}
	}

}
