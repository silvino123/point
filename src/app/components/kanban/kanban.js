(function() {
    'use strict';

    $(initKanban);

    function initKanban() {

        if (typeof dragula === 'undefined') return;

        // https://github.com/bevacqua/dragula/issues/426#issuecomment-260434933
        window.addEventListener('touchmove', function() {});

        calculateTotals(document.querySelector('#pending'));
        calculateTotals(document.querySelector('#in-progress'));
        calculateTotals(document.querySelector('#done'));

        dragula([
            document.querySelector('#pending'),
            document.querySelector('#in-progress'),
            document.querySelector('#done')
        ]).on('drop', function(el, target, source, sibling) {

            updateState(target);

            calculateTotals(target);
            calculateTotals(source);

        });

        function removeBackground(index, className) {
            return (className.match(/(^|\s)bg-gradient-\S+/g) || []).join(' ');
        }

        function removeBadge(index, className) {
            return (className.match(/(^|\s)badge-\S+/g) || []).join(' ');
        }

        function calculateTotals(target) {
            var budgets = $(target).find('.budget');
            var total = 0;
            budgets.each(function() { total += parseFloat($(this).text().replace('$', '').trim(), 2) })
            $(target).parents('.cardbox').find('.total').text('$ ' + total);
        }

        function updateState(target) {
            var topline = $(target).find('.top-line');
            var badge = $(target).find('.badge');
            if (target.id == 'pending') {
                topline.removeClass(removeBackground).addClass('bg-gradient-primary');
                badge.removeClass(removeBadge).addClass('badge-primary');
            }
            if (target.id == 'in-progress') {
                topline.removeClass(removeBackground).addClass('bg-gradient-info');
                badge.removeClass(removeBadge).addClass('badge-info');
            }
            if (target.id == 'done') {
                topline.removeClass(removeBackground).addClass('bg-gradient-success');
                badge.removeClass(removeBadge).addClass('badge-success');
            }
        }

    }

})();