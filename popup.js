function createListeners() {

    var washButton = document.getElementById('wash');
    washButton.addEventListener('click', function() {
        wash();
    });

    var metadataButton = document.getElementById('metadata-button');
    metadataButton.addEventListener('change', function() {
    	metadata(metadataButton);
    });
}

function wash() {

	console.log('wash');

	var queryInfo = {
	   active: true,
	   currentWindow: true
	};

	var tab;

	chrome.tabs.query(queryInfo, function(tabs) {
		// chrome.tabs.query invokes the callback with a list of tabs that match the
		// query. When the popup is opened, there is certainly a window and at least
		// one tab, so we can safely assume that |tabs| is a non-empty array.
		// A window can only have one active tab at a time, so the array consists of
		// exactly one tab.
		tab = tabs[0];

        chrome.tabs.insertCSS(tab.id, {
            file: 'style-overrides.css'
        });

        chrome.tabs.executeScript({
            file: 'dom-script.js'
        });
	});	
};

function metadata(btn) {

	var queryInfo = {
	   active: true,
	   currentWindow: true
	};

	var tab;

	var useScript;

	if(btn.checked) {
		useScript = "metadata-script.js";
	} else {
		useScript = "metadata-undo-script.js";
	}

	chrome.tabs.query(queryInfo, function(tabs) {
		tab = tabs[0];

        chrome.tabs.executeScript({
            file: useScript
        });
	});	
};

document.addEventListener('DOMContentLoaded', function() {
    createListeners();
});