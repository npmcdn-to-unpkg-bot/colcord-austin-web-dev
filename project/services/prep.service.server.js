module.exports = function(app) {
    var prepLists = [
        {_id: "123",
            restaurantId: "12345",
            toDo: [
                {_id: "09123", recipeId: "123", name: "Chicken Puff Pastry", important: true}
            ],
            inProgress: [
                {_id: "99202", recipeId: "543", name: "Beef Broccoli Soup", important: true, signer: "AC", timeStamp: (new Date).toDateString() + ""},
                {_id: "14123", recipeId: "998", name: "Beef Chili", important: false, signer: "CW", timeStamp: (new Date).toDateString() + ""}
            ],
            completed: [
                {_id: "55123", recipeId: "909", name: "Chicken Breast", important: true, signer: "JW", timeStamp: (new Date).toDateString() + ""}
            ]},
        {_id: "444", restaurantId: "44412", toDo: [], inProgress: [], completed: []}
    ];

    app.post("/api/prep/", createPrepList);
    app.get("/api/prep/:prepListId", findPrepListById);
    app.get("/api/restaurant/:restaurantId/prep", findPrepListByRestaurantId);
    app.put("/api/prep/:prepListId", updatePrepList);
    app.delete("/api/prep/:prepListId", deletePrepList);

    app.put("/api/prep/:prepListId/toDo", addToPrepToDo);
    app.put("/api/prep/:prepListId/inProgress", addToPrepInProgress);
    app.put("/api/prep/:prepListId/completed", addToPrepCompleted);
    app.delete("/api/prep/:prepListId/toDo/:ticketId", removeFromPrepToDoList);
    app.delete("/api/prep/:prepListId/inProgress/:ticketId", removeFromPrepInProgressList);
    app.delete("/api/prep/:prepListId/completed/:ticketId", removeFromPrepCompletedList);
    
    function removeFromPrepToDoList(req, res) {
        var prepListId = req.params.prepListId;
        var ticketId = req.params.ticketId;
        
        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                for(var j in prepLists[i].toDo) {
                    if(prepLists[i].toDo[j]._id == ticketId) {
                        prepLists[i].toDo.splice(j, 1);
                        res.sendStatus(200);
                        return;
                    }
                }
            }
        }
        res.status(400).send("Unable to remove task from ToDo preplist for prepList ID " + prepListId);
    }

    function removeFromPrepInProgressList(req, res) {
        var prepListId = req.params.prepListId;
        var ticketId = req.params.ticketId;

        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                for(var j in prepLists[i].inProgress) {
                    if(prepLists[i].inProgress[j]._id == ticketId) {
                        prepLists[i].inProgress.splice(j, 1);
                        res.sendStatus(200);
                        return;
                    }
                }
            }
        }
        res.status(400).send("Unable to remove task from InProgress preplist for prepList ID " + prepListId);
    }

    function removeFromPrepCompletedList(req, res) {
        var prepListId = req.params.prepListId;
        var ticketId = req.params.ticketId;

        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                for(var j in prepLists[i].completed) {
                    if(prepLists[i].completed[j]._id == ticketId) {
                        prepLists[i].completed.splice(j, 1);
                        res.sendStatus(200);
                        return;
                    }
                }
            }
        }
        res.status(400).send("Unable to remove task from Completed preplist for prepList ID " + prepListId);
    }
    
    function addToPrepToDo(req, res) {
        var newTicket = req.body;
        var prepListId = req.params.prepListId;
    
        newTicket._id = (new Date()).getTime() + "";
        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                prepLists[i].toDo.push(newTicket);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Unable to add task to ToDo preplist for prepList ID " + prepListId);
    }
    
    function addToPrepInProgress(req, res) {
        var ticket = req.body;
        var prepListId = req.params.prepListId;

        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                prepLists[i].inProgress.push(ticket);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Unable to add task to InProgress preplist for prepList ID " + prepListId);
    }

    function addToPrepCompleted(req, res) {
        var ticket = req.body;
        var prepListId = req.params.prepListId;

        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                prepLists[i].completed.push(ticket);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Unable to add task to Completed preplist for prepList ID " + prepListId);
    }

    function createPrepList(req, res) {
        var newPrepList = req.body;
        newPrepList._id = (new Date()).getTime() + "";
        prepLists.push(newPrepList);
        res.sendStatus(200);
    }
    
    function findPrepListById(req, res) {
        var prepListId = req.params.prepListId;
        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                res.json(prepLists[i]);
                return;
            }
        }
        res.status(400).send("PrepList with ID " + prepListId + " not found");
    }
    
    function findPrepListByRestaurantId(req, res) {
        var restaurantId = req.params.restaurantId;
        for (var i in prepLists) {
            if (prepLists[i].restaurantId === restaurantId) {
                res.json(prepLists[i]);
                return;
            }
        }
        res.status(400).send("PrepList with Restaurant ID " + restaurantId + " not found");
    }
    
    function updatePrepList(req, res) {
        var prepList = req.body;
        var prepListId = req.params.prepListId;

        for(var i in prepLists) {
            if(prepLists[i]._id === prepListId) {
                prepLists[i].toDo = prepList.toDo;
                prepLists[i].inProgress = prepList.inProgress;
                prepLists[i].completed = prepList.completed;
                res.sendStatus(200);
                return true;
            }
        }
        res.status(400).send("PrepList with ID " + prepListId + " not found");
    }
    function deletePrepList(req, res) {
        var prepListId = req.params.prepListId;
        
        for(var i in prepLists) {
            if (prepLists[i]._id === prepListId) {
                prepLists.splice(i, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove prep list with ID " + prepListId);

    }
};