(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    function LoginController($location) {
        var vm = this;

        vm.login = login;
        function login(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password == password) {
                    var id = users[i]._id;
                    $location.url("/user/" + id);
                }
                else {
                    vm.error = "User not found";
                }
            }
        }
    }

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