(function() {
    angular
        .module("Prepper")
        .controller("RegisterController", RegisterController);
    

    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword, firstName, lastName, email, restaurantId) {
            if (username && password && verifyPassword) {
                if (UserService.findUserByUsername(username.toLowerCase()) !== null) {
                    vm.error = "Username taken"
                }
                else if (firstName == null) {
                    vm.error = "Please enter a first name";
                }
                else if (lastName == null) {
                    vm.error = "Please enter a last name";
                }
                else if (password !== verifyPassword) {
                    vm.error = "Passwords do not match";
                }
                else if (!validateEmail(email)) {
                    vm.error = "Invalid email address";
                }
                else if (restaurantId == null) {
                    vm.error = "Please enter a restaurant id";
                }
                else {
                    var id = (new Date).getTime();
                    var newUser = {
                        _id: id,
                        username: username.toLowerCase(),
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        restaurantId: restaurantId
                    };

                    UserService.createUser(newUser);
                    $location.url("/user/" + id);
                }
            }
            else {
                vm.error = "Please enter a username and password"
            }
        }

        function validateEmail(email) {
            // found: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
})();