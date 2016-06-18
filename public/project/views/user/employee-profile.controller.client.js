(function() {
    angular
        .module("Prepper")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $rootScope, $location, UserService) {
        var vm = this;
        vm.logout = logout;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            if(!vm.uid && $rootScope.currentUser) {
                vm.user = $rootScope.currentUser;
            }
            else {
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
        }
        init();

        function logout() {
            $rootScope.currentUser = null;

            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        $location.url("/login");
                    }
                )
        }
    }
    
})();