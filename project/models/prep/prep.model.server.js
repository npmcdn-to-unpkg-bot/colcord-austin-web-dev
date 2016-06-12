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
        removeFromPrepCompletedList: removeFromPrepCompletedList,

        reorderToDo: reorderToDo
    };
    return api;

    function createPrepList(prepList) {
        return Prep.create(prepList);
    }
    
    function findPrepListById(prepListId) {
        return Prep.findById(prepListId);
    }
    
    function findPrepListByRestaurantId(restaurantId) {
        return Prep.findOne({restaurantId: restaurantId});
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
        });
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
                for(var i in doc.toDo) {
                    if (doc.toDo[i]._id == ticketId) {
                        doc.toDo.splice(i, 1);
                        doc.save();
                    }
                }
            });
    }

    function removeFromPrepInProgressList(prepListId, ticketId) {
        return Prep.findOne({_id: prepListId},
            function(err, doc) {
                for(var i in doc.inProgress) {
                    if (doc.inProgress[i]._id == ticketId) {
                        doc.inProgress.splice(i, 1);
                        doc.save();
                    }
                }
            });
    }

    function removeFromPrepCompletedList(prepListId, ticketId) {
        return Prep.findOne({_id: prepListId},
            function(err, doc) {
                for(var i in doc.completed) {
                    if (doc.completed[i]._id == ticketId) {
                        doc.completed.splice(i, 1);
                        doc.save();
                    }
                }
            });
    }

    function reorderToDo(startOrder, endOrder, prepListId) {
        var start = parseInt(startOrder);
        var end = parseInt(endOrder);
        return Prep
            .findOne({_id: prepListId}, function(err, prepList) {
                prepList.toDo.forEach(function(ticket) {
                    if(start < end) {
                        if(ticket.order > start && ticket.order <= end) {
                            ticket.order--;
                            prepList.save();
                        }
                        else if(ticket.order === start) {
                            ticket.order = end;
                            prepList.save();
                        }
                    }
                    else {
                        if(ticket.order >= end && ticket.order < start) {
                            ticket.order++;
                            prepList.save();
                        }
                        else if(ticket.order === start) {
                            ticket.order = end;
                            prepList.save();
                        }
                    }
                })
            });
    }

};