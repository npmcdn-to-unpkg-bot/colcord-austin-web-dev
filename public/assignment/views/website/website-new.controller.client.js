(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        vm.uid = $routeParams["uid"];


        function createWebsite(name, description) {
            var id = (new Date).getTime();

            var newWebsite = {
                _id: id,
                name: name,
                developerId: vm.uid,
                description: description
            };

            WebsiteService.createWebsite(vm.uid, newWebsite);
        }

    }
})();