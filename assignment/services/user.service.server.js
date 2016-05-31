module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com", restaurantId: 12345},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@wonderland.com", restaurantId: 33333},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@wonderland.com", restaurantId: 12345},
        {_id: "456", username: "ajdcolcord", password: "ajdcolcord", firstName: "Austin",   lastName: "Colcord", email: "ajd@wonderland.com", restaurantId: 12345}
    ];

    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }

        console.log(username);
        console.log(password);
        res.send(users);
    }

    function findUserByCredentials(username, password, response) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                response.send(users[u]);
            }
        }
        response.send({});
    }

    function findUserByUsername(username, response) {
        for(var u in users) {
            if(users[u].username === username) {
                response.send(users[u]);
            }
        }
        response.send({});
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(users[i]._id == userId) {
                res.send(users[i]);
            }
        }
        res.send({});
    }
};