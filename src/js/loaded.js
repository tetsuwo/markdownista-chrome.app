(function($) {

    var $stage = $('.fixed-width');
    $stage.width(window.innerWidth / 2);
    $stage.height(window.innerHeight);

    $('body').show();

    $('.help').click(function() {
        hideAll();
        $('#helper').slideDown();
    });

    $('.type').click(function() {
        hideAll();
        $('#paper').slideDown();
    });

    $('.load').click(function() {
        hideAll();

        var $choicer = $('#choicer');
        var papers = JSON.parse(localStorage.getItem('papers'));
        $choicer.find('ul').empty();

        $.each(papers, function(k) {
            var $loadLink = $('<a />', {
                text: k,
                class: 'load',
                click: function() {
                    var name = $(this).data('name');
                    console.log(name);

                    if (!name) {
                        alert('FAILED');
                        return false;
                    }

                    var papers = JSON.parse(localStorage.getItem('papers'));
                    $('#paper').val(JSON.parse(papers[name])).data('name', name);

                    hideAll();
                    $('#paper').slideDown().focus();
                }
            }).data('name', k);

            var $deleteLink = $('<a />', {
                text: 'Delete',
                class: 'delete',
                click: function() {
                    var name = $(this).data('name');
                    console.log(name);

                    if (!name) {
                        alert('FAILED');
                        return false;
                    }

                    if (!confirm('Do you really want to delete?')) {
                        return false;
                    }

                    deleteName(name);

                    $('.load').click();
                }
            }).data('name', k);

            $choicer.find('ul').append(
                    $('<li />').append($loadLink).append($deleteLink));
        });

        $choicer.slideDown();
    });

    $('.save').click(function() {
        var currentName = $('#paper').data('name') || '';
        var name = $.trim(window.prompt('What is file name?', currentName));

        if (!name) {
            alert('Please input this file name');
            return false;
        }

        var papers = JSON.parse(localStorage.getItem('papers')) || {};
        papers[name] = JSON.stringify($('#paper').val());
        localStorage.setItem('papers', JSON.stringify(papers));

        $('#paper').data('name', name);
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

    shortcut.add('Ctrl+w',function() {
        $('.type').click();
    });

    shortcut.add('Ctrl+h',function() {
        $('.help').click();
    });

})(jQuery);
