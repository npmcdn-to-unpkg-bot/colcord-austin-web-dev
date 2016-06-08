module.exports = function(app) {
    var prepLists = [
        {_id: "123",
            restaurantId: "12345",
            toDo: [
                {_id: "09123", recipeId: "123", recipeName: "Chicken Puff Pastry", important: true}
            ],
            inProgress: [
                {_id: "99202", recipeId: "543", recipeName: "Beef Broccoli Soup", important: true, signer: "AC", timeStamp: (new Date).toDateString() + ""},
                {_id: "14123", recipeId: "998", recipeName: "Beef Chili", important: false, signer: "CW", timeStamp: (new Date).toDateString() + ""}
            ],
            completed: [
                {_id: "55123", recipeId: "909", recipeName: "Chicken Breast", important: true, signer: "JW", timeStamp: (new Date).toDateString() + ""}
            ]},
        {_id: "444", restaurantId: "44412", toDo: [], inProgress: [], completed: []}
    ];

    app.post("/api/prep/", createPrepList);
    app.get("/api/prep/:prepListId", findPrepListById);
    app.get("/api/restaurant/:restaurantId/prep", findPrepListByRestaurantId);
    app.put("/api/prep/:prepListId", updatePrepList);
    app.delete("/api/prep/:prepListId", deletePrepList);

    // app.post("/api/prep/:prepListId/toDo", addToPrepToDo);
    // app.put("/api/prep/:prepListId/inProgress/:ticket", addToPrepInProgress);
    // app.put("/api/prep/:prepListId/completed/:ticket", addToPrepCompleted);
    // app.delete("/api/prep/:prepListId/toDo/:ticket", removeFromPrepToDoList);
    // app.delete("/api/prep/:prepListId/inProgress/:ticket", removeFromPrepInProgressList);
    // app.delete("/api/prep/:prepListId/completed/:ticket", removeFromPrepCompletedList);
    //
    // function addToPrepToDo(req, res) {
    //     var newTicket = req.body;
    //     var prepListId = req.params.prepListId;
    //
    //     newTicket._id = (new Date()).getTime() + "";
    //     for(var i in prepLists) {
    //
    //     }
    //     prepLists.push(newTicket);
    //     res.sendStatus(200);
    // }

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