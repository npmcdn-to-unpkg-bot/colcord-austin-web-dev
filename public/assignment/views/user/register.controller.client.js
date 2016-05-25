(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    

    function RegisterController($location) {
        var vm = this;

        vm.register = register;
        function register(username, password, verifypassword) {
            var taken = false;

            for(var i in users) {
                if (users[i].username === username) {
                    vm.error = "Username taken";
                    taken = true;
                }
            }
            if (!taken) {
                if (password !== verifypassword) {
                    vm.error = "Passwords do not match";
                }
                else {
                    users.push({
                        _id: '999',
                        username: username,
                        password: password,
                        firstName: '',
                        lastName: ''
                    });
                    $location.url("/user/" + 999);
                    console.log(username)
                }
            }
            else {
                vm.error = "Username taken";
            }
        }
    }

})();