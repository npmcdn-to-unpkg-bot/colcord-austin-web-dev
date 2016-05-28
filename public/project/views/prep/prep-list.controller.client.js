(function() {
    angular
        .module("Prepster")
        .controller("PrepListController", PrepListController);

    function PrepListController($routeParams, RecipeService, UserService, PrepService) {
        var vm = this;
        vm.getRecipeFromTask = getRecipeFromTask;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            vm.user = UserService.findUserById(vm.uid);
            // vm.recipeBook = RecipeService.findRecipesByRestaurant(vm.user.restaurantId);
            vm.prepList = PrepService.findPrepListByRestaurantId(vm.user.restaurantId);
        }
        init();

        function getRecipeFromTask(prepTask) {
            return RecipeService.findRecipeById(prepTask.recipeId);
        }

         
    }
    
})();