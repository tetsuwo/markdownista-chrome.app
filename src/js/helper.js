
function hideAll() {
    $('#choicer').hide();
    $('#preview').hide();
    $('#paper').hide();
}

function deleteName(name) {
    var papers = JSON.parse(localStorage.getItem('papers')) || {};
    delete papers[name];
    localStorage.setItem('papers', JSON.stringify(papers));
}

