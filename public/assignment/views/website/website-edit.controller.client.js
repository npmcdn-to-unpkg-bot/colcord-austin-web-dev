(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    
    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.wid));
        }
        init();

        function updateWebsite() {
            var result = WebsiteService.updateWebsite(vm.wid, vm.website);
            $location.url("/user/"+ vm.uid + "/website");
        }
    }
})();