(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);
    
    function WidgetChooserController($routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
    }
})();