(function() {
	var $, AgsbsAtomPackage, AgsbsAtomPackageView, CompositeDisposable, MatucCommands;

	$ = require('./jquery-1.12.4.min');

	AgsbsAtomPackageView = require('./agsbs-atom-package-view');

	MatucCommands = require('./matuc-commands');

	CompositeDisposable = require('atom').CompositeDisposable;

	module.exports = AgsbsAtomPackage = {
		agsbsAtomPackageView: null,
		modalPanel: null,
		subscriptions: null,
		activate: function(state) {
			this.agsbsAtomPackageView = new AgsbsAtomPackageView(state.agsbsAtomPackageViewState);
			this.modalPanel = atom.workspace.addModalPanel({
				item: this.agsbsAtomPackageView.getElement(),
				visible: false
      		});
			this.matucCommands = new MatucCommands();
			this.subscriptions = new CompositeDisposable;
			this.subscriptions.add(atom.commands.add('atom-workspace', {
        		'agsbs-atom-package:toggle': (function(_this) {
					return function() {
						$(".message").css('font-size', '50px');
						return _this.toggle();
					};
				})(this)
			}));
			return this.subscriptions.add(atom.commands.add('atom-workspace', {
				'agsbs-atom-package:generateFile': (function(_this) {
					return function() {
						return _this.generateFile();
					};
				})(this)
			}));
		},
		deactivate: function() {
			this.modalPanel.destroy();
			this.subscriptions.dispose();
			return this.agsbsAtomPackageView.destroy();
    	},
		serialize: function() {
			return {
				agsbsAtomPackageViewState: this.agsbsAtomPackageView.serialize()
			};
		},
		toggle: function() {
			//exectest
			var exec = require('child_process').exec;
			exec('dir', function(error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});//ende exec test
			console.log('AgsbsAtomPackage was toggled!');
			console.log('Test');
			if (this.modalPanel.isVisible()) {
				return this.modalPanel.hide();
			} else {
				return this.modalPanel.show();
			}
		},
		generateFile: function() {
			console.log('GenerateFile');
			return this.matucCommands.generateFile(atom.workspace.getActivePaneItem());
		}
	};

}).call(this);
