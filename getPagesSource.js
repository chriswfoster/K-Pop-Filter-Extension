
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;

    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.CDATA_SECTION_NODE:
                html += '<![CDATA[' + node.nodeValue + ']]>';
                break;
            case Node.COMMENT_NODE:
                html += '<!--' + node.nodeValue + '-->';
                break;
            case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
                break;
        }
        node = node.nextSibling;
    }
    // console.log("ALL OF THE HTML: ", html)
    chrome.storage.sync.get('lock', function (data) {
        let lockDown = data.lock === 'true' ? 'false' : 'true';
        if (lockDown === 'true') {

            chrome.storage.sync.set({ color: '#3aa757' }, function () {
                console.log("The color is green.");
            });
        } else {

            chrome.storage.sync.set({ color: '#FF0000' }, function () {
                console.log("The color is red.");
            });
        }
    });
    return '';
    // if(html.includes('poop')) {
    //     console.log("DOES INCLUDE TEST");
    //     html = "DOES INCLUDE TEST"
    //     window.location.href = "https://www.google.com/";
    //     // location.replace('http://example.com')
    // } else {
    //     console.log("DOES NOT INCLUDE TEST")
    //     html = "DOES NOT INCLUDE TEST"
    //     window.location.href = "http://www.w3schools.com";
    //     // location.replace('http://example.com')
    // }
    // return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});