(function() {
    angular
        .module("ajcDirectives", [])
        .directive("ajcSortable", ajcSortable);

    function ajcSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            console.log('here');

            $(element)
                .sortable({
                    axis: 'y',
                    
                    start: function(event, ui) {
                        startIndex = ui.item.index();
                        console.log('sorting' + startIndex);
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        var sortedElement = scope.data.splice(startIndex, 1)[0];
                        scope.data.splice(endIndex, 0, sortedElement);
                        scope.$apply();
                        scope.reorder({start: startIndex, end: endIndex});
                        console.log('done sorting' + endIndex);
                    }
                });
        }
        return {
            scope: {
                data: "=",
                reorder: "&sorted"
            },
            link: linker
        }

    }
})();