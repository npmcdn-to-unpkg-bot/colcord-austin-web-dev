(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
    }
})();