

var fontSizeScript = "var textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'li'];";

fontSizeScript += "for (var i = 0; i < textElements.length; i++) {";
    
fontSizeScript += "var elements = document.getElementsByTagName(textElements[i]);";

fontSizeScript += "for (var j = 0; j < elements.length; j++) {";



fontSizeScript += "var fontSize = parseInt(window.getComputedStyle(elements[j]).getPropertyValue('font-size').replace('px', ''));";

fontSizeScript += "console.log(fontSize);";

fontSizeScript += "if (fontSize < 14) { elements[j].setAttribute('class', 'font-size-override'); }";

fontSizeScript += "}}";


console.log(fontSizeScript);

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

		// console.log(tab);

	 //    console.log(tab.index);

	    // var washStyles = document.createElement('style');

        chrome.tabs.insertCSS(tab.id, {
            file: 'style-overrides.css'
            
            // code: "document.body.style.backgroundColor=\"red\"",
            // runAt: "document_end"
        }, function() {
            console.log('Sitewash Message: Static styles overridden.');
        });

        // chrome.tabs.insertCSS(tab.id, {
        //     code: fontSizeScript
        // }, function() {
        //     console.log('Sitewash Message: Font sizes set to minimum 14.');
        // });

        chrome.tabs.executeScript({
            code: fontSizeScript
        });


	    // chrome.extension.getBackgroundPage().document.write("<style>body { background-color:#000 }</style>");
	});	
};

document.addEventListener('DOMContentLoaded', function() {
    createListener();
});