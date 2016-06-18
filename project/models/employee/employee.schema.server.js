module.exports = function() {
    var mongoose = require("mongoose");
    
    var EmployeeSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        restaurantId: String,
        dateCreate: {type: Date, default: Date.now()},
        dateUpdated: Date,
        google: {
            id:    String,
            token: String
        }
    }, {collection: "project.employee"});
    
    return EmployeeSchema;
};