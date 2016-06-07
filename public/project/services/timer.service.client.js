(function() {
    angular
        .module("Prepper")
        .factory("TimerService", TimerService);

    function TimerService($http) {

        var api = {
            createTimer: createTimer,
            findTimerById: findTimerById,
            findTimersByUsername: findTimersByUsername,
            updateTimer: updateTimer,
            deleteTimer: deleteTimer
        };
        return api;

        function createTimer(timer) {
            return $http.post("/api/timer", timer);
        }

        function findTimerById(timerId) {
            return $http.get("/api/timer/" + timerId);
        }

        function findTimersByUsername(username) {
            return $http.get("/api/user/" + username + "/timer");
        }

        function updateTimer(timerId, newTime) {
            return $http.put("/api/timer/" + timerId, newTime);
        }
        
        function deleteTimer(timerId) {
            return $http.delete("/api/timer/" + timerId);
        }
    }

})();