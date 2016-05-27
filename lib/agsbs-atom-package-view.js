(function() {
	var $, jQuery, AgsbsAtomPackageView;

	$ = jQuery = require('jquery');

	module.exports = AgsbsAtomPackageView = (function() {
		function AgsbsAtomPackageView(serializedState) {
			var message;
			this.element = document.createElement('div');
			this.element.classList.add('agsbs-atom-package');
			message = document.createElement('div');
			message.textContent = "The AgsbsAtomPackage package is Alive! It's ALIVE!";
			message.classList.add('message');
			this.element.appendChild(message);
	    }

	    AgsbsAtomPackageView.prototype.serialize = function() {};

	    AgsbsAtomPackageView.prototype.destroy = function() {
			return this.element.remove();
	    };

		AgsbsAtomPackageView.prototype.getElement = function() {
	    	return this.element;
		};

	    return AgsbsAtomPackageView;

	})();

}).call(this);
