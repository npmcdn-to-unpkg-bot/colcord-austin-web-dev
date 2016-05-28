(function() {
    angular
        .module("Prepper")
        .controller("TimerListController", TimerListController);

    function TimerListController($routeParams, RecipeService, PrepService) {
        var vm = this;
                
        vm.uid = $routeParams["uid"];
        
        function init() {
            vm.user = TimerService.findUserById(vm.uid);
            vm.recipeBook = RecipeService.findRecipesByRestaurant(vm.user.restaurantId);
            vm.prepList = PrepService.findPrepListByRestaurantId(vm.user.restaurantId);
        }
        init();
    }
    
})();