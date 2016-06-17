'use babel';

const iPath = require('path');

export default class ViewManager {

	//functions to toggle views
	toggleDialog(modalPanelArrayPosition) {
		const viewManager = this;
		const dialog = atom.workspace.getModalPanels()[modalPanelArrayPosition];
		if (dialog.isVisible()) {
			dialog.hide();
		} else {
			dialog.show();
			dialog.item.parentElement.style.visibility = 'hidden';
			dialog.item.style.visibility = 'visible';
			dialog.item.getElementsByTagName('input')[0].focus();
		}
	}

	closeDialog() {
		const viewManager = this;
		const dialogs = atom.workspace.getModalPanels();
		dialogs.forEach(function(dialog, index) {
			if (dialog.isVisible()) {
				dialog.item.getElementsByTagName('form')[0].reset();
				dialog.hide();
			}
		});
	}

	toggleHtmlPreview() {

		activePaneItem = atom.workspace.getActivePaneItem();
		file = activePaneItem.buffer != null ? activePaneItem.buffer.file : void 0;
		extension = file != null ? iPath.extname(file.path) : void 0;
		if (extension === '.md') {
			atom.commands.dispatch(document, 'markdown-preview-plus:toggle');
		} else {
			alert('Bitte wählen Sie eine .md Datei aus, die in der Vorschau angezeigt werden soll.');
		}
	}

	//functions to add DOM element easily

	//adds a new button to panel
	//parent: 			parent element (this.element)
	//id: 				id of the button
	//icon: 			name of the font awesome class or name of an icon in styles/icons
	//clickFunction: 	function that is called on click
	addButton(parent, id, title, icon, clickFunctionCallback, param, shortcut) {

		const agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		const button = document.createElement('button');
		button.setAttribute ('id', id);

		var buttonTitle = title;
		if (shortcut) {
			if (agsbs.language.language == 'de') {
				shortcut = shortcut.replace('crtl', 'strg');
			} else {
				shortcut = shortcut.replace('strg', 'crtl');
			}
			buttonTitle += ' | ' + shortcut.replace(/\s/g, '');
		};
		button.setAttribute ('title', buttonTitle);

		if (icon.substr(0, 3) == 'fa-') {
			button.classList.add('fontawesome_iconed_button');
			button.classList.add('fa');
			button.classList.add(icon);
			button.classList.add('fa-2x');
		} else {
			button.classList.add('own_iconed_button');
			button.style.backgroundImage = 'url(atom://agsbs-atom-package/styles/icons/' + icon + '.svg)';
		};

		button.onclick = function() {
			clickFunctionCallback(param);
		};

		if(clickFunctionCallback && shortcut) {
			agsbs.shortcutManager.addShortcut(shortcut, clickFunctionCallback);
		};

		parent.appendChild(button);
		return button;
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
	//defaultText:	text which is shown if no folder is selected
	addFileInput (parent, id, defaultText) {
		const fileInputContainer = document.createElement('div');
		fileInputContainer.classList.add('file_input');

		const fileInput = document.createElement('input');
		fileInput.setAttribute('type','file');
		fileInput.setAttribute('id',id);
		fileInput.setAttribute('webkitdirectory','');

		const fileInputLabel = document.createElement('label');
    	fileInputLabel.setAttribute('for', id);
		fileInputLabel.classList.add('fontawesome_iconed_button');
		fileInputLabel.classList.add('fa');
		fileInputLabel.classList.add('fa-folder-open');
		fileInputLabel.classList.add('fa-2x');

		const fileInputPath = document.createElement('output');
		fileInputPath.setAttribute('name', 'file_input_path');
		fileInputPath.setAttribute('for', id);
		fileInputPath.innerHTML = defaultText;

		fileInputContainer.appendChild(fileInputLabel);
		fileInputContainer.appendChild(fileInputPath);
		fileInputContainer.appendChild(fileInput);
		parent.appendChild(fileInputContainer);

		fileInput.addEventListener('change', function(event) {
			fileInputPath.innerHTML = event.path[0].files[0].path;
		});

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

		const checkboxLabel = document.createElement('label');
    	checkboxLabel.setAttribute('for', id);
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

		const numberPickerLabel = document.createElement('label');
		numberPickerLabel.setAttribute('for', id);
		numberPickerLabel.innerHTML = label;

		parent.appendChild(numberPickerLabel);
		parent.appendChild(numberPicker);
		return numberPicker;
	}

	//adds a new dropdown menu to a form
	//parent:	form to add
	//id:		id of the dropdown menu
	//label:	label of the dropdown menu
	//options:	array of dropdown menu options
	addDropDownMenu (parent, id, label, options) {
		const DropDownMenu = document.createElement('select');
		DropDownMenu.setAttribute('id', id);

		const DropDownMenuLabel = document.createElement("label");
		DropDownMenuLabel.setAttribute("for", id);
		DropDownMenuLabel.innerHTML = label;

		options.forEach(function(option) {
    		const DropDownMenuOption = document.createElement("option");
			DropDownMenuOption.innerHTML = option;
			DropDownMenu.appendChild(DropDownMenuOption);
		});

		parent.appendChild(DropDownMenuLabel);
		parent.appendChild(DropDownMenu);
		return DropDownMenu;
	}
}
