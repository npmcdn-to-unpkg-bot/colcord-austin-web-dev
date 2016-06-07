(function() {
    angular
        .module("Prepper")
        .factory("TimerService", TimerService);

    function TimerService() {
        var timers = [
            {_id: "412", name: "Thaw Puff Pastry", recipeId: "123", username: "ajdcolcord", timeStart: new Date(), setMinutes: 4},
            {_id: "542", name: "Sear Beef", recipeId: "543", username: "ajdcolcord", timeStart: new Date(), setMinutes: 10},
            {_id: "123", name: "Bake Chicken", recipeId: "909", username: "ajdcolcord", timeStart: new Date(), setMinutes: 20},
            {_id: "990", name: "Beef Chili Cook at 10", recipeId: "998", username: "ajdcolcord", timeStart: new Date(), setMinutes: 2}
        ];

        var api = {
            createTimer: createTimer,
            findTimerById: findTimerById,
            findTimersByUsername: findTimersByUsername,
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
                if (timers[i]._id === timerId) {
                    return timers[i];
                }
            }
            return null;
        }

        function findTimersByUsername(username) {
            var result = [];
            for (var i in timers) {
                if (timers[i].username === username) {
                    result.push(timers[i]);
                }
            }
            return result;
        }

        function addTimer(timer) {
            timers.push(timer);
        }

        function updateTimer(timerId, newTime) {
            for(var i in timers) {
                if(timers[i]._id === timerId) {
                    timers[i].timeStart = newTime;
                    return true;
                }
            }
            return false;
        }
        
        function deleteTimer(timerId) {
            for(var i in timers) {
                if (timers[i]._id === timerId) {
                    timers.splice(i, 1);
                }
            }
        }
    }

})();