chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#FF0000' }, function () {
        console.log("The color is green.");
    });
    chrome.storage.sync.set({ lock: 'true' }, function () {
        console.log("This thing is locked yo.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                // pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    let changeColor = document.getElementById('changeColor');
    console.log("Does changeColor exist? ", changeColor);
    chrome.storage.sync.get('color', function(data) {
        console.log("Getter of get attriptute logging... then sets value after this.")
        if(changeColor) {
            changeColor.style.backgroundColor = data.color;
            changeColor.setAttribute('value', data.color);
        }
    });

});

