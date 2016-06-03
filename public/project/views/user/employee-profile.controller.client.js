(function() {
    angular
        .module("Prepper")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        init();
    }
    
})();