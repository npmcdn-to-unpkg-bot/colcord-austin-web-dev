(function() {
    angular
        .module("Prepper")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        vm.uid = $routeParams["uid"];

        function init() {
            vm.user = angular.copy(UserService.findUserById(vm.uid));
        }
        init();

        function updateUser(current_pass, new_pass, verify_new_pass) {
            if (vm.user.password === current_pass) {
                if (new_pass && verify_new_pass && new_pass == verify_new_pass) {
                    vm.user.password = new_pass;
                    var result = UserService.updateUser(vm.user._id, vm.user);
                    if (result === true) {
                        vm.success = "User successfully updated";
                        $location.url("/user/" + vm.uid)
                    }
                    else {
                        vm.error = "User not successfully updated";
                    }
                }
                else {
                    vm.error = "New passwords must match and must not be empty"
                }
            }
            else {
                vm.error = "Incorrect Password";
            }
        }
    }

})();