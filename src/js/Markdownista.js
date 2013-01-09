/*!
 * Markdownista
 *
 * Copyright 2010-2012, Tetsuwo OISHI.
 * Dual license under the MIT license.
 * http://tetsuwo.tumblr.com
 *
 * Date: 2012-xx-xx
 */

function Markdownista() {
    this.REQUEST_TIME = new Date().getTime();

    // debug mode
    this.debugMode = false;
}

(function( md, undef ) {


md.prototype.hideAll = function() {
    $('#choicer').hide();
    $('#preview').hide();
    $('#helper').hide();
    $('#paper').hide();
};

md.prototype.deleteName(name) {
    var papers = JSON.parse(localStorage.getItem('papers')) || {};
    delete papers[name];
    localStorage.setItem('papers', JSON.stringify(papers));
};

md.prototype.onResize() {
    var $stage = $('.fixed-width');
    $stage.width(window.innerWidth / 1.5);
    $stage.height(window.innerHeight - 80);
};

md.prototype.getPaper() {
    return document.getElementById('paper');
};

md.prototype.getSelection() {
    return getPaper().value.substr(getSelectionStart(), getSelectionEnd());
};

md.prototype.setIndentWithCurrentSelection() {
    return getSelection().split("\n").map(function(val) { return "    " + val; }).join("\n");
};

md.prototype.setIndentToPaper() {
    document.getElementById('paper').value = getPaper().value.substr(0, getSelectionStart())
        + setIndentWithCurrentSelection()
        + getPaper().value.substr(getSelectionEnd());
};

md.prototype.getSelectionStart() {
    return document.getElementById('paper').selectionStart;
};

md.prototype.getSelectionEnd() {
    return document.getElementById('paper').selectionEnd;
};


/**
 * Logger
 *
 * @param a {Any}
 */
md.prototype.logger = function(a) {
    if (this.debug) {
        console.log(a);
    }
};


/**
 * Initialize Markdownista!
 *
 */
md.prototype.init = function() {
    this.logger(this);

    return true;
};


})(Markdownista);
