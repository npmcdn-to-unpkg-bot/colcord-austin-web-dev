module.exports = function() {

    var mongoose = require("mongoose");

    var PrepSchema = require("./prep.schema.server")();
    var Prep = mongoose.model("Prep", PrepSchema);

    var api = {
        createPrepList: createPrepList,
        findPrepListById: findPrepListById,
        findPrepListByRestaurantId: findPrepListByRestaurantId,
        updatePrepList: updatePrepList,
        deletePrepList: deletePrepList,

        addToPrepToDo: addToPrepToDo,
        addToPrepInProgress: addToPrepInProgress,
        addToPrepCompleted: addToPrepCompleted,
        removeFromPrepToDoList: removeFromPrepToDoList,
        removeFromPrepInProgressList: removeFromPrepInProgressList,
        removeFromPrepCompletedList: removeFromPrepCompletedList
    };
    return api;

    function createPrepList(prepList) {
        return Prep.create(prepList);
    }
    
    function findPrepListById(prepListId) {
        return Prep.findById(prepListId);
    }
    
    function findPrepListByRestaurantId(restaurantId) {
        return Prep.find({restaurantId: restaurantId});
    }
    
    function updatePrepList(prepListId, newPrepList) {
        return Prep.update(
            {_id: prepListId},
            {$set :
                {
                    type: newRecipe.type,
                    toDo: newPrepList.toDo,
                    inProgress: newPrepList.inProgress,
                    completed: newPrepList.completed
                }
            }
        )
    }
    
    function deletePrepList(prepListId) {
        return Prep.remove({_id: prepListId});
    }

    function addToPrepToDo(prepListId, ticket) {
        return Prep.findOne({_id: prepListId},
        function(err, doc) {
            doc.toDo.push(ticket);
            doc.save();
        })
    }

    function addToPrepInProgress(prepListId, ticket) {
        return Prep.findOne({_id: prepListId},
            function(err, doc) {
                doc.inProgress.push(ticket);
                doc.save();
            })
    }

    function addToPrepCompleted(prepListId, ticket) {
        return Prep.findOne({_id: prepListId},
            function(err, doc) {
                doc.completed.push(ticket);
                doc.save();
            })
    }

    function removeFromPrepToDoList(prepListId, ticketId) {
        return Prep.findOne({_id: prepListId},
            function(err, doc) {
                for(var i in doc) {
                    if (doc.toDo[i]._id === ticketId) {
                        doc.toDo.pull(doc.toDo[i]);
                        doc.save();
                    }
                }
            });
    }

    function removeFromPrepInProgressList(prepListId, ticketId) {
        return Prep.findOne({_id: prepListId},
            function(err, doc) {
                for(var i in doc) {
                    if (doc.inProgress[i]._id === ticketId) {
                        doc.inProgress.pull(doc.inProgress[i]);
                        doc.save();
                    }
                }
            });
    }

    function removeFromPrepCompletedList(prepListId, ticketId) {
        return Prep.findOne({_id: prepListId},
            function(err, doc) {
                for(var i in doc) {
                    if (doc.completed[i]._id === ticketId) {
                        doc.completed.pull(doc.completed[i]);
                        doc.save();
                    }
                }
            });
    }

};