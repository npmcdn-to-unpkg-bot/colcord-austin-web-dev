module.exports = function(app, models) {

    var prepModel = models.prepModel;

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

    app.put("/api/prep/:prepListId/toDo/reorder", reorderToDo); // "/api/prep/:prepListId/todo/reorder?start=start&end=end"


    function reorderToDo(req, res) {
        var startIndex = req.query['start'];
        var endIndex = req.query['end'];
        var prepListId = req.params.prepListId;

        console.log('reordering. Start=' + startIndex + " end=" + endIndex + " prepList=" + prepListId);

        prepModel
            .reorderToDo(startIndex, endIndex, prepListId)
            .then(
                function(prepList) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to reorder tickets for prepList " + prepListId);
                }
            )
    }


    function removeFromPrepToDoList(req, res) {
        var prepListId = req.params.prepListId;
        var ticketId = req.params.ticketId;

        prepModel
            .removeFromPrepToDoList(prepListId, ticketId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function removeFromPrepInProgressList(req, res) {
        var prepListId = req.params.prepListId;
        var ticketId = req.params.ticketId;

        prepModel
            .removeFromPrepInProgressList(prepListId, ticketId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function removeFromPrepCompletedList(req, res) {
        var prepListId = req.params.prepListId;
        var ticketId = req.params.ticketId;

        prepModel
            .removeFromPrepCompletedList(prepListId, ticketId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function addToPrepToDo(req, res) {
        var newTicket = req.body;
        var prepListId = req.params.prepListId;

        prepModel
            .findPrepListById(prepListId)
            .then(
                function(prepList) {
                    newTicket.order = prepList.toDo.length;
                    console.log("ORDER: " + newTicket.order);

                    return prepModel
                        .addToPrepToDo(prepListId, newTicket)
                },
                function(error) {
                    res.status(400).send(error);
                }
            ).then(
            function(prepList) {
                res.sendStatus(200);

            },
            function(error) {
                res.status(400).send(error);
            }
        );
    }
    
    function addToPrepInProgress(req, res) {
        var ticket = req.body;
        var prepListId = req.params.prepListId;

        prepModel
            .addToPrepInProgress(prepListId, ticket)
            .then(
                function(prepList) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function addToPrepCompleted(req, res) {
        var ticket = req.body;
        var prepListId = req.params.prepListId;

        prepModel
            .addToPrepCompleted(prepListId, ticket)
            .then(
                function(prepList) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function createPrepList(req, res) {
        var newPrepList = req.body;

        prepModel
            .createPrepList(newPrepList)
            .then(
                function(prepList) {
                    res.status(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function findPrepListById(req, res) {
        var prepListId = req.params.prepListId;

        prepModel
            .findPrepListById(prepListId)
            .then(
                function(prepList) {
                    res.json(prepList);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function findPrepListByRestaurantId(req, res) {
        var restaurantId = req.params.restaurantId;

        prepModel
            .findPrepListByRestaurantId(restaurantId)
            .then(
                function(prepList) {
                    res.json(prepList);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function updatePrepList(req, res) {
        var prepList = req.body;
        var prepListId = req.params.prepListId;

        prepModel
            .updatePrepList(prepListId, prepList)
            .then(
                function(prepList) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update prep list with ID " + prepListId);
                }
            );
    }
    function deletePrepList(req, res) {
        var prepListId = req.params.prepListId;

        prepModel
            .deletePrepList(prepListId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to delete prep list with ID " + prepListId);
                }
            );
    }
};