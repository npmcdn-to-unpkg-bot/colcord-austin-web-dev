module.exports = function() {
    var mongoose = require("mongoose");
    
    var EmployeeSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        restaurantId: String,
        timers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Timer'}],
        dateCreate: {type: Date, default: Date.now()},
        dateUpdated: Date
    }, {collection: "project.employee"});
    
    return EmployeeSchema;
};