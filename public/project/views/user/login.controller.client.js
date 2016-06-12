(function() {
    angular
        .module("Prepper")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.submitted = false;

        vm.login = login;
        function login(username, password) {
            vm.submitted = true;
            if (username != null) {
                var user = UserService
                    .findUserByCredentials(username.toLowerCase(), password)
                    .then(
                        function(response) {
                            var id = response.data._id;
                            $location.url("/user/" + id);
                            vm.submitted = false;

                        },
                        function(error) {
                            vm.error = "Incorrect Username or Password";
                        }
                    );
            }
            else {
                vm.error = "Please enter a username";
            }
        }
    }
    
})();