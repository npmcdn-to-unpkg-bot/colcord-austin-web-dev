(function() {
    angular
        .module("Prepper")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/employee", user);
        }

        function findUserById(userId) {
            return $http.get("/api/employee/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/employee?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/employee?username=" + username + "&password=" + password);
        }

        function updateUser(userId, user, currentPassword) {
            return $http.put("/api/employee/" + userId, user);
        }
        
        function deleteUser(userId) {
            return $http.delete("/api/employee/" + userId);
        }
    }

})();