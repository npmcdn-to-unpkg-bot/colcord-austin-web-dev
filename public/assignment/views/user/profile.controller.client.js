(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams) {
        var vm = this;
        vm.updateUser = updateUser;

        var uid = $routeParams["uid"];
        var index = -1;

        function init() {
            for (var i in users) {
                if (users[i]._id === uid) {
                    vm.user = angular.copy(users[i]);
                    index = i;
                }
            }
        }
        init();

        function updateUser() {
            users[index].firstName = vm.user.firstName;
            users[index].lastName = vm.user.lastName;
            vm.success = "User successfully updated";
        }
    }

})();