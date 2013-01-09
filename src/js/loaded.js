
// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-17392775-11']);
_gaq.push(['_trackPageview']);
(function(d) {
    var ga = d.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = d.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})(document);

// Twitter
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    }
})(document, "script", "twitter-wjs");

// Facebook
/*(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/ja_JP/all.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

window.fbAsyncInit = function() {
    FB.init({
        appId      : '279973812102399', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
};*/

// LinkedIn
/*(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://platform.linkedin.com/in.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();*/

// Google+
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();


CHANGED = false;

// loaded
(function($) {

    // resize
    $(window).resize(onResize).resize();

    // open
    $('body').show();

    // change paper
    $('#paper').keypress(function() {
        CHANGED = true;
    });

    /**
     * Share mode
     */
    $('.share').click(function() {
        var
        $sharer = $('#sharer'),
        opened = $sharer.data('open') || false;

        if (opened) {
            $sharer.hide().data('open', false);
        } else {
            $sharer.show().data('open', true);
        }
    });

    /**
     * Help mode
     */
    $('.help').click(function() {
        hideAll();
        $('#helper').show();
    });

    /**
     * Load mode
     */
    $('.load').click(function() {
        hideAll();

        var $choicer = $('#choicer');
        $choicer.find('ul').empty();

        var papers = JSON.parse(localStorage.getItem('papers'));
        attachLoadData($choicer, papers);

        //chrome.storage.sync.get('papers', function(papers) {
        //    attachLoadData($choicer, papers);
        //});

        $choicer.show();
    });

    var attachLoadData = function($choicer, papers) {
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
                    CHANGED = false;
                    $('#paper').show().focus();
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
    };

    /**
     * Save mode
     */
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
        //chrome.storage.sync.set({'papers': JSON.stringify(papers)});
        //chrome.storage.sync.set({'papers': papers});

        CHANGED = false;
        $('#paper').data('name', name);
    });

    /**
     * Preview mode
     */
    $('.preview').toggle(function() {
        $(this).val('BACK');
        hideAll();
        // markdown.js
        $('#preview').html(window.markdown.toHTML($('#paper').val())).show();
        // js-markdown-extra.js
        //var MarkdownParser = new MarkdownExtra_Parser();
        //$('#preview').html(MarkdownParser.transform($('#paper').val())).show();
    }, function() {
        $(this).val('PREVIEW');
        hideAll();
        $('#paper').show();
        $('#preview').empty();
    });

    /**
     * HTML Export mode
     */
    $('.export-html').off('click').on('click', function() {
        hideAll();
        $('#export-html').show().focus();
        // markdown.js
        $('#export-html').val(window.markdown.toHTML($('#paper').val())).show();
        // js-markdown-extra.js
        //var MarkdownParser = new MarkdownExtra_Parser();
        //$('#preview').html(MarkdownParser.transform($('#paper').val())).show();
    });

    /**
     * Type mode
     */
    $('.type').click(function() {
        hideAll();
        $('#paper').show().focus();
    });

    /**
     * onUnload
     */
    $(window).bind('beforeunload', function() {
        return CHANGED ? 'データ消えちゃうよ！' : null ;
    });

    /**
     * Shortcut command
     */
    shortcut.add('Ctrl+Enter',function() {
        $('.preview').click();
    });
    shortcut.add('Ctrl+s',function() {
        $('.save').click();
    });
    shortcut.add('Ctrl+l',function() {
        $('.load').click();
    });
    shortcut.add('Ctrl+i',function() {
        $('.type').click();
    });
    shortcut.add('Ctrl+h',function() {
        $('.help').click();
    });
    /*shortcut.add('Tab',function() {
        setIndentToPaper();
    });
    shortcut.add('Shift+Tab',function() {
        setUnindentToPaper();
    });*/

})(jQuery);
