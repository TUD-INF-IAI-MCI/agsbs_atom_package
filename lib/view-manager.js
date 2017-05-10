'use babel';

const iPath = require('path');

/**
* Class to manage the different views.
* @author leroy buchholz
*/

export default class ViewManager {

	/**
	* function to say here is no function yet.
	*/
	noFunction() {
		atom.notifications.addWarning('Nothing to see', {detail : 'No functionality. We are working on it.', dismissable : true});
	}

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
	* @param {object} dialogPanel The panel that will be toggled.
	*/
	toggleDialog(dialogPanel) {
		const viewManager = this;
		const dialog = dialogPanel.getItem();
		let listDialogIds = ["insertLinkDialog","insertTableDialog", "insertGraphicDialog", "insertFootnoteDialog", "insertTextboxDialog",  "insertFootnoteDialog"];
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
    const helper = agsbs.helper;
		if(listDialogIds.indexOf(dialogPanel.id) != -1){
		    if(!helper.isBufferSelected(true)){
      		return;
    		}
		}
		if (dialogPanel.isVisible()) {
			dialogPanel.hide();
		} else {
			dialogPanel.show();
			//hide default modal-panel container
			dialog.parentElement.style.visibility = 'hidden';
			dialog.parentElement.classList.add('modal_panel_after');
			//but show own dialog container
			dialog.style.visibility = 'visible';
			//set focus to the first input element
			var inputs = dialog.getElementsByTagName('input');
			if(inputs[0]) {
				inputs[0].focus();
			};
		};
		if(dialogPanel.id == "insertTableDialog"){
			//check if cursor is in Table and fill tableDialog with Data
			const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
			const helper = agsbs.helper;
			if(helper.isCursorInTable()){

			}

		}
	}

	/**
	* Closes visible dialogs, mostly exactly one.
	*/
	closeDialog() {
		const viewManager = this;
		const dialogs = atom.workspace.getModalPanels();
		dialogs.forEach(function(dialog, index) {
			if (dialog.isVisible())
				//If dialog holds a DOM element.
				if(dialog.item instanceof Element) {
					//And forms are in it
					forms = dialog.item.getElementsByTagName('form');
					if(forms) {
						//reset the forms
						for(var i = 0; i < forms.length; i++) {
							forms[i].reset();
						};
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
		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const language = agsbs.language;
		activePaneItem = atom.workspace.getActivePaneItem();
		file = activePaneItem.buffer != null ? activePaneItem.buffer.file : void 0;
		extension = file != null ? iPath.extname(file.path) : void 0;
		if (extension === '.md') {
			var mainNavigation;
			atom.workspace.getTopPanels().forEach(function(panel) {
				if(panel.className == 'agsbsMainNavigation') {
					mainNavigation = panel;
				};
			});
			atom.commands.dispatch(mainNavigation.item.children[0].children[2], 'markdown-preview-plus:toggle');
		} else {
			atom.notifications.addWarning(language.noMdWarningPreview, {detail : language.noMdDetailPreview, dismissable : true});
		};
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
	* @return {object} button button as DOM element
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
			if (atom.config.get('agsbs-atom-package.language') == 'german') {
				shortcut = shortcut.replace('ctrl', 'strg');
			} else {
				shortcut = shortcut.replace('strg', 'ctrl');
			};
			buttonTitle += ' | ' + shortcut.replace(/\s/g, '');
		};
		//set title
		button.setAttribute ('title', buttonTitle);

		if(icon) {
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
		} else {
			button.innerHTML = title;
		};

		//Add callback function if it is set.
		if(clickFunctionCallback) {
			button.addEventListener('click', function() {
				clickFunctionCallback(param);
			});
		};

		//Link callback funktion with shortcut if both are set.
		if(clickFunctionCallback && shortcut) {
			agsbs.shortcutManager.addShortcut(shortcut, clickFunctionCallback, param);
		};

		//Add button to parent element.
		parent.appendChild(button);

		//Return button object.
		return button;
	}

	/**
	* Adds a new button to a parent
	* @param {string} title The name of the group.
	* @param {array} buttons Array of buttons which should be grouped.
	*/
	groupButtons(title, buttons) {
		const fieldset = document.createElement('fieldset');
		fieldset.setAttribute('id', title);
		const legend = document.createElement('legend');
		legend.innerHTML = title;
		fieldset.appendChild(legend);
		const flexContainer = document.createElement('div');
		flexContainer.classList.add('flex_container');
		fieldset.appendChild(flexContainer);
		buttons[0].parentNode.appendChild(fieldset);
		for(var i = 0; i < buttons.length; i++) {
			flexContainer.appendChild(buttons[i]);
		};
		return fieldset;
	}

	/**
	* Adds a new text-input to a parent form.
	* @param {object} parent Form where the text-input will be added (in view classes mostly this.element).
	* @param {sting} id	The id of the text-input at the DOM hierachy.
	* @param {string} placeholder The default text at the text-input.
	* @return {object} The text-input as DOM element
	*/
	addTextInput (parent, id, placeholder, label) {
		const textContainer = document.createElement('div');
		textContainer.classList.add('input_container');
		textContainer.classList.add('text_input_container');
		//Set id.
		textContainer.setAttribute('id',id);
		//Add a label.
		if(label) {
			const textInputLabel = document.createElement('label');
			textInputLabel.setAttribute('for', id);
			//Fill the text within the label.
			textInputLabel.innerHTML = label;
			textContainer.appendChild(textInputLabel);
		};
		//Create input.
		const textInput = document.createElement('input');
		//Set type to text
		textInput.setAttribute('type','text');
		//Set placeholder text.
		textInput.setAttribute('placeholder', placeholder);
		textContainer.appendChild(textInput);
		//Add text-input to parent if it is set.
		if(parent) {
			parent.appendChild(textContainer);
		};
		//Return text-input object.
		return textInput;
	}

	/**
	* Adds a new textarea-input to a parent form.
	* @param {object} parent Form where the textarea-input will be added (in view classes mostly this.element).
	* @param {sting} id	The id of the textarea-input at the DOM hierachy.
	* @param {string} placeholder The default text at the textarea-input.
	* @return {object} The text-input as DOM element
	*/
	addTextarea(parent, id, placeholder) {
		//Create textarea.
		const textarea = document.createElement('textarea');
		//Set id.
		textarea.setAttribute('id',id);
		//Set placeholder text.
		textarea.setAttribute('placeholder', placeholder);

		textarea.addEventListener('keyup', function(event) {
			var textareaHeight = 25;
			var lineHeight = parseInt(window.getComputedStyle(textarea, null).getPropertyValue('line-height').replace('px', ''));
			var numberOfLineBreaks = (textarea.value.match(/\n/g)||[]).length;
			var heightWithLineBreaks = textareaHeight + numberOfLineBreaks * lineHeight;
			textarea.style.height = heightWithLineBreaks + 'px';
		});

		//Add textarea-input to parent if it is set.
		if(parent) {
			parent.appendChild(textarea);
		};
		//Return textarea-input object.
		return textarea;
	}

	/**
	* Adds a new folder-picker to a parent form. Single files can not be selected.
	* @param {object} parent Form where the file-picker will be added (in view classes mostly this.element).
	* @param {string} id The id of the file-input at teh DOM hierachy.
	* @param {string} defaultText Text which is shown if no folder is selected.
	* @param {string} type If you want to to choose paths use 'folder', else use file
	* @return {object} The folder-picker as DOM element.
	*/
	addFilePicker (parent, id, defaultText, type) {
		//Create container to wrap the file-picker.
		const fileInputContainer = document.createElement('form');
		fileInputContainer.classList.add('file_input');

		//Create input.
		const fileInput = document.createElement('input');
		//Set type to file.
		fileInput.setAttribute('type','file');
		//Set id.
		fileInput.setAttribute('id',id);
		//Set option to pick directory instead of files.
		if(type == 'folder') {
			fileInput.setAttribute('webkitdirectory','');
		};

		//Add a label (only this and the output are visible).
		const fileInputLabel = document.createElement('label');
    	fileInputLabel.setAttribute('for', id);
		fileInputLabel.setAttribute('name', 'filepicker');
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
			if(event.path[0].files[0]) {
				fileInputPath.innerHTML = event.path[0].files[0].path;
			};
		});

		fileInputContainer.addEventListener('reset', function() {
			fileInputPath.innerHTML = defaultText;
		});

		parent.addEventListener('reset', function() {
			fileInputPath.innerHTML = defaultText;
		});

		//return the file-input as DOM element.
		return fileInput;
	}

	/**
	* Helpfunktion to reset a file-picker.

	/**
	* Adds a checkbox to a form.
	* @param {object} parent Form to add the Checkbox (in view classes mostly this.element).
	* @param {string} id The id of the checkbox at the DOM hierachy.
	* @param {string} label Text to label the checkbox.
	* @return The checkbox as DOM element.
	*/
	addCheckbox (parent, id, label) {
		//create parent-div.
		const parentContainer = document.createElement('div');
		parentContainer.classList.add('checkbox_container');
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
		parentContainer.appendChild(checkbox);
		parentContainer.appendChild(checkboxLabel);
		parent.appendChild(parentContainer);
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
		//Create container.
		const numberContainer = document.createElement('div');
		numberContainer.classList.add('input_container');
		numberContainer.classList.add('number_input_container');
		//Create input.
		const numberPicker = document.createElement('input');
		//Set type to number.
		numberPicker.setAttribute('type', 'number');
		//Set id.
		numberPicker.setAttribute('id', id);
		//Set default text to 0.
		numberPicker.setAttribute('placeholder', '0');
		//Set minimum number to zero.
		numberPicker.setAttribute('min', '0');
		//Add a label.
		const numberPickerLabel = document.createElement('label');
		numberPickerLabel.setAttribute('for', id);
		//Fill the text within the label.
		numberPickerLabel.innerHTML = label;
		//Add arrow keys.
		const arrowUp = document.createElement('div');
		arrowUp.classList.add('arrow_up');
		arrowUp.addEventListener('click', function() {
			numberPicker.focus();
			numberPicker.value++;
			//Fire input event.
			var inputEvent = new Event('input');
			numberPicker.dispatchEvent(inputEvent);
		});
		const arrowDown = document.createElement('div');
		arrowDown.classList.add('arrow_down');
		arrowDown.addEventListener('click', function() {
			numberPicker.focus();
			if(numberPicker.value > 1) {
				numberPicker.value--;
				//Fire input event.
				var inputEvent = new Event('input');
				numberPicker.dispatchEvent(inputEvent);
			}
		});
		//Add all to the parent form.
		numberContainer.appendChild(numberPickerLabel);
		numberContainer.appendChild(numberPicker);
		numberContainer.appendChild(arrowUp);
		numberContainer.appendChild(arrowDown);
		parent.appendChild(numberContainer);
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
		//Create container.
		const dropDownContainer = document.createElement('div');
		dropDownContainer.classList.add('input_container');
		//Create select.
		const DropDownMenu = document.createElement('select');
		//Set id.
		DropDownMenu.setAttribute('id', id);
		//Add label.
		const DropDownMenuLabel = document.createElement('label');
		DropDownMenuLabel.setAttribute('for', id);
		//Fill the text within the label.
		DropDownMenuLabel.innerHTML = label;
		//Add all options to the select element.
		options.forEach(function(option) {
    		const DropDownMenuOption = document.createElement('option');
			DropDownMenuOption.innerHTML = option;
			DropDownMenu.appendChild(DropDownMenuOption);
		});
		//Add all to the parent form.
		dropDownContainer.appendChild(DropDownMenuLabel);
		dropDownContainer.appendChild(DropDownMenu);
		parent.appendChild(dropDownContainer);

		//return the drop-down-menu as DOM element.
		return DropDownMenu;
	}

	/**
	* Clear every form element within a parent container.
	* @param {object} container Parent element of form elements.
	*/
	clearFormElements(container) {
		for (var i = 0; i < container.childNodes.length; i++) {
			var element = container.childNodes[i];
			if (element.tagName) {
				switch(element.tagName.toLowerCase()) {
					case 'input':
						switch (element.type) {
							case 'checkbox':
								element.checked = false;
								break;
							case 'file' :
								element.parentElement.reset();
							default:
								element.value = null;
								break;
						}
						break;
					case 'select':
						element.selectedIndex = 0;
						break;
					case 'textarea':
						element.innerHTML = '';
						break;
				}
   			}
		}
	}

	//Functions to enable and disable inputs.
	disableButton(button) {
		button.style.color = '#555555'; //@greyed
		button.style.boxShadow = 'none';
		button.style.cursor = 'default';
		this.disableInputs(button);
	}

	enableButton(button) {
		button.removeAttribute('style');
		this.enableInputs(button);
	}

	disableInputs(container) {
		if(container.tagName == 'INPUT' || container.tagName == 'SELECT') {
			container.setAttribute('disabled', '');
		} else {
			var inputs = container.getElementsByTagName('input');
			for(var i = 0; i < inputs.length; i++) {
				inputs[i].setAttribute('disabled', '');
			};
			var selects = container.getElementsByTagName('select');
			for(var i = 0; i < selects.length; i++) {
				selects[i].setAttribute('disabled', '');
			};
		};
	}

	enableInputs(container) {
		if(container.tagName == 'INPUT' || container.tagName == 'SELECT') {
			container.removeAttribute('disabled');
		} else {
			var inputs = container.getElementsByTagName('input');
			for(var i = 0; i < inputs.length; i++) {
				inputs[i].removeAttribute('disabled');
			};
			var selects = container.getElementsByTagName('select');
			for(var i = 0; i < selects.length; i++) {
				selects[i].removeAttribute('disabled');
			};
		};
	}
}
