module.exports = function(app) {
    var prepLists = [
        {_id: "123",
            restaurantId: 12345,
            toDo: [
                {recipeId: 123, important: true}
            ],
            inProgress: [
                {recipeId: 543, important: true, signer: "AC", timeStamp: (new Date).toDateString()},
                {recipeId: 998, important: false, signer: "CW", timeStamp: (new Date).toDateString()}
            ],
            completed: [
                {recipeId: 909, important: true, signer: "JW", timeStamp: (new Date).toDateString()}
            ]},
        {_id: "444", restaurantId: 44412, toDo: [], inProgress: [], completed: []}
    ];

    app.post("/api/prep/", createPrepList);
    // app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/prep/:prepListId", findPrepListById);
    app.get("/api/prep/restaurant/:restaurantId", findPrepListByRestaurantId);

    app.put("/api/prep/:prepListId", updatePrepList);
    app.delete("/api/prep/:prepListId", deletePrepList);
    //
    function createPrepList(req, res) {
        var newPrepList = req.body;
        newPrepList._id = (new Date()).getTime() + "";
        prepLists.push(newPrepList);
        res.sendStatus(200);
    }
    //
    // function findAllPagesForWebsite(req, res) {
    //     var websiteId = req.params.websiteId;
    //
    //     var result = [];
    //     for(var i in pages) {
    //         if(pages[i].websiteId === websiteId) {
    //             result.push(pages[i]);
    //         }
    //     }
    //     res.send(result);
    // }
    //
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
            if (prepLists[i].restaurantId == restaurantId) {
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
            if(prepLists[i]._id == prepListId) {
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
            if (prepLists[i]._id == prepListId) {
                prepLists.splice(i, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove prep list with ID " + prepListId);

    }
};