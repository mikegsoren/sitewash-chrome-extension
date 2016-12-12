(function() {
	console.log('Metadata undo script loaded.');

	var body = document.getElementsByTagName('body')[0];
	var container = document.getElementById('sitewash-metadata-container');

	console.log(body);
	console.log(container);

	body.removeChild(container);
})();