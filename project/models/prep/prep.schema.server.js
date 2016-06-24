module.exports = function() {
    var mongoose = require("mongoose");

    var PrepSchema = mongoose.Schema({
        restaurantId: Number,
        toDo: [{
            _recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            name: String,
            important: Boolean,
            notes: String,
            timeStamp: {type: Date, default: Date.now()},
            order: Number
        }],
        inProgress: [{
            _recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            name: String,
            important: Boolean,
            notes: String,
            timeStamp: Date,
            order: Number
        }],
        completed: [{
            _recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            name: String,
            important: Boolean,
            notes: String,
            timeStamp: Date,
            order: Number,
            completeTime: Date
        }]
    }, {collection: "project.prep"});
    
    return PrepSchema;
};