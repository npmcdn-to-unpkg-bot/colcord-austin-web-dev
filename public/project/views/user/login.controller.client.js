(function() {
    angular
        .module("Prepster")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);

            if(user) {
                var id = user._id;
                $location.url("/user/" + id);
            }
            else {
                vm.error = "Username not found or incorrect password";
            }
        }
    }
    
})();