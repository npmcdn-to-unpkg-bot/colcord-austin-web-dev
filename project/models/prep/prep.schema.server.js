module.exports = function() {
    var mongoose = require("mongoose");

    var PrepSchema = mongoose.Schema({
        restaurantId: Number,
        toDo: [{
            _recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            name: String,
            important: Boolean,
            signer: String,
            timeStamp: {type: Date, default: Date.now()}
        }],
        inProgress: [{
            _recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            name: String,
            important: Boolean,
            signer: String,
            timeStamp: Date
        }],
        completed: [{
            _recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            name: String,
            important: Boolean,
            signer: String,
            timeStamp: Date
        }]
    }, {collection: "project.prep"});
    
    return PrepSchema;
};