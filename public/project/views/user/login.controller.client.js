(function() {
    angular
        .module("Prepper")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        function login(username, password) {
            if (username != null) {
                var user = UserService.findUserByCredentials(username.toLowerCase(), password);

                if (user) {
                    var id = user._id;
                    $location.url("/user/" + id);
                }
                else {
                    vm.error = "Username not found or incorrect password";
                }
            }
            else {
                vm.error = "Please enter a username";
            }
        }
    }
    
})();