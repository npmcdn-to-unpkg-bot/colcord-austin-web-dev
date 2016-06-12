module.exports = function(app, models) {

    var timerModel = models.timerModel;

    var timers = [
        {_id: "412", name: "Thaw Puff Pastry", recipeId: "123", userId: "456", timeStart: Date.now(), setMinutes: 4},
        {_id: "542", name: "Sear Beef", recipeId: "543", userId: "456", timeStart: Date.now(), setMinutes: 10},
        {_id: "123", name: "Bake Chicken", recipeId: "909", userId: "456", timeStart: Date.now(), setMinutes: 20},
        {_id: "990", name: "Beef Chili Cook at 10", recipeId: "998", userId: "456", timeStart: Date.now(), setMinutes: 2}
    ];

    app.post("/api/timer/", createTimer);
    app.get("/api/timer/:timerId", findTimerById);
    app.get("/api/user/:userId/timer", findTimersByUserId);
    app.put("/api/timer/:timerId", updateTimer);
    app.delete("/api/timer/:timerId", deleteTimer);


    function createTimer(req, res) {
        var newTimer = req.body;

        timerModel
            .createTimer(newTimer)
            .then(
                function(timer) {
                    var timerId = timer._id;
                    res.status(200).send(timerId);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function findTimerById(req, res) {
        var timerId = req.body;

        timerModel
            .findTimerById(timerId)
            .then(
                function(timer) {
                    res.json(timer);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function findTimersByUserId(req, res) {
        var userId = req.params.userId;

        timerModel
            .findTimersByUserId(userId)
            .then(
                function(timers) {
                    res.json(timers);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateTimer(req, res) {
        var timerId = req.params.timerId;
        var newTime = req.body;

        timerModel
            .updateTimer(timerId, timer)
            .then(
                function(timer) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update timer with ID " + timerId);
                }
            );
    }
    
    function deleteTimer(req, res) {
        var timerId = req.params.timerId;

        timerModel
            .deleteTimer(timerId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to delete timer with ID " + timerId);
                }
            );
    }
};