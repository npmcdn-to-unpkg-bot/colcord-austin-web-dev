module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/prep.service.server.js")(app);
    require("./services/recipe.service.server.js")(app);
    require("./services/timer.service.server.js")(app);
};