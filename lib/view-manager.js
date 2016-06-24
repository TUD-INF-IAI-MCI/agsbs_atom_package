'use babel';

const iPath = require('path');

/**
* Class to manage the different views.
* @author leroy buchholz
*/

export default class ViewManager {

	//Functions to set languages.

	/**
	* Sets the language to english.
	*/
	setLanguageToEnglish() {
		atom.config.set('agsbs-atom-package.language', 'english');
	}

	/**
	* Sets the language to german.
	*/
	setLanguageToGerman() {
		atom.config.set('agsbs-atom-package.language', 'german');
	}

	//Functions to toggle views.

	/**
	* Toggles a dialog view.
	* @param {objekt} dialogPanel The panel that will be toggled.
	*/
	toggleDialog(dialogPanel) {
		const viewManager = this;
		const dialog = dialogPanel.getItem();

		if (dialogPanel.isVisible()) {
			dialogPanel.hide();
		} else {
			dialogPanel.show();
			//hide default modal-panel container
			dialog.parentElement.style.visibility = 'hidden';
			//but show own dialog container
			dialog.style.visibility = 'visible';
			//set focus to the first input element
			dialog.getElementsByTagName('input')[0].focus();
		};
	}

	/**
	* Closes visible dialogs, mostly exactly one.
	*/
	closeDialog() {
		const viewManager = this;
		const dialogs = atom.workspace.getModalPanels();
		dialogs.forEach(function(dialog, index) {
			if (dialog.isVisible())
				//If dialog is a DOM element.
				if(dialog instanceof Element) {
					//And a form is in it
					if(dialog.item.getElementsByTagName('form')) {
						//reset the form
						dialog.item.getElementsByTagName('form')[0].reset();
					};
				};
				dialog.hide();
			}
		);
	}

	/**
	* Toggles the HTML preview pane from markdown preview plus.
	*/
	toggleHtmlPreview() {
		activePaneItem = atom.workspace.getActivePaneItem();
		file = activePaneItem.buffer != null ? activePaneItem.buffer.file : void 0;
		extension = file != null ? iPath.extname(file.path) : void 0;
		if (extension === '.md') {
			atom.commands.dispatch(atom.workspace.getTopPanels()[0].item.children[2], 'markdown-preview-plus:toggle');
		} else {
			alert('Bitte wählen Sie eine .md Datei aus, die in der Vorschau angezeigt werden soll.');
		}
	}

	//Functions to add DOM element easily.

	/**
	* Adds a new button to a parent
	* @param {object} parent Element where the button will be added (in view classes mostly this.element).
	* @param {string} id The id of the button at the DOM hierachy.
	* @param {string} title The title which is shown at tooltips.
	* @param {string} icon Name of the font awesome class or name of an icon in styles/icons without *.svg.
	* @param {function} clickFunctionCallback Function that is called by clicking the button.
	* @param {string} shortcut The shortcut that calls also the clickFunctionCallback.
	* @return {object} Tthe button as DOM element
	*/
	addButton(parent, id, title, icon, clickFunctionCallback, param, shortcut) {
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;

		//Create button.
		const button = document.createElement('button');

		//Set id.
		button.setAttribute ('id', id);

		var buttonTitle = title;
		//Translate the shortcut for showing in english and german.
		if (shortcut) {
			if (agsbs.language.language == 'de') {
				shortcut = shortcut.replace('ctrl', 'strg');
			} else {
				shortcut = shortcut.replace('strg', 'ctrl');
			}
			buttonTitle += ' | ' + shortcut.replace(/\s/g, '');
		};
		//set title
		button.setAttribute ('title', buttonTitle);

		//Add font awesome classes if icon is an font awesome icon.
		if (icon.substr(0, 3) == 'fa-') {
			button.classList.add('fontawesome_iconed_button');
			button.classList.add('fa');
			button.classList.add(icon);
			button.classList.add('fa-2x');
		} else {
			//Add own icon from styles/icons folder and class for styling it.
			button.classList.add('own_iconed_button');
			button.style.backgroundImage = 'url(atom://agsbs-atom-package/styles/icons/' + icon + '.svg)';
		};

		//Add callback function if it is set.
		if(clickFunctionCallback) {
			button.onclick = function() {
				clickFunctionCallback(param);
			};
		};

		//Link callback funktion with shortcut if both are set.
		if(clickFunctionCallback && shortcut) {
			agsbs.shortcutManager.addShortcut(shortcut, clickFunctionCallback);
		};

		//Add button to parent element.
		parent.appendChild(button);

		//Return button object.
		return button;
	}

	/**
	* Adds a new text-input to a parent form.
	* @param {object} parent Form where the text-input will be added (in view classes mostly this.element).
	* @param {sting} id	The id of the text-input at the DOM hierachy.
	* @param {string} placeholder The default text at the text-input.
	* @return {object} The text-input as DOM element
	*/
	addTextInput (parent, id, placeholder) {
		//Create input.
		const textInput = document.createElement('input');
		//Set type to text
		textInput.setAttribute('type','text');
		//Set id.
		textInput.setAttribute('id',id);
		//Set placeholder text.
		textInput.setAttribute('placeholder', placeholder);
		//Add text-input to parent.
		parent.appendChild(textInput);
		//Return text-input object.
		return textInput;
	}

	/**
	* Adds a new file-picker to a parent form.
	* @param {object} parent Form where the file-picker will be added (in view classes mostly this.element).
	* @param {string} id The id of the file-input at teh DOM hierachy.
	* @param {string} defaultText Text which is shown if no folder is selected.
	* @return {object} The file-picker as DOM element.
	*/
	addFilePicker (parent, id, defaultText) {
		//Create container to wrap the file-picker.
		const fileInputContainer = document.createElement('div');
		fileInputContainer.classList.add('file_input');

		//Create input.
		const fileInput = document.createElement('input');
		//Set type to file.
		fileInput.setAttribute('type','file');
		//Set id.
		fileInput.setAttribute('id',id);
		//Set option to pick directory instead of files.
		fileInput.setAttribute('webkitdirectory','');

		//Add a label (only this and the output are visible).
		const fileInputLabel = document.createElement('label');
    	fileInputLabel.setAttribute('for', id);
		//Set folder icon.
		fileInputLabel.classList.add('fontawesome_iconed_button');
		fileInputLabel.classList.add('fa');
		fileInputLabel.classList.add('fa-folder-open');
		fileInputLabel.classList.add('fa-2x');

		//Add an output (only this an label are visible).
		const fileInputPath = document.createElement('output');
		fileInputPath.setAttribute('name', 'file_input_path');
		fileInputPath.setAttribute('for', id);
		//Add default text to output.
		fileInputPath.innerHTML = defaultText;

		//Add all to the parent Form.
		fileInputContainer.appendChild(fileInputLabel);
		fileInputContainer.appendChild(fileInputPath);
		fileInputContainer.appendChild(fileInput);
		parent.appendChild(fileInputContainer);

		//Add a listerner to set the choosen path as text to the output.
		fileInput.addEventListener('change', function(event) {
			fileInputPath.innerHTML = event.path[0].files[0].path;
		});

		//return the file-input as DOM element.
		return fileInput;
	}

	/**
	* Adds a checkbox to a form.
	* @param {object} parent Form to add the Checkbox (in view classes mostly this.element).
	* @param {string} id The id of the checkbox at the DOM hierachy.
	* @param {string} label Text to label the checkbox.
	* @return The checkbox as DOM element.
	*/
	addCheckbox (parent, id, label) {
		//Create input.
		const checkbox = document.createElement('input');
		//Set type to checkbox.
		checkbox.setAttribute('type', 'checkbox');
		//Set id.
		checkbox.setAttribute('id', id);
		//Add the label.
		const checkboxLabel = document.createElement('label');
    	checkboxLabel.setAttribute('for', id);
		//Fill the text within the label.
    	checkboxLabel.innerHTML = label;
		//Add all to the parent form.
		parent.appendChild(checkboxLabel);
		parent.appendChild(checkbox);
		//return the checkbox as DOM element.
		return checkbox;
	}

	/**
	//Adds a number-picker to a form.
	* @param {object} parent Form to add the Checkbox (in view classes mostly this.element).
	* @param {string} id The id of the number-picker at the DOM hierachy.
	* @param {string} label Text to label the number-picker.
	* @return The number-picker as DOM element.
	*/
	addNumberPicker (parent, id, label) {
		//Create input.
		const numberPicker = document.createElement('input');
		//Set type to number.
		numberPicker.setAttribute('type', 'number');
		//Set id.
		numberPicker.setAttribute('id', id);
		//Set default text to 0.
		numberPicker.setAttribute('placeholder', '0');
		//Add a label.
		const numberPickerLabel = document.createElement('label');
		numberPickerLabel.setAttribute('for', id);
		//Fill the text within the label.
		numberPickerLabel.innerHTML = label;
		//Add all to the parent form.
		parent.appendChild(numberPickerLabel);
		parent.appendChild(numberPicker);
		//return the number-picker as DOM element.
		return numberPicker;
	}

	/**
	* Adds a drop-down-menu to a form.
	//parent Form to add the drop-down-menu (in view classes mostly this.element).
	* @param {string} id The id of the drop-down-menu at the DOM hierachy.
	* @param {string} label Text to label the drop-down-menu.
	* @param {array} options The array of drop-down-menu options.
	* @return The number-picker as DOM element.
	*/
	addDropDownMenu (parent, id, label, options) {
		//Create select.
		const DropDownMenu = document.createElement('select');
		//Set id.
		DropDownMenu.setAttribute('id', id);
		//Add label.
		const DropDownMenuLabel = document.createElement("label");
		DropDownMenuLabel.setAttribute("for", id);
		//Fill the text within the label.
		DropDownMenuLabel.innerHTML = label;
		//Add all options to the select element.
		options.forEach(function(option) {
    		const DropDownMenuOption = document.createElement("option");
			DropDownMenuOption.innerHTML = option;
			DropDownMenu.appendChild(DropDownMenuOption);
		});
		//Add all to the parent form.
		parent.appendChild(DropDownMenuLabel);
		parent.appendChild(DropDownMenu);
		//return the drop-down-menu as DOM element.
		return DropDownMenu;
	}
}
