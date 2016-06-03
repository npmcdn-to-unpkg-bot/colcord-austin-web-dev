(function() {
    angular
        .module("Prepper")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

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

        function updateUser(current_pass, new_pass, verify_new_pass) {
            if (vm.user.password === current_pass) {
                if (new_pass && verify_new_pass && new_pass == verify_new_pass) {
                    vm.user.password = new_pass;

                    UserService
                        .updateUser(vm.uid, vm.user)
                        .then(
                            function(res) {
                                vm.success = "User successfully updated";
                                $location.url("/user/" + vm.uid);
                            },
                            function(error) {
                                vm.error = error.data;
                            }
                        );
                }
                else {
                    vm.error = "New passwords must match and must not be empty";
                }
            }
            else {
                vm.error = "Incorrect Password";
            }
        }
    }

})();