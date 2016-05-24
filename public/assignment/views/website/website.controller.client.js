(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteListController() {
        var vm = this;
        vm.updateUser = updateUser;
        var uid = $routeParams["uid"];
        var index = -1;
    
        function init() {
            for (var i in users) {
                if (users[i]._id === uid) {
                    vm.user = users[i];
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


    // function LoginController($location) {
    //     var vm = this;
    //
    //     vm.login = login;
    //     function login(username, password) {
    //         for(var i in users) {
    //             if(users[i].username === username && users[i].password == password) {
    //                 var id = users[i]._id;
    //                 $location.url("/user/" + id);
    //             }
    //             else {
    //                 vm.error = "User not found";
    //             }
    //         }
    //     }
    // }
    //
    // function RegisterController($location) {
    //     var vm = this;
    //
    //     vm.register = register;
    //     function register(username, password, verifypassword) {
    //         var taken = false;
    //
    //         for(var i in users) {
    //             if (users[i].username === username) {
    //                 vm.error = "Username taken";
    //                 taken = true;
    //             }
    //         }
    //         if (!taken) {
    //             if (password !== verifypassword) {
    //                 vm.error = "Passwords do not match";
    //             }
    //             else {
    //                 users.push({
    //                     _id: '999',
    //                     username: username,
    //                     password: password,
    //                     firstName: '',
    //                     lastName: ''
    //                 });
    //                 $location.url("/user/" + 999);
    //                 console.log(username)
    //             }
    //         }
    //         else {
    //             vm.error = "Username taken";
    //         }
    //     }
    // }
    //
    // function ProfileController($routeParams) {
    //     var vm = this;
    //     vm.updateUser = updateUser;
    //     var uid = $routeParams["uid"];
    //     var index = -1;
    //
    //     function init() {
    //         for (var i in users) {
    //             if (users[i]._id === uid) {
    //                 vm.user = users[i];
    //                 index = i;
    //             }
    //         }
    //     }
    //     init();
    //
    //     function updateUser() {
    //         users[index].firstName = vm.user.firstName;
    //         users[index].lastName = vm.user.lastName;
    //         vm.success = "User successfully updated";
    //     }
    // }

})();