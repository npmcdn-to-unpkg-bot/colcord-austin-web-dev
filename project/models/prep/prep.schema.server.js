module.exports = function() {
    var mongoose = require("mongoose");

    var PrepSchema = mongoose.Schema({
        restaurantId: Number,
        toDo: [{
            recipeId: Number,
            name: String,
            important: Boolean,
            signer: String,
            timeStamp: {type: Date, default: Date.now()}
        }],
        inProgress: [{
            recipeId: Number,
            name: String,
            important: Boolean,
            signer: String,
            timeStamp: Date
        }],
        completed: [{
            recipeId: Number,
            name: String,
            important: Boolean,
            signer: String,
            timeStamp: Date
        }]
    }, {collection: "project.prep"});
    
    return PrepSchema;
};