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

	let wordList = ['k pop', 'kpop', 'k-pop', 'blackpink', 'GOT7', 'NCT'] // YUP
	chrome.storage.sync.get('lock', function (data) {
		if (data.lock === 'true') {
			wordList.forEach(wd => {
				if (html.toLowerCase().includes(wd.toLowerCase())) {
					console.log("BAD WORD DETECTED: ", wd);
					console.log()
					location.replace('https://i.pinimg.com/originals/c2/30/d4/c230d400121c4e177fb5b212e54f51f5.gif')
				}
			})
		}
		console.log("here is lock when we land on the page: ", data.lock)
	})



	// if(html) {
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
	return html;
}
DOMtoString(document);