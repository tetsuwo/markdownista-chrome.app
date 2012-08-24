(function($) {

    var $paper = $('#paper, #preview');
    $paper.width(window.innerWidth / 2);
    $paper.height(window.innerHeight);

    $('body').show();

    $('.load').click(function() {
//        var name = window.prompt('Input you are want to load the file name');
//        console.log(name);
//        var papers = JSON.parse(localStorage.getItem('papers'));
//        var text = JSON.parse(papers[name]);
//        $paper.val(text);

        hideAll();
        $('#choicer ul').empty();

        var papers = JSON.parse(localStorage.getItem('papers'));
        var $result = $('#choicer');
        $.each(papers, function(k) {
            var $a = $('<a />', {
                text: k,
                click: function() {
                    var name = $(this).data('name');
                    console.log(name);

                    if (!name) {
                        alert('FAILED');
                        return false;
                    }

                    var papers = JSON.parse(localStorage.getItem('papers'));
                    $('#paper').val(JSON.parse(papers[name])).data('name');

                    hideAll();
                    $('#paper').slideDown();
                }
            }).data('name', k);

            $result.append($('<li />').append($a));
        });

        $('#choicer').slideDown();
    });

    $('.save').click(function() {
        var currentName = $('#paper').data('name') || '';
        var name = window.prompt('What is file name?', currentName);
        console.log(name);

        var papers = JSON.parse(localStorage.getItem('papers')) || {};
        papers[name] = JSON.stringify($('#paper').val());
        localStorage.setItem('papers', JSON.stringify(papers));
    });

    $('.preview').toggle(function() {
        $(this).val('BACK');
        hideAll();
        $('#preview').html(window.markdown.toHTML($('#paper').val())).slideDown();
    }, function() {
        $(this).val('PREVIEW');
        hideAll();
        $('#paper').slideDown();
        $('#preview').empty();
    });

    $(window).bind('beforeunload', function() {
        return 'データ消えちゃうよ！';
    });

    shortcut.add('Ctrl+Enter',function() {
        $('.preview').click();
    });

    shortcut.add('Ctrl+s',function() {
        $('.save').click();
    });

    shortcut.add('Ctrl+l',function() {
        $('.load').click();
    });

})(jQuery);
