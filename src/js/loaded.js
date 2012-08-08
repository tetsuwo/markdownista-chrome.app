(function($) {

    var $paper = $('#paper');
    $paper.width(window.innerWidth / 2);
    $paper.height(window.innerHeight);

    $('body').show();

    $('.load').click(function() {
        var name = window.prompt('Input you are want to load the file name');
        console.log(name);

        var papers = JSON.parse(localStorage.getItem('papers'));
        var text = JSON.parse(papers[name]);
        $paper.val(text);
    });

    $('.save').click(function() {
        var name = window.prompt('What is file name?');
        console.log(name);

        var papers = JSON.parse(localStorage.getItem('papers')) || {};
        papers[name] = JSON.stringify($paper.val());
        localStorage.setItem('papers', JSON.stringify(papers));
    });

    $(window).bind('beforeunload', function() {
        return 'データ消えちゃうよ！';
    });

})(jQuery);
