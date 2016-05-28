(function() {
    angular
        .module("Prepper")
        .factory("TimerService", TimerService);

    function TimerService() {
        var timers = [
            {_id: 412, username: "ajdcolcord", timeStart: (new Date).getTime()}
        ];

        var api = {
            createTimer: createTimer,
            findTimerById: findTimerById,
            findTimerByUsername: findTimerByUsername,
            addTimer: addTimer,
            updateTimer: updateTimer,
            deleteTimer: deleteTimer
        };
        return api;

        function createTimer(timer) {
            timers.push(timer);
        }

        function findTimerById(timerId) {
            for (var i in timers) {
                if (timers[i]._id == timerId) {
                    return timers[i];
                }
            }
            return null;
        }

        function findTimerByUsername(username) {
            for (var i in timers) {
                if (timers[i].username == username) {
                    return timers[i];
                }
            }
            return null;
        }

        function addTimer(timer) {
            timers.push(timer);
        }

        function updateTimer(timerId, newTime) {
            for(var i in timers) {
                if(timers[i]._id == timerId) {
                    timers[i].timeStart = newTime;
                    return true;
                }
            }
            return false;
        }
        
        function deleteTimer(timerId) {
            for(var i in timers) {
                if (timers[i]._id == timerId) {
                    timers.splice(i, 1);
                }
            }
        }
        
    }

})();