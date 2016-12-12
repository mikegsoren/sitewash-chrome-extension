(function() {
	console.log('Script with DOM access loaded.');

	var textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'li'];

	for (var i = 0; i < textElements.length; i++) {
    
		var elements = document.getElementsByTagName(textElements[i]);

		for (var j = 0; j < elements.length; j++) {

			var fontSize = parseInt(window.getComputedStyle(elements[j]).getPropertyValue('font-size').replace('px', ''));

			if (fontSize < 14) { 
				elements[j].setAttribute('class', 'font-size-override'); 
			}

		}
	}
})();