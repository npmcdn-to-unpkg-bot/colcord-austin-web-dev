(function() {
    angular
        .module("Prepper")
        .controller("TimerListController", TimerListController);

    function TimerListController($interval, $routeParams, UserService, RecipeService, PrepService, TimerService) {
        var vm = this;
        vm.getMinutesRemaining = getMinutesRemaining;
        vm.deleteTimer = deleteTimer;
                
        vm.uid = $routeParams["uid"];
        
        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function(response) {
                        vm.user = response.data;
                        RecipeService
                            .findRecipesByRestaurant(vm.user.restaurantId)
                            .then(
                                function(response) {
                                    vm.recipeBook = response.data;
                                    PrepService
                                        .findPrepListByRestaurantId(vm.user.restaurantId)
                                        .then(
                                            function(response) {
                                                vm.prepList = response.data;
                                                getTimers();
                                            },
                                            function(error) {
                                                vm.error = error.data;
                                            }
                                        )
                                },
                                function(error) {
                                    vm.error = error.data;
                                }
                            )
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        init();

        function getTimers() {
            TimerService
                .findTimersByUserId(vm.user._id)
                .then(
                    function(response) {
                        vm.timers = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function getMinutesRemaining(timer) {
            var endTime = addMinutes(timer.timeStart, timer.setMinutes);
            var timeLeft = new Date(endTime - new Date().getTime());

            $interval(function(){
                    timeLeft--;
                //    iterate over timers, decrement their display value
                }, 1000);
            return timeLeft

        }

        // function formatTime(date) {
        //     // http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
        //     return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        // }

        function deleteTimer(timerId) {
            TimerService
                .deleteTimer(timerId)
                .then(
                    function(response) {
                        vm.success = "Successfully removed timer";
                        getTimers();
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        // function getTimeRemaining(timer) {
        //     return timer.timeStart;
            // var timeNow = 5 - ((Date.now() - timer.timeStart));
            // $interval(function(){
            //     // timer.timeStart--;
            //     timeNow;
            // }, 1000);
            // return (timeNow - timer.timeStart);


        // }

        function addMinutes(date, minutes) {
            // http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
            return new Date(date + minutes*60000);
        }
    }
    
})();