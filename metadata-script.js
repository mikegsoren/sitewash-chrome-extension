(function() {
	var dataObject = {};

	var title = document.getElementsByTagName('title')[0];

	dataObject['title'] = title.innerHTML;

	var meta = document.getElementsByTagName('meta');

	for(var idx = 0; idx < meta.length; idx++) {
		if(meta[idx].getAttribute('name')) {
			if(meta[idx].getAttribute('name') === 'description' || meta[idx].getAttribute('name') === 'keywords') {
				dataObject[meta[idx].getAttribute('name')] = meta[idx].getAttribute('content');
			}
		}
	}

	var body = document.getElementsByTagName('body')[0];

	var meta_container = document.createElement('div');
	meta_container.setAttribute("id", "sitewash-metadata-container");

	body.appendChild(meta_container);

	for(var key in dataObject) {
		var metaNode = document.createElement('div');
		metaNode.innerHTML = key + ": " + dataObject[key];
		meta_container.appendChild(metaNode);
	}

})();