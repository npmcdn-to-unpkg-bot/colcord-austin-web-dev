(function() {
    angular
        .module("Prepper")
        .controller("TimerListController", TimerListController);

    function TimerListController($routeParams, UserService, RecipeService, PrepService, TimerService) {
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
                .findTimersByUsername(vm.user.username)
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
            // return timer.setMinutes - (formatTime(new Date() - timer.timeStart));
            var difference = (new Date - timer.timeStart);
            // return formatTime(new Date(difference))
            return timer.timeStart;

        }

        function formatTime(date) {
            // http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
            return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        }

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
    }
    
})();