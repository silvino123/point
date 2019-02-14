(function() {
    'use strict';

    $(initFooTable);

    function initFooTable() {

        if (!$.fn.footable) return;

        $('.footable').footable();
        $('.footable-sort').footable();

        $('.sort-column').click(function(e) {
            e.preventDefault();
            //get the footable sort object
            var footableSort = $('.footable-sort').data('footable-sort');
            //get the index we are wanting to sort by
            var index = $(this).data('index');
            footableSort.doSort(index, 'toggle');
        });

    }

})();