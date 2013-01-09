describe('Markdownista', function() {

    var elements = [
        '#choicer',
        '#preview',
        '#helper',
        '#paper',
        '#export-html'
    ];

    it('default', function() {
        for (var key in elements) {
            var target = elements[key];

            if ('#paper' === target) {
                expect($(target).css('display')).toEqual('block');
            } else {
                expect($(target).css('display')).toEqual('none');
            }
        }
    });

    it('hideAll', function() {
        hideAll();
        for (var key in elements) {
            var target = elements[key];
            expect($(target).css('display')).toEqual('none');
        }
    });

});
