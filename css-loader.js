(function(exports, document, Q) {

	'use strict';

	var cssLoader = (function() {

		var cssLoader = {};

		var head = document.getElementsByTagName('head')[0];
		var store = {};
		var TIMEOUT = 15000;

		cssLoader.load = function(path) {

			var deferred = Q.defer();
			var link = null;
			var sheet = null;
			var rules = null;
			var timeout_id = null;
			var interval_id = null;

			function cssLoaded() {
		    	
		    	clearInterval(interval_id);
		        clearTimeout(timeout_id);

		        if (link.removeEventListener) {
			    	link.removeEventListener('load', cssLoaded);
			    }

		        deferred.resolve(link);
		    }

			if (!store[path]) {

				link = document.createElement('link');
				store[path] = link;

				link.setAttribute('href', path);
			    link.setAttribute('rel', 'stylesheet');
			    link.setAttribute('type', 'text/css');
			    link.setAttribute('data-module-name', path);

			    if ('sheet' in link) {
			    	sheet = 'sheet';
      				rules = 'cssRules';
			    }
			    else {
			    	sheet = 'styleSheet';
      				rules = 'rules';
			    }

			    interval_id = setInterval(function() {
        
			        try {

			            if (link[sheet] &&
			            	link[sheet][rules] &&
			            	link[sheet][rules].length) {
			                
			                cssLoaded();
			            }
			        }
			        catch(e) {}
			        finally {}
			        
			    }, 100);

			    timeout_id = setTimeout(function() {
        
			        clearInterval(interval_id);
			        clearTimeout(timeout_id);
			        head.removeChild(link);
			        deferred.reject('timeout');

			    }, TIMEOUT);

			    if (link.addEventListener) {
			    	link.addEventListener('load', cssLoaded);
			    }

			    head.appendChild(link);
			}
			else {
				deferred.resolve(store[path]);
			}

			return deferred.promise;
		};

		cssLoader.remove = function(key) {

			var temp = store[key] || null;

			if (temp) {
				store[key] = null;
				return head.removeChild(temp);
			}

			return null;
		};

		return cssLoader;

	}());

	exports.cssLoader = cssLoader;

}(window, window.document, window.Q));