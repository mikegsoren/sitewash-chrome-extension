// (function() {

	function doThing() {

		console.log('asdf');
	}

	console.log('fuck');

	var head = document.head || document.getElementsByTagName('head')[0];

	var css = 'lol ';

	var style = document.createElement('style');

	style.type = 'text/css';

	// style.append(css);

	head.appendChild(style);


	console.log(head);

// });