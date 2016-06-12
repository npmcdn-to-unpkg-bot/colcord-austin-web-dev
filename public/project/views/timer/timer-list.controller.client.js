(function() {
    angular
        .module("Prepper")
        .controller("TimerListController", TimerListController);

    function TimerListController($interval, $routeParams, UserService, RecipeService, PrepService, TimerService) {
        var vm = this;
        vm.getMinutesRemaining = getMinutesRemaining;
        vm.deleteTimer = deleteTimer;
                
        vm.uid = $routeParams["uid"];

        vm.globalTime = new Date().getTime();
        $interval(function(){
            vm.globalTime++;
            console.log(vm.globalTime);
            for(var i in vm.timers) {
                vm.timers[i].timeRemaining = getMinutesRemaining(vm.timers[i]);
            }
        }, 1000);


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
            var endTime = addMinutes(new Date(timer.timeStart).getTime(), timer.setMinutes);
            return new Date(endTime - vm.globalTime);
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

        function addMinutes(date, minutes) {
            // http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
            return new Date(date + minutes*60000);
        }
    }
    
})();