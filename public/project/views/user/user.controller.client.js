(function() {
    angular
        .module("Prepster")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users = [
        {_id: "123", username: "alice",     firstname: "Alice",     lastname: "Wonderland", password: "alice",   email: "alice@wonderland.com", restaurantid: 12345678},
        {_id: "333", username: "joe",       firstname: "Joe",       lastname: "Smith",      password: "joe",     email: "joe@smith.com",        restaurantid: 12665678},
        {_id: "512", username: "richard",   firstname: "Richard",   lastname: "Morrison",   password: "richard", email: "richard@morrison.com", restaurantid: 12345678}
    ];

    function LoginController($location) {
        var vm = this;

        vm.login = login;
        function login(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password == password) {
                    var id = users[i]._id;
                    $location.url("/user/" + id);
                }
                else {
                    vm.error = "User not found";
                }
            }
        }
    }

    function ProfileController($location, $routeParams) {
        var vm = this;
        vm.editProfile = editProfile;
        // vm.updateProfile = updateProfile;
        
        var uid = $routeParams["uid"];
        var index = -1;
        console.log("hello");
        console.log(uid);


        function init() {
            for (var i in users) {
                if (users[i]._id === uid) {
                    vm.user = users[i];
                    index = i;
                }
            }
        }
        init();

        function editProfile() {
            $location.url("/user/" + uid + "/edit");
        }
        // function updateProfile() {
        //    
        // }
    }
    
})();