module.exports = function(app, models) {

    var employeeModel = models.employeeModel;
    var prepModel = models.prepModel;

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com", restaurantId: "12345"},
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@wonderland.com", restaurantId: "33333"},
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@wonderland.com", restaurantId: "12345"},
    //     {_id: "456", username: "ajdcolcord", password: "ajdcolcord", firstName: "Austin",   lastName: "Colcord", email: "ajd@wonderland.com", restaurantId: "12345"}
    // ];

    app.get("/api/employee", getUsers);
    app.post("/api/employee", createUser);
    app.get("/api/employee/:userId", findUserById);
    app.put("/api/employee/:userId", updateUser);
    app.delete("/api/employee/:userId", deleteUser);
    
    function createUser(req, res) {
        var newUser = req.body;
        employeeModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    if(!user) {
                        employeeModel
                            .createUser(newUser)
                            .then(
                                function(user) {
                                    res.send(user._id);
                                    prepModel
                                        .findPrepListByRestaurantId(newUser.restaurantId)
                                        .then(
                                            function(response) {
                                                if (response == null) {
                                                    var newPrepList = {
                                                        restaurantId: parseInt(newUser.restaurantId),
                                                        toDo: [],
                                                        inProgress: [],
                                                        completed: []
                                                    };
                                                    prepModel
                                                        .createPrepList(newPrepList)
                                                        .then(
                                                            function(response) {
                                                                res.sendStatus(200);
                                                            },
                                                            function(error) {
                                                                res.status(400).send("Error creating prepList");
                                                            }
                                                        )
                                                }
                                            },
                                            function(error) {
                                                res.status(400).send("Error creating prepList ");
                                            })

                                },
                                function(error) {
                                    res.status(400).send("Unable to create new user: " + newUser.username);
                                }
                            )


                    }
                    else {
                        res.status(400).send("Username " + newUser.username + " is already in use");
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function deleteUser(req, res) {
        var userId = req.params.userId;
        employeeModel
            .deleteUser(userId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove user with ID " + userId);
                }
            );
    }
    
    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        employeeModel
            .updateUser(userId, newUser)
            .then(
                function(user) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID " + userId);
                }
            );
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
            res.status(403).send("Username and Password not Provided");
        }
    }

    function findUserByCredentials(username, password, res) {
        employeeModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user) {
                        res.json(user);
                    }
                    else {
                        res.status(403).send("Username and Password Not Found");
                    }
                },
                function(error) {
                    res.status(403).send("Unable to login");
                }
            );
    }

    function findUserByUsername(username, res) {
        employeeModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("User with username " + username + " not found");
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        employeeModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
};