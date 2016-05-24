(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];


    function PageListController($location) {
        var vm = this;

        vm.listPages = listPages;


        // vm.login = login;
        // function login(username, password) {
        //     for(var i in users) {
        //         if(users[i].username === username && users[i].password == password) {
        //             var id = users[i]._id;
        //             $location.url("/user/" + id);
        //         }
        //         else {
        //             vm.error = "User not found";
        //         }
        //     }
        // }
    }

    // function NewPageController($location) {
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
    // function EditPageController($routeParams) {
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