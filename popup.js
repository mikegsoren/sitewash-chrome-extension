var queryInfo = {
   active: true,
   currentWindow: true
};

function createListeners() {

    var washButton = document.getElementById('wash');
    washButton.addEventListener('click', function() {
        wash();
    });

    var metadataButton = document.getElementById('metadata-button');
    metadataButton.addEventListener('change', function() {
    	metadata(metadataButton);
    });

    var textrange = document.getElementById('text-range-slider');

    // textrange.noUiSlider.on('set', function() {
    // 	textrangeHandler(textrange);
    // });

    textrange.noUiSlider.on('update', function() {
    	textrangeviewHandler(textrange);
    })
}

function wash() {

	var textrange = document.getElementById('text-range-slider');
	var min = textrange.noUiSlider.get()[0];
	var max = textrange.noUiSlider.get()[1];

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

        chrome.tabs.executeScript({file: 'dom-script.js'}, function() {
        	chrome.tabs.sendMessage(tab.id, {scriptOptions: {'minFontSize': min,'maxFontSize': max}}, function() {
        		// console.log('message sent');
        	});
        });
	});	
};

function metadata(btn) {

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

// function textrangeHandler(range) {
// 	var min = range.noUiSlider.get()[0];
// 	var max = range.noUiSlider.get()[1];

// 	chrome.tabs.query(queryInfo, function(tabs) {
// 		// chrome.tabs.query invokes the callback with a list of tabs that match the
// 		// query. When the popup is opened, there is certainly a window and at least
// 		// one tab, so we can safely assume that |tabs| is a non-empty array.
// 		// A window can only have one active tab at a time, so the array consists of
// 		// exactly one tab.
// 		tab = tabs[0];

//         chrome.tabs.executeScript({file: 'dom-script.js'}, function() {
//         	chrome.tabs.sendMessage(tab.id, {scriptOptions: {'minFontSize': min,'maxFontSize': max}}, function() {
//         		// console.log('message sent');
//         	});
//         });
// 	});	
// };

function textrangeviewHandler(range) {
	var min = range.noUiSlider.get()[0];
	var max = range.noUiSlider.get()[1];

	var minSpan = document.getElementById('min-view');
	minSpan.innerHTML = "Current min: " + min + 'px';

	var maxSpan = document.getElementById('max-view');
	maxSpan.innerHTML = "Current max: " + max + 'px';
}

document.addEventListener('DOMContentLoaded', function() {

    var textrange = document.getElementById('text-range-slider');
    noUiSlider.create(textrange, {
    	start: [10, 90],
    	connect: true,
    	range: {
    		'min': 0,
    		'max': 100
    	}
    });

    createListeners();
});