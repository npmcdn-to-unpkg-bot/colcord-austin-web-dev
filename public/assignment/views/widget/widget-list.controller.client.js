(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getTrustedHTML = getTrustedHTML;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }
        init();

        function getTrustedHTML(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }
    }
})();