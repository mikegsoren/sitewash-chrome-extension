(function() {


    console.log(document.getElementById("wash"));


    var wash = function () {

        console.log(chrome.extension.getBackgroundPage());

        var washStyles = document.createElement('style');

        chrome.extension.getBackgroundPage().document.write("<style>body { background-color:#000 }</style>");
    };

    var washButton = document.getElementById('wash');
    washButton.addEventListener('click', function() {
        wash();
    }); 

})();