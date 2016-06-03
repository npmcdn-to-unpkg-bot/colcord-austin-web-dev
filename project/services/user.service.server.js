module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com", restaurantId: 12345},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@wonderland.com", restaurantId: 33333},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@wonderland.com", restaurantId: 12345},
        {_id: "456", username: "ajdcolcord", password: "ajdcolcord", firstName: "Austin",   lastName: "Colcord", email: "ajd@wonderland.com", restaurantId: 12345}
    ];

    app.get("/api/employee", getUsers);
    app.post("/api/employee", createUser);
    app.get("/api/employee/:userId", findUserById);
    app.put("/api/employee/:userId", updateUser);
    app.delete("/api/employee/:userId", deleteUser);
    
    function createUser(req, res) {
        console.log("HERE");
        var newUser = req.body;

        for(var i in users) {
            if(users[i].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use");
                return;
            }
        }

        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }
    
    function deleteUser(req, res) {
        var id = req.params.userId;
        for(var i in users) {
            if(users[i]._id == id) {
                users.splice(i, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove user with ID " + id);
    }
    
    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for(var i in users) {
            if(users[i]._id == id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].email = newUser.email;
                users[i].password = newUser.password;
                res.sendStatus(200);
                return true;
            }
        }
        res.status(400).send("User with ID " + id + " not found");
    }
    
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
    }

    function findUserByCredentials(username, password, res) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(403);
    }

    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(users[i]._id == userId) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }
};