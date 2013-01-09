
// Tracking
function _trace(category, action, label) {
    try {
        _gaq.push(['_trackEvent', category, action, label]);
    } catch (e) {;}
}

function hideAll() {
    $('#choicer').hide();
    $('#preview').hide();
    $('#helper').hide();
    $('#paper').hide();
    $('#export-html').hide();
}

function deleteName(name) {
    var papers = JSON.parse(localStorage.getItem('papers')) || {};
    delete papers[name];
    localStorage.setItem('papers', JSON.stringify(papers));
//    chrome.storage.sync.set('');
}

function onResize() {
    var $stage = $('.fixed-width');
    $stage.width(window.innerWidth / 1.5);
    $stage.height(window.innerHeight - 80);
}

function getPaper() {
    return document.getElementById('paper');
}

function getSelection() {
    return getPaper().value.substr(getSelectionStart(), getSelectionEnd());
}

function setIndentWithCurrentSelection() {
    return getSelection().split("\n").map(function(val) { return "    " + val; }).join("\n");
}

function setUnindentWithCurrentSelection() {
    return getSelection().split("\n").map(function(val) {
        if (val && 0 < val.length) {
            for (var i = 0, len = val.length; i < len; i++) {
                var chr = val.charAt(i);
                console.log(chr);
                if (chr !== ' ' || 3 < i) {
                    break;
                }
            }
        }
        return val.substr(i);
    }).join("\n");
}

function setIndentToPaper() {
    getPaper().value = getPaper().value.substr(0, getSelectionStart())
        + setIndentWithCurrentSelection()
        + getPaper().value.substr(getSelectionEnd());
}

function setUnindentToPaper() {
    getPaper().value = getPaper().value.substr(0, getSelectionStart())
        + setUnindentWithCurrentSelection()
        + getPaper().value.substr(getSelectionEnd());
}

function getSelectionStart() {
    return getPaper().selectionStart;
}

function getSelectionEnd() {
    return getPaper().selectionEnd;
}


