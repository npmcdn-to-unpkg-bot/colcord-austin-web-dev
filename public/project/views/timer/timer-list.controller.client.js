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
            vm.user = UserService.findUserById(vm.uid);
            vm.recipeBook = RecipeService.findRecipesByRestaurant(vm.user.restaurantId);
            vm.prepList = PrepService.findPrepListByRestaurantId(vm.user.restaurantId);
            vm.timers = TimerService.findTimersByUsername(vm.user.username);
        }
        init();

        function getMinutesRemaining(timer) {
            return timer.setMinutes - ((new Date().getTime() - timer.timeStart) / (60 * 1000));

        }

        function deleteTimer(timerId) {
            TimerService.deleteTimer(timerId);
        }
    }
    
})();