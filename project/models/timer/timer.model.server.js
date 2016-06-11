module.exports = function() {

    var mongoose = require("mongoose");

    var TimerSchema = require("./timer.schema.server")();
    var Timer = mongoose.model("Timer", TimerSchema);

    var api = {
        createTimer: createTimer,
        findTimerById: findTimerById,
        findTimersByUsername: findTimersByUsername,
        updateTimer: updateTimer,
        deleteTimer: deleteTimer
    };
    return api;

    function createTimer(timer) {
        return Timer.create(timer);
    }
    
    function findTimerById(timerId) {
        return Timer.findById(timerId);
    }
    
    function findTimersByUsername(userId) {
        return Timer.find({_user: userId});
    }
    
    function updateTimer(timerId, newTimer) {
        return Timer.update(
            {_id: timerId},
            {$set :
                {
                    timeStart: newTimer.timeStart
                }
            }
        )
    }
    
    function deleteTimer(timerId) {
        return Timer.remove({_id: timerId});
    }
};