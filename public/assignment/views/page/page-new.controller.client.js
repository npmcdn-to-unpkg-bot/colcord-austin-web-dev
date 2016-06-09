(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];

        function createPage(name, title) {
            if (name != null && name != "") {
                var newPage = {
                    name: name,
                    websiteId: vm.wid,
                    title: title
                };
                PageService
                    .createPage(vm.wid, newPage)
                    .then(
                        function(response) {
                            vm.success = "Created new website";
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
            else {
                vm.error = "Please Enter a Page Name";
            }
        }

    }
})();