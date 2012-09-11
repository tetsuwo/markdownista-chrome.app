
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
}

function deleteName(name) {
    var papers = JSON.parse(localStorage.getItem('papers')) || {};
    delete papers[name];
    localStorage.setItem('papers', JSON.stringify(papers));
}

function onResize() {
    var $stage = $('.fixed-width');
    $stage.width(window.innerWidth / 1.5);
    $stage.height(window.innerHeight - 80);
}
