module.exports = function(app) {
    // var userService = require("./services/user.service.server")(app);

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);


    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com", restaurantId: 12345},
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@wonderland.com", restaurantId: 33333},
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@wonderland.com", restaurantId: 12345},
    //     {_id: "456", username: "ajdcolcord", password: "ajdcolcord", firstName: "Austin",   lastName: "Colcord", email: "ajd@wonderland.com", restaurantId: 12345}
    // ];
    //
    // app.get("/allusers/:username", function(req, res) {
    //     var username = req.params['username'];
    //     for(var i in users) {
    //         if(users[i].username === username) {
    //             res.send(users[i]);
    //         }
    //     }
    // });
    //
    //
    //
    // app.get("/say/:message", function(req, res) {
    //     var msg = req.params["message"];
    //     res.send({message: msg});
    // });
};