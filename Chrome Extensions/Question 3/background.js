// To inject jQuery onto a page 

//chrome.tabs.onUpdated.addListener(function(tab) {
chrome.browserAction.onClicked.addListener(function(tab) {

     // inject jQuery, then execute hide.js on callback
     chrome.tabs.executeScript({
        file: 'jquery-3.6.0.min.js'
            }, function(x) {                   // callback function (parameter is required even if unused) 
                    chrome.tabs.executeScript({
                        file: "Rick_Rolls.js" 
                    });
     });
});
