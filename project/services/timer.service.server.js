module.exports = function(app) {
    var timers = [
        {_id: "412", name: "Thaw Puff Pastry", recipeId: "123", userId: "456", timeStart: Date.now(), setMinutes: 4},
        {_id: "542", name: "Sear Beef", recipeId: "543", userId: "456", timeStart: Date.now(), setMinutes: 10},
        {_id: "123", name: "Bake Chicken", recipeId: "909", userId: "456", timeStart: Date.now(), setMinutes: 20},
        {_id: "990", name: "Beef Chili Cook at 10", recipeId: "998", userId: "456", timeStart: Date.now(), setMinutes: 2}
    ];

    app.post("/api/timer/", createTimer);
    app.get("/api/timer/:timerId", findTimerById);
    app.get("/api/user/:userId/timer", findTimersByUsername);
    app.put("/api/timer/:timerId", updateTimer);
    app.delete("/api/timer/:timerId", deleteTimer);


    function createTimer(req, res) {
        var newTimer = req.body;
        newTimer._id = (new Date()).getTime() + "";
        timers.push(newTimer);
        res.status(200).send(newTimer._id);
    }
    
    function findTimerById(req, res) {
        var timerId = req.body;
        for (var i in timers) {
            if (timers[i]._id === timerId) {
                res.json(timers[i]);
                return;
                
            }
        }
        res.status(400).send("Timer with ID " + timerId + " not found");
    }
    
    function findTimersByUsername(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var i in timers) {
            if (timers[i].userId === userId) {
                result.push(timers[i]);
            }
        }
        res.send(result);
    }

    function updateTimer(req, res) {
        var timerId = req.params.timerId;
        var newTime = req.body;

        for(var i in timers) {
            if(timers[i]._id === timerId) {
                timers[i].timeStart = newTime;
                res.sendStatus(200);
                return true;
            }
        }
        res.status(400).send("Timer with ID " + timerId + " not found");
    }
    
    function deleteTimer(req, res) {
        var timerId = req.params.timerId;
        for(var i in timers) {
            if (timers[i]._id === timerId) {
                timers.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Timer with ID " + timerId + " not found");
    }
};