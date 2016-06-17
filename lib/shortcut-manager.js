'use babel';

//class to register shortcuts that only works if agsbs-atom-package is visible
export default class ShortcutManager {

	constructor() {

		const shortcutManager = this;

		this.agsbs = atom.packages.getLoadedPackage('agsbs-atom-package').mainModule;
		this. viewManager = this.agsbs.viewManager;

		//maps keyCodes to strings
		this.keyCodeMap = [];
		//array of registred shortcuts

		this.keyCodeMap[27] = 'esc';

		//maps keyCodes to number as string
		for (var i = 0; i < 10; ++i) {
			this.keyCodeMap[48 + i] = '' + i;
		};

		//array of all letters to iterate about
		var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

		//maps keyCodes to letters as string
		for (var i = 0; i < 26; ++i) {
			this.keyCodeMap[65 + i] = letters[i];
		};

		this.shortcuts = [];
		//close dialogs
		this.shortcuts['esc'] = this.viewManager.closeDialog;

		this.synonymKeys = [];
		this.synonymKeys['escape'] = 'esc';
		this.synonymKeys['strg'] = 'ctrl';

		//listener that runs keyDown() on key down in the whole document
		document.getElementsByTagName('html')[0].onkeydown = function(event) {
			shortcutManager.keyDown(event);
		};
	}

	keyDown(event) {
		//only works when agsbs-atom-package is visible
		if(this.agsbs.mainNavigation.isVisible() && this.agsbs.footerPanel.isVisible()) {
			if(this.keyCodeMap[event.keyCode]) {
				var keys = [this.keyCodeMap[event.keyCode]];
				if (event.ctrlKey) {
					keys.push('ctrl');
				};
				if (event.altKey) {
					keys.push('alt');
				};
				if (event.shiftKey) {
					keys.push('shift');
				};
				this.isShortcut(keys, event);
			};
		};
	}

	isShortcut(keys, event) {
		keys.sort();
		if(this.shortcuts[keys]) {
			if(keys != 'esc') {
				//prevent rising up the event
				event.cancelBubble = true;
    			event.returnValue = false;
			};
			this.shortcuts[keys]();
		};
	}

	addShortcut(shortcut, functionCallback) {
		//handle uppercase shortcuts
		var shortcutToLowerCase = shortcut.toLowerCase().replace(/\s/g, '');
		var keyArray = shortcutToLowerCase.split('+');
		//handle synonyms
		var synonyms = this.synonymKeys;
		keyArray.forEach(function(key, index){
			if(synonyms[key]) {
				keyArray.splice(index, 1);
				keyArray.push(synonyms[key]);
			};
		});
		keyArray.sort();
		this.shortcuts[keyArray] = functionCallback;
	}
}
