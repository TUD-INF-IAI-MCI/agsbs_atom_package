'use babel';

/**
* Class to manage adding shortcuts, catching key events and run shortcut functions.
* Shotcuts only work if agsbs-atom-package is visible.
* @author leroy buchholz
*/
export default class ShortcutManager {
	/**
	* @constructor
	* @this Instance of the shortcut-manager.
	*/
	constructor() {
		//Used intances from agsbs-atom-package.
		this.agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		this. viewManager = this.agsbs.viewManager;

		//Array that maps keyCodes to strings.
		this.keyCodeMap = [];
		this.keyCodeMap[27] = 'esc';
		//Map keyCodes to number as string.
		for (var i = 0; i < 10; ++i) {
			this.keyCodeMap[48 + i] = '' + i;
		};
		//Array of all letters to iterate about.
		var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
		//Map keyCodes to letters as string.
		for (var i = 0; i < 26; ++i) {
			this.keyCodeMap[65 + i] = letters[i];
		};
		//Map keycodes to f-keys.
		for (var i = 1; i <=12; i++) {
			this.keyCodeMap[111 + i] = 'f' + i;
		};
		//Array of registred shortcuts.
		this.shortcuts = [];
		//Register ecs to close dialogs.
		this.shortcuts['esc'] = [this.viewManager.closeDialog, undefined];

		//Const to use this at the listener.
		const shortcutManager = this;
		//Listener that runs keyDown() on key down in the whole document.
		document.getElementsByTagName('html')[0].onkeydown = function(event) {
			shortcutManager.keyDown(event);
		};
	}

	/**
	* Build possible shortcut from event.
	* @this Instance of the shortcut-manager.
	* @param {object} event The event that was thrown by hitting a key.
	*/
	keyDown(event) {
		//Only works when agsbs-atom-package is visible.
		if(this.agsbs.mainNavigation.isVisible() && this.agsbs.footerPanel.isVisible()) {
			//If key is a possible key for a shortcut.
			if(this.keyCodeMap[event.keyCode]) {
				//Add pressed key to the keys array.
				var keys = [this.keyCodeMap[event.keyCode]];
				//Adds ctrl, alt and/or shift to the array if they are hitten simultaneously with the key.
				if (event.ctrlKey) {
					keys.push('ctrl');
				};
				if (event.altKey) {
					keys.push('alt');
				};
				if (event.shiftKey) {
					keys.push('shift');
				};
				//Give the array of an possible shortcut and the event to isShortcut.
				this.isShortcut(keys, event);
			};
		};
	}

	/**
	* Executes to shotcut mapped function if keys contains a registred one.
	* @this Instance of the shortcut-manager.
	* @param {array} keys Array of possible shortcuts.
	* @param {object} event The event that was thrown by hitting a key.
	*/
	isShortcut(keys, event) {
		//Sort key to compare with registred shortcuts.
		keys.sort();
		//Look if keys contains a registred shortcut.
		if(this.shortcuts[keys]) {
			//Esc should rising up.
			if(keys != 'esc') {
				//Prevent rising up the event.
				event.cancelBubble = true;
    			event.returnValue = false;
			};
			//Execute mapped function.
			this.shortcuts[keys][0](this.shortcuts[keys][1]);
		};
	}

	/**
	* Register a shortcut.
	* @this Instance of the shortcut-manager.
	* @param {string} shortcut The shortcut as text (only one key 0-9, a-z or f-keys and a subset of [shift, alt, ctrl]).
	* @param {function} functionCallback The function that will be mapped to the shortcut.
	* @param {param} param The param of the callback-function.
	*/
	addShortcut(shortcut, functionCallback, param) {
		//Handle uppercase shortcuts an remove spaces.
		var shortcutToLowerCase = shortcut.toLowerCase().replace(/\s/g, '');
		//Convert string to array.
		var keyArray = shortcutToLowerCase.split('+');
		//Sort to compare with possible shortcuts in isShortcut.
		keyArray.sort();
		//Push shortcut and function to shortcuts array.
		this.shortcuts[keyArray] = [functionCallback, param];
	}
}
