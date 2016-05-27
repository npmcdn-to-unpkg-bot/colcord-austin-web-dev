(function() {
    angular
        .module("Prepster")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com", restaurantId: 12345},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@wonderland.com", restaurantId: 33333},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@wonderland.com", restaurantId: 12345},
            {_id: "456", username: "ajdcolcord", password: "ajdcolcord", firstName: "Austin",   lastName: "Colcord", email: "ajd@wonderland.com", restaurantId: 12345}
        ];

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
            users.push(user);
        }

        function findUserById(userId) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var i in users) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password == password) {
                    return users[i];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var i in users) {
                if(users[i]._id == userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    users[i].password = user.password;
                    return true;
                }
            }
            return false;
        }
        
        function deleteUser(userId) {
            for(var i in users) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                }
            }
        }
    }

})();