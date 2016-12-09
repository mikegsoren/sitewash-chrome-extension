function createListener() {

    var washButton = document.getElementById('wash');
    washButton.addEventListener('click', function() {
        wash();
    }); 
}

function wash() {

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

		console.log(tab);

	    console.log(chrome.extension.getBackgroundPage());

	    var washStyles = document.createElement('style');

	    chrome.extension.getBackgroundPage().document.write("<style>body { background-color:#000 }</style>");
	});	
};

document.addEventListener('DOMContentLoaded', function() {
    createListener();
});